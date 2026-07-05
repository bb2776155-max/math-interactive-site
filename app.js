let activeLessonId = ALL_LESSONS[0].id;
let selectedTagFilter = null;
let reviewMode = 'full';
let activeAnnotationSelection = null;

const REVIEW_MODES = [
    { key: 'full', label: '正常阅读', dotClass: 'bg-slate-600' },
    { key: 'thin', label: '读薄模式', dotClass: 'bg-indigo-400 shadow-sm shadow-indigo-400' },
    { key: 'test', label: '自测模式', dotClass: 'bg-cyan-400 shadow-sm shadow-cyan-400' },
    { key: 'review', label: '只看需回看', dotClass: 'bg-amber-400 shadow-sm shadow-amber-400' }
];

const STEP_STATUS_STAGES = [
    { key: 'none', label: '未读', icon: '-', bgClass: 'bg-slate-950/50 text-slate-500 border-slate-800 hover:text-slate-300' },
    { key: 'read', label: '读懂', icon: 'OK', bgClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20' },
    { key: 'explain', label: '能复述', icon: 'UP', bgClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20' },
    { key: 'review', label: '需回看', icon: '!', bgClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20' }
];

function escapeHtml(value) {
    const div = document.createElement('div');
    div.innerText = value || '';
    return div.innerHTML;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyAnnotationHighlights(root, annotations) {
    if (!annotations || annotations.length === 0) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || parent.closest('script, style, svg, mjx-container, .student-highlight')) {
                return NodeFilter.FILTER_REJECT;
            }
            return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    annotations.forEach(annotation => {
        const selectedText = annotation.text;
        if (!selectedText || selectedText.length < 2) return;

        const pattern = new RegExp(escapeRegExp(selectedText), 'g');
        textNodes.forEach(node => {
            if (!node.parentNode || !node.nodeValue.includes(selectedText)) return;

            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            node.nodeValue.replace(pattern, (match, index) => {
                if (index > lastIndex) {
                    fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, index)));
                }
                const mark = document.createElement('span');
                mark.className = `student-highlight student-highlight-${annotation.color || 'blue'}`;
                mark.textContent = match;
                fragment.appendChild(mark);
                lastIndex = index + match.length;
            });
            if (lastIndex < node.nodeValue.length) {
                fragment.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
            }
            node.parentNode.replaceChild(fragment, node);
        });
    });
}

function renderAnnotationToolbar() {
    let toolbar = document.getElementById('annotation-toolbar');
    if (toolbar) return toolbar;

    toolbar = document.createElement('div');
    toolbar.id = 'annotation-toolbar';
    toolbar.className = 'annotation-toolbar hidden';
    toolbar.innerHTML = `
        <button onclick="saveCurrentAnnotation('blue')">蓝笔</button>
        <button onclick="saveCurrentAnnotation('yellow')">黄笔</button>
        <button onclick="markCurrentSelectionForReview()">需回看</button>
        <button onclick="clearCurrentStepAnnotations()">清空本题</button>
    `;
    document.body.appendChild(toolbar);
    return toolbar;
}

function hideAnnotationToolbar() {
    const toolbar = document.getElementById('annotation-toolbar');
    if (toolbar) toolbar.classList.add('hidden');
}

function handleAnnotationSelection() {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : '';
    const toolbar = renderAnnotationToolbar();

    if (!selection || selectedText.length < 2 || selection.rangeCount === 0) {
        hideAnnotationToolbar();
        activeAnnotationSelection = null;
        return;
    }

    const range = selection.getRangeAt(0);
    const answerEl = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
        ? range.commonAncestorContainer.parentElement.closest('.lesson-answer')
        : range.commonAncestorContainer.closest('.lesson-answer');
    const details = answerEl ? answerEl.closest('details') : null;

    if (!answerEl || !details || !details.id) {
        hideAnnotationToolbar();
        activeAnnotationSelection = null;
        return;
    }

    activeAnnotationSelection = {
        lessonId: activeLessonId,
        stepId: details.id,
        text: selectedText.slice(0, 180)
    };

    const rect = range.getBoundingClientRect();
    toolbar.style.left = `${Math.min(window.innerWidth - 250, Math.max(12, rect.left + window.scrollX))}px`;
    toolbar.style.top = `${Math.max(12, rect.top + window.scrollY - 44)}px`;
    toolbar.classList.remove('hidden');
}

function refreshStepAnnotations(lessonId, stepId) {
    const details = document.getElementById(stepId);
    const answerEl = details ? details.querySelector('.lesson-answer') : null;
    if (!answerEl) return;

    answerEl.querySelectorAll('.student-highlight').forEach(mark => {
        mark.replaceWith(document.createTextNode(mark.textContent));
    });
    answerEl.normalize();
    applyAnnotationHighlights(answerEl, getStepAnnotations(lessonId, stepId));
}

