const VALID_HASHES = [
    "e812d4d9cc2c286e921d7bc002c98d67a9bc97576f7c8ec1b0c03dc8290a1877",
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
