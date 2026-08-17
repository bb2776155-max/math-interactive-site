let activeLessonId = ALL_LESSONS[0].id;
let selectedTagFilter = null;
let activeStageModule = null;
let reviewMode = 'full';
let activeAnnotationSelection = null;
let mobileLessonListOpen = false;
let mobileLessonToggleRevealed = false;
let annotationSelectionTimer = null;

function showModuleHome() {
    activeStageModule = null;
    selectedTagFilter = null;
    const mainContent = document.getElementById('main-content');
    mainContent?.classList.add('module-home-active');
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    clearTagFilter();
    toggleMobileLessonList(null, false);
    updateLearningDashboardSummary();
}

function getLessonsByLearningStatus() {
    const groups = {
        initial_read: [],
        thick_complete: [],
        thin_complete: [],
        cold_review: [],
        mastered: [],
        none: []
    };
    ALL_LESSONS.forEach(lesson => {
        const status = getLessonStatus(lesson.id);
        (groups[status] || groups.none).push(lesson);
    });
    return groups;
}

function updateLearningDashboardSummary() {
    const summary = document.getElementById('learning-dashboard-summary');
    if (!summary || typeof getLessonStatus !== 'function') return;
    const groups = getLessonsByLearningStatus();
    summary.innerText = groups.cold_review.length
        ? `${groups.cold_review.length} 篇等待冷复现`
        : `${groups.thick_complete.length + groups.thin_complete.length} 篇正在学习`;
}

function openLearningDashboard() {
    const panel = document.getElementById('learning-dashboard');
    const content = document.getElementById('learning-dashboard-content');
    if (!panel || !content) return;
    const groups = getLessonsByLearningStatus();
    const sections = [
        ['cold_review', '待冷复现', '到期后不看讲解，重新独立完成'],
        ['thick_complete', '读厚中', '继续拆解、复现并吸收小逻辑'],
        ['thin_complete', '巩固中', '已完成读薄，等待冷复现'],
        ['initial_read', '初读完成', '下一步进入巩固读厚'],
        ['mastered', '熟练', '已经通过冷复现']
    ];
    content.innerHTML = sections.map(([key, title, description]) => {
        const lessons = groups[key];
        const items = lessons.length ? lessons.map(lesson => {
            const countdown = key === 'thin_complete' ? `<span>${getColdReviewDaysRemaining(lesson.id)}天后复现</span>` : '';
            return `<button type="button" onclick="openLessonFromDashboard('${lesson.id}')"><strong>${escapeHtml(lesson.title)}</strong>${countdown}</button>`;
        }).join('') : '<p>暂无</p>';
        return `<section class="learning-dashboard-group"><header><div><strong>${title}</strong><span>${description}</span></div><b>${lessons.length}</b></header><div>${items}</div></section>`;
    }).join('');
    panel.classList.remove('hidden');
}

function closeLearningDashboard() {
    document.getElementById('learning-dashboard')?.classList.add('hidden');
}

function openLessonFromDashboard(lessonId) {
    closeLearningDashboard();
    const lesson = ALL_LESSONS.find(item => item.id === lessonId);
    activeStageModule = lesson?.stage_tag || null;
    document.getElementById('main-content')?.classList.remove('module-home-active');
    switchLesson(lessonId);
}

