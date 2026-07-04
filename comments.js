// 初始化 Supabase 云端连接 (修正全局对象首字母大小写逻辑)
const SUPABASE_URL = "https://yafbnddgdugykbiaqmuw.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZmJuZGRnZHVneWtiaWFxbXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMTU0ODcsImV4cCI6MjA5ODY5MTQ4N30.FlKeKfqJkxrYCm11834wb0g_xJdw-Y8CQ0iqJNxTTns"; 

// 兼容处理：有些浏览器打包会识别 window.supabase，标准 CDN 会识别全局 supabase
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1. 从云端加载全部评论
async function loadComments() {
    const flow = document.getElementById('comments-flow');
    flow.innerHTML = '';
    const currentHash = getCurrentUserHash();

    // 从 Supabase 抓取当前题目的所有主评论和回复
    const { data: dbComments, error } = await supabaseClient
        .from('comments')
        .select('*')
        .eq('lesson_id', activeLessonId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Supabase 读取错误:', error);
        flow.innerHTML = `<div class="text-xs text-rose-500 italic py-2">云端数据读取失败，请检查网络或配置。</div>`;
        return;
    }

    if (!dbComments || dbComments.length === 0) {
        flow.innerHTML = `<div class="text-xs text-slate-700 italic py-2">当前题目尚未记录思维快照...</div>`;
        return;
    }

    // 筛选出主评论（parent_id 为空的是主评论）
    const mainComments = dbComments.filter(c => !c.parent_id);

    mainComments.forEach((comment, index) => {
        const commentBox = document.createElement('div');
        commentBox.className = "bg-slate-900/40 border border-slate-900 rounded-xl p-4 space-y-3 animate-fade-in";

        const isMainAuthorMe = (comment.user_hash === currentHash);
        const mainLabel = isMainAuthorMe ? "💡 我的思维沉淀" : `💡 学生思维沉淀 (#${index + 1})`;

        let htmlContent = `
            <div class="space-y-1">
                <div class="flex items-center justify-between text-[11px] font-semibold ${isMainAuthorMe ? 'text-indigo-400' : 'text-slate-500'}">
                    <span>${mainLabel}</span>
                    <span class="text-slate-500 font-normal">${comment.time_str}</span>
                </div>
                <p class="text-slate-300 leading-relaxed break-all whitespace-pre-wrap text-sm font-medium">${comment.text}</p>
            </div>
        `;

        // 查找这条主评论底下的回复
        const replies = dbComments.filter(c => c.parent_id === comment.id);
        if (replies.length > 0) {
            htmlContent += `<div class="border-l border-slate-800/80 pl-4 space-y-2 mt-2">`;
            replies.forEach(reply => {
                const isReplyAuthorMe = (reply.user_hash === currentHash);
                const replyLabel = isReplyAuthorMe ? "💬 我的点拨" : "💬 思维碰撞 / 老师点拨";

                htmlContent += `
                    <div class="bg-slate-950/40 border border-slate-900/60 rounded-lg px-3 py-2 space-y-0.5 text-xs">
                        <div class="flex items-center justify-between text-[10px] font-medium ${isReplyAuthorMe ? 'text-indigo-400' : 'text-slate-600'}">
                            <span>${replyLabel}</span>
                            <span class="text-slate-600 font-normal">${reply.time_str}</span>
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
                <button onclick="submitReply(${index}, ${comment.id})" class="shrink-0 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white font-bold text-[11px] px-3 h-8 rounded-lg transition-all cursor-pointer">
                    提交
                </button>
            </div>
        `;

        commentBox.innerHTML = htmlContent;
        flow.appendChild(commentBox);
    });
}

// 2. 将新评论写入云端
async function submitComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeString = `${now.getMonth() + 1}-${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // 向 Supabase 插入数据
    const { error } = await supabaseClient
        .from('comments')
        .insert([{
            lesson_id: activeLessonId,
            text: text,
            time_str: timeString,
            user_hash: getCurrentUserHash()
        }]);

    if (error) {
        console.error('Supabase 写入错误:', error);
        alert('评论发送失败，请查看控制台报错');
        return;
    }

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

// 3. 将新回复写入云端
async function submitReply(commentIndex, parentId) {
    const input = document.getElementById(`reply-input-${commentIndex}`);
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeString = `${now.getMonth() + 1}-${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // 向 Supabase 插入回复数据
    const { error } = await supabaseClient
        .from('comments')
        .insert([{
            lesson_id: activeLessonId,
            text: text,
            time_str: timeString,
            user_hash: getCurrentUserHash(),
            parent_id: parentId
        }]);

    if (error) {
        console.error('Supabase 回复写入错误:', error);
        alert('回复失败');
        return;
    }

    loadComments();
}