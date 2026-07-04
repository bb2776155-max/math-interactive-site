function loadComments() {
    const flow = document.getElementById('comments-flow');
    flow.innerHTML = '';
    const key = `comments_${activeLessonId}`;
    const comments = JSON.parse(localStorage.getItem(key) || '[]');
    const currentHash = getCurrentUserHash();

    if (comments.length === 0) {
        flow.innerHTML = `<div class="text-xs text-slate-700 italic py-2">当前题目尚未记录思维快照...</div>`;
        return;
    }

    comments.forEach((comment, index) => {
        const commentBox = document.createElement('div');
        commentBox.className = "bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-3 animate-fade-in";

        const isMainAuthorMe = (comment.userHash === currentHash);
        const mainLabel = isMainAuthorMe ? "💡 我的思维沉淀" : `💡 内部学子思维沉淀 (#${index + 1})`;

        let htmlContent = `
            <div class="space-y-1">
                <div class="flex items-center justify-between text-[11px] font-semibold ${isMainAuthorMe ? 'text-indigo-400' : 'text-slate-500'}">
                    <span>${mainLabel}</span>
                    <span class="text-slate-500 font-normal">${comment.time}</span>
                </div>
                <p class="text-slate-300 leading-relaxed break-all whitespace-pre-wrap text-sm font-medium">${comment.text}</p>
            </div>
        `;

        if (comment.replies && comment.replies.length > 0) {
            htmlContent += `<div class="border-l border-slate-800/80 pl-4 space-y-2 mt-2">`;
            comment.replies.forEach(reply => {
                const isReplyAuthorMe = (reply.userHash === currentHash);
                const replyLabel = isReplyAuthorMe ? "💬 我的点拨" : "💬 思维碰撞 / 老师点拨";

                htmlContent += `
                    <div class="bg-slate-950/40 border border-slate-900/60 rounded-lg px-3 py-2 space-y-0.5 text-xs">
                        <div class="flex items-center justify-between text-[10px] font-medium ${isReplyAuthorMe ? 'text-indigo-400' : 'text-slate-600'}">
                            <span>${replyLabel}</span>
                            <span class="text-slate-600 font-normal">${reply.time}</span>
                        </div>
                        <p class="text-slate-400 leading-relaxed break-all whitespace-pre-wrap">${reply.text}</p>
                    </div>
                `;
            });
            htmlContent += `</div>`;
        }

        htmlContent += `
            <div class="flex justify-end pt-1">
                <button onclick="toggleReplyBox(${index})" class="text-[11px] font-bold text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer flex items-center space-x-1">
                    <span>💬 回复此总结</span>
                </button>
            </div>
            <div id="reply-container-${index}" class="hidden mt-3 gap-2 items-start animate-fade-in">
                <input type="text" id="reply-input-${index}" placeholder="在此输入你的补充思路..."
                       class="flex-grow bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition-colors">
                <button onclick="submitReply(${index})" class="shrink-0 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white font-bold text-[11px] px-3 h-8 rounded-lg transition-all cursor-pointer">
                    提交
                </button>
            </div>
        `;

        commentBox.innerHTML = htmlContent;
        flow.appendChild(commentBox);
    });
}

function submitComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text) return;

    const key = `comments_${activeLessonId}`;
    const comments = JSON.parse(localStorage.getItem(key) || '[]');

    const now = new Date();
    const timeString = `${now.getMonth() + 1}-${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    comments.push({
        text: text,
        time: timeString,
        userHash: getCurrentUserHash(),
        replies: []
    });
    localStorage.setItem(key, JSON.stringify(comments));

    input.value = '';
    loadComments();
}

function toggleReplyBox(index) {
    const box = document.getElementById(`reply-container-${index}`);
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        box.classList.add('flex');
        document.getElementById(`reply-input-${index}`).focus();
    } else {
        box.classList.remove('flex');
        box.classList.add('hidden');
    }
}

function submitReply(commentIndex) {
    const input = document.getElementById(`reply-input-${commentIndex}`);
    const text = input.value.trim();
    if (!text) return;

    const key = `comments_${activeLessonId}`;
    const comments = JSON.parse(localStorage.getItem(key) || '[]');

    if (!comments[commentIndex].replies) {
        comments[commentIndex].replies = [];
    }

    const now = new Date();
    const timeString = `${now.getMonth() + 1}-${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    comments[commentIndex].replies.push({
        text: text,
        time: timeString,
        userHash: getCurrentUserHash()
    });
    localStorage.setItem(key, JSON.stringify(comments));

    loadComments();
}
