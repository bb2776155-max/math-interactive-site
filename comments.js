// 初始化 Supabase 云端连接
const SUPABASE_URL = "https://yafbnddgdugykbiaqmuw.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZmJuZGRnZHVneWtiaWFxbXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMTU0ODcsImV4cCI6MjA5ODY5MTQ4N30.FlKeKfqJkxrYCm11834wb0g_xJdw-Y8CQ0iqJNxTTns"; 
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
        fetch: (url, options = {}) => {
            const headers = new Headers(options.headers || {});
            headers.set('x-user-hash', getCurrentUserHash());
            options.headers = headers;
            return fetch(url, options);
        }
    }
});
const COMMENT_IMAGE_BUCKET = 'comment-images';
const MAX_COMMENT_IMAGES = 4;

function getCommentImageFiles() {
    const input = document.getElementById('comment-image-input');
    return input ? Array.from(input.files || []).slice(0, MAX_COMMENT_IMAGES) : [];
}

function handleCommentImageChange() {
    const input = document.getElementById('comment-image-input');
    const status = document.getElementById('comment-image-status');
    const files = getCommentImageFiles();
    if (!status) return;

    if (files.length === 0) {
        status.innerText = '';
        return;
    }

    const names = files.map(file => file.name).join('、');
    const rawCount = input ? input.files.length : files.length;
    status.innerText = rawCount > MAX_COMMENT_IMAGES ? `最多上传 ${MAX_COMMENT_IMAGES} 张，已取前 ${MAX_COMMENT_IMAGES} 张` : names;
}

function normalizeImageUrls(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [value];
        } catch {
            return [value];
        }
    }
    return [];
}

function renderCommentImages(comment) {
    const imageUrls = normalizeImageUrls(comment.image_urls);
    if (imageUrls.length === 0 && comment.image_url) {
        imageUrls.push(comment.image_url);
    }
    if (imageUrls.length === 0) return '';

    return `
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            ${imageUrls.map(url => `
                <a href="${url}" target="_blank" rel="noopener" class="block overflow-hidden rounded-lg border border-slate-800 bg-slate-950/50">
                    <img src="${url}" alt="评论图片" class="w-full h-28 object-cover hover:opacity-90 transition-opacity">
                </a>
            `).join('')}
        </div>
    `;
}