function saveCurrentAnnotation(color) {
    if (!activeAnnotationSelection) return;
    addStepAnnotation(activeAnnotationSelection.lessonId, activeAnnotationSelection.stepId, {
        text: activeAnnotationSelection.text,
        color,
        createdAt: Date.now()
    });
    window.getSelection().removeAllRanges();
    hideAnnotationToolbar();
    refreshStepAnnotations(activeAnnotationSelection.lessonId, activeAnnotationSelection.stepId);
}

function markCurrentSelectionForReview() {
    if (!activeAnnotationSelection) return;
    setStepStatus(activeAnnotationSelection.lessonId, activeAnnotationSelection.stepId, 'review');
    updateStepStatusButton(activeAnnotationSelection.lessonId, activeAnnotationSelection.stepId);
    saveCurrentAnnotation('yellow');
}

function clearCurrentStepAnnotations() {
    if (!activeAnnotationSelection) return;
    clearStepAnnotations(activeAnnotationSelection.lessonId, activeAnnotationSelection.stepId);
    window.getSelection().removeAllRanges();
    hideAnnotationToolbar();
    refreshStepAnnotations(activeAnnotationSelection.lessonId, activeAnnotationSelection.stepId);
}

function getSearchMatchReason(lesson, searchQuery) {
    if (!searchQuery) return '';

    const query = searchQuery.toLowerCase();
    if (lesson.title.toLowerCase().includes(query)) return '命中标题';
    if (lesson.difficulty_tag.toLowerCase().includes(query)) return `命中难度：${lesson.difficulty_tag}`;
    if (lesson.stage_tag.toLowerCase().includes(query)) return `命中阶段：${lesson.stage_tag}`;

    const matchedTag = lesson.mindset_tags.find(t => t.toLowerCase().includes(query));
    if (matchedTag) return `命中标签：#${matchedTag}`;

    const matchedStep = lesson.steps.find(step =>
        step.question.toLowerCase().includes(query) ||
        step.answer.toLowerCase().includes(query)
    );
    if (matchedStep) return `命中题目：${matchedStep.question.replace(/<[^>]+>/g, '').slice(0, 18)}...`;

    return '';
}

function cycleStepStatus(event, lessonId, stepId) {
    event.preventDefault();
    event.stopPropagation();

    const currentKey = getStepStatus(lessonId, stepId);
    const currentIndex = STEP_STATUS_STAGES.findIndex(s => s.key === currentKey);
    const nextStage = STEP_STATUS_STAGES[(currentIndex + 1) % STEP_STATUS_STAGES.length];

    setStepStatus(lessonId, stepId, nextStage.key);
    updateStepStatusButton(lessonId, stepId);
}

function updateStepStatusButton(lessonId, stepId) {
    const btn = document.querySelector(`[data-step-status-btn="${lessonId}__${stepId}"]`);
    if (!btn) return;

    const currentKey = getStepStatus(lessonId, stepId);
    const stage = STEP_STATUS_STAGES.find(s => s.key === currentKey) || STEP_STATUS_STAGES[0];
    btn.className = `shrink-0 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${stage.bgClass}`;
    btn.innerHTML = `<span class="font-mono mr-1">${stage.icon}</span>${stage.label}`;
}

function formatLessonAnswer(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    wrapper.querySelectorAll('.thick-content, .hidden').forEach(block => {
        const parts = block.innerHTML
            .split(/(?:<br\s*\/?>\s*){2,}/i)
            .map(part => part.trim())
            .filter(Boolean);

        if (parts.length <= 1) return;

        const paragraphTag = block.tagName === 'SPAN' ? 'span' : 'div';
        block.innerHTML = parts
            .map(part => `<${paragraphTag} class="lesson-paragraph">${part}</${paragraphTag}>`)
            .join('');
    });

    return wrapper.innerHTML;
}

function toggleInlinePPT(triggerElement) {
    const contentElement = triggerElement.nextElementSibling;
    if (contentElement) {
        if (contentElement.classList.contains('hidden')) {
            contentElement.classList.remove('hidden');
            contentElement.classList.add('inline', 'animate-fade-in');
            triggerElement.style.borderBottom = '1px dashed rgba(148, 163, 184, 0.6)';
            if (window.MathJax) {
                MathJax.typesetPromise([contentElement]);
            }
        } else {
            contentElement.classList.remove('inline', 'animate-fade-in');
            contentElement.classList.add('hidden');
            triggerElement.style.borderBottom = '1px dashed rgba(148, 163, 184, 0.25)';
        }
    }
}

