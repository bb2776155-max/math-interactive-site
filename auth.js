const VALID_HASHES = [
    "f99eeda3449c85bdb35a371a7bf89752d9b92f205e14be51338ab6ab25a8f9f5"
    "7425676f9774f177797ab30270e7ee869311f52480b8944411ae49b87a08dce2"
];

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getCurrentUserHash() {
    return localStorage.getItem('math_auth_passed_hash') || 'anonymous_user';
}

async function handleLogin() {
    const input = document.getElementById('invite-code-input').value.trim();
    const errorHint = document.getElementById('login-error');
    const inputHash = await sha256(input);

    if (VALID_HASHES.includes(inputHash)) {
        localStorage.setItem('math_auth_passed', 'true');
        localStorage.setItem('math_auth_passed_hash', inputHash);
        unlockSite();
    } else {
        errorHint.classList.remove('hidden');
        document.getElementById('invite-code-input').focus();
    }
}

function handleLogout() {
    localStorage.removeItem('math_auth_passed');
    localStorage.removeItem('math_auth_passed_hash');
    location.reload();
}

function unlockSite() {
    document.getElementById('login-screen').classList.add('opacity-0', 'pointer-events-none');
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('opacity-0', 'pointer-events-none');
    mainContent.classList.add('opacity-100');
    renderSidebar();
    switchLesson(activeLessonId);
}
