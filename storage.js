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

function resumeLastRead() {
    const lastLessonId = localStorage.getItem('last_read_lesson');
    if (lastLessonId) {
        switchLesson(lastLessonId);
        const lastStepId = localStorage.getItem(`last_read_step_${lastLessonId}`);
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

function updateStatusButton(id) {
    const btn = document.getElementById('status-toggle-btn');
    const currentStageKey = localStorage.getItem(`status_stage_${id}`) || 'none';
    const currentStage = STATUS_STAGES.find(s => s.key === currentStageKey) || STATUS_STAGES[0];

    btn.className = `cursor-pointer text-xs font-bold px-4 py-2 rounded-xl border flex items-center space-x-2 transition-all ${currentStage.bgClass}`;
    btn.innerHTML = `<span>${currentStage.label}</span>`;
}

function toggleLessonStatus() {
    const currentStageKey = localStorage.getItem(`status_stage_${activeLessonId}`) || 'none';
    const currentIndex = STATUS_STAGES.findIndex(s => s.key === currentStageKey);

    const nextIndex = (currentIndex + 1) % STATUS_STAGES.length;
    const nextStage = STATUS_STAGES[nextIndex];

    if (nextStage.key === 'none') {
        localStorage.removeItem(`status_stage_${activeLessonId}`);
    } else {
        localStorage.setItem(`status_stage_${activeLessonId}`, nextStage.key);
    }

    updateStatusButton(activeLessonId);
    renderSidebar();
}