function toggleReviewMode() {
    const currentIndex = REVIEW_MODES.findIndex(mode => mode.key === reviewMode);
    reviewMode = REVIEW_MODES[(currentIndex + 1) % REVIEW_MODES.length].key;
    updateReviewModeButton();
    document.querySelectorAll('details').forEach(d => d.open = false);
    switchLesson(activeLessonId, false);
}

function updateReviewModeButton() {
    const btnText = document.getElementById('review-btn-text');
    const dot = document.getElementById('review-status-dot');
    const mode = REVIEW_MODES.find(item => item.key === reviewMode) || REVIEW_MODES[0];
    btnText.innerText = `复习模式：${mode.label}`;
    dot.className = `w-1.5 h-1.5 rounded-full ${mode.dotClass}`;
}

function filterByTag(tagName, tagType = 'mindset') {
    selectedTagFilter = { type: tagType, value: tagName };
    const box = document.getElementById('filter-status-box');
    const text = document.getElementById('filter-status-text');
    const labelMap = {
        difficulty: '难度',
        stage: '阶段',
        mindset: '标签'
    };
    text.innerText = `${labelMap[tagType] || '标签'}: # ${tagName}`;
    box.classList.remove('hidden');
    box.classList.add('flex');
    renderSidebar();
}

function clearTagFilter() {
    selectedTagFilter = null;
    const box = document.getElementById('filter-status-box');
    box.classList.remove('flex');
    box.classList.add('hidden');
    renderSidebar();
}

function renderSidebar() {
    let searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
    const nav = document.getElementById('lesson-list');
    nav.innerHTML = '';

    if (searchQuery.startsWith('#')) {
        searchQuery = searchQuery.substring(1).trim();
    }

    const filtered = ALL_LESSONS.filter(lesson => {
        const matchesTitle = lesson.title.toLowerCase().includes(searchQuery);
        const matchesDifficulty = lesson.difficulty_tag.toLowerCase().includes(searchQuery);
        const matchesStage = lesson.stage_tag.toLowerCase().includes(searchQuery);
        const matchesTags = lesson.mindset_tags.some(t => t.toLowerCase().includes(searchQuery));
        const matchesContent = lesson.steps.some(step =>
            step.question.toLowerCase().includes(searchQuery) ||
            step.answer.toLowerCase().includes(searchQuery)
        );
        const matchesSearch = matchesTitle || matchesDifficulty || matchesStage || matchesTags || matchesContent;
        const matchesTagFilter = !selectedTagFilter ||
            (selectedTagFilter.type === 'difficulty' && lesson.difficulty_tag === selectedTagFilter.value) ||
            (selectedTagFilter.type === 'stage' && lesson.stage_tag === selectedTagFilter.value) ||
            (selectedTagFilter.type === 'mindset' && lesson.mindset_tags.includes(selectedTagFilter.value));
        return matchesSearch && matchesTagFilter;
    });

    if (filtered.length === 0) {
        nav.innerHTML = `<div class="text-center py-8 text-xs text-slate-600">无匹配的教研题目</div>`;
        return;
    }

    filtered.forEach(lesson => {
        const currentStageKey = localStorage.getItem(`status_stage_${lesson.id}`) || 'none';
        const currentStage = STATUS_STAGES.find(s => s.key === currentStageKey) || STATUS_STAGES[0];
        const isActive = lesson.id === activeLessonId;
        const matchReason = getSearchMatchReason(lesson, searchQuery);

        const btn = document.createElement('button');
        btn.className = `w-full text-left px-4 py-3 rounded-xl flex flex-col gap-1 transition-all cursor-pointer text-sm ${
            isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
        }`;
        btn.onclick = () => switchLesson(lesson.id);
        btn.innerHTML = `
            <div class="flex items-start justify-between gap-2">
                <span class="font-bold tracking-tight line-clamp-2">${lesson.title}</span>
                <span class="shrink-0 text-xs mt-0.5">${currentStage.icon}</span>
            </div>
            <span class="text-[10px] opacity-60 font-medium">${lesson.difficulty_tag}</span>
            ${matchReason ? `<span class="text-[10px] opacity-75 text-cyan-300 font-medium">${escapeHtml(matchReason)}</span>` : ''}
        `;
        nav.appendChild(btn);
    });
}

function handleFilterChange() {
    renderSidebar();
}

