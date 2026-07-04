let activeLessonId = ALL_LESSONS[0].id;
let selectedTagFilter = null;
let isReviewMode = false;

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
    isReviewMode = !isReviewMode;
    const btnText = document.getElementById('review-btn-text');
    const dot = document.getElementById('review-status-dot');

    if (isReviewMode) {
        btnText.innerText = "复戏模式：开启";
        dot.className = "w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400";
        document.querySelectorAll('details').forEach(d => d.open = false); // 复习模式默认全部合上大题
    } else {
        btnText.innerText = "复习模式：关闭";
        dot.className = "w-1.5 h-1.5 rounded-full bg-slate-600";
    }

    switchLesson(activeLessonId, false); // 重新无感渲染内容
}

function filterByTag(tagName) {
    selectedTagFilter = tagName;
    const box = document.getElementById('filter-status-box');
    const text = document.getElementById('filter-status-text');
    text.innerText = `标签: # ${tagName}`;
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
        const matchesDifficulty = lesson.difficulty_tag.includes(searchQuery);
        const matchesTags = lesson.mindset_tags.some(t => t.toLowerCase().includes(searchQuery));
        const matchesContent = lesson.steps.some(step =>
            step.question.toLowerCase().includes(searchQuery) ||
            step.answer.toLowerCase().includes(searchQuery)
        );
        const matchesSearch = matchesTitle || matchesDifficulty || matchesTags || matchesContent;
        const matchesTagFilter = selectedTagFilter ? lesson.mindset_tags.includes(selectedTagFilter) : true;
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
        <span class="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">${lesson.difficulty_tag}</span>
        <span class="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">${lesson.stage_tag}</span>
    `;
    lesson.mindset_tags.forEach(tag => {
        tagContainer.innerHTML += `
            <button onclick="filterByTag('${tag}')" class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-500 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-400 cursor-pointer transition-colors">
                # ${tag}
            </button>`;
    });

    updateStatusButton(id);

    const container = document.getElementById('steps-container');
    container.innerHTML = '';

    lesson.steps.forEach((step) => {
        const details = document.createElement('details');
        details.id = step.id || '';
        details.className = "group border border-slate-900 bg-slate-900/10 rounded-xl transition-all duration-300 overflow-hidden";

        // 【PPT级天然隔离】：除了说明页，所有讲义题目默认不铺开展，实现单卡片聚焦体感
        details.open = (id === "lesson_000");

        let stepRenderedAnswer = step.answer;

        // 【复习模式核心切换引擎】
        if (isReviewMode) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = step.answer;
            const thicks = tempDiv.querySelectorAll('.thick-content');
            thicks.forEach(t => t.remove()); // 闪电般剥离所有硬核字海
            stepRenderedAnswer = tempDiv.innerHTML;
        }

        details.innerHTML = `
            <summary class="flex items-center justify-between px-5 py-4.5 select-none bg-slate-900/30 border-b border-slate-900 cursor-pointer group-open:border-indigo-500/20 transition-colors">
                <div class="flex items-center space-x-3 pr-4">
                    <span class="text-xs text-slate-600 font-mono transition-transform group-open:rotate-90">▶</span>
                    <span class="font-bold text-slate-200 text-sm leading-relaxed">${step.question}</span>
                </div>
            </summary>
            <div class="px-6 py-5 bg-slate-950/40 text-slate-300 text-sm leading-relaxed tracking-wide font-medium border-t border-slate-950">
                ${stepRenderedAnswer}
            </div>
        `;

        // 监听展开动作，静默捕获当前的步骤ID实现进度坐标保存
        details.addEventListener('toggle', function() {
            if (this.open) {
                if (step.id) saveStepProgress(step.id);
                if (window.MathJax) {
                    MathJax.typesetPromise([this]);
                }
            }
        });

        container.appendChild(details);
    });

    if (window.MathJax) MathJax.typesetPromise([container]);
    if (resetScroll) {
        document.querySelector('main').scrollTop = 0;
    }

    checkHistoryProgress();
    loadComments();
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('math_auth_passed') === 'true') {
        unlockSite();
    }
    document.getElementById('invite-code-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
});
