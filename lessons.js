const STATUS_STAGES = [
    { key: 'none', label: '尚未标记 ⏳', icon: '⏳', bgClass: 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800' },
    { key: 'understood', label: '理解 📖', icon: '📖', bgClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20' },
    { key: 'explainable', label: '可以自己讲出来 🗣️', icon: '🗣️', bgClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' },
    { key: 'mastered', label: '熟练 ⚡', icon: '⚡', bgClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' }
];

const ALL_LESSONS = [
    {
        "id": "lesson_000",
        "title": "什么是先读厚再读薄",
        "difficulty_tag": "知识",
        "stage_tag": "学习观",
        "mindset_tags": ["使用说明"],
        "steps": [
            {
                "question": "什么是先读厚再读薄",
                "answer": `<div class='thick-content no-auto-format'>
<p class='lesson-paragraph'>华罗庚说，先把书读厚，再把书读薄。</p>
<p class='lesson-paragraph'>读厚，就是从学习材料（书本、教辅中的知识讲解、练习题和答案）中读出足够多的收获：知识本身、知识的细节、思路、套路，以及你自己的感想和启发。读薄，就是把其中的基本思路吸收为思维习惯，把基本知识熟练得不需要回想，把基本技巧变成基本功。</p>
<p class='lesson-paragraph'>很多学生没有“读厚”的体会。最常见的读厚，就是把一道不会做的题的答案真正看懂，并且把自己的感想和启发写在题目和答案旁边，仿佛把答案写得更厚一样。你的笔记越丰富、以后重新看到时越能启发自己，你就把这道题读得越厚。</p>
<p class='lesson-paragraph'>如果看完答案只知道每一步是对的，自己写时仍然磕磕绊绊，换个同类型的题也不会，那就还没有读厚，更谈不上读薄。读厚是获得收获，甚至主动创造收获；读薄是把这些收获吸收进去。</p>
<p class='lesson-paragraph'>本站的讲解致力于帮你读厚。我会以思路为导向，尽量完整地讲清楚如何观察、如何尝试、为什么这样做、走不通时怎么换路。文字可能显得很多，但每一句都应该帮助你理解、联想、记忆或者迁移，而不是用字数制造深刻感。</p>
<p class='lesson-paragraph'>一些题的下方还有【读薄】：在前面的讲解已经真正理解之后，把完整思路压缩成以后可以迅速调用的东西。</p>
<p class='lesson-paragraph'>网站会隐藏两类内容：一类是读厚部分中暂时不影响主线的细节，用来减轻第一遍阅读的负担；另一类是我希望你先停下来独立思考的后续讲解。</p>
<p class='lesson-paragraph'>每道题看懂以后，必须脱离答案自己写一遍。重写时不要因为记得答案，就直接跳到那个关键信息；要重新做出“观察”的行为，体会这个关键信息怎样从题目中被抓出来。否则你留下的只是答案的做法，而不是产生这个做法的思维，前面的读厚也就白做了。</p>
</div>`
            }
        ]
    },
    {
        "id": "lesson-how-to-review",
        "title": "复习是最好的学习方式",
        "difficulty_tag": "知识",
        "stage_tag": "学习观",
        "mindset_tags": ["学习方法", "复习"],
        "steps": [
            {
                "question": "如何复习，以及为什么复习是最好、最爽的学习方式",
                "answer": `<div class='thick-content no-auto-format'>
<p class='lesson-paragraph'>大多数学生不懂，复习其实是个核武器。复习不是把以前学过的东西重新看一遍，而是回到已经弄懂的材料上，追求更好的理解：写出更好的笔记，把新产生的感想写在旁边。理解好了，再随手默写一下，会更扎实。注意，是理解好了之后默写，不是背。</p>
<p class='lesson-paragraph'>复习时，你已经不用再担心自己写不出来这个题。题目弄懂之后，只需要把自己的思维发散能力开满，联想能力开满，充分地主动地把它吃干抹净，甚至让这个题产生远超它本来能提供的价值。</p>
<p class='lesson-paragraph'>所以同一道难题，第一遍可以在题干和答案旁边写下笔记、想法；第二遍重新写，加入新的感想，修改原来的感想；第三遍还可以用后来学到的新知识，重新刻画题中的思路。每一遍都不是重复，而是在继续加工它。</p>
<p class='lesson-paragraph'>复推思路也是复习的重要方式。我这个网站上的很多讲解，本身就是复推思路的范例。</p>
<p class='lesson-paragraph'>比如看这个同构题：</p>
<p class='lesson-paragraph'>$$\\log_2 x-k\\cdot 2^{kx}\\geqslant 0.$$</p>
<p class='lesson-paragraph'>答案里两边同乘 $x$，得到：</p>
<p class='lesson-paragraph'>$$x\\log_2 x-kx\\cdot 2^{kx}\\geqslant 0.$$</p>
<p class='lesson-paragraph'>复习时不要只记住“这里要同乘 $x$”。你要问：为什么要同乘 $x$？仔细观察同乘 $x$ 带来了什么变化，就会发现，简单地说，同乘 $x$ 让这个式子变得更“好看”了：原来左边是一个单独的 $\\log_2x$，右边是两个数相乘；同乘 $x$ 后，左边变成 $x\\log_2x$，两边才出现了适合放进同一个函数的结构。</p>
<p class='lesson-paragraph'>然后再进一步想：我应该怎样才能想到这一步？当然是观察这个式子离“变好看”还缺了什么。进行“找不同”或者“找缺点”的观察，就可能在以后重新产生这一步，而不是只记住“这里要同乘 $x$”。这就体现出理解并熟悉这个网站上各种“小逻辑”的重要性。</p>
<p class='lesson-paragraph'>再比如某个三角形的题，答案用了余弦定理，而你没有想到。复习时就问：为什么会用余弦定理？因为这是你的常用工具。你在写不出来的时候，怎么能想不到用常用工具试试呢？为什么不用正弦定理？你都试试，发现正弦定理不太行，就换条路试余弦定理。</p>
<p class='lesson-paragraph'>所以高中题的思路复推，很多时候并不神秘：可能是观察到某个结构；可能只是写不出来时尝试常用工具；可能是从目标出发，倒推出需要什么；也可能是一上来翻译题目条件或者转化题目目标。</p>
<p class='lesson-paragraph'>复推这些思路，是促进思维能力的好办法，也是对基本工具、基本思路的重新理解和使用。</p>
</div>`
            }
        ]
    },
    {
        "id": "lesson-feynman-three-stools",
        "title": "费曼学习法优化版之三个小板凳",
        "difficulty_tag": "知识",
        "stage_tag": "学习观",
        "mindset_tags": ["学习方法", "费曼学习法", "优化"],
        "steps": [
            {
                "question": "费曼学习法优化版之三个小板凳",
                "answer": `<div class='thick-content no-auto-format'>
<p class='lesson-paragraph'>三个小板凳，是关于小爱因斯坦的一个经典故事。</p>
<p class='lesson-paragraph'>老师看到小爱因斯坦交上来的小板凳，觉得它做得很丑。小爱因斯坦却拿出了另外两个更丑的小板凳：老师看到的这个，是他做的第三个。它确实仍然很丑，但是已经比前两个更好了。</p>
<p class='lesson-paragraph'>我把三个小板凳融进费曼学习法。说直接点，就是把同一个题讲三遍，每一遍都尝试比之前讲得更好一点。</p>
<p class='lesson-paragraph'>脑子里的“我好像懂了”是模糊的，你不知道它究竟哪里好、哪里不好，也就无从优化。把这个题真正讲出来，相当于先把脑中的理解做成一个小板凳。于是你能清楚地看到：这里讲不清楚，那里会卡住；这里虽然记得步骤，却说不出为什么。</p>
<p class='lesson-paragraph'>然后讲第二遍。不要原样重复第一遍，而是专门去改善刚才暴露出来的问题。再讲第三遍，再想办法比第二遍更好一点。</p>
<p class='lesson-paragraph'>任务不是第三遍必须讲得多么完美，而是做出自己的三个小板凳，每一个都比之前的更好。</p>
<p class='lesson-paragraph'>优化本来就使人快乐。即使第三个小板凳仍然很丑，但在得到“丑”的评价以前，小爱因斯坦一定非常快乐：他亲眼看到自己做的每一个都比上一个更好。</p>
<p class='lesson-paragraph'>而且他应该自豪。能做出这么丑的小板凳，说明他可能手工天赋很差，也从来没有接触过这种技能；可在这种情况下，他仍然独立地做出了对于自己的突破。</p>
<p class='lesson-paragraph'>你第一次讲一个题也可能讲得很差。没关系，第一遍的小板凳越丑，暴露出来、等待优化的东西就越多。第二遍比第一遍好，第三遍再比第二遍好，你就已经完成了属于自己的突破。</p>
<p class='lesson-paragraph'>这就是人类知识产生的方式：先独立做出一个可能很差的东西，看清它哪里不好，再把它改善一点；新的东西仍然可能不好，那就继续改善。</p>
</div>`
            }
        ]
    },
    {
        "id": "lesson-feynman-thinking-aloud",
        "title": "费曼学习法：自己给自己讲",
        "difficulty_tag": "知识",
        "stage_tag": "学习观",
        "mindset_tags": ["学习方法", "费曼学习法", "出声学习"],
        "steps": [
            {
                "question": "为什么要自己给自己讲",
                "answer": `<div class='thick-content no-auto-format'>
<p class='lesson-paragraph'>费曼学习法不一定需要找一个人听你讲。你完全可以自己给自己讲。</p>
<p class='lesson-paragraph'>最好的理清自己思路的方法之一，就是把它讲出来。你一开口，就必须把脑中模糊的感觉变成一句接一句的话：我现在知道什么？要解决什么？为什么做这一步？接下来往哪里走？</p>
<p class='lesson-paragraph'>这个过程能帮你抓住自己的思路。思路不会散成许多模糊的碎片，而是像一条线一样，被语言牵着一点一点往前走。你会一直知道自己正在想什么，也知道自己这样做是为了什么。</p>
<p class='lesson-paragraph'>出声学习也能确认自己到底懂没懂。脑中觉得“我懂了”，这个感觉可能是假的；真正给自己讲时，如果某个地方突然说不下去，只能含糊地说“反正就是这样”，那就说明理解在这里断了。卡壳正是费曼学习法检查出的结果：回去修复这一处，然后再讲一遍。</p>
<p class='lesson-paragraph'>出声还有一个很重要的作用：保持思维的延续性。很多人看起来在学习，其实思维早就停了，只剩眼睛继续看、手继续写，或者坐在那里等一个思路自己出现。说话的时候，你必须主动地产生下一句话，所以更不容易进入被动思考、神游、发呆和犯困。</p>
<p class='lesson-paragraph'>因此，写题卡住时，不要只是沉默地盯着题目。把现有的信息、已经做过的尝试和目前卡住的地方讲出来。你不一定会立刻得到答案，但至少能确认思维仍然在运行，并看清下一步还能处理什么。</p>
<p class='lesson-paragraph'>看知识和答案时也可以这样做。不要满足于耳朵跟上老师的嘴、眼睛跟上书上的字。停下来，离开材料，自己给自己讲一遍。能顺畅而清楚地讲出来，才说明这些内容开始进入了你的思维；讲不出来，就回去弄清楚再讲。</p>
<p class='lesson-paragraph'>简单地说，自己给自己讲有三个作用：理清思路，确认自己是否真正懂了，让思维连续地向前运行。</p>
</div>`
            }
        ]
    },
    {
        "id": "lesson-functional-equation-01",
        "title": "使用抽象函数",
        "difficulty_tag": "简单",
        "stage_tag": "1阶段",
        "mindset_tags": ["做能做的事情", "尝试", "抽象函数"],
        "steps": [
            {
                "id": "functional_equation_substitution_01",
                "question": `若 $f(x)$ 的定义域为 $\\mathbb{R}$，且 $f(x+y)+f(x-y)=f(x)f(y)$，$f(1)=1$，则 $\\sum_{k=1}^{22}f(k)=$（　　）<br><br>你不用想这个题怎么写，我给你的任务是，你能做什么？只要你能<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>写出几句不是废话的步骤就好。</span><span class='hidden'>题目条件除了 $f(1)=1$，就只有那一个对任意 $x,y$ 都成立的式子。那我们随便代入试试，看看你能不能写出来？</span>`,
                "answer": `<div class='thick-content no-auto-format'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解答</span><div class='hidden'>
<p class='lesson-paragraph'>一种想法是，直接把 $x,y$ 都代成一些简单的特殊值，比如 $x=y=0$、$x=0$、$y=1$、$x=y=1$ 等。</p>
<p class='lesson-paragraph'>不过有同学可能会忘记：我们不必把两个变量都代成具体值。把 $x,y$ 都代成具体值，通常只能得到某几个具体的函数值；如果一直这样做，我们就要一个一个地手算下去。这样其实也可能逐渐发现函数值的重复规律，但是需要算得更多，而且只凭算出的几项说它具有周期性并不严谨。</p>
<p class='lesson-paragraph'>如果我们不想一直手算，而是希望得到关于 $f$ 的一般性信息，那就应该提醒自己：为了保留一般性，当然要留下一个变量，不把它代成具体值。</p>
<p class='lesson-paragraph'>题目已经告诉我们 $f(1)=1$，所以可以只把 $y$ 代成 $1$，而把 $x$ 保留下来：</p>
$$f(x+1)+f(x-1)=f(x)f(1)=f(x).$$
<p class='lesson-paragraph'>这样得到的就不再是某一个具体的函数值，而是一个对任意 $x$ 都成立的递推关系：</p>
$$f(x+1)=f(x)-f(x-1).$$
<p class='lesson-paragraph'>知道前两个值，就能知道第三个值。</p>
<p class='lesson-paragraph'>再代入 $y=0$，得：</p>
$$2f(x)=f(x)f(0).$$
<p class='lesson-paragraph'>这里不能直接把 $f(x)$ 约掉，因为我们还不知道 $f(x)$ 是否为 $0$。但是我们知道 $f(1)=1$，所以在上式中取 $x=1$：</p>
$$2f(1)=f(1)f(0),$$
<p class='lesson-paragraph'>从而 $f(0)=2$。因此，根据递推式和 $f(0),f(1)$ 的值，我们就足以推出 $f$ 的所有整数值：</p>
$$
\\begin{array}{c|cccccccc}
n&0&1&2&3&4&5&6&7\\\\ \\hline
f(n)&2&1&-1&-2&-1&1&2&1
\\end{array}
$$
<p class='lesson-paragraph'>我们发现 $f(6)=f(0)$、$f(7)=f(1)$。前两个值加上这个递推式能够唯一确定后面的所有值，所以 $f(7)$ 后面的函数值与 $f(1)$ 后面的函数值也都会相同。因此，数列 $\\{f(n)\\}$ 的周期是 $6$。</p>
<p class='lesson-paragraph'>一个周期内：</p>
$$f(1)+f(2)+\\cdots+f(6)=1-1-2-1+1+2=0.$$
<p class='lesson-paragraph'>而 $22=3\\times6+4$，所以：</p>
$$
\\sum_{k=1}^{22}f(k)
=3\\times0+f(19)+f(20)+f(21)+f(22)
=1-1-2-1=-3.
$$
</div></div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】代入方式可以按我们的目的分类：
$$
\\left\\{
\\begin{array}{ll}
\\text{两个变量都代入具体值：}&\\text{得到某些具体的函数值；}\\\\[2mm]
\\text{只把一个变量代入具体值：}&\\text{保留另一个变量，得到关于 }f\\text{ 的一般性信息。}
\\end{array}
\\right.
$$
想得到具体值，就可以把两个变量都具体化；不想一直手算、想寻找恒等式或递推关系，就提醒自己保留一个变量。选择代入什么特殊值时，再优先考虑 $0$ 和题目已经给出的 $1$。代入 $y=0$ 也比较爽，因为 $x+y$ 与 $x-y$ 会同时变成 $x$。</div>`
            }
        ]
    },
    {
        "id": "lesson-trig-unknown-endpoints-01",
        "title": "两个端点均未知的三角函数",
        "difficulty_tag": "较难",
        "stage_tag": "1.5阶段",
        "mindset_tags": ["细致分析"],
        "steps": [
            {
                "id": "trig-two-unknown-endpoints-01",
                "question": `若 $f(x)=\\cos\\left(\\omega x+\\frac{\\pi}{5}\\right)$（$\\omega>0$）在区间 $\\left(\\frac{\\pi}{2},\\frac{3\\pi}{2}\\right)$ 上恰有两个零点，则 $\\omega$ 的取值范围是________。`,
                "answer": `<div class='thick-content no-auto-format'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解答</span><div class='hidden'>
<p class='lesson-paragraph'>令</p>
$$t=\\omega x+\\frac{\\pi}{5}.$$
<p class='lesson-paragraph'>因为 $\\omega>0$，当 $x\\in\\left(\\frac{\\pi}{2},\\frac{3\\pi}{2}\\right)$ 时，$t$ 遍历区间：</p>
$$
\\left(\\frac{\\pi}{2}\\omega+\\frac{\\pi}{5},
\\frac{3\\pi}{2}\\omega+\\frac{\\pi}{5}\\right).
$$
<p class='lesson-paragraph'>相当于考虑 $\\cos t$ 在 $t\\in\\left(\\frac{\\pi}{2}\\omega+\\frac{\\pi}{5},\\frac{3\\pi}{2}\\omega+\\frac{\\pi}{5}\\right)$ 上的情形。我们先画一个 $\\cos t$ 的图像：</p>

<div class='flex justify-center my-4 overflow-x-auto'><svg width='700' height='220' viewBox='0 0 700 220' role='img' aria-label='余弦函数从负三派二分之一到三派的图像'><line x1='35' y1='105' x2='665' y2='105' stroke='#94a3b8' stroke-width='1.5'/><line x1='245' y1='22' x2='245' y2='188' stroke='#94a3b8' stroke-width='1.5'/><path d='M35 105 Q70 161 105 161 Q140 161 175 105 Q210 49 245 49 Q280 49 315 105 Q350 161 385 161 Q420 161 455 105 Q490 49 525 49 Q560 49 595 105 Q630 161 665 161' fill='none' stroke='#3b82f6' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><g fill='#0f172a'><circle cx='35' cy='105' r='4'/><circle cx='175' cy='105' r='4'/><circle cx='315' cy='105' r='4'/><circle cx='455' cy='105' r='4'/><circle cx='595' cy='105' r='4'/></g><g fill='#64748b' font-size='13' text-anchor='middle'><text x='35' y='130'>-3π/2</text><text x='105' y='130'>-π</text><text x='175' y='130'>-π/2</text><text x='245' y='130'>0</text><text x='315' y='130'>π/2</text><text x='385' y='130'>π</text><text x='455' y='130'>3π/2</text><text x='525' y='130'>2π</text><text x='595' y='130'>5π/2</text><text x='665' y='130'>3π</text></g><text x='570' y='34' fill='#3b82f6' font-size='14'>y = cos t</text></svg></div>

<p class='lesson-paragraph'>那么恰有两个零点有两种可能。</p>

<div class='flex justify-center my-4 overflow-x-auto'><svg width='700' height='220' viewBox='0 0 700 220' role='img' aria-label='完整余弦图像上的第一种零点排列'><line x1='35' y1='105' x2='665' y2='105' stroke='#94a3b8' stroke-width='1.5'/><line x1='245' y1='22' x2='245' y2='188' stroke='#94a3b8' stroke-width='1.5'/><path d='M35 105 Q70 161 105 161 Q140 161 175 105 Q210 49 245 49 Q280 49 315 105 Q350 161 385 161 Q420 161 455 105 Q490 49 525 49 Q560 49 595 105 Q630 161 665 161' fill='none' stroke='#3b82f6' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><g fill='#111827'><circle cx='315' cy='105' r='6'/><circle cx='455' cy='105' r='6'/></g><g fill='#64748b' font-size='13' text-anchor='middle'><text x='35' y='130'>-3π/2</text><text x='105' y='130'>-π</text><text x='175' y='130'>-π/2</text><text x='245' y='130'>0</text><text x='315' y='130'>π/2</text><text x='385' y='130'>π</text><text x='455' y='130'>3π/2</text><text x='525' y='130'>2π</text><text x='595' y='130'>5π/2</text><text x='665' y='130'>3π</text></g><path d='M175 78 v-17 h140 v17' fill='none' stroke='#f59e0b' stroke-width='2.5' stroke-dasharray='6 4'/><path d='M455 78 v-17 h140 v17' fill='none' stroke='#10b981' stroke-width='2.5' stroke-dasharray='6 4'/><text x='245' y='53' fill='#f59e0b' text-anchor='middle' font-size='12'>左端点范围</text><text x='525' y='53' fill='#10b981' text-anchor='middle' font-size='12'>右端点范围</text><text x='570' y='34' fill='#3b82f6' font-size='14'>y = cos t</text></svg></div>

<p class='lesson-paragraph'>此时的情形等价于：</p>
$$
\\frac{\\pi}{2}+2k\\pi
>\\frac{\\pi}{2}\\omega+\\frac{\\pi}{5}
\\geq-\\frac{\\pi}{2}+2k\\pi,
$$
<p class='lesson-paragraph'>且：</p>
$$
\\frac{5\\pi}{2}+2k\\pi
\\geq\\frac{3\\pi}{2}\\omega+\\frac{\\pi}{5}
>\\frac{3\\pi}{2}+2k\\pi.
$$

<div class='flex justify-center my-4 overflow-x-auto'><svg width='700' height='220' viewBox='0 0 700 220' role='img' aria-label='完整余弦图像上的第二种零点排列'><line x1='35' y1='105' x2='665' y2='105' stroke='#94a3b8' stroke-width='1.5'/><line x1='245' y1='22' x2='245' y2='188' stroke='#94a3b8' stroke-width='1.5'/><path d='M35 105 Q70 161 105 161 Q140 161 175 105 Q210 49 245 49 Q280 49 315 105 Q350 161 385 161 Q420 161 455 105 Q490 49 525 49 Q560 49 595 105 Q630 161 665 161' fill='none' stroke='#3b82f6' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><g fill='#111827'><circle cx='175' cy='105' r='6'/><circle cx='315' cy='105' r='6'/></g><g fill='#64748b' font-size='13' text-anchor='middle'><text x='35' y='130'>-3π/2</text><text x='105' y='130'>-π</text><text x='175' y='130'>-π/2</text><text x='245' y='130'>0</text><text x='315' y='130'>π/2</text><text x='385' y='130'>π</text><text x='455' y='130'>3π/2</text><text x='525' y='130'>2π</text><text x='595' y='130'>5π/2</text><text x='665' y='130'>3π</text></g><path d='M35 78 v-17 h140 v17' fill='none' stroke='#f59e0b' stroke-width='2.5' stroke-dasharray='6 4'/><path d='M315 78 v-17 h140 v17' fill='none' stroke='#10b981' stroke-width='2.5' stroke-dasharray='6 4'/><text x='105' y='53' fill='#f59e0b' text-anchor='middle' font-size='12'>左端点范围</text><text x='385' y='53' fill='#10b981' text-anchor='middle' font-size='12'>右端点范围</text><text x='570' y='34' fill='#3b82f6' font-size='14'>y = cos t</text></svg></div>

<p class='lesson-paragraph'>此时的情形等价于：</p>
$$
\\frac{\\pi}{2}+2k\\pi-\\pi
>\\frac{\\pi}{2}\\omega+\\frac{\\pi}{5}
\\geq-\\frac{\\pi}{2}+2k\\pi-\\pi,
$$
<p class='lesson-paragraph'>且：</p>
$$
\\frac{5\\pi}{2}+2k\\pi-\\pi
\\geq\\frac{3\\pi}{2}\\omega+\\frac{\\pi}{5}
>\\frac{3\\pi}{2}+2k\\pi-\\pi.
$$

<p class='lesson-paragraph'>从图中我们也可以看到，把图一的情形平移 $\\pi$ 个单位就是图二的情形，从而把这两种情形合起来：</p>
<p class='lesson-paragraph'>恰有两个零点等价于：</p>
$$
\\frac{\\pi}{2}+k\\pi
>\\frac{\\pi}{2}\\omega+\\frac{\\pi}{5}
\\geq-\\frac{\\pi}{2}+k\\pi,
$$
<p class='lesson-paragraph'>且：</p>
$$
\\frac{5\\pi}{2}+k\\pi
\\geq\\frac{3\\pi}{2}\\omega+\\frac{\\pi}{5}
>\\frac{3\\pi}{2}+k\\pi.
$$
<p class='lesson-paragraph'>化简得：</p>
$$
\\frac35+2k>\\omega\\geq-\\frac75+2k,
$$
<p class='lesson-paragraph'>且：</p>
$$
\\frac{23}{15}+\\frac23k\\geq\\omega
>\\frac{13}{15}+\\frac23k.
$$

<p class='lesson-paragraph'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>然后呢？</span></p><div class='hidden'><p class='lesson-paragraph'>所以 $\\omega$ 的范围就是这两个区间的交集：</p>
$$
I_k=\\left[-\\frac75+2k,\\frac35+2k\\right),
\\qquad
J_k=\\left(\\frac{13}{15}+\\frac23k,\\frac{23}{15}+\\frac23k\\right].
$$
<p class='lesson-paragraph'>所以接下来我们考虑它俩的交集什么时候非空即可。</p>

<p class='lesson-paragraph'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>例：$(a,b)$ 和 $(c,d)$ 的交集非空等价于什么？</span></p><div class='hidden'><p class='lesson-paragraph'>我们可以用互斥事件来看。一共只有三种情况：</p>
<div class='flex justify-center my-4 overflow-x-auto'><svg width='650' height='245' viewBox='0 0 650 245' role='img' aria-label='两个区间相离或相交'><g font-size='14' fill='#334155'><text x='35' y='42'>1. 完全在右边</text><text x='35' y='112'>2. 完全在左边</text><text x='35' y='182'>3. 有交集</text></g><g stroke-width='7' stroke-linecap='round'><line x1='220' y1='38' x2='350' y2='38' stroke='#3b82f6'/><line x1='420' y1='38' x2='555' y2='38' stroke='#f59e0b'/><line x1='420' y1='108' x2='555' y2='108' stroke='#3b82f6'/><line x1='220' y1='108' x2='350' y2='108' stroke='#f59e0b'/><line x1='245' y1='178' x2='430' y2='178' stroke='#3b82f6'/><line x1='355' y1='190' x2='535' y2='190' stroke='#f59e0b'/></g><g fill='#64748b' font-size='13'><text x='565' y='43'>a ≥ d</text><text x='565' y='113'>b ≤ c</text><text x='545' y='193'>a &lt; d 且 b &gt; c</text></g></svg></div>
<p class='lesson-paragraph'>1. $(a,b)$ 完全在 $(c,d)$ 的右边，即 $a\\geq d$；2. $(a,b)$ 完全在 $(c,d)$ 的左边，即 $b\\leq c$。所以第三种情况即交集非空等价于：</p>
$$a\\lt d\\quad\\text{且}\\quad b\\gt c.$$
<p class='lesson-paragraph'>对于我们考虑的半开半闭区间 $I_k,J_k$ 也是同理。所以交集非空等价于：</p>
$$
-\\frac75+2k\\leq\\frac{23}{15}+\\frac23k,
$$
<p class='lesson-paragraph'>且：</p>
$$
\\frac35+2k>\\frac{13}{15}+\\frac23k.
$$
<p class='lesson-paragraph'>第一个不等号可以取等，因为 $I_k$ 的左端与 $J_k$ 的右端都是闭端点；第二个必须严格大于，因为 $I_k$ 的右端与 $J_k$ 的左端都是开端点。</p>
<p class='lesson-paragraph'>解得：</p>
$$
k\\leq\\frac{11}{5},
\\qquad
k>\\frac15.
$$
<p class='lesson-paragraph'>所以 $k=1$ 或 $2$。</p>

<p class='lesson-paragraph'>当 $k=1$ 时：</p>
$$
I_1=\\left[\\frac35,\\frac{13}{5}\\right),
\\qquad
J_1=\\left(\\frac{23}{15},\\frac{11}{5}\\right],
$$
<p class='lesson-paragraph'>所以：</p>
$$
I_1\\cap J_1=\\left(\\frac{23}{15},\\frac{11}{5}\\right].
$$
<p class='lesson-paragraph'>当 $k=2$ 时：</p>
$$
I_2=\\left[\\frac{13}{5},\\frac{23}{5}\\right),
\\qquad
J_2=\\left(\\frac{11}{5},\\frac{43}{15}\\right],
$$
<p class='lesson-paragraph'>所以：</p>
$$
I_2\\cap J_2=\\left[\\frac{13}{5},\\frac{43}{15}\\right].
$$
<p class='lesson-paragraph'>最终：</p>
$$
\\boxed{\\omega\\in\\left(\\frac{23}{15},\\frac{11}{5}\\right]
\\cup\\left[\\frac{13}{5},\\frac{43}{15}\\right]}.
$$
</div></div></div></div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】本次读薄的任务是，认识到这个题的解法很自然，用的都是基础的想法。</div>`
            },
            {
                "id": "trig-two-unknown-endpoints-exercise-01",
                "question": `（2025·烟台质检）已知函数 $f(x)=\\sin(\\omega x+\\varphi)$（$\\omega>0$，$|\\varphi|\\leq\\frac{\\pi}{2}$），$-\\frac{\\pi}{4}$ 为 $f(x)$ 的零点，且 $f(x)\\leq\\left|f\\left(\\frac{\\pi}{4}\\right)\\right|$ 恒成立。$f(x)$ 在区间 $\\left(-\\frac{\\pi}{12},\\frac{\\pi}{24}\\right)$ 上有最小值无最大值，则 $\\omega$ 的最大值是（　　）<br><br>A. $11$　　B. $13$　　C. $15$　　D. $17$`,
                "answer": "<div class='thick-content'>请独立完成。</div>"
            },
            {
                "id": "trig-two-unknown-endpoints-exercise-02",
                "question": `（2025·天津模拟）已知函数 $f(x)=\\sin\\omega x+\\cos\\omega x$（$\\omega>0$）满足 $f\\left(\\frac{\\pi}{8}\\right)=f\\left(\\frac{5\\pi}{8}\\right)$。<br><br>（1）若 $f(x)$ 在 $\\left(\\frac{\\pi}{8},\\frac{5\\pi}{8}\\right)$ 上恰好有一个最小值和一个最大值，求 $\\omega$；<br><br>（2）若 $f(x)$ 在 $\\left(\\frac{\\pi}{8},\\frac{5\\pi}{8}\\right)$ 上恰好有两个零点，求 $\\omega$ 的取值范围。`,
                "answer": "<div class='thick-content'>请独立完成。</div>"
            }
        ]
    },
    {
        "id": "lesson-quantifier-order-01",
        "title": "量词顺序",
        "difficulty_tag": "较难",
        "stage_tag": "2阶段",
        "mindset_tags": ["细致分析"],
        "steps": [
            {
                "id": "quantifier-order-sup-inf-01",
                "question": `若存在 $a>0$，使得对任意 $x>0$，不等式
$$x\\ln x+2a\\geq ax+b$$
恒成立，求实数 $b$ 的最大值。`,
                "answer": `<div class='thick-content no-auto-format'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解答</span><div class='hidden'>
<p class='lesson-paragraph'>在正式做题之前，我们先把“最大值、最小值”这两个概念想得更清楚一点。</p>

<h3 class='font-semibold text-indigo-300 mt-4 mb-2'>一、为什么需要上确界和下确界</h3>

<p class='lesson-paragraph'>考虑函数：</p>
$$f(x)=\\frac1x.$$
<p class='lesson-paragraph'>如果定义域是 $(1,+\\infty)$，我们能说它的最大值是 $1$、最小值是 $0$ 吗？不能。</p>
<p class='lesson-paragraph'>最大值的定义是：存在定义域内的某个 $x_{\\max}$，使得对于定义域内任意 $x$，都有 $f(x_{\\max})\\geq f(x)$。所以若找不到一个属于定义域的最大值点 $x_{\\max}$，就不能称为最大值。最小值同理。</p>
<p class='lesson-paragraph'>对于 $x\\in(1,+\\infty)$，$1$ 和 $0$ 都取不到，所以 $f$ 没有最大值，也没有最小值；但是它的函数值可以无限接近 $1$ 和 $0$。为了准确描述这种“最紧的界”，我们引入上确界和下确界：</p>
$$
\\sup_{x\\in(1,+\\infty)}\\frac1x=1,
\\qquad
\\inf_{x\\in(1,+\\infty)}\\frac1x=0.
$$
<p class='lesson-paragraph'>如果定义域改成 $[1,+\\infty)$，那么 $1$ 能在 $x=1$ 时取到，所以：</p>
$$
\\max_{x\\in[1,+\\infty)}\\frac1x
=\\sup_{x\\in[1,+\\infty)}\\frac1x
=1.
$$
<p class='lesson-paragraph'>这说明：最大值、最小值一定要求能够取到；上确界、下确界不要求取到。若最大值存在，它就等于上确界；若最小值存在，它就等于下确界。</p>

<p class='lesson-paragraph'>这种术语是有用的。例如：</p>
$$
\\forall x\\in(1,+\\infty),\\quad b\\leq\\frac1x
\\iff
b\\leq\\inf_{x\\in(1,+\\infty)}\\frac1x
=0.
$$
<p class='lesson-paragraph'>这里不能写成“小于等于最小值”，因为最小值根本不存在。即使不用 $\\inf$，我们也可能借助 $x\\to+\\infty$ 时 $1/x\\to0$ 推出结论；但“能把题做出来”和“能否精确地说清我们在取什么”是两回事。</p>

<h3 class='font-semibold text-indigo-300 mt-4 mb-2'>二、原题：$\\exists a>0,\\ \\forall x>0$</h3>

<p class='lesson-paragraph'>原命题是：</p>
$$
\\exists a>0,\\quad \\forall x>0,\\quad x\\ln x+2a\\geq ax+b.
$$
<p class='lesson-paragraph'>这里连续出现了两个量词。遇到这种形式，我们就先考虑后面那个量词。</p>
<p class='lesson-paragraph'>比如“存在 $a>0$，使命题 $P$ 成立”，如果我们经过研究发现 $P\\iff Q$，那么原命题就等价于“存在 $a>0$，使命题 $Q$ 成立”。所以我们可以暂时不管前面的“存在 $a>0$”，先单独研究后面的命题 $P$，把它转化成更简单的命题 $Q$，然后再回来处理前面的量词。</p>
<p class='lesson-paragraph'>在这个题中，把</p>
$$
P:\\quad \\forall x>0,\\quad x\\ln x+2a\\geq ax+b
$$
<p class='lesson-paragraph'>单独拿出来研究。此时 $a$ 暂时不动，把不等式整理为：</p>
$$b\\leq x\\ln x+2a-ax.$$
<p class='lesson-paragraph'>令：</p>
$$f_a(x)=x\\ln x+2a-ax.$$
<p class='lesson-paragraph'>命题 $P$ 要求不等式对任意 $x>0$ 成立，所以：</p>
$$
b\\leq\\inf_{x>0}f_a(x).
$$
<p class='lesson-paragraph'>求导：</p>
$$f_a'(x)=\\ln x+1-a.$$
<p class='lesson-paragraph'>当 $x=\\mathrm e^{a-1}$ 时，$f_a(x)$ 取得最小值：</p>
$$
\\inf_{x>0}f_a(x)
=\\min_{x>0}f_a(x)
=2a-\\mathrm e^{a-1}.
$$
<p class='lesson-paragraph'>记：</p>
$$g(a)=2a-\\mathrm e^{a-1}.$$
<p class='lesson-paragraph'>于是我们已经把后面那个量词处理完了：</p>
$$
P\\iff b\\leq g(a).
$$
<p class='lesson-paragraph'>现在再回去处理前面的“存在 $a>0$”。原命题等价于：</p>
$$
\\exists a>0,\\quad b\\leq g(a).
$$
<p class='lesson-paragraph'>求导：</p>
$$g'(a)=2-\\mathrm e^{a-1}.$$
<p class='lesson-paragraph'>当 $a=1+\\ln2$ 时，$g(a)$ 取得最大值：</p>
$$
\\max_{a>0}g(a)
=g(1+\\ln2)
=2\\ln2.
$$
<p class='lesson-paragraph'>所以：</p>
$$b\\leq2\\ln2,$$
<p class='lesson-paragraph'>实数 $b$ 的最大值为：</p>
$$\\boxed{2\\ln2}.$$

<h3 class='font-semibold text-indigo-300 mt-4 mb-2'>三、为什么“取到”会影响等号</h3>

<p class='lesson-paragraph'>刚才我们使用了：</p>
$$
\\exists a>0,\\quad b\\leq g(a)
\\iff
b\\leq\\max_{a>0}g(a).
$$
<p class='lesson-paragraph'>这是因为 $g$ 的最大值确实能取到。若换成：</p>
$$g(a)=2-a,\\qquad a>0,$$
<p class='lesson-paragraph'>那么 $g$ 没有最大值，只有：</p>
$$\\sup_{a>0}g(a)=2.$$
<p class='lesson-paragraph'>此时：</p>
$$
\\exists a>0,\\quad b\\leq g(a)
\\iff
b\\lt2,
$$
<p class='lesson-paragraph'>而不是 $b\\leq2$。因为当 $b=2$ 时，不存在任何 $a>0$ 使 $2\\leq2-a$ 成立。</p>
<p class='lesson-paragraph'>所以“存在一个点使不等式成立”遇到取不到的上确界时，等号不能保留；而“对所有点不等式都成立”可以允许等于下确界，因为函数的所有值本来就都不小于它的下确界。</p>

<h3 class='font-semibold text-indigo-300 mt-4 mb-2'>四、改变量词顺序</h3>

<p class='lesson-paragraph'>现在保留同一个不等式，依次改变 $a,x$ 前面的量词。重点不是把五道题重新算一遍，而是把刚才的动作练熟：连续出现两个量词，就先考虑后面那个。先把后面那个量词连同不等式看成命题 $P$，把 $P$ 转化成一个不再含这个量词的命题 $Q$；然后回到外面，再处理前一个量词。也就是从后往前，一层一层地处理。</p>

<p class='lesson-paragraph'><strong>变式一：</strong></p>
$$
\\forall a>0,\\quad \\forall x>0,\\quad x\\ln x+2a\\geq ax+b.
$$
<p class='lesson-paragraph'>先考虑后面的 $\\forall x>0$。和原题完全一样，它等价于 $b\\leq g(a)$。处理完这一层后，原命题变成：</p>
$$
\\forall a>0,\\quad b\\leq g(a).
$$
<p class='lesson-paragraph'>再处理外面的 $\\forall a>0$，所以：</p>
$$
b\\leq\\inf_{a>0}g(a)=-\\infty.
$$
<p class='lesson-paragraph'>因此不存在满足条件的实数 $b$。</p>

<p class='lesson-paragraph'><strong>变式二：</strong></p>
$$
\\forall a>0,\\quad \\exists x>0,\\quad x\\ln x+2a\\geq ax+b.
$$
<p class='lesson-paragraph'>先考虑后面的 $\\exists x>0$，也就是只需要存在一个 $x$ 使 $b\\leq f_a(x)$。而：</p>
$$
\\sup_{x>0}f_a(x)=+\\infty.
$$
<p class='lesson-paragraph'>所以不论 $b$ 是什么实数，总能找到足够合适的 $x$。答案为：</p>
$$b\\in\\mathbb R.$$

<p class='lesson-paragraph'><strong>变式三：</strong></p>
$$
\\forall x>0,\\quad \\exists a>0,\\quad x\\ln x+2a\\geq ax+b.
$$
<p class='lesson-paragraph'>这一次后面的量词是 $\\exists a>0$，所以先研究“存在 $a>0$ 使不等式成立”这个命题。把关于 $a$ 的部分写成：</p>
$$
x\\ln x+(2-x)a.
$$
<p class='lesson-paragraph'>当 $0\\lt x\\lt2$ 时，系数 $2-x>0$，令 $a$ 足够大即可，所以对 $b$ 没有限制；当 $x=2$ 时，右边恒为 $2\\ln2$，所以必须有 $b\\leq2\\ln2$；当 $x\\gt2$ 时，关于 $a$ 单调递减，其上确界为 $x\\ln x$，但在 $a>0$ 上取不到，所以需要：</p>
$$b\\lt x\\ln x.$$
<p class='lesson-paragraph'>而对所有 $x\\gt2$，都有 $x\\ln x\\gt2\\ln2$。综合起来：</p>
$$b\\leq2\\ln2.$$

<p class='lesson-paragraph'><strong>变式四：</strong></p>
$$
\\exists x>0,\\quad \\forall a>0,\\quad x\\ln x+2a\\geq ax+b.
$$
<p class='lesson-paragraph'>先考虑后面的 $\\forall a>0$。它要求不等式对任意 $a>0$ 都成立，所以要看：</p>
$$
b\\leq\\inf_{a>0}\\left[x\\ln x+(2-x)a\\right].
$$
<p class='lesson-paragraph'>当 $0\\lt x\\lt2$ 时，下确界为 $x\\ln x$；当 $x=2$ 时，函数值恒为 $2\\ln2$；当 $x\\gt2$ 时，下确界为 $-\\infty$，不可能得到有限的 $b$。</p>
<p class='lesson-paragraph'>所以只需在 $0\\lt x\\leq2$ 中寻找一个 $x$，使：</p>
$$b\\leq x\\ln x.$$
<p class='lesson-paragraph'>而 $x\\ln x$ 在 $(0,2]$ 上的最大值为 $2\\ln2$，且能在 $x=2$ 时取到。因此：</p>
$$b\\leq2\\ln2.$$

<p class='lesson-paragraph'><strong>变式五：</strong></p>
$$
\\exists x>0,\\quad \\exists a>0,\\quad x\\ln x+2a\\geq ax+b.
$$
<p class='lesson-paragraph'>先考虑后面的 $\\exists a>0$。例如取任意 $x\\in(0,2)$，此时 $2-x\\gt0$，让 $a$ 足够大，$x\\ln x+(2-x)a$ 就可以超过任意给定的实数 $b$。于是对于这样的 $x$，后面的命题成立；再处理外面的 $\\exists x>0$，当然也成立。所以：</p>
$$b\\in\\mathbb R.$$

<h3 class='font-semibold text-indigo-300 mt-4 mb-2'>五、量词为什么不能随便交换</h3>

<p class='lesson-paragraph'>两个存在量词可以交换：</p>
$$
\\exists a>0,\\ \\exists x>0,\\ P(a,x)
\\iff
\\exists x>0,\\ \\exists a>0,\\ P(a,x).
$$
<p class='lesson-paragraph'>两个任意量词也可以交换：</p>
$$
\\forall a>0,\\ \\forall x>0,\\ P(a,x)
\\iff
\\forall x>0,\\ \\forall a>0,\\ P(a,x).
$$
<p class='lesson-paragraph'>但是存在量词和任意量词一般不能交换：</p>
$$
\\exists a>0,\\ \\forall x>0,\\ P(a,x)
\\not\\iff
\\forall x>0,\\ \\exists a>0,\\ P(a,x).
$$
<p class='lesson-paragraph'>左边要求找到同一个 $a$，让它对所有 $x$ 都有效；右边则允许每遇到一个新的 $x$，重新选择一个不同的 $a$。这不是文字顺序的小变化，而是两个完全不同的命题。</p>
</div></div>`
            }
        ]
    },
    {
        "id": "lesson-sequence-practice-01",
        "title": "数列练习",
        "difficulty_tag": "简单",
        "stage_tag": "1阶段",
        "mindset_tags": ["数列"],
        "steps": [
            {
                "id": "sequence_sum_recurrence_01",
                "question": `记数列 $\\{a_n\\}$ 的前 $n$ 项和为 $S_n$。若 $a_{n+1}+(-1)^nS_n=2n+1$，则 $a_6=$（　　）<br><br><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>提示</span><span class='hidden'>（基本想法）：一个式子同时出现 $a_n,S_n$，要消掉一个，都是 $a_n$ 或都是 $S_n$ 才能进行处理。</span>`,
                "answer": `<div class='thick-content no-auto-format'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解答</span><div class='hidden'>
<p class='lesson-paragraph'>把题目条件转化为：</p>
$$S_{n+1}-S_n+(-1)^nS_n=2n+1.$$
<p class='lesson-paragraph'>然后看到 $(-1)^n$，当然是分奇偶。</p>
<p class='lesson-paragraph'>我们分奇偶情况的时候，为了方便进行叙述，把 $n$ 为奇数的情况写成 $n=2k-1$，$k=1,2,\\cdots$；把 $n$ 为偶数的情况写为 $n=2k$，$k=1,2,\\cdots$。</p>
<p class='lesson-paragraph'>当 $n=2k-1$ 时：</p>
$$S_{2k}-2S_{2k-1}=4k-1.\\tag{1}$$
<p class='lesson-paragraph'>当 $n=2k$ 时：</p>
$$S_{2k+1}=4k+1.\\tag{2}$$
<p class='lesson-paragraph'>由（2）我们可以知道 $S_3,S_5,\\cdots$，但是不知道 $S_1$。</p>
<p class='lesson-paragraph'>现在看我们的目标是 $a_6$，有了 $S_5$，我们只需要知道 $S_6$。</p>
<p class='lesson-paragraph'>把 $k=2$ 代入（2）式，得：</p>
$$S_5=9.$$
<p class='lesson-paragraph'>把 $k=3$ 代入（1）式，得：</p>
$$S_6-2S_5=11,$$
<p class='lesson-paragraph'>所以 $S_6=29$。最后：</p>
$$a_6=S_6-S_5=29-9=20.$$
</div></div>`
            },
            {
                "id": "sequence_log_recurrence_02",
                "question": `已知数列 $\\{a_n\\}$ 满足 $a_1=1$，$a_2=2$，$a_{n+1}=a_n\\cdot a_{n-1}^2$（$n\\geq2$），记 $b_n=\\log_2(a_na_{n+1})$，$S_n$ 为数列 $\\{b_n\\}$ 的前 $n$ 项和，则 $S_6=$（　　）<br><br><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>提示</span><span class='hidden'>题目中 $b_n$ 的形式提示我们……</span>`,
                "answer": `<div class='thick-content no-auto-format'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解答</span><div class='hidden'>
<p class='lesson-paragraph'>题目中 $b_n=\\log_2(a_na_{n+1})$ 的形式提示我们去考虑 $a_na_{n+1}$。于是，我们可以在 $a_n$ 的递推式中把这个形式造出来：在</p>
$$a_{n+1}=a_na_{n-1}^2$$
<p class='lesson-paragraph'>两边同乘 $a_n$，得：</p>
$$
a_na_{n+1}=a_n^2a_{n-1}^2=(a_{n-1}a_n)^2.
$$
<p class='lesson-paragraph'>两边取以 $2$ 为底的对数：</p>
$$
\\log_2(a_na_{n+1})=2\\log_2(a_{n-1}a_n),
$$
<p class='lesson-paragraph'>也就是：</p>
$$b_n=2b_{n-1}.$$
<p class='lesson-paragraph'>又因为：</p>
$$b_1=\\log_2(a_1a_2)=\\log_2 2=1,$$
<p class='lesson-paragraph'>所以数列 $\\{b_n\\}$ 是首项为 $1$、公比为 $2$ 的等比数列。因此：</p>
$$S_6=1+2+4+8+16+32=63.$$
</div></div>`
            }
        ]
    },
    {
        "id": "lesson-parity-01",
        "title": "函数方程",
        "difficulty_tag": "简单",
        "stage_tag": "1阶段",
        "mindset_tags": ["奇偶性", "联立", "恒成立", "换元求最值"],
        "steps": [
            {
                "id": "parity_exp_01",
                "question": "已知 $f(x)$、$g(x)$ 分别为定义域为 $\\mathbf{R}$ 的偶函数和奇函数，且 $f(x)+g(x)=\\mathrm{e}^x$.<br><br>(1) 求 $f(x)$ 的单调区间；<br><br>(2) 对任意实数 $x$ 均有 $3+g^2(x)-af(x)\\geq 0$ 成立，求实数 $a$ 的取值范围.",
                "answer": `<div class='thick-content no-auto-format'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解答：</span><div class='hidden'>
<p class='lesson-paragraph'>（1）条件有三个：$f$ 是偶函数，$g$ 是奇函数，$f(x)+g(x)=\\mathrm{e}^x$。要让它们之间发生化学反应，也就是把某几个条件用在其他条件上面。</p>
<p class='lesson-paragraph'>那么如何使用“$f$ 是偶函数，$g$ 是奇函数”呢？$f(x)=f(-x)$，$g(x)=-g(-x)$，所以要有 $-x$ 才能用。因为 $f(x)+g(x)=\\mathrm{e}^x$ 对所有的实数 $x$ 都成立，所以直接把 $-x$ 代入：</p>
$$f(-x)+g(-x)=\\mathrm{e}^{-x}=f(x)-g(x)$$
<p class='lesson-paragraph'>然后联立：</p>
$$\\begin{cases}f(x)+g(x)=\\mathrm{e}^x,\\\\ f(x)-g(x)=\\mathrm{e}^{-x}.\\end{cases}$$
<p class='lesson-paragraph'>两式相加可以消掉 $g(x)$，两式相减可以消掉 $f(x)$，解得：</p>
$$f(x)=\\frac{\\mathrm{e}^x+\\mathrm{e}^{-x}}{2},\\qquad g(x)=\\frac{\\mathrm{e}^x-\\mathrm{e}^{-x}}{2}.$$
<p class='lesson-paragraph'>于是：</p>
$$f'(x)=\\frac{\\mathrm{e}^x-\\mathrm{e}^{-x}}{2}.$$
<p class='lesson-paragraph'>当 $x<0$ 时，$\\mathrm{e}^x<\\mathrm{e}^{-x}$，所以 $f'(x)<0$；当 $x>0$ 时，$\\mathrm{e}^x>\\mathrm{e}^{-x}$，所以 $f'(x)>0$。因此 $f(x)$ 的单调递减区间为 $(-\\infty,0]$，单调递增区间为 $[0,+\\infty)$。</p>
<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>（2）</span><div class='hidden'>
<p class='lesson-paragraph'>把 $a$ 单独放到一边转化成最值问题：$3+g^2(x)\\geq af(x)$，由<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>（1）</span><span class='hidden'><span class='text-indigo-400'>养成</span>使用大题第一小问结论的意识，有些大题是层层递进地设计的，后面的小问会用到前几个小问的结论。</span>$f(x)\\geq f(0)=1$，所以$f(x)>0$，所以等价于</p>
$$a\\leq \\frac{3+g^2(x)}{f(x)}.$$
<p class='lesson-paragraph'><span class='text-indigo-400'>（养成）</span>也可以直接均值不等式得$f(x)\\geq 1$。</p>

<p class='lesson-paragraph'>法一：直接代入$f,g$，</p>
$$\\frac{3+g^2(x)}{f(x)}=\\frac{3+\\frac{e^{2x}-2+e^{-2x}}{4}}{\\frac{e^x+e^{-x}}{2}}
\\overset{\\text{去分母}}{=}\\frac{12+e^{2x}-2+e^{-2x}}{2(e^x+e^{-x})}
=\\frac{10+e^{2x}+e^{-2x}}{2(e^x+e^{-x})}.$$

<p class='lesson-paragraph'>观察分子和分母的关系，它其实就是$\\frac{10+a^2(x)+b^2(x)}{2(a(x)+b(x))}$的形式，而$a^2+b^2=(a+b)^2-2ab$，而且$a(x)\\cdot b(x)=e^x\\cdot e^{-x}=1$是常数，所以分子可以转化成和分母更有关系的形式：</p>
$$\\frac{10+e^{2x}+e^{-2x}}{2(e^x+e^{-x})}
=\\frac{10+(e^x+e^{-x})^2-2}{2(e^x+e^{-x})}
=\\frac{(e^x+e^{-x})^2+8}{2(e^x+e^{-x})}.$$

<p class='lesson-paragraph'>所以变成</p>
$$\\frac{e^x+e^{-x}}{2}+\\frac{4}{e^x+e^{-x}}.$$
<p class='lesson-paragraph'>所以$a\\leq \\frac{3+g^2(x)}{f(x)}$恒成立$\\iff a\\leq \\frac{e^x+e^{-x}}{2}+\\frac{4}{e^x+e^{-x}}$恒成立$\\iff a\\leq \\min\\{\\frac{e^x+e^{-x}}{2}+\\frac{4}{e^x+e^{-x}}\\}$。由均值不等式</p>
$$\\frac{e^x+e^{-x}}{2}+\\frac{4}{e^x+e^{-x}}\\geq 2\\sqrt 2,$$
<p class='lesson-paragraph'>验证它是最小值：等号成立当且仅当</p>
$$\\frac{e^x+e^{-x}}{2}=\\frac{4}{e^x+e^{-x}}
\\iff (e^x+e^{-x})^2=8
\\iff e^x+e^{-x}=2\\sqrt 2,$$
<p class='lesson-paragraph'>而$e^x+e^{-x}$的值域是$[2,+\\infty)$，<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>故能取到最小值</span><span class='hidden'>。若是要考虑$e^x+e^{-x}+\\frac{1}{2(e^x+e^{-x})}$的最小值怎么办？<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>继续</span><span class='hidden'>$f(t)=t+\\frac{1}{2t}(t>0)$是对勾函数，在均值不等式取等时取最小值，即$t=\\frac{1}{2t}\\iff t^2=\\frac{1}{2}\\iff t=\\frac{\\sqrt 2}{2}$时。然后我们有$f(t)$在$(0,\\frac{\\sqrt 2}{2}]$上单调递减，$[\\frac{\\sqrt 2}{2},+\\infty)$上单调递增。$e^x+e^{-x}+\\frac{1}{2(e^x+e^{-x})}=f(e^x+e^{-x})$，内层函数的值域是$[2,+\\infty)$，而$2>\\frac{\\sqrt 2}{2}$，$f$在$[2,+\\infty)$上单调递增，所以$e^x+e^{-x}+\\frac{1}{2(e^x+e^{-x})}$的最小值在$e^x+e^{-x}=2$时取得。</span></span></p>

<p class='lesson-paragraph'>（法二）题目的形式$3+g^2(x)-af(x)\\geq 0$可能暗示我们把这个式子变成只含$f$或者只含$g$的形式。直接观察到$e^x+e^{-x}$和$e^x-e^{-x}$的关系，它俩的平方的差是4，从而去计算得$f^2(x)-g^2(x)=1$，代入原式把$g$变成$f$：</p>
$$3+f^2(x)-1-af(x)\\geq 0.$$
<p class='lesson-paragraph'>把$a$移到一边得</p>
$$a\\leq f(x)+\\frac{2}{f(x)},$$
<p class='lesson-paragraph'>然后同法一用均值不等式或对勾函数求最小值。</p>
</div>
</div></div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】要意识到$e^{2x}+e^{-2x}$这种形式的特别之处，它俩的乘积为常数，所以它可以转化成$(e^x+e^{-x})^2-2$。如果是$e^{2x}-e^{-2x}$<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>也可以转化成</span><span class='hidden'>$(e^x-e^{-x})(e^x+e^{-x})$。这种转化更通用，不依赖$e^x\\cdot e^{-x}=1$这个条件，可以写成：$e^{2x}-e^{-2x}=(e^x+e^{-x})\\cdot(e^x-e^{-x})$。</span></div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】这题第一问对题目条件进行使用即可；第二问观察函数特殊形式。法二训练的是更迅速的感觉，法一训练的是假设你看到$\\frac{10+(e^x+e^{-x})^2-2}{2(e^x+e^{-x})}$也要能看出来怎么化简。</div>`
            }
        ]
    },
    {
        "id": "lesson_001",
        "title": "同构",
        "difficulty_tag": "中档",
        "stage_tag": "1.5阶段",
        "mindset_tags": ["同构", "观察法", "对称", "变形", "含参","目标导向法"],
        "steps": [
            {
                "id": "step_1",
                "question": "什么是同构 / 典例：",
                "answer": "<div class='thick-content'>我们想研究 $a \\mathrm{e}^a-b\\ln b$ 的正负，通过变形发现 $a \\mathrm{e}^a-b\\ln b=\\mathrm{e}^a\\ln \\mathrm{e}^a-b\\ln b$（使用了<span class='text-indigo-400'>基本变形</span> $x=\\ln \\mathrm{e}^x=\\mathrm{e}^{\\ln x}$，记住它），所以 $a\\mathrm{e}^a$ 和 $b\\ln b$ 具有相同的结构：它们都是一个数乘以自己的 $\\ln$ 值。更一般地说，它们可以用同一个函数来表示：<br>设 $f(x)=x\\ln x$，则 $a\\mathrm{e}^a=f(\\mathrm{e}^a)$，$b\\ln b=f(b)$。所以如果我们想研究 $a\\mathrm{e}^a-b\\ln b$ 的正负，本来要考虑两个函数（$x\\mathrm{e}^x$ 和 $x\\ln x$），我们发现一个函数可以通过另一个函数来表示（复合函数），从而可以把原式写为 $a\\mathrm{e}^a-b\\ln b=f(\\mathrm{e}^a)-f(b)$。因为 $f$ 单调递增，所以它大于 0 当且仅当 $\\mathrm{e}^a > b$。我们可以把 $a\\mathrm{e}^a-b\\ln b\\geqslant 0$ 等价地写成 $\\mathrm{e}^a a\\geqslant b\\ln b$。这样调整乘积中两个因子的顺序，更能看出这个同构：$\\mathrm{e}^a a=\\mathrm{e}^a\\ln \\mathrm{e}^a$，<span class='text-indigo-400'>$\\mathrm{e}^a$ 对应 $b$，$a$ 对应 $\\ln b$</span>。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>这有很多理解方式</span>：<span class='hidden'>1. $\\mathrm{e}^a$ 不可能对应 $\\ln b$，否则 $a$ 就要对应 $b$。2. $\\mathrm{e}^x \\text{远大于} x \\text{远大于} \\ln x$。如果 $a\\mathrm{e}^a$ 和 $b\\ln b$ 结构相同的话，既然 $b\\ln b$ 是大的乘小的，那么 $a\\mathrm{e}^a$ 也应该写成大的乘小的：$\\mathrm{e}^a a$。</span><br><br>上面的例子也可以把 $b\\ln b$ 写成 $\\mathrm{e}^{\\ln b}\\ln b$。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>怎么想到的</span>：<span class='hidden'>既然 $a\\mathrm{e}^a$ 和 $b\\ln b$ 长得不一样，而我们想把它写成一样的，那么自然要进行变形（转化）。你穷尽 $b\\ln b$ 的所有变形可能即可：$\\ln b^b$ 最自然，但是我们要追求它和 $a\\mathrm{e}^a$ 的同构，那就需要是两个家伙相乘。然后再次使用这个<span class='text-indigo-400'>基本变形</span>： $x=\\ln \\mathrm{e}^x=\\mathrm{e}^{\\ln x}$</span></div>"
            },
            {
                "id": "step_2",
                "question": "不含参同构：",
                "answer": "<div class='thick-content'>同学你需要有两个能力：1. 告诉你要找同构，你要能把它找出来。2. 考试题目不会告诉你要找同构，如何能看出来。我们先训练 1。<br><br>$\\mathrm{e}^{-x} - 2x - \\ln x \\geqslant 0$;<br>从目标出发，我们的目标是把它写成 $f(...)-f(\\text{...})\\geqslant 0$（或者 $f(...)\\geqslant f(\\text{...})$），所以应该是结构相同，至少是长得很对称的两组项。而原式是三个项，所以要拆，显然是拆 $2x$。把它写成 $\\mathrm{e}^{-x}-x-x-\\ln x=(\\mathrm{e}^{-x}-x)-(x+\\ln x)$，然后对照这两项的形式，再把它们写的更像一点，把前边那一项里边改成加法：$\\mathrm{e}^{-x}+(-x)-(x+\\ln x)$。然后应该就能直接看出来。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>若看不出来</span>：<span class='hidden'>你看它既然长得比较好看，你就直接大胆设 $f(x)=x+\\ln x$，然后看 $f(?)=\\mathrm{e}^{-x}+(-x)$</span><br><br>$x^2 \\mathrm{e}^x + \\ln x \\geqslant 0$.<br>观察到哪里不对称？那个 2 不对称，所以除掉一个 $x$，两边同除以 $x$ 得：$x \\mathrm{e}^x+\\frac{\\ln x}{x}$。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>然后呢</span>？<span class='hidden'>一乘一除？注意我们的目标是 $f(...)-f(\\text{...})$，中间应该是减号不是加号，所以补个减号：$x\\mathrm{e}^x-(-\\frac{\\ln x}{x})$，然后使用这个常用变形：$-\\ln x=\\ln \\frac{1}{x}$（记住它），然后大胆设同构函数。</span></div><br><div class='thin-content font-semibold text-indigo-300'>【读薄】同构的构造分两步：1.通过等价变形把它变成比较规范比较对称比较好看的样子。2.设同构函数。</div>"
            },
            {
                "id": "step_3",
                "question": "含参同构的分类：",
                "answer": "<div class='thick-content'>在同构题中，经常会包含参数。<br>对于 $\\mathrm{e}^{ax}\\cdot ax-x\\ln x$，设 $f(x)=x\\ln x$，则原式 $=f(\\mathrm{e}^{ax})-f(x)$。<br>对于 $a\\mathrm{e}^x+x-ax-\\ln x$，设 $f(x)=ax+\\ln x$，则原式 $=f(\\mathrm{e}^x)-f(x)$。<br><br>练习：请你亲手把这两个例子中的同构藏起来造同构题：对于 $\\mathrm{e}^{ax}\\cdot ax-x\\ln x\\geqslant 0$，假设 $a > 0$，两边同除以 $ax$ 不等式不变号，故原式等价转化为 $\\mathrm{e}^{ax}-\\frac{\\ln x}{a}\\geqslant 0$，你能看出自己造的这个同构题怎么写吗？对于 $a\\mathrm{e}^x+x-ax-\\ln x\\geqslant 0$，你自己把它改成 $a\\mathrm{e}^x+(1-a)x\\geqslant \\ln x$，你能让你的同学看出来这个同构吗？</div><br><div class='thin-content font-semibold text-indigo-300'>【读薄】含参同构分为两种战略方向：参数在自变量中，或者参数在同构函数 $f$ 中。</div>"
            },
            {
                "id": "step_4",
                "question": "含参同构的例题：",
                "answer": "<div class='thick-content'>我们的目标是造一个函数 $f(x)$，然后把原式表示成 $f(...)-f(\\text{...})\\geqslant 0$。如果 $k$ 在 $f$ 里，那么应该是 $(\\text{含k的项})-(\\text{含k的项})$；如果 $k$ 在自变量里，那么应该是 $(\\text{含k的项})-(\\text{不含k的项})$（若不理解请回看上面的两个含参同构例题是如何分成两个项的）。所以如何判断某个含参同构题属于哪种情况呢？既然同构分两步：1.变形。2.设同构函数。所以就看第一步变形中，能变出 $(\\text{含k的项})-(\\text{含k的项})$ 还是 $(\\text{含k的项})-(\\text{不含k的项})$。<br><br>$\\log_2 x - k \\cdot 2^{kx} \\geqslant 0$;<br>在这个题中，如果是 $f$ 含 $k$，那就要把一个 $k$ 分给左边的 $\\log_2 x$，比较自然的做法就是同时除以 $k$，然后你发现这样的话，两个项长得并不像，所以更应该尝试 $k$ 在自变量里的情况，把 $k$ 都放到同一边去。在这个题中 $k$ 已经都放到第二项去了。<br>观察 1：若 $k$ 在自变量里，那么 $k$ 和 $kx$ 不会都出现。为什么呢？比如对于 $f(x)=x\\mathrm{e}^x$，输入 $kx$，那么$f(kx)=(kx)\\mathrm{e}^{kx}$，输入 $x$，那么 $f(x)=x\\mathrm{e}^x$，<span class='text-indigo-400'>因此应该看出 $k\\cdot 2^{kx}$ 是很不对称的形式。</span>从而想到两边同乘一个 $x$ 把它的形式变得对称，从而容易看出规律：$x\\log_2 x-kx\\cdot 2^{kx}\\geqslant 0$。此时大胆设 $f(x)=x\\log_2 x$，然后发现 $kx\\cdot 2^{kx}=f(2^{kx})$。<br>观察 2：$k \\cdot 2^{kx}$ 是两个数相乘，而 $\\log_2 x$ 是单个的。<br><br>$\\mathrm{e}^{\\frac{m}{x}} \\cdot \\ln x - m \\geqslant 0$，$m > 0$;<br>尝试 $m$ 在 $f$ 里的情况感觉不太行，尝试 $m$ 在自变量里的情况，所以把 $m$都放在同一个项里：<br>$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{m}\\cdot \\ln x-1\\geqslant 0$。然后要把 $m$ 的部分变对称：$$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}\\cdot \\ln x-x\\geqslant 0$$前边是两个相乘后边是单个，所以再变：$$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}-\\frac{x}{\\ln x}\\begin{cases}\\geqslant 0, &x > 1 \\\\ \\leqslant 0, &0 < x < 1\\end{cases}$$ $x=1$ 时单独讨论。此时形式变得比较好看了，我们大胆设一个合理的同构函数即可。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>提醒</span>：<span class='hidden'>不等式两边同时乘除某个数要注意 $> 0$、$< 0$、$= 0$；等式两边同除要注意不能 $= 0$。</span><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>写法</span>：<span class='hidden'>两边同除某个数，这个数的正或负或 0 需要讨论的话，一个对我个人来说更优雅的写法是不同除它而是把它提出来：$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}\\cdot \\ln x-x=\\ln x \\left[\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}-\\frac{x}{\\ln x}\\right]$。</span><br><br>$a\\ln(x-1) + 2(x-1) \\geqslant ax + 2\\mathrm{e}^x$;<br>直接大胆设 $f(x)=ax+2\\mathrm{e}^x$。</div>"
            },
            {
                "id": "step_5",
                "question": "读薄：",
                "answer": "<div class='thick-content'>以上可总结为，通过同乘同除，通过拆项移项，通过指数对数的常用变形，通过以目标导向，通过观察和尝试，来对原式进行变形，把它变得越来越好看。怎么做到呢？把上面的讲解再看一遍，自己再做一遍。把它们内化进你的思维，直到你觉得它们很自然：你要觉得这里很自然要同乘一个 $x$，这里很自然地可以尝试一下基础的变形……<br><br>练习：$\\mathrm{e}^{2\\lambda x}-\\frac{1}{\\lambda}\\ln \\sqrt x\\geqslant 0$<br><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>提示</span>：<span class='hidden'>$\\mathrm{e}$ 的头上有个 2，$\\sqrt{x}$ 其实也蕴含一个 2：$\\ln\\sqrt x=\\ln x^{\\frac{1}{2}}=\\frac{1}{2}\\ln x$，这样 $2\\lambda$ 就对上了。进一步去对上 $\\mathrm{e}$ 头上的 $2\\lambda x$，所以两边同除 $x$……</span><br><br>练习：$a\\mathrm{e}^{x-1}-\\ln x+\\ln a\\geqslant 1$<br><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解</span>：<span class='hidden'>做个基础变形，$a\\mathrm{e}^{x-1}=\\mathrm{e}^{x-1+\\ln a}$，这样就和左边的另一个 $\\ln a$ 对应上了：$\\mathrm{e}^{x-1+\\ln a}-\\ln x +\\ln a\\geqslant 1$。如果把 $\\ln a$ 放右边，它就变成 $-\\ln a$，和左边的 $+\\ln a$ 的符号差异无法克服，没法对称。所以 $\\ln a$ 留在左边。所以 $a$ 都放在了左边，应该是 $a$ 在自变量里，所以要追求参数在自变量情形的对称性。应该去往 $\\mathrm{e}$ 头上的 $x-1+\\ln a$ 去凑：$\\mathrm{e}^{x-1+\\ln a}+x-1+\\ln a\\geqslant x+\\ln x$</span></div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】就是指你吸收了上边那么多讲解之后，你只需要记得“通过目标导向进行同乘同除与拆项移项”，对于具体的做法进行多次训练，让它成为你的逻辑思维的基本功。</div>"
            },
            {
                "id": "step_2_recognition",
                "question": "考试题目不会告诉你要找同构，如何能看出来？",
                "answer": "<div class='thick-content'>然后我们来看第二个问题：考试题目不会告诉你要找同构，如何能看出来？<br><br>1. 同时出现指数和对数函数就可能涉及同构，遇到这个情况就试一下能不能写成同构的样子（按照上面讲的方法），你会发现我们上面的题全都是这个情况。<br><br>2. 其他情况的例子如下，你能否写出它们的同构函数？<br><br>不等式$$ (x+1)^7-(3-x)^7+4x-4\\leq 0 $$的解集为 $\\underline{\\hspace{3cm}}$。<br><br>不等式$$ \\sqrt{x^2+1}-\\sqrt{3x}\\leq 3x-x^2-1 $$的解集为 $\\underline{\\hspace{3cm}}$。<br><br>已知 $x>0$，不等式$$ x^2+\\frac{1}{3x}+1\\geq 3x+\\frac{1}{x^2+1} $$的解集为 $\\underline{\\hspace{3cm}}$。<br><br>不等式$$ |x^2-2x-1|-|2x-2|\\leq 4x-x^2-1 $$的解集为 $\\underline{\\hspace{3cm}}$。<br><br>不等式$$ \\mathrm{e}^{x^2-2x}-\\mathrm{e}^{2x-1}\\leq -x^2+4x-1 $$的解集为 $\\underline{\\hspace{3cm}}$。<br><br>如何看出这些式子可尝试同构？你会发现这个式子里有两个同构的主项。第一个题中，$(x+1)^7$ 和 $(3-x)^7$ 是同构的主项。如果没有其他项，那么就很简单地直接写成 $(x+1)^7\\leq (3-x)^7$ 就好了。而现在是它有一些小项，那就先把两个主项分别放到两边，写成 $(x+1)^7+4x-4\\leq (3-x)^7$，然后直接尝试 $x+1$ 减 $3-x$ 发现等于 $2x-2$，所以式子可以写成 $(x+1)^7+2\\cdot[(x+1)-(3-x)]\\leq (3-x)^7$，即 $(x+1)^7+2(x+1)\\leq (3-x)^7+2(3-x)$。</div>"
            }
        ]
    },
    {
        "id": "lesson-trig-01",
        "title": "已知条件的信息压榨与角的拆凑",
        "difficulty_tag": "三角函数",
        "stage_tag": "1阶段",
        "mindset_tags": ["把能做的事情先做"],
        "steps": [
            {
                "question": "已知 $\\alpha \\in \\left[\\frac{\\pi}{2}, \\pi\\right]$, $\\beta \\in \\left[0, \\frac{\\pi}{2}\\right]$, 若 $\\sin(\\alpha+\\beta)=\\frac{1}{3}$, $\\cos \\beta=\\frac{\\sqrt{3}}{3}$, 则 $\\cos 2\\alpha = (\\quad)$",
                "answer": "<div class='thick-content'>我们先追求得到尽可能多的信息，题目有 $\\cos \\beta$ 我们自然想知道 $\\sin\\beta$ 是多少。因为 $\\beta \\in \\left[0, \\frac{\\pi}{2}\\right]$，所以 $\\sin\\beta\\geq0$，所以 $\\sin\\beta=+\\sqrt{1-\\cos^2\\beta}=\\frac{\\sqrt 6}{3}$。同样我们<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>看能否知道 $\\cos(\\alpha+\\beta)$ 是多少：</span><span class='hidden'>因为 $\\alpha+\\beta\\in\\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$，所以 $\\cos(\\alpha+\\beta)\\leq 0$，所以 $\\cos(\\alpha+\\beta)=-\\sqrt{1-\\sin^2(\\alpha+\\beta)}=-\\frac{2\\sqrt 2}{3}$。然后我们能做什么？<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>知道两个角的正弦和余弦值能做什么？</span><span class='hidden'>那我们就可以算出这两个角相加，相减的正弦和余弦：$\\sin(\\alpha+\\beta-\\beta)=\\sin(\\alpha+\\beta)\\cos\\beta-\\cos(\\alpha+\\beta)\\sin\\beta=\\frac{5\\sqrt 3}{9}=\\sin\\alpha$，所以$\\cos2\\alpha=1-2\\sin^2\\alpha=-\\frac{23}{27}$</span></span></div>"
            }
        ]
    },
    {
        "id": "lesson-trig-02",
        "title": "找好用条件并尝试基本工具",
        "difficulty_tag": "中档",
        "stage_tag": "1阶段",
        "mindset_tags": [
            "三角函数",
            "变形",
            "找好用条件然后尝试用基本工具"
        ],
        "steps": [
            {
                "id": "trig_condition_tool_01",
                "question": "在$\\triangle ABC$中，$\\sin(B-A)=\\frac{1}{4}$，$2a^2+c^2=2b^2$，则$\\sin C=$(  )",
                "answer": `<div class='thick-content no-auto-format'>
<p class='lesson-paragraph'>看到这个题，可能会觉得无从下手，因为这两个条件离目标 $\\sin C$ 都挺远的。那就不管 $\\sin C$ 这个目标了，像我们反复说的那样，把目标改成：我们能从条件中得到什么。</p>
<p class='lesson-paragraph'>但是这两个条件看起来都不好用？那么，<span class='text-indigo-400'>哪个条件看起来更好用？</span>我想是第二个，因为第一个拆开后正余弦乘在一起，如果再用正余弦定理就变得更复杂；如果不拆开，角 $B-A$ 的正弦有什么几何意义吗？也没有。第二个条件更干净一点。</p>
<p class='lesson-paragraph'>然后我们就直接在它上面尝试基本工具：正弦定理、余弦定理。若尝试正弦定理之后，会发现它没有很好的结果。那就试余弦定理。</p>
<p class='lesson-paragraph'>有三种应用余弦定理的路径：把 $c^2$ 变了：$c^2=a^2+b^2-2ab\\cos C$；把 $a^2$ 变了；把 $b^2$ 变了。真令人纠结啊，<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>把谁变了好呢？</span><span class='hidden'>你直接都试一遍不就行了。请你自己试一下看看能不能<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>得到好的结果。</span><span class='hidden'>如果你把 $c^2$ 变掉，那么：
$$c^2=a^2+b^2-2ab\\cos C$$
代入 $2a^2+c^2=2b^2$ 得：
$$2a^2+a^2+b^2-2ab\\cos C=2b^2$$
化简得：
$$3a^2-b^2-2ab\\cos C=0$$
看上去好像没有头绪，<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>然后怎么办呢？</span><span class='hidden'>然后你就<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>换条路走呀。</span><span class='hidden'>比如把 $b^2$ 换了：
$$b^2=a^2+c^2-2ac\\cos B$$
所以：
$$2a^2+c^2=2(a^2+c^2-2ac\\cos B)$$
然后你发现左边的 $2a^2$ 和右边的 $2a^2$ 消掉了。化简得：
$$c^2=4ac\\cos B$$
再化：
$$c=4a\\cos B$$
这就是得到了一个不错的结果了，我们把它单独写出来。
$$c=4a\\cos B$$
我们要对它怎么做呢？<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>还是用基本变形。</span><span class='hidden'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>余弦定理或者正弦定理。</span><span class='hidden'>当然是用正弦定理，余弦定理又会把它变复杂了。用正弦定理得：
$$\\sin C=4\\sin A\\cos B$$
然后这个式子已经不太能继续化简了，于是我们再去看它能否和另一个还没有用过的条件产生化学反应。
$$\\sin(B-A)=\\frac{1}{4}$$
<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>然后</span><span class='hidden'>你就会发现是不是有地方对应上了？$\\sin(B-A)$ 里边就包含一个 $\\sin A\\cos B$ 呀。然后进一步就会自然得想，刚才把 $b^2$ 换了得到 $\\sin A\\cos B$，那把 $a^2$ 换了是不是也能得到一个好东西？而且得到的东西一定不会还是刚才的 $\\sin A\\cos B$。然后我们把 $a^2$ 用余弦定理换掉：
$$a^2=b^2+c^2-2bc\\cos A$$
代入 $2a^2+c^2=2b^2$：
$$2(b^2+c^2-2bc\\cos A)+c^2=2b^2$$
化简得：
$$3c=4b\\cos A$$
再用正弦定理得到：
$$3\\sin C=4\\sin B\\cos A$$
于是直接把这两个结果用进 $\\sin(B-A)$：
$$3\\sin C-\\sin C=4\\sin B\\cos A-4\\sin A\\cos B$$
即：
$$2\\sin C=4\\sin(B-A)$$
代入 $\\sin(B-A)=\\frac{1}{4}$：
$$2\\sin C=1$$
因此：
$$\\sin C=\\frac{1}{2}$$</span></span></span></span></span></span></span></p>
</div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】看不出题目条件和目标的关系，就只专心考虑能从题目条件中推出什么有价值的信息。确定一个更好用的条件然后对它使用最基础的手段，比如正弦定理、余弦定理。某条路不好用就换路，得到可用结果后再去看另一个不好用的条件是否有了些眉目。</div><div class='thin-content mt-3'><span class='math-inline-trigger font-semibold text-amber-300' onclick='toggleInlinePPT(this)'>【回顾】</span><span class='hidden'><p class='lesson-paragraph'>这题里有一个很重要的变形感觉。首先是在观察法方面，在考虑余弦定理的时候，最好应该做到，看到</p>$$2a^2+c^2=2b^2$$<p class='lesson-paragraph'>时，心里能很快试代一下：如果换 $b^2$，它里面会冒出一个 $a^2$，而前边系数是 2，我去，这不就和左边的 $2a^2$ 消掉了吗？消消乐最爽了。</p><p class='lesson-paragraph'>我们再思考为什么对 $c^2$ 用余弦定理不好。我们本来面对的是 $2a^2+c^2=2b^2$，三个变量三个平方，给人很硬的感觉。把 $c^2$ 换掉以后，式子变成</p>$$3a^2-b^2-2ab\\cos C=0$$<p class='lesson-paragraph'>它依然是几个平方项和余弦项混在一起，结构还是很硬。当你想以 $b^2$ 为考虑的中心去化简时（比如用其他字母表示 $b$），你会发现 $a^2$ 在那里挡着；当你想以 $a^2$ 为考虑的中心去化简时，你会发现 $b^2$ 在那里挡着；防守坚硬、城墙坚固、无从下手。</p><p class='lesson-paragraph'>有了这种印象后，你就会觉得把 $b^2$ 换成含 $a^2$ 的式子后，是把一个稳定的结构拆掉一个角，让它失衡、往另一边倒，然后一下子就越来越好拆，越来越简单。它的复杂度下降了，不好处理的题目就开始松动了。</p><p class='lesson-paragraph'>所以你可以记住“消消乐”这个比喻。刚才解释是在说为什么消消乐会有用，并且希望你能心里有它，在做其他题的时候，也可以去想能不能消掉什么东西。当然，更基本的思维，即我们在这个题中使用的“找个好用条件然后直接用基本工具尝试”，是更重要的。</p><p class='lesson-paragraph'>从具体的题目来说，你也可以注意到，$a$ 和 $b$ 的系数都是 2，这也算是一个出题者设计的暗示。</p></span></div>`
            }
        ]
    },
    {
        "id": "lesson-composite-01",
        "title": "复合函数的单调性",
        "difficulty_tag": "中档",
        "stage_tag": "1.5阶段",
        "mindset_tags": [],
        "steps": [
            {
                "question": "已知函数 $f(x)=x^2-2x-3$，$g(x)=f(5-x^2)$，求 $g(x)$ 的单调区间。",
                "answer": "<div class='thick-content'>记 $u(x)=5-x^2$，则 $g(x)=f(u(x))$。$f(x)$ 在 $(-\\infty,1]$ 上单减，$[1,+\\infty)$ 上单增。$u(x)$ 属于 $f$ 的单减区间等价于 $5-x^2\\in(-\\infty,1]$，解得 $x\\in (-\\infty,-2]\\cup[2,+\\infty)$；$u(x)$ 属于 $f$ 的单增区间等价于 $5-x^2\\in[1,+\\infty)$，解得 $x\\in [-2,2]$。$x\\in(-\\infty,-2]$ 时，$u(x)$ 单增，且 $u(x)$ 处于 $f$ 的单减区间，所以 $f(u(x))$ 单减。$x\\in[-2,0]$ 时，$u(x)$ 单增，且 $u(x)$ 处于 $f$ 的单增区间，所以 $f(u(x))$ 单增。我们可以用下表来表示：<br><br>$$\\begin{array}{|c|c|c|c|c|} \\hline x & (-\\infty, -2] & [-2, 0] & [0, 2] & [2, +\\infty) \\\\ \\hline u(x)=5-x^2 & \\nearrow & \\nearrow & \\searrow & \\searrow \\\\ \\hline u(x)\\text{所属区间} & f\\text{的单减区间} & f\\text{的单增区间} & f\\text{的单增区间} & f\\text{的单减区间} \\\\ \\hline g(x)=f(u(x)) & \\searrow & \\nearrow & \\searrow & \\nearrow \\\\ \\hline \\end{array}$$</div>"
            },
            {
                "question": "函数 $f(x) = \\begin{cases} \\ln(-x-1), & x < -1 \\\\ 2x+1, & x \\ge -1 \\end{cases}$，若函数 $g(x) = f(f(x)) - a$ 有三个不同的零点，则实数 $a$ 的取值范围是 $\\underline{\\qquad\\qquad}$",
                "answer": "<div class='thick-content'>解：这个题本质上是 $y=a$ 与函数 $g(x)=f(f(x))$ 的交点个数问题。凭借过往经验，我们只需要知道 $g$ 的分段情况、单调情况，以及它在每个单调区间上的值域即可。而 $f(f(x))$ 正是一个复合函数，我们已经学会了如何研究复合函数的单调性。由于刚才我们已经成功解决了上一题，请你独立尝试一下把它写出来。<br><br><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>先大概画一下 $f(x)$ 长啥样……</span><span class='hidden'><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>$\\ln(-x-1)$ 怎么画？</span><span class='hidden'>先画 $\\ln x$……<br><br><div class='flex justify-center my-2'><svg width='240' height='170' viewBox='0 0 240 190' class='overflow-visible'><defs><marker id='arrow' viewBox='0 0 10 10' refX='6' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0,2 L8,5 L0,8 z' fill='#94a3b8'/></marker></defs><line x1='20' y1='120' x2='220' y2='120' stroke='#94a3b8' stroke-width='1.5' marker-end='url(#arrow)'/><text x='225' y='124' fill='#94a3b8' class='text-xs'>x</text><line x1='40' y1='150' x2='40' y2='20' stroke='#94a3b8' stroke-width='1.5' marker-end='url(#arrow)'/><text x='36' y='15' fill='#94a3b8' class='text-xs'>y</text><text x='26' y='132' fill='#94a3b8' class='text-xs'>0</text><polyline points='43,181 45,171 47,161 50,153 54,145 60,137 68,129 80,120 96,112 120,103 160,94 200,87' fill='none' stroke='#3b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><text x='130' y='75' fill='#3b82f6' class='text-xs font-semibold'>y=ln x</text><circle cx='80' cy='120' r='2' fill='#fff' stroke='#000'/><text x='76' y='134' fill='#94a3b8' class='text-xs'>1</text></svg></div><br>，那么 $\\ln (-x)$ 的图像就是……<br><br><div class='flex justify-center my-2'><svg width='240' height='170' viewBox='0 0 240 190' class='overflow-visible'><line x1='20' y1='120' x2='220' y2='120' stroke='#94a3b8' stroke-width='1.5' marker-end='url(#arrow)'/><text x='225' y='124' fill='#94a3b8' class='text-xs'>x</text><line x1='180' y1='150' x2='180' y2='20' stroke='#94a3b8' stroke-width='1.5' marker-end='url(#arrow)'/><text x='176' y='15' fill='#94a3b8' class='text-xs'>y</text><text x='185' y='132' fill='#94a3b8' class='text-xs'>0</text><polyline points='177,181 175,171 173,161 170,153 166,145 160,137 152,129 140,120 124,112 100,103 60,94 20,87' fill='none' stroke='#3b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><text x='35' y='75' fill='#3b82f6' class='text-xs font-semibold'>y=ln(-x)</text><circle cx='140' cy='120' r='2' fill='#fff' stroke='#000'/><text x='132' y='134' fill='#94a3b8' class='text-xs'>-1</text></svg></div><br>。那么 $\\ln(-x-1)$ 是 $\\ln(-x)$ 的图像往左移还是往右移？<span>对于一个函数 $g(x)$，遵循左加右减，$g(x+a)$ 是往左移 $a$，$g(x-a)$ 是往右移 $a$。对于 $g(x)=\\ln(-x)$，$\\ln(-x-1)=\\ln(-(x+1))=g(x+1)$，所以是往左移 1。所以判断方法不是依据括号里加一还是减一，比如 $g(x)=\\ln(x^2)$，$\\ln(x^2+1)$ 的括号里加了 1，但是它根本不是 $\\ln(x^2)$ 的平移，因为它没法写成 $g(x+a)$ 的形式。<br><br>所以我们画出 $f(x)$ 的图像……<br><br><div class='flex justify-center my-2'><svg width='240' height='180' viewBox='0 0 240 180' class='overflow-visible'><line x1='10' y1='110' x2='220' y2='110' stroke='#94a3b8' stroke-width='1.5' marker-end='url(#arrow)'/><text x='225' y='114' fill='#94a3b8' class='text-xs'>x</text><line x1='160' y1='170' x2='160' y2='20' stroke='#94a3b8' stroke-width='1.5' marker-end='url(#arrow)'/><text x='156' y='15' fill='#94a3b8' class='text-xs'>y</text><text x='165' y='122' fill='#94a3b8' class='text-xs'>0</text><line x1='110' y1='170' x2='110' y2='20' stroke='#64748b' stroke-width='1' stroke-dasharray='4,4'/><text x='85' y='28' fill='#64748b' class='text-xs'>x=-1</text><polyline points='107,180 105,168 102,156 98,145 90,133 80,123 70,116 60,110 40,102 10,93' fill='none' stroke='#3b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><text x='15' y='80' fill='#3b82f6' class='text-xs font-semibold'>y=ln(-x-1)</text><circle cx='60' cy='110' r='2' fill='#fff' stroke='#000'/><text x='52' y='124' fill='#94a3b8' class='text-xs'>-2</text><text x='112' y='122' fill='#94a3b8' class='text-xs'>-1</text><line x1='110' y1='135' x2='210' y2='35' stroke='#ef4444' stroke-width='2'/><text x='185' y='55' fill='#ef4444' class='text-xs font-semibold'>y=2x+1</text><circle cx='110' cy='135' r='2' fill='#fff' stroke='#000'/><text x='114' y='146' fill='#ef4444' class='text-xs'>(-1,-1)</text><circle cx='160' cy='85' r='2' fill='#fff' stroke='#000'/><text x='166' y='88' fill='#ef4444' class='text-xs'>1</text></svg></div><br>我们和上题一样算出 $f(f(x))$ 的单调性。<br><br>关键是判断内层 $f(x)$ 会落入外层 $f$ 的哪一段。$f(x)$ 属于 $f$ 的单减区间，等价于：<br><br>$$f(x)\\in(-\\infty,-1]$$<br><br>先分段解这个条件。<br><br>当 $x < -1$ 时：<br><br>$$\\ln(-x-1) \\le -1$$<br>$$\\Leftrightarrow \\mathrm{e}^{\\ln(-x-1)} \\le \\mathrm{e}^{-1}$$<br>$$\\Leftrightarrow -x-1 \\le \\mathrm{e}^{-1}$$<br>$$\\Leftrightarrow x \\ge -1-\\frac{1}{\\mathrm{e}}$$<br><br>所以这一段给出：<br><br>$$-1-\\frac{1}{\\mathrm{e}} \\le x < -1$$<br><br>当 $x \\ge -1$ 时：<br><br>$$2x+1 \\le -1$$<br>$$\\Leftrightarrow x \\le -1$$<br><br>结合 $x\\ge -1$，所以：<br><br>$$x=-1$$<br><br>因此，$f(x)$ 属于 $f$ 的单减区间等价于：<br><br>$$x\\in\\left[-1-\\frac{1}{\\mathrm{e}},-1\\right]$$<br><br>相应地，$f(x)$ 属于 $f$ 的单增区间等价于：<br><br>$$x\\in\\left(-\\infty,-1-\\frac{1}{\\mathrm{e}}\\right]\\cup[-1,+\\infty)$$<br><br>由此得到 $f(f(x))$ 的单调性如下表：<br><br>$$\\begin{array}{|c|c|c|c|} \\hline x & (-\\infty, -1-\\frac{1}{\\mathrm{e}}] & [-1-\\frac{1}{\\mathrm{e}}, -1] & [-1, +\\infty) \\\\ \\hline f(x) & \\searrow & \\nearrow & \\nearrow \\\\ \\hline f(x)\\text{所属区间} & f\\text{的单增区间} & f\\text{的单减区间} & f\\text{的单增区间} \\\\ \\hline f(f(x)) & \\searrow & \\searrow & \\nearrow \\\\ \\hline f(x)\\text{的范围} & [-1,+\\infty) & (-\\infty,-1] & [-1,+\\infty) \\\\ \\hline f(f(x))\\text{的值域} & [-1,+\\infty) & [-1,+\\infty) & [-1,+\\infty) \\\\ \\hline \\end{array}$$<br><br>所以 $y=a$ 与 $y=f(f(x))$ 有三个交点的话，$a\\in[-1,+\\infty)$。</span></span></span></div>"
            }
        ]
    },
    {
        "id": "lesson-function-inequality-01",
        "title": "函数不等式解集",
        "difficulty_tag": "中档",
        "stage_tag": "1.5阶段",
        "mindset_tags": ["观察法"],
        "steps": [
            {
                "question": "不等式 $(x-1)^{9999}-2^{9999}x^{9999}\\leq x+1$ 的解集为（\u3000\u3000）",
                "answer": `<div class='thick-content no-auto-format'>
<p class='lesson-paragraph'><strong>法一：因式分解。</strong></p>
<p class='lesson-paragraph'>注意到这是两个奇次幂相减。例如：</p>
$$a^3-b^3=(a-b)(a^2+ab+b^2).$$
<p class='lesson-paragraph'>为避免把很长的式子反复写出来，记</p>
$$a=x-1,\\qquad b=2x,$$
<p class='lesson-paragraph'>并记</p>
$$Q=a^{9998}+a^{9997}b+\\cdots+ab^{9997}+b^{9998}.$$
<p class='lesson-paragraph'>于是</p>
$$a^{9999}-b^{9999}=(a-b)Q.$$
<p class='lesson-paragraph'>而</p>
$$a-b=(x-1)-2x=-(x+1),$$
<p class='lesson-paragraph'>所以原不等式等价于</p>
$$-(x+1)Q\\leq x+1,$$
<p class='lesson-paragraph'>即</p>
$$(x+1)(1+Q)\\geq 0.$$
<p class='lesson-paragraph'>在</p>
$$a^3-b^3=(a-b)(a^2+ab+b^2)$$
<p class='lesson-paragraph'>中，$a^2+ab+b^2$ 恒大于等于 $0$。当 $b\\ne0$ 时，</p>
$$a^2+ab+b^2=b^2\\left[\\left(\\frac ab\\right)^2+\\frac ab+1\\right].$$
<p class='lesson-paragraph'>把 $\\frac ab$ 看成一个整体，括号里是一个二次式，它的判别式</p>
$$\\Delta=1-4=-3<0,$$
<p class='lesson-paragraph'>所以括号里的式子恒大于 $0$。当 $b=0$ 时，$a^2+ab+b^2=a^2\\geq0$。因此除 $a=b=0$ 外，$a^2+ab+b^2$ 恒大于 $0$。那么我们也希望这里的 $Q$ 大于 $0$，<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>如何证明？</span><span class='hidden'>因为函数 $f(t)=t^{9999}$ 在 $\\mathbb R$ 上严格单调递增，所以 $a-b$ 和 $a^{9999}-b^{9999}$ 同号。当 $a\\ne b$ 时，
$$Q=\\frac{a^{9999}-b^{9999}}{a-b}>0.$$
当 $a=b$ 时，$Q=9999a^{9998}$。在本题中，$a=b$ 时 $x=-1$，此时 $a=b=-2$，所以仍有 $Q>0$。</span></p>
<p class='lesson-paragraph'>因此 $1+Q>0$，原不等式等价于</p>
$$x+1\\geq 0.$$
<p class='lesson-paragraph'>所以解集为</p>
$$[-1,+\\infty).$$
<p class='lesson-paragraph'><strong>法二：同构。</strong></p>
<p class='lesson-paragraph'>题目中有两个同构的主项：$(x-1)^{9999}$ 与 $(2x)^{9999}$。先把它们分别放到不等式两边：</p>
$$(x-1)^{9999}\\leq (2x)^{9999}+x+1.$$
<p class='lesson-paragraph'>根据同构专题里的讲解，我们预想把两边写成 $f(x-1)$ 与 $f(2x)$。那么按照题目的设计，剩余项应该能用两个输入的差表示出来，所以直接计算</p>
$$(x-1)-2x=-x-1.$$
<p class='lesson-paragraph'>所以原式等价于</p>
$$(x-1)^{9999}\\leq (2x)^{9999}-[(x-1)-2x],$$
<p class='lesson-paragraph'>即</p>
$$(x-1)^{9999}+(x-1)\\leq (2x)^{9999}+2x.$$
<p class='lesson-paragraph'>令</p>
$$f(t)=t^{9999}+t.$$
<p class='lesson-paragraph'>因为 $f(t)$ 在 $\\mathbb R$ 上严格单调递增，所以</p>
$$f(x-1)\\leq f(2x)\\iff x-1\\leq 2x\\iff x\\geq -1.$$
<p class='lesson-paragraph'>因此原不等式的解集为</p>
$$[-1,+\\infty).$$
</div>`
            }
        ]
    },
];