function switchLesson(id, resetScroll = true) {
    activeLessonId = id;
    const lesson = ALL_LESSONS.find(l => l.id === id);
    if (!lesson) return;

    document.getElementById('lesson-title').innerText = lesson.title;

    const tagContainer = document.getElementById('tag-container');
    tagContainer.innerHTML = `
        <button onclick="filterByTag('${lesson.difficulty_tag}', 'difficulty')" class="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 cursor-pointer transition-colors">${lesson.difficulty_tag}</button>
        <button onclick="filterByTag('${lesson.stage_tag}', 'stage')" class="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 cursor-pointer transition-colors">${lesson.stage_tag}</button>
    `;
    lesson.mindset_tags.forEach(tag => {
        tagContainer.innerHTML += `
            <button onclick="filterByTag('${tag}', 'mindset')" class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-500 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-400 cursor-pointer transition-colors">
                # ${tag}
            </button>`;
    });

    updateStatusButton(id);

    const container = document.getElementById('steps-container');
    container.innerHTML = '';

    const stepsWithIndex = lesson.steps.map((step, index) => ({
        step,
        originalIndex: index,
        stepId: step.id || `${lesson.id}_step_${index}`
    }));
    const visibleSteps = reviewMode === 'review'
        ? stepsWithIndex.filter(item => getStepStatus(id, item.stepId) === 'review')
        : stepsWithIndex;

    if (reviewMode === 'review' && visibleSteps.length === 0) {
        container.innerHTML = `<div class="bg-amber-500/5 border border-amber-500/10 rounded-xl px-5 py-4 text-xs text-amber-300">本课还没有标记为“需回看”的步骤。</div>`;
    }

    visibleSteps.forEach(({ step, stepId }) => {
        const details = document.createElement('details');
        details.id = stepId;
        details.className = "group border border-slate-900 bg-slate-900/10 rounded-xl transition-all duration-300 overflow-hidden";

        // 【PPT级天然隔离】：除了说明页，所有讲义题目默认不铺开展，实现单卡片聚焦体感
        details.open = (id === "lesson_000");

        let stepRenderedAnswer = step.answer;

        // 【复习模式核心切换引擎】
        if (reviewMode === 'thin') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = step.answer;
            const thicks = tempDiv.querySelectorAll('.thick-content');
            thicks.forEach(t => t.remove()); // 闪电般剥离所有硬核字海
            stepRenderedAnswer = tempDiv.innerHTML;
        }

        if (reviewMode === 'test') {
            stepRenderedAnswer = `
                <div class="text-slate-500 text-xs font-bold tracking-wide">自测模式：先独立完成，再切回正常阅读或读薄模式核对。</div>
            `;
        }

        stepRenderedAnswer = formatLessonAnswer(stepRenderedAnswer);

        details.innerHTML = `
            <summary class="flex items-center justify-between px-5 py-4.5 select-none bg-slate-900/30 border-b border-slate-900 cursor-pointer group-open:border-indigo-500/20 transition-colors">
                <div class="flex items-center space-x-3 pr-4 min-w-0">
                    <span class="text-xs text-slate-600 font-mono transition-transform group-open:rotate-90">▶</span>
                    <span class="font-bold text-slate-200 text-sm leading-relaxed">${step.question}</span>
                </div>
                <button data-step-status-btn="${id}__${stepId}" onclick="cycleStepStatus(event, '${id}', '${stepId}')" title="切换这一步的学习状态"></button>
            </summary>
            <div class="lesson-answer px-6 py-5 bg-slate-950/40 text-slate-300 text-sm tracking-wide font-medium border-t border-slate-950">
                ${stepRenderedAnswer}
            </div>
        `;

        applyAnnotationHighlights(
            details.querySelector('.lesson-answer'),
            getStepAnnotations(id, stepId)
        );

        // 监听展开动作，静默捕获当前的步骤ID实现进度坐标保存
        details.addEventListener('toggle', function() {
            if (this.open) {
                saveStepProgress(stepId);
                if (window.MathJax) {
                    MathJax.typesetPromise([this]);
                }
            }
        });

        container.appendChild(details);
        updateStepStatusButton(id, stepId);
    });

    if (window.MathJax) MathJax.typesetPromise([container]);
    if (resetScroll) {
        document.querySelector('main').scrollTop = 0;
    }

    checkHistoryProgress();
    loadComments(id);
}

window.addEventListener('DOMContentLoaded', () => {
    renderAnnotationToolbar();
    document.addEventListener('mouseup', () => setTimeout(handleAnnotationSelection, 0));
    document.addEventListener('touchend', () => setTimeout(handleAnnotationSelection, 80));
    document.addEventListener('mousedown', (event) => {
        if (!event.target.closest('#annotation-toolbar')) {
            hideAnnotationToolbar();
        }
    });
    updateReviewModeButton();
    if (localStorage.getItem('math_auth_passed') === 'true') {
        unlockSite();
    }
    document.getElementById('invite-code-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
});
