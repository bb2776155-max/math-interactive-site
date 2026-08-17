const PRIVATE_NOTE_IMAGE_BUCKET = 'private-note-images';
const MAX_PRIVATE_NOTE_IMAGES = 4;
let latestPrivateNotesRequestId = 0;

function getPrivateNoteImageFiles() {
    const input = document.getElementById('private-note-image-input');
    return input ? Array.from(input.files || []).slice(0, MAX_PRIVATE_NOTE_IMAGES) : [];
}

function handlePrivateNoteImageChange() {
    const input = document.getElementById('private-note-image-input');
    const status = document.getElementById('private-note-image-status');
    const files = getPrivateNoteImageFiles();
    if (!status) return;
    const rawCount = input ? input.files.length : files.length;
    status.innerText = rawCount > MAX_PRIVATE_NOTE_IMAGES
        ? `最多上传 ${MAX_PRIVATE_NOTE_IMAGES} 张，已取前 ${MAX_PRIVATE_NOTE_IMAGES} 张`
        : files.map(file => file.name).join('、');
}

async function uploadPrivateNoteImages(files) {
    const paths = [];
    const userHash = getCurrentUserHash();
    for (const file of files) {
        if (!file.type.startsWith('image/')) throw new Error('只能上传图片文件');
        const extension = file.name.split('.').pop() || 'jpg';
        const path = `${userHash}/${activeLessonId}/${Date.now()}-${Math.random().toString(16).slice(2)}.${extension}`;
        const { error } = await supabaseClient.storage
            .from(PRIVATE_NOTE_IMAGE_BUCKET)
            .upload(path, file, { cacheControl: '3600', upsert: false });
        if (error) throw new Error(`图片上传失败：${error.message}`);
        paths.push(path);
    }
    return paths;
}

async function getPrivateNoteImageUrls(paths) {
    if (!paths || !paths.length) return [];
    const results = await Promise.all(paths.map(async path => {
        const { data, error } = await supabaseClient.storage
            .from(PRIVATE_NOTE_IMAGE_BUCKET)
            .createSignedUrl(path, 3600);
        return error ? null : data.signedUrl;
    }));
    return results.filter(Boolean);
}

async function loadPrivateNotes(lessonId = activeLessonId) {
    const flow = document.getElementById('private-notes-flow');
    const syncStatus = document.getElementById('private-note-sync-status');
    if (!flow) return;
    const requestId = ++latestPrivateNotesRequestId;
    flow.innerHTML = '<div class="text-xs text-slate-700 py-2">笔记加载中…</div>';
    if (syncStatus) syncStatus.innerText = '';

    const { data, error } = await supabaseClient
        .from('private_notes')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('created_at', { ascending: false });

    if (requestId !== latestPrivateNotesRequestId || lessonId !== activeLessonId) return;
    if (error) {
        console.warn('私人笔记读取失败:', error.message);
        flow.innerHTML = '<div class="text-xs text-amber-400/80 py-2">私人笔记云端尚未启用，请先运行最新的 supabase-setup.sql。</div>';
        return;
    }
    if (!data || !data.length) {
        flow.innerHTML = '<div class="text-xs text-slate-700 py-2">这篇 lesson 还没有私人笔记。</div>';
        return;
    }

    const rendered = await Promise.all(data.map(async note => ({
        ...note,
        signedUrls: await getPrivateNoteImageUrls(Array.isArray(note.image_paths) ? note.image_paths : [])
    })));
    flow.innerHTML = rendered.map(note => `
        <article class="private-note-item border border-slate-900 bg-slate-900/25 rounded-lg p-4 space-y-3">
            <div class="flex items-center justify-between gap-3 text-[11px] text-slate-600">
                <span>${new Date(note.created_at).toLocaleString('zh-CN', { hour12: false })}</span>
                <button type="button" onclick="deletePrivateNote('${note.id}')" class="text-slate-600 hover:text-rose-400 cursor-pointer">删除</button>
            </div>
            ${note.text ? `<p class="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap break-words">${escapeHtml(note.text)}</p>` : ''}
            ${note.signedUrls.length ? `<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">${note.signedUrls.map(url => `<a href="${url}" target="_blank" rel="noopener"><img src="${url}" alt="私人笔记图片" class="w-full h-28 object-cover rounded-md border border-slate-800"></a>`).join('')}</div>` : ''}
        </article>
    `).join('');
}

async function submitPrivateNote() {
    const input = document.getElementById('private-note-input');
    const imageInput = document.getElementById('private-note-image-input');
    const status = document.getElementById('private-note-image-status');
    const syncStatus = document.getElementById('private-note-sync-status');
    const textValue = input?.value.trim() || '';
    const files = getPrivateNoteImageFiles();
    if (!textValue && !files.length) return;
    if (syncStatus) syncStatus.innerText = '保存中…';

    try {
        const imagePaths = await uploadPrivateNoteImages(files);
        const { error } = await supabaseClient.from('private_notes').insert([{
            user_hash: getCurrentUserHash(),
            lesson_id: activeLessonId,
            text: textValue,
            image_paths: imagePaths
        }]);
        if (error) throw error;
        if (input) input.value = '';
        if (imageInput) imageInput.value = '';
        if (status) status.innerText = '';
        if (syncStatus) syncStatus.innerText = '已保存';
        loadPrivateNotes(activeLessonId);
    } catch (error) {
        console.error('私人笔记保存失败:', error);
        if (syncStatus) syncStatus.innerText = '保存失败';
        alert(`私人笔记保存失败：${error.message || '请确认已运行最新的 Supabase SQL'}`);
    }
}

async function deletePrivateNote(noteId) {
    if (!confirm('确定删除这条私人笔记吗？')) return;
    const { data } = await supabaseClient.from('private_notes').select('image_paths').eq('id', noteId).maybeSingle();
    const { error } = await supabaseClient.from('private_notes').delete().eq('id', noteId);
    if (error) {
        alert(`删除失败：${error.message}`);
        return;
    }
    if (data?.image_paths?.length) {
        await supabaseClient.storage.from(PRIVATE_NOTE_IMAGE_BUCKET).remove(data.image_paths);
    }
    loadPrivateNotes(activeLessonId);
}
