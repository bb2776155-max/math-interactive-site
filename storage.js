function saveStepProgress(stepId) {
    if (activeLessonId === "lesson_000") return; // 学习观不保存进度
    localStorage.setItem(`last_read_lesson`, activeLessonId);
    localStorage.setItem(`last_read_step_${activeLessonId}`, stepId);
    checkHistoryProgress();
}

function checkHistoryProgress() {
    const lastLessonId = localStorage.getItem('last_read_lesson');
    const banner = document.getElementById('history-resume-banner');

    if (lastLessonId && lastLessonId !== activeLessonId) {
        const lesson = ALL_LESSONS.find(l => l.id === lastLessonId);
        if (lesson) {
            document.getElementById('history-lesson-title').innerText = lesson.title;
            banner.classList.remove('hidden');
            banner.classList.add('flex');
            return;
        }
    }
    banner.classList.remove('flex');
    banner.classList.add('hidden');
}

function clearHistoryResume(lessonId = localStorage.getItem('last_read_lesson')) {
    if (lessonId) localStorage.removeItem(`last_read_step_${lessonId}`);
    localStorage.removeItem('last_read_lesson');
    const banner = document.getElementById('history-resume-banner');
    if (banner) {
        banner.classList.remove('flex');
        banner.classList.add('hidden');
    }
}

function dismissHistoryResume() {
    clearHistoryResume();
}