function updateLessonNextAction(lessonId) {
    const box = document.getElementById('lesson-next-action');
    if (!box || typeof getLessonStatus !== 'function') return;
    const status = getLessonStatus(lessonId);
    const guidance = {
        none: ['现在只做一件事', '先独立尝试至少2分钟、最多4分钟；没有有效进展再看讲解。'],
        initial_read: ['下一步：巩固读厚', '重新学习讲解，把其中的小逻辑单独挑出来吸收。一次吃不完就下次继续。'],
        thick_complete: ['当前任务：继续读厚', '不要只看公式。每读完一段，想想它除了完成计算，还在传达什么。可以出声讲，并用“三个小板凳”把同一道题越讲越好。'],
        thin_complete: ['当前状态：巩固中', `已经完成读薄。${getColdReviewDaysRemaining(lessonId)}天后，不看讲解进行冷复现。`],
        cold_review: ['现在进行冷复现', '不要看提示和讲解，重新独立完成。能独立写出且不是复刻残留答案步骤，才标记为熟练。'],
        mastered: ['已经熟练', '这篇 lesson 已通过冷复现。']
    };
    const [title, text] = guidance[status] || guidance.none;
    box.innerHTML = `<strong>${title}</strong><span>${text}</span>`;
    box.classList.remove('hidden');
    box.classList.toggle('is-mastered', status === 'mastered');
}

function openStageModule(stageTag) {
    const lessons = ALL_LESSONS.filter(lesson => lesson.stage_tag === stageTag);
    if (!lessons.length) return;
    activeStageModule = stageTag;
    selectedTagFilter = null;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    const filterBox = document.getElementById('filter-status-box');
    filterBox?.classList.remove('flex');
    filterBox?.classList.add('hidden');
    document.getElementById('main-content')?.classList.remove('module-home-active');
    closeLearningDashboard();
    switchLesson(lessons[0].id);
}

function revealMobileLessonToggle() {
    mobileLessonToggleRevealed = true;
    const toggle = document.getElementById('mobile-lesson-toggle');
    if (toggle) toggle.classList.add('mobile-toggle-revealed');
}

function toggleMobileLessonList(event = null, forceOpen = null) {
    if (event) event.stopPropagation();
    mobileLessonListOpen = forceOpen === null ? !mobileLessonListOpen : forceOpen;
    const sidebar = document.querySelector('.app-sidebar');
    const toggle = document.getElementById('mobile-lesson-toggle');
    if (!sidebar || !toggle) return;
    sidebar.classList.toggle('mobile-list-open', mobileLessonListOpen);
    toggle.setAttribute('aria-expanded', String(mobileLessonListOpen));
    toggle.classList.toggle('mobile-toggle-revealed', mobileLessonListOpen || mobileLessonToggleRevealed);
}

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

