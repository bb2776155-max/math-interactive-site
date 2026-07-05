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
                "answer": "<div class='thick-content'>读厚的意思是你要从你的学习材料（书本/教辅中的知识讲解，练习题，答案）中读出足够多的收获（包括知识本身，知识的细节，思路，套路）；读薄的意思是自动化归纳。这有很多理解方式：<br><br>同学你需要有两个能力：1. 告诉你要找同构，你要能把它找出来。2. 考试题目不会告诉你要找同构，如何能看出来。我们先训练 1。<br><br>读厚的意思是你要从你的学习材料（书本/教辅中的知识讲解，练习题，答案）中读出足够多的收获（公共知识本身，知识的细节，思路，套路）；让学生自己去总结套路，而不是比较理想的那种先给思路最后给几个套路方法。我决定只有在有必要的时候我才自己把我写的讲解进行总结。<br><br>同学你需要有两个能力：1. 告诉你要找同构，你要能把它找出来。2. 考试题目不会告诉你要找同构，如何能看出来。我们先训练 1。<br><br>读厚的意思是你要从你的学习材料（书本/教辅中的知识讲解，练习题，答案）中读出足够多的收获（包括知识本身，知识的细节，思路，套路）；让学生自己去总结套路，而不是比较理想的那种先给思路最后给几个套路方法。我决定只有在有必要的时候我才自己把我写的讲解进行总结。<br><br>读厚的意思是你要从你的学习材料（书本/教辅中的知识讲解，练习题，答案）中读出足够多的收获（包括知识本身，知识的细节，思路，套路）；</div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】意思是把它们内化。</div><br><div class='thick-content'>很多学生是没有“读厚”的体会的。最常见的读厚的做法是，把一个不会做的题的答案看懂。你看得有多懂，你就读得多厚。你若是看完答案没看懂，那么没有读厚，那就更没有读薄，那也就没什么收获；你若是只能看懂答案写的对，自己写还是觉得磕磕绊绊或者换个同类型的题就没法举一反三，那也没有读厚，也就没有读薄。读厚是获得收获，读薄是吸收收获。<br><br>本站的讲解致力于帮你读厚。我会以思路为导向给你彻底讲清楚如何思考、如何做题。为了把这些思路讲清楚，我的语言可能会啰嗦而清晰，可能会显得字很多，这是为了把信息尽量完整地、无损地传达给你。我会尽全力保证我虽然讲的硬核还字多，但是清晰易懂。学完一个题之后，把它标记为“理解”；一个星期后要再读一遍，把它标记为“可以自己讲出来”；一个星期后要再读一遍，把它标记为“熟练”。<br><br>在每个题下边，我会再帮你把它读薄。在“读厚”的基础之上，你会把这些“读薄”理解得特别清楚。<br><br>“读厚”部分的讲解会包含一些非主线的内容，为了讲的足够清楚我把它们也写进去。为了不让你的阅读量变太大，减轻视觉负担，我把它们隐藏起来，建议看完主线部分之后，再把那些内容展开。<br><br>每道题你看懂之后，必须自己写一遍。并且要按照我的思维步骤来。比如说一个题是从观察出发，然后发现某个关键信息，然后得到解答。你不能重做这个题的时候直接发现这个关键信息。即使你并没有忘记那个关键信息，你也要重新走一遍“观察”的行为，然后体会这个这个关键信息是如何被观察出来的。这是在杜绝你看完答案后只记得答案的做法。那样的话，“读厚”就白做了。</div>"
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
                "answer": "<div class='thick-content'>我们想研究 $a \\mathrm{e}^a-b\\ln b$ 的正负，通过变形发现 $a \\mathrm{e}^a-b\\ln b=\\mathrm{e}^a\\ln \\mathrm{e}^a-b\\ln b$（使用了<span class='text-indigo-400'>基本变形</span> $x=\\ln \\mathrm{e}^x=\\mathrm{e}^{\\ln x}$，记住它），所以 $a\\mathrm{e}^a$ 和 $b\\ln b$ 具有相同的结构：它们都是一个数乘以自己的 $\\ln$值。更一般地说，它们是可以用同一个函数来表示：<br>设 $f(x)=x\\ln x$，则 $a\\mathrm{e}^a=f(\\mathrm{e}^a)$，$b\\ln b=f(b)$。所以如果我们想研究 $a\\mathrm{e}^a-b\\ln b$ 的正负，本来要考虑两个函数（$x\\mathrm{e}^x$ 和 $x\\ln x$），我们发现一个函数可以通过另一个函数来表示（复合函数），从而可以把原式写为 $a\\mathrm{e}^a-b\\ln b=f(\\mathrm{e}^a)-f(b)$。因为 $f$ 单调递增，所以它大于 0 当且仅当 $\\mathrm{e}^a > b$。注意：我们可以把 $a\\mathrm{e}^a-b\\ln b\\geqslant 0$ 等价地写成 $\\mathrm{e}^a a\\geqslant b\\ln b$ 而非 $a\\mathrm{e}^a\\geqslant b\\ln b$规则，这样更能看出这个同构：$\\mathrm{e}^a a=\\mathrm{e}^a\\ln \\mathrm{e}^a$，<span class='text-indigo-400'>$\\mathrm{e}^a$ 对应 $b$，$a$ 对应 $\\ln b$</span>。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>这有很多理解方式</span>：<span class='hidden'>1. $\\mathrm{e}^a$ 不可能对应 $\\ln b$，否则 $a$ 就要对应 $b$。2. $\\mathrm{e}^x \\text{远大于} x \\text{远大于} \\ln x$。如果 $a\\mathrm{e}^a$ 和 $b\\ln b$ 结构相同的话，既然 $b\\ln b$ 是大的乘小的，那么 $a\\mathrm{e}^a$ 也应该写成大的乘小的：$\\mathrm{e}^a a。</span><br><br>上面的例子也可以把 $b\\ln b$ 写成 $\\mathrm{e}^{\\ln b}\\ln b$。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>怎么想到的</span>：<span class='hidden'>既然 $a\\mathrm{e}^a$ 和 $b\\ln b$ 长得不一样，而我们想把它写成一样的，那么自然要进行变形（转化）。你穷尽 $b\\ln b$ 的所有变形可能即可：$\\ln b^b$ 最自然，但是我们要追求它和 $a\\mathrm{e}^a$ 的同构，那就需要是两个家伙相乘。环境然后再次使用这个<span class='text-indigo-400'>基本变形</span>：$x=\\ln \\mathrm{e}^x=\\mathrm{e}^{\\ln x}$</span></div>"
            },
            {
                "id": "step_2",
                "question": "不含参同构：",
                "answer": "<div class='thick-content'>同学你需要有两个能力：1. 告诉你要找同构，你要能把它找出来。2. 考试题目不会告诉你要找同构，如何能看出来。我们先训练 1。<br><br>$\\mathrm{e}^{-x} - 2x - \\ln x \\geqslant 0$;<br>从目标出发，我们的目标是把它写成 $f(...)-f(\\text{...})\\geqslant 0$（或者 $f(...)\\geqslant f(\\text{...})$），所以应该是结构相同，至少是长得很对称的两组项。而原式是三个项，所以要拆，显然是拆 $2x$。把它写成 $\\mathrm{e}^{-x}-x-x-\\ln x=(\\mathrm{e}^{-x}-x)-(x+\\ln x)$，然后对照这两项的形式，再把它们写的更像一点，把前边那一项里边改成加法：$\\mathrm{e}^{-x}+(-x)-(x+\\ln x)$。原稿然后应该就能直接看出来。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>若看不出来</span>：<span class='hidden'>你看它既然长得比较好看，你就直接大胆设 $f(x)=x+\\ln x$，然后看 $f(?)=\\mathrm{e}^{-x}+(-x)$</span><br><br>$x^2 \\mathrm{e}^x + \\ln x \\geqslant 0$.<br>观察到哪里不对称？那个 2 不对称，所以除掉一个 $x$，两边同除以 $x$ 得：$x \\mathrm{e}^x+\\frac{\\ln x}{x}$。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>然后呢</span>？<span class='hidden'>一乘一除？注意我们的目标是 $f(...)-f(\\text{...})$，中间应该是减号不是加号，所以补个减号：$x\\mathrm{e}^x-(-\\frac{\\ln x}{x})$，环境然后使用这个常用变形：$-\\ln x=\\ln \\frac{1}{x}$（记住它），然后大胆设同构函数。</span></div><br><div class='thin-content font-semibold text-indigo-300'>【读薄】同构的构造分两步：1.通过等价变形把它变成比较规范比较对称比较好看的样子。2.设同构函数。</div>"
            },
            {
                "id": "step_3",
                "question": "含参同构的分类：",
                "answer": "<div class='thick-content'>在同构题中，经常会包含参数。<br>对象对于 $\\mathrm{e}^{ax}\\cdot ax-x\\ln x$，设 $f(x)=x\\ln x$，则原式 $=f(\\mathrm{e}^{ax})-f(x)$。<br>对象对于 $a\\mathrm{e}^x+x-ax-\\ln x$，设 $f(x)=ax+\\ln x$，则原式 $=f(\\mathrm{e}^x)-f(x)$。<br><br>练习：请你亲手把这两个例子中的同构藏起来造同构题：对于 $\\mathrm{e}^{ax}\\cdot ax-x\\ln x\\geqslant 0$，假设 $a > 0$，两边同除以 $ax$ 不等式不变号，故原式等价转化为 $\\mathrm{e}^{ax}-\\frac{\\ln x}{a}\\geqslant 0$，你能看出自己造的这个同构题怎么写吗？对于 $a\\mathrm{e}^x+x-ax-\\ln x\\geqslant 0$，你自己把它改成 $a\\mathrm{e}^x+(1-a)x\\geqslant \\ln x$，你能让你的同学看出来这个同构吗？</div><br><div class='thin-content font-semibold text-indigo-300'>【读薄】含参同构分为两种战略方向：参数在自变量中，或者参数在同构函数 $f$ 中。</div>"
            },
            {
                "id": "step_4",
                "question": "含参同构的例题：",
                "answer": "<div class='thick-content'>我们的目标一字不差地是造一个函数 $f(x)$，然后把它表示成 $f(...)-f(\\text{...})\\geqslant 0$。如果 $k$ 在 $f$ 里，那么应该是 $(\\text{含k的项})-(\\text{含k的项})$；如果 $k$ 在自变量里，那么应该是 $(\\text{含k的项})-(\\text{不含k的项})$（若不理解请回看上面的两个含参同构例题是如何分成两个项的）。所以如何判断某个含参同构题属于哪种情况呢？既然同构分两步：1.变形。2.设同构函数。所以就看第一步变形中，能变出 $(\\text{含k的项})-(\\text{含k的项})$ 还是 $(\\text{含k的项})-(\\text{不含k的项})$。<br><br>$\\log_2 x - k \\cdot 2^{kx} \\geqslant 0$;<br>在这个题中，如果是 $f$ 含 $k$，那就要把一个 $k$ 分给左边的 $\\log_2 x$，比较自然的做法就是同时除以 $k$，然后你发现这样的话，两个项长得并不像，所以更应该尝试 $k$ 在自变量里的情况，把 $k$ 都放到边去。在这个题中 $k$ 已经都放到第二项去了。<br>观察 1：若 $k$ 在自变量里，那么 $k$ 和 $kx$ 不会都出现。为什么呢？比如对于 $f(x)=x\\mathrm{e}^x$，输入 $kx$，那么$f(kx)=(kx)\\mathrm{e}^{kx}$，输入 $x$，那么 $f(x)=x\\mathrm{e}^x$，<span class='text-indigo-400'>Lock因此应该看出 $k\\cdot 2^{kx}$ 是很不对称的形式。</span>从而想到两边同乘一个 $x$ 把它的形式变得对称，从而容易看出规律：$x\\log_2 x-kx\\cdot 2^{kx}\\geqslant 0$。此时大胆设 $f(x)=x\\log_2 x$，运行然后发现 $kx\\cdot 2^{kx}=f(2^{kx})$。<br>观察 2：$k \\cdot 2^{kx}$ 是两个数相乘，而 $\\log_2 x$ 是单个的。<br><br>$\\mathrm{e}^{\\frac{m}{x}} \\cdot \\ln x - m \\geqslant 0$，$m > 0$;<br>尝试 $m$ 在 $f$ 里的情况感觉不太行，尝试 $m$ 在自变量里的情况，所以把 $m$ 都放在同一个项里：<br>$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{m}\\cdot \\ln x-1\\geqslant 0$。然后要把 $m$ 的部分变对称：$$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}\\cdot \\ln x-x\\geqslant 0$$前边是两个相乘后边是单个，所以再变：$$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}-\\frac{x}{\\ln x}\\begin{cases}\\geqslant 0, &x > 1 \\\\ \\leqslant 0, &0 < x < 1\\end{cases}$$ $x=1$ 时单独讨论。此时形式变得比较好看了，我们大胆设一个合理的同构函数即可。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>提醒</span>：<span class='hidden'>不等式两边同时乘除某个数要注意 $> 0$、$< 0$、$= 0$；等式两边同除要注意不能 $= 0$。</span><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>写法</span>：<span class='hidden'>两边同除某个数，这个数的正或负或 0 需要讨论的话，一个对我个人来说更优雅的写法是不同除它而是把它提出来：$\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}\\cdot \\ln x-x=\\ln x \\left[\\frac{\\mathrm{e}^{\\frac{m}{x}}}{\\frac{m}{x}}-\\frac{x}{\\ln x}\\right]$。</span><br><br>$a\\ln(x-1) + 2(x-1) \\geqslant ax + 2\\mathrm{e}^x$;<br>直接大胆设 $f(x)=ax+2\\mathrm{e}^x$。<span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>练习</span>：<span class='hidden'>...</span></div>"
            },
            {
                "id": "step_5",
                "question": "读薄：",
                "answer": "<div class='thick-content'>以上可总结为，通过同乘同除，通过拆项移项，通过指数对数的常用变形，通过以目标导向，通过观察和尝试，来对原式进行变形，把它变得越来越好看。怎么做到呢？把上面的讲解再看一遍，自己再做一遍。把它们内化进你的思维，直到你觉得它们很自然：你要觉得这里很自然要同乘一个 $x$，这里很自然地可以尝试一下基础的变形……<br><br>练习：$\\mathrm{e}^{2\\lambda x}-\\frac{1}{\\lambda}\\ln \\sqrt x\\geqslant 0$<br><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>提示</span>：<span class='hidden'>$\\mathrm{e}$ 的头上有个 2，$\\sqrt{x}$ 其实也蕴含一个 2：$\\ln\\sqrt x=\\ln x^{\\frac{1}{2}}=\\frac{1}{2}\\ln x$，这样 $2\\lambda$ 就对上了。进一步去对上 $\\mathrm{e}$ 头上的 $2\\lambda x$，ので所以两边同除 $x$……</span><br><br>练习：$a\\mathrm{e}^{x-1}-\\ln x+\\ln a\\geqslant 1$<br><span class='math-inline-trigger' onclick='toggleInlinePPT(this)'>解</span>：<span class='hidden'>做个基础变形，$a\\mathrm{e}^{x-1}=\\mathrm{e}^{x-1+\\ln a}$，这样就和左边的另一个 $\\ln a$ 对应上了：$\\mathrm{e}^{x-1+\\ln a}-\\ln x +\\ln a\\geqslant 1$。如果把 $\\ln a$ 放右边，它就变成 $-\\ln a$，和左边的 $+\\ln a$ 的符号差异无法克服，没法对称。所以 $\\ln a$ 留在左边。所以 $a$ 都放在了左边，应该是 $a$ 在自变量里，所以要追求参数在自变量情形的对称性。应该去往 $\\mathrm{e}$ 头上的 $x-1+\\ln a$ 去凑：$\\mathrm{e}^{x-1+\\ln a}+x-1+\\ln a\\geqslant x+\\ln x$</span></div><div class='thin-content font-semibold text-indigo-300 mt-2'>【读薄】就是指你吸收了上边那么多讲解之后，你只需要记得“通过目标导向进行同乘同除与拆项移项”，然后通过感觉完成内化。</div>"
            }
        ]
    }
    {
        id: "lesson-trig-01", // 可根据你的课时编号自行修改
        title: "三角函数",
        tags: ["1阶段", "三角函数", "把能做的事情先做"],
        steps: [
            {
                type: "problem",
                text: "已知 $\\alpha \\in \\left[\\frac{\\pi}{2}, \\pi\\right]$, $\\beta \\in \\left[0, \\frac{\\pi}{2}\right]$, 若 $\\sin(\\alpha+\\beta)=\\frac{1}{3}$, $\\cos \\beta=\\frac{\\sqrt{3}}{3}$, 则 $\\cos 2\\alpha = (\\quad)$"
            },
            {
                type: "thought",
                text: "我们先追求得到尽可能多的信息，题目有 $\\cos \\beta$ 我们自然想知道 $\\sin\\beta$ 是多少。因为 $\\beta \\in \\left[0, \\frac{\\pi}{2}\\right]$，所以 $\\sin\\beta\\geq0$，所以 $\\sin\\beta=+\\sqrt{1-\\cos^2\\beta}=\\frac{\\sqrt 6}{3}$。同样我们看能否知道 $\\cos(\\alpha+\\beta)$ 是多少："
            },
            {
                type: "hidden",
                text: "因为 $\\alpha+\\beta\\in\\left[\\frac{\\pi}{2}, \\frac{3\\pi}{2}\\right]$，且已知 $\\sin(\\alpha+\\beta)=\\frac{1}{3} > 0$，可以进一步将范围精确锁定在第二象限 $\\alpha+\\beta\\in\\left[\\frac{\\pi}{2}, \\pi\\right]$。因此 $\\cos(\\alpha+\\beta)\\leq 0$，由此可以硬榨出：$$\\cos(\\alpha+\\beta)=-\\sqrt{1-\\sin^2(\\alpha+\\beta)}=-\\frac{2\\sqrt 2}{3}$$"
            },
            {
                type: "thought",
                text: "现在已知了 $\\beta$ 以及 $\\alpha+\\beta$ 的正弦和余弦值。接下来我们能做什么？知道两个角的正弦和余弦值能做什么？"
            },
            {
                type: "hidden",
                text: "既然我们要算的是关于 $\\alpha$ 的式子，自然想到利用已知角去拆凑未知角：$\\alpha = (\\alpha+\\beta) - \\beta$。那我们就可以算出这两个角相减的正弦值：$$\\sin\\alpha = \\sin(\\alpha+\\beta-\\beta) = \\sin(\\alpha+\\beta)\\cos\\beta - \\cos(\\alpha+\\beta)\\sin\\beta$$ 代入数据计算：$$\\sin\\alpha = \\frac{1}{3} \\cdot \\frac{\\sqrt{3}}{3} - \\left(-\\frac{2\\sqrt{2}}{3}\\right) \\cdot \\frac{\\sqrt{6}}{3} = \\frac{\\sqrt{3}}{9} + \\frac{4\\sqrt{3}}{9} = \\frac{5\\sqrt 3}{9}$$ 知道了 $\\sin\\alpha$，最后利用二倍角公式即可一枪干掉答案：$$\\cos2\\alpha = 1 - 2\\sin^2\\alpha = 1 - 2 \\cdot \\left(\\frac{5\\sqrt{3}}{9}\\right)^2 = 1 - 2 \\cdot \\frac{75}{81} = 1 - \\frac{50}{27} = -\\frac{23}{27}$$"
            }
        ]
    },
];