function resumeLastRead() {
    const lastLessonId = localStorage.getItem('last_read_lesson');
    if (lastLessonId) {
        const lastStepId = localStorage.getItem(`last_read_step_${lastLessonId}`);
        switchLesson(lastLessonId);
        clearHistoryResume(lastLessonId);
        if (lastStepId) {
            setTimeout(() => {
                const targetDetails = document.getElementById(lastStepId);
                if (targetDetails) {
                    targetDetails.open = true;
                    targetDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 150);
        }
    }
}

const COLD_REVIEW_DELAY_DAYS = 15;

function getLessonStatusKey(id) {
    return `status_stage_${id}`;
}

function getLessonThinCompletedKey(id) {
    return `status_thin_completed_at_${id}`;
}

function migrateLessonStatus(id) {
    const storageKey = getLessonStatusKey(id);
    const current = localStorage.getItem(storageKey) || 'none';
    if (current === 'understood' || current === 'explainable') {
        localStorage.setItem(storageKey, 'thick_complete');
        return 'thick_complete';
    }
    return current;
}

function getLessonStatus(id) {
    const stored = migrateLessonStatus(id);
    if (stored !== 'thin_complete') return stored;

    const completedAt = Number(localStorage.getItem(getLessonThinCompletedKey(id)) || 0);
    if (!completedAt) {
        localStorage.setItem(getLessonThinCompletedKey(id), String(Date.now()));
        return 'thin_complete';
    }

    const elapsedDays = (Date.now() - completedAt) / 86400000;
    return elapsedDays >= COLD_REVIEW_DELAY_DAYS ? 'cold_review' : 'thin_complete';
}

function getColdReviewDaysRemaining(id) {
    const completedAt = Number(localStorage.getItem(getLessonThinCompletedKey(id)) || 0);
    if (!completedAt) return COLD_REVIEW_DELAY_DAYS;
    return Math.max(0, Math.ceil(COLD_REVIEW_DELAY_DAYS - (Date.now() - completedAt) / 86400000));
}

function updateStatusButton(id) {
    const btn = document.getElementById('status-toggle-btn');
    if (!btn) return;
    const currentStageKey = getLessonStatus(id);
    const currentStage = STATUS_STAGES.find(s => s.key === currentStageKey) || STATUS_STAGES[0];
    const waitingText = currentStageKey === 'thin_complete'
        ? ` · ${getColdReviewDaysRemaining(id)}天后复现`
        : '';

    btn.className = `cursor-pointer text-xs font-bold px-4 py-2 rounded-xl border flex items-center space-x-2 transition-all ${currentStage.bgClass}`;
    btn.innerHTML = `<span>${currentStage.icon}</span><span>${currentStage.label}${waitingText}</span><span class="opacity-50">▾</span>`;
    renderLessonStatusMenu(id);
}

function renderLessonStatusMenu(id) {
    const menu = document.getElementById('lesson-status-menu');
    if (!menu) return;
    const current = getLessonStatus(id);
    const ordinaryStages = STATUS_STAGES.filter(stage => stage.key !== 'cold_review' && stage.key !== 'mastered');
    const actions = ordinaryStages.map(stage => ({
        key: stage.key,
        label: stage.label,
        icon: stage.icon,
        active: current === stage.key
    }));

    if (current === 'cold_review') {
        actions.push(
            { key: 'mastered', label: '冷复现成功，标为熟练', icon: '✓' },
            { key: 'thick_complete', label: '未能独立做出，回到读厚', icon: '↩' }
        );
    } else if (current === 'mastered') {
        actions.push({ key: 'mastered', label: '熟练', icon: '✓', active: true });
    }

    menu.innerHTML = actions.map(action => `
        <button type="button" role="menuitem" onclick="setLessonStatus('${action.key}')" class="lesson-status-option ${action.active ? 'is-active' : ''}">
            <span>${action.icon}</span><span>${action.label}</span>
        </button>
    `).join('');
}

function toggleLessonStatusMenu(event) {
    event?.stopPropagation();
    const menu = document.getElementById('lesson-status-menu');
    const btn = document.getElementById('status-toggle-btn');
    if (!menu || !btn) return;
    const willOpen = menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
}

function closeLessonStatusMenu() {
    document.getElementById('lesson-status-menu')?.classList.add('hidden');
    document.getElementById('status-toggle-btn')?.setAttribute('aria-expanded', 'false');
}

function setLessonStatus(statusKey) {
    const storageKey = getLessonStatusKey(activeLessonId);
    if (statusKey === 'none') {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(getLessonThinCompletedKey(activeLessonId));
    } else {
        localStorage.setItem(storageKey, statusKey);
        if (statusKey === 'thin_complete') {
            localStorage.setItem(getLessonThinCompletedKey(activeLessonId), String(Date.now()));
        } else if (statusKey !== 'cold_review') {
            localStorage.removeItem(getLessonThinCompletedKey(activeLessonId));
        }
    }

    closeLessonStatusMenu();
    updateStatusButton(activeLessonId);
    renderSidebar();
}

document.addEventListener('click', closeLessonStatusMenu);

function getStepStatusKey(lessonId, stepId) {
    return `step_status_${lessonId}_${stepId}`;
}

function getStepStatus(lessonId, stepId) {
    return localStorage.getItem(getStepStatusKey(lessonId, stepId)) || 'none';
}

function setStepStatus(lessonId, stepId, statusKey) {
    const storageKey = getStepStatusKey(lessonId, stepId);
    if (statusKey === 'none') {
        localStorage.removeItem(storageKey);
    } else {
        localStorage.setItem(storageKey, statusKey);
    }
}

function getAnnotationKey(lessonId, stepId) {
    return `annotations_${lessonId}_${stepId}`;
}

function getStepAnnotations(lessonId, stepId) {
    try {
        return JSON.parse(localStorage.getItem(getAnnotationKey(lessonId, stepId)) || '[]');
    } catch {
        return [];
    }
}

function setStepAnnotations(lessonId, stepId, annotations) {
    localStorage.setItem(getAnnotationKey(lessonId, stepId), JSON.stringify(annotations));
}

function addStepAnnotation(lessonId, stepId, annotation) {
    const annotations = getStepAnnotations(lessonId, stepId);
    annotations.push(annotation);
    setStepAnnotations(lessonId, stepId, annotations);
}

function removeStepAnnotation(lessonId, stepId, createdAt) {
    const annotations = getStepAnnotations(lessonId, stepId);
    setStepAnnotations(lessonId, stepId, annotations.filter(annotation => String(annotation.createdAt) !== String(createdAt)));
}

function clearStepAnnotations(lessonId, stepId) {
    localStorage.removeItem(getAnnotationKey(lessonId, stepId));
}