async function uploadCommentImages(files) {
    const uploadedUrls = [];
    const userHash = getCurrentUserHash();

    for (const file of files) {
        if (!file.type.startsWith('image/')) {
            throw new Error('只能上传图片文件');
        }

        const extension = file.name.split('.').pop() || 'jpg';
        const safeName = `${activeLessonId}/${userHash}/${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`;
        const { error } = await supabaseClient.storage
            .from(COMMENT_IMAGE_BUCKET)
            .upload(safeName, file, { cacheControl: '3600', upsert: false });

        if (error) {
            throw new Error(`图片上传失败：${error.message}`);
        }

        const { data } = supabaseClient.storage
            .from(COMMENT_IMAGE_BUCKET)
            .getPublicUrl(safeName);

        uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
}

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

        // 【修改点】用最稳妥的单引号包裹数字 ID，确保 onclick 里的参数能被安全转成数字字面量
        const deleteMainBtnHtml = isMainAuthorMe 
            ? `<button onclick="deleteComment('${comment.id}')" class="text-slate-600 hover:text-rose-400 transition-colors text-[11px] cursor-pointer font-medium">删除</button>` 
            : '';

        let htmlContent = `
            <div class="space-y-1">
                <div class="flex items-center justify-between text-[11px] font-semibold ${isMainAuthorMe ? 'text-indigo-400' : 'text-slate-500'}">
                    <span>${mainLabel}</span>
                    <div class="flex items-center space-x-3">
                        <span class="text-slate-500 font-normal">${comment.time_str}</span>
                        ${deleteMainBtnHtml}
                    </div>
                </div>
                <p class="text-slate-300 leading-relaxed break-all whitespace-pre-wrap text-sm font-medium">${comment.text}</p>
                ${renderCommentImages(comment)}
            </div>
        `;

        // 查找这条主评论底下的回复
        const replies = dbComments.filter(c => c.parent_id === comment.id);
        if (replies.length > 0) {
            htmlContent += `<div class="border-l border-slate-800/80 pl-4 space-y-2 mt-2">`;
            replies.forEach(reply => {
                const isReplyAuthorMe = (reply.user_hash === currentHash);
                const replyLabel = isReplyAuthorMe ? "💬 我的点拨" : "💬 思维碰撞 / 老师点拨";

                // 【修改点】同样处理子回复的删除按钮绑定
                const deleteReplyBtnHtml = isReplyAuthorMe 
                    ? `<button onclick="deleteComment('${reply.id}')" class="text-slate-600 hover:text-rose-400 transition-colors text-[10px] cursor-pointer font-medium">删除</button>` 
                    : '';

                htmlContent += `
                    <div class="bg-slate-950/40 border border-slate-900/60 rounded-lg px-3 py-2 space-y-0.5 text-xs">
                        <div class="flex items-center justify-between text-[10px] font-medium ${isReplyAuthorMe ? 'text-indigo-400' : 'text-slate-600'}">
                            <span>${replyLabel}</span>
                            <div class="flex items-center space-x-2">
                                <span class="text-slate-600 font-normal">${reply.time_str}</span>
                                ${deleteReplyBtnHtml}
                            </div>
                        </div>
                        <p class="text-slate-400 leading-relaxed break-all whitespace-pre-wrap">${reply.text}</p>
                        ${renderCommentImages(reply)}
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
                <div class="flex-grow space-y-1.5">
                    <input type="text" id="reply-input-${index}" placeholder="在此输入你的补充思路..."
                           class="w-full bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-700 focus:outline-none focus:border-indigo-500 transition-colors">
                    <div class="flex items-center justify-between gap-2">
                        <label class="text-[10px] font-bold text-slate-600 hover:text-indigo-400 cursor-pointer transition-colors">
                            <input id="reply-image-input-${index}" type="file" accept="image/*" multiple class="hidden" onchange="handleReplyImageChange(${index})">
                            上传图片
                        </label>
                        <span id="reply-image-status-${index}" class="text-[10px] text-slate-700 truncate"></span>
                    </div>
                </div>
                <button onclick="submitReply(${index}, '${comment.id}')" class="shrink-0 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white font-bold text-[11px] px-3 h-8 rounded-lg transition-all cursor-pointer">
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
    const imageInput = document.getElementById('comment-image-input');
    const status = document.getElementById('comment-image-status');
    const text = input.value.trim();
    const files = getCommentImageFiles();
    if (!text && files.length === 0) return;

    const now = new Date();
    const timeString = `${now.getMonth() + 1}-${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    let imageUrls = [];

    try {
        if (files.length > 0) {
            if (status) status.innerText = '图片上传中...';
            imageUrls = await uploadCommentImages(files);
        }
    } catch (error) {
        console.error('图片上传错误:', error);
        alert(error.message || '图片上传失败，请检查 Supabase Storage 配置');
        if (status) status.innerText = '';
        return;
    }

    // 向 Supabase 插入数据
    const { error } = await supabaseClient
        .from('comments')
        .insert([{
            lesson_id: activeLessonId,
            text: text,
            time_str: timeString,
            user_hash: getCurrentUserHash(),
            image_urls: imageUrls
        }]);

    if (error) {
        console.error('Supabase 写入错误:', error);
        alert(`评论发送失败：${error.message || '请查看控制台报错'}。如果刚刚上传了图片，请确认 comments 表已添加 image_urls 字段。`);
        if (status) status.innerText = '';
        return;
    }

    input.value = '';
    if (imageInput) imageInput.value = '';
    if (status) status.innerText = '';
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

function getReplyImageFiles(index) {
    const input = document.getElementById(`reply-image-input-${index}`);
    return input ? Array.from(input.files || []).slice(0, MAX_COMMENT_IMAGES) : [];
}

function handleReplyImageChange(index) {
    const input = document.getElementById(`reply-image-input-${index}`);
    const status = document.getElementById(`reply-image-status-${index}`);
    const files = getReplyImageFiles(index);
    if (!status) return;

    const rawCount = input ? input.files.length : files.length;
    status.innerText = rawCount > MAX_COMMENT_IMAGES ? `最多 ${MAX_COMMENT_IMAGES} 张` : files.map(file => file.name).join('、');
}

// 3. 将新回复写入云端
async function submitReply(commentIndex, parentId) {
    const input = document.getElementById(`reply-input-${commentIndex}`);
    const imageInput = document.getElementById(`reply-image-input-${commentIndex}`);
    const status = document.getElementById(`reply-image-status-${commentIndex}`);
    const text = input.value.trim();
    const files = getReplyImageFiles(commentIndex);
    if (!text && files.length === 0) return;

    const now = new Date();
    const timeString = `${now.getMonth() + 1}-${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    let imageUrls = [];

    try {
        if (files.length > 0) {
            if (status) status.innerText = '图片上传中...';
            imageUrls = await uploadCommentImages(files);
        }
    } catch (error) {
        console.error('回复图片上传错误:', error);
        alert(error.message || '回复图片上传失败，请检查 Supabase Storage 配置');
        if (status) status.innerText = '';
        return;
    }

    // 向 Supabase 插入回复数据
    const { error } = await supabaseClient
        .from('comments')
        .insert([{
            lesson_id: activeLessonId,
            text: text,
            time_str: timeString,
            user_hash: getCurrentUserHash(),
            parent_id: parentId,
            image_urls: imageUrls
        }]);

    if (error) {
        console.error('Supabase 回复写入错误:', error);
        alert(`回复失败：${error.message || '请查看控制台报错'}。如果刚刚上传了图片，请确认 comments 表已添加 image_urls 字段。`);
        if (status) status.innerText = '';
        return;
    }

    input.value = '';
    if (imageInput) imageInput.value = '';
    if (status) status.innerText = '';
    loadComments();
}

// 4. 删除自己的评论/回复（安全隔离双重校验）
async function deleteComment(commentId) {
    if (!confirm('确定要删除这条思维沉淀吗？')) return;

    const currentHash = getCurrentUserHash();
    
    // 步骤 A：如果该评论是主评论，先干掉它底下的所有回复
    const { error: replyError } = await supabaseClient
        .from('comments')
        .delete()
        .eq('parent_id', commentId);

    if (replyError) {
        console.error('清空子回复失败:', replyError);
    }

    // 步骤 B：删除这条评论本身（强限制只能删自己的 user_hash）
    const { error } = await supabaseClient
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_hash', currentHash);

    if (error) {
        console.error('删除主记录失败详情:', error);
        alert(`删除失败: ${error.message || '权限不足'}`);
        return;
    }

    // 重新刷新视图
    loadComments();
}// 5. 开启云端实时监听（聊天室级别秒级同步）
supabaseClient
.channel('schema-db-changes')
.on(
    'postgres_changes',
    {
        event: '*', // 无论是有人新增(INSERT)还是有人删除(DELETE)，全方位监听
        schema: 'public',
        table: 'comments'
    },
    (payload) => {
        console.log('检测到云端思维流变动，正在同步视图...', payload);
        // 只要云端一变，多端立刻免刷新重新加载评论列表
        loadComments();
    }
)
.subscribe();