function normalizeAnnotationText(value) {
    return (value || '').replace(/\s+/g, ' ').trim();
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
    let fullText = '';
    while (walker.nextNode()) {
        const node = walker.currentNode;
        textNodes.push({ node, start: fullText.length, end: fullText.length + node.nodeValue.length });
        fullText += node.nodeValue;
    }

    const normalizedChars = [];
    const normalizedToOriginal = [];
    let previousWasSpace = false;
    for (let index = 0; index < fullText.length; index += 1) {
        const isSpace = /\s/.test(fullText[index]);
        if (isSpace && previousWasSpace) continue;
        normalizedChars.push(isSpace ? ' ' : fullText[index]);
        normalizedToOriginal.push(index);
        previousWasSpace = isSpace;
    }
    const normalizedFullText = normalizedChars.join('');

    const nodeSegments = new Map();
    annotations.forEach(annotation => {
        const selectedText = normalizeAnnotationText(annotation.text);
        if (!selectedText || selectedText.length < 2) return;

        let matchStart = normalizedFullText.indexOf(selectedText);
        while (matchStart !== -1) {
            const originalStart = normalizedToOriginal[matchStart];
            const originalEnd = normalizedToOriginal[matchStart + selectedText.length - 1] + 1;
            textNodes.forEach(({ node, start, end }) => {
                const segmentStart = Math.max(originalStart, start);
                const segmentEnd = Math.min(originalEnd, end);
                if (segmentStart >= segmentEnd) return;
                if (!nodeSegments.has(node)) nodeSegments.set(node, []);
                nodeSegments.get(node).push({
                    start: segmentStart - start,
                    end: segmentEnd - start,
                    color: annotation.color || 'blue',
                    createdAt: annotation.createdAt
                });
            });
            matchStart = normalizedFullText.indexOf(selectedText, matchStart + selectedText.length);
        }
    });

    nodeSegments.forEach((segments, node) => {
        const accepted = [];
        segments.slice().reverse().forEach(segment => {
            if (!accepted.some(item => segment.start < item.end && segment.end > item.start)) {
                accepted.push(segment);
            }
        });

        accepted.sort((a, b) => b.start - a.start).forEach(segment => {
            if (!node.parentNode) return;
            const after = node.splitText(segment.end);
            const selected = node.splitText(segment.start);
            const mark = document.createElement('span');
            mark.className = `student-highlight student-highlight-${segment.color}`;
            mark.dataset.annotationCreatedAt = segment.createdAt;
            selected.parentNode.insertBefore(mark, selected);
            mark.appendChild(selected);
            void after;
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
        <button data-annotation-action="create" onclick="saveCurrentAnnotation('blue')">蓝笔</button>
        <button data-annotation-action="create" onclick="saveCurrentAnnotation('yellow')">黄笔</button>
        <button data-annotation-action="create" onclick="markCurrentSelectionForReview()">需回看</button>
        <button data-annotation-action="create" onclick="clearCurrentStepAnnotations()">清空本题</button>
        <button data-annotation-action="delete" class="hidden" onclick="deleteCurrentAnnotation()">删除此划线</button>
    `;
    document.body.appendChild(toolbar);
    return toolbar;
}

function setAnnotationToolbarMode(mode) {
    const toolbar = renderAnnotationToolbar();
    toolbar.querySelectorAll('[data-annotation-action="create"]').forEach(button => {
        button.classList.toggle('hidden', mode !== 'create');
    });
    toolbar.querySelector('[data-annotation-action="delete"]')?.classList.toggle('hidden', mode !== 'delete');
}

function positionAnnotationToolbar(rect) {
    const toolbar = renderAnnotationToolbar();
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const scrollX = isMobile ? 0 : window.scrollX;
    const scrollY = isMobile ? 0 : window.scrollY;
    if (isMobile) {
        toolbar.style.left = '50%';
        toolbar.style.top = 'auto';
        toolbar.style.bottom = 'calc(1rem + env(safe-area-inset-bottom))';
        toolbar.style.transform = 'translateX(-50%)';
    } else {
        toolbar.style.left = `${Math.min(window.innerWidth - 250, Math.max(12, rect.left + scrollX))}px`;
        toolbar.style.top = `${Math.max(12, rect.top + scrollY - 52)}px`;
        toolbar.style.bottom = 'auto';
        toolbar.style.transform = 'none';
    }
    toolbar.classList.remove('hidden');
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
    setAnnotationToolbarMode('create');
    positionAnnotationToolbar(rect);
}

function scheduleAnnotationSelection(delay = 120) {
    window.clearTimeout(annotationSelectionTimer);
    annotationSelectionTimer = window.setTimeout(() => {
        if (window.getSelection()?.rangeCount) handleAnnotationSelection();
    }, delay);
}

function openAnnotationDeleteToolbar(mark) {
    const details = mark.closest('details');
    if (!details?.id || !mark.dataset.annotationCreatedAt) return;
    activeAnnotationSelection = {
        lessonId: activeLessonId,
        stepId: details.id,
        createdAt: mark.dataset.annotationCreatedAt
    };
    setAnnotationToolbarMode('delete');
    positionAnnotationToolbar(mark.getBoundingClientRect());
}

function deleteCurrentAnnotation() {
    if (!activeAnnotationSelection?.createdAt) return;
    const { lessonId, stepId, createdAt } = activeAnnotationSelection;
    removeStepAnnotation(lessonId, stepId, createdAt);
    hideAnnotationToolbar();
    activeAnnotationSelection = null;
    refreshStepAnnotations(lessonId, stepId);
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

    wrapper.querySelectorAll('.thick-content:not(.no-auto-format)').forEach(block => {
        if (block.querySelector('.hidden')) return;

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

    wrapper.querySelectorAll('.thin-content').forEach(block => {
        const marker = '【读薄】';
        const html = block.innerHTML.trim();
        if (!html.startsWith(marker)) return;

        const rest = html.slice(marker.length).trim();
        block.innerHTML = `<span class="math-inline-trigger" onclick="toggleInlinePPT(this)">${marker}</span><span class="hidden">${rest}</span>`;
    });

    return wrapper.innerHTML;
}

function toggleInlinePPT(triggerElement) {
    const contentElement = triggerElement.nextElementSibling?.matches('.hidden, [data-reveal-open="true"]')
        ? triggerElement.nextElementSibling
        : triggerElement.parentElement?.nextElementSibling?.matches('.hidden, [data-reveal-open="true"]')
            ? triggerElement.parentElement.nextElementSibling
            : null;

    if (contentElement) {
        if (contentElement.classList.contains('hidden')) {
            contentElement.classList.remove('hidden');
            contentElement.dataset.revealOpen = 'true';
            contentElement.classList.add(contentElement.tagName === 'SPAN' ? 'inline' : 'block', 'animate-fade-in');
            triggerElement.style.borderBottom = '1px dashed rgba(148, 163, 184, 0.6)';
            if (window.MathJax) {
                MathJax.typesetPromise([contentElement]);
            }
        } else {
            contentElement.classList.remove('inline', 'block', 'animate-fade-in');
            delete contentElement.dataset.revealOpen;
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
        const matchesModule = !activeStageModule || lesson.stage_tag === activeStageModule;
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
        return matchesModule && matchesSearch && matchesTagFilter;
    });

    if (filtered.length === 0) {
        nav.innerHTML = `<div class="text-center py-8 text-xs text-slate-600">无匹配的教研题目</div>`;
        return;
    }

    filtered.forEach(lesson => {
        const currentStageKey = getLessonStatus(lesson.id);
        const currentStage = STATUS_STAGES.find(s => s.key === currentStageKey) || STATUS_STAGES[0];
        const isActive = lesson.id === activeLessonId;
        const matchReason = getSearchMatchReason(lesson, searchQuery);

        const btn = document.createElement('button');
        if (isActive) btn.setAttribute('aria-current', 'page');
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
    const previousLessonId = activeLessonId;
    const reachedSavedLesson = previousLessonId !== id && localStorage.getItem('last_read_lesson') === id;
    activeLessonId = id;
    const lesson = ALL_LESSONS.find(l => l.id === id);
    if (!lesson) return;

    if (reachedSavedLesson) clearHistoryResume(id);
    renderSidebar();

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
    updateLessonNextAction(id);

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

    if (window.matchMedia('(max-width: 767px)').matches) {
        mobileLessonToggleRevealed = false;
        toggleMobileLessonList(null, false);
        const toggle = document.getElementById('mobile-lesson-toggle');
        if (toggle) toggle.classList.remove('mobile-toggle-revealed');
    }

    checkHistoryProgress();
    loadComments(id);
    if (typeof loadPrivateNotes === 'function') loadPrivateNotes(id);
}

window.addEventListener('DOMContentLoaded', () => {
    toggleMobileLessonList(null, false);
    renderAnnotationToolbar();
    document.addEventListener('mouseup', () => scheduleAnnotationSelection(40));
    document.addEventListener('selectionchange', () => scheduleAnnotationSelection(180));
    document.addEventListener('touchend', (event) => {
        if (event.target.closest('.student-highlight')) return;
        // Android browsers create/update the native text selection after touchend.
        // Wait for that selection, then place our toolbar without disabling copy.
        scheduleAnnotationSelection(260);
    });
    document.addEventListener('click', (event) => {
        const mark = event.target.closest('.student-highlight');
        if (!mark) return;
        event.stopPropagation();
        openAnnotationDeleteToolbar(mark);
    });
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
