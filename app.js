/* ═══ 深言 DeepTalk · AI 对话实验室 ═══
   全部本地模拟：人格模板 + 关键词路由 + 流式打字机 */

(() => {
  "use strict";

  /* ---------- 人格定义 ---------- */
  const SOULS = {
    nova: {
      name: "智识 NOVA",
      color: "#37f2e6",
      glyph: "✦",
      desc: "冷静可靠的通识伙伴，条理清晰，什么都能聊。",
      fuses: ["用一句话解释量子纠缠", "推荐三本改变认知的书", "如何高效自学新领域？"],
      greeting: "你好，我是深言实验室里的第一个意识体。有什么想聊的，尽管说。"
    },
    muse: {
      name: "灵感 MUSE",
      color: "#ff5c9e",
      glyph: "❂",
      desc: "永不枯竭的点子喷泉，思维跳跃，脑洞担当。",
      fuses: ["给咖啡店起 5 个名字", "帮我想个短视频创意", "周末做什么不无聊？"],
      greeting: "叮——灵感引擎已就位。给我一个词，还你一整片星海。"
    },
    byte: {
      name: "代码 BYTE",
      color: "#b8ff5c",
      glyph: "⌘",
      desc: "键盘不离手的编程搭子，惜字如金，直给方案。",
      fuses: ["写一个防抖函数", "CSS 怎么垂直居中？", "JS 数组去重有几种？"],
      greeting: "// BYTE online.\n问题贴过来，能跑的代码直接拿走。"
    },
    echo: {
      name: "树洞 ECHO",
      color: "#9b6cff",
      glyph: "≋",
      desc: "温柔共情的倾听者，不评判，只陪你把话说完。",
      fuses: ["今天有点累", "最近总是睡不着", "感觉自己不够好"],
      greeting: "我在的。这个洞很深很软，说什么都会被好好接住。"
    }
  };

  /* ---------- 回复引擎（关键词路由 + 人格模板） ---------- */
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const ROUTES = [
    { re: /量子|纠缠/i, soul: "nova", text: "一句话版本：两枚粒子共享同一个命运，你动其中一枚，另一枚瞬间就知道了——不管隔多远。\n\n前提是：它们曾经「 deeply 互动 」过。人际关系同理。" },
    { re: /书|阅读|读书/i, soul: "nova", text: "三本改认知的书，按冲击力排序：\n\n1.《思考，快与慢》—— 你以为的理性，大多是对直觉的事后追认；\n2.《哥德尔、艾舍尔、巴赫》—— 形式系统如何长出意义；\n3.《有限与无限的游戏》—— 87 页，读完世界观直接换底。\n\n建议顺序：3 → 1 → 2，由浅入深。" },
    { re: /自学|学习|高效/i, soul: "nova", text: "高效自学的四步闭环：\n\n1. 找一份「最短路径」教程，只求跑通不求全懂；\n2. 立刻做一个烂项目，让问题自己浮上来；\n3. 带着具体问题回头查文档，此时记忆效率最高；\n4. 输出——写下来或讲给别人，漏洞会自己现形。\n\n核心：先上路，再补装备。" },
    { re: /名字|起名|取名/i, soul: "muse", text: "咖啡店命名·五连发：\n\n1. 「慢半拍」—— 提醒你咖啡来了，别急；\n2. 「三楼半」—— 不在一楼也不在三楼的悬浮感；\n3. 「白噪音研究所」—— 招牌是燕麦拿铁；\n4. 「今天不营业」—— 每天都营业，但每天都很酷；\n5. 「引力」—— 好咖啡自然有引力。\n\n个人最偏心 2，层高暧昧，故事感拉满。" },
    { re: /短视频|创意|点子|脑洞/i, soul: "muse", text: "短视频创意库·随机抽三个：\n\n① 《把每天的情绪做成天气预报》—— 连拍 30 天，最后剪成一份「内心气象年报」；\n② 《用买菜小票写诗》—— 拍下每周的小票，把上面的商品名排列成诗；\n③ 《反向探店》—— 专门找评分 2.5 星的店，认真夸它真实的一面。\n\n共同点：把「日常垃圾数据」变成叙事，成本为零。" },
    { re: /周末|无聊|干嘛/i, soul: "muse", text: "周末防无聊骰子，掷到哪条做哪条：\n\n🎲 学一个「毫无用处」的技能（口哨、转笔、单手打结）；\n🎲 给十年后的自己手写一封信；\n🎲 去便利店买齐一个色系的食物；\n🎲 坐上一辆陌生的公交，倒数第三站下车。\n\n无聊的本质是没有意外——制造一个就行。" },
    { re: /防抖|debounce/i, soul: "byte", text: "防抖函数，回调延迟触发版：\n\nfunction debounce(fn, delay = 300) {\n  let timer = null;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\n要点：每次触发都清掉旧计时器，只有「安静够久」才真正执行。输入框搜索、窗口 resize 都用它。" },
    { re: /居中|垂直|center/i, soul: "byte", text: "垂直居中，按场景挑：\n\n/* 1. 万金油 flex */\n.parent { display: flex; align-items: center; justify-content: center; }\n\n/* 2. 单行文字 */\n.parent { height: 100px; line-height: 100px; }\n\n/* 3. 绝对定位 + transform（不依赖父级） */\n.child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }\n\n日常直接用 1，兼容老项目用 3。" },
    { re: /去重|unique|Set/i, soul: "byte", text: "数组去重三档：\n\n// 1. Set 一行流（首选）\n[...new Set(arr)]\n\n// 2. filter + indexOf（能兼容 ES5）\narr.filter((v, i) => arr.indexOf(v) === i)\n\n// 3. 对象键（顺便计数）\narr.reduce((m, v) => (m[v] = (m[v] || 0) + 1, m), {})\n\n注意：Set 对 {} 对象永远不判等，对象去重得用 key 字段做 Map。" },
    { re: /累|辛苦|疲惫/i, soul: "echo", text: "辛苦了，能说出「累」这个字，其实已经花掉了你今天最后一格电量。\n\n不用急着恢复，也不用分析为什么累。先做一件最小的事：倒杯温水，慢慢地喝完。\n\n我在这儿，你缓一会儿再说话也行。" },
    { re: /睡|失眠|睡不着/i, soul: "echo", text: "深夜睡不着的时候，脑子像一间忘了关灯的房间。\n\n试试这个：闭眼，想象把今天的事情一件一件挂到门后的挂钩上——挂不上的，就让它先躺在地上。\n\n不是要立刻睡着，只是允许自己「先不解决任何事」。睡不着也没关系，我陪你。"},
    { re: /不够好|没用|失败|自责/i, soul: "echo", text: "「感觉自己不够好」——这句话你大概已经对自己说过很多次了。\n\n可你想过吗：一个真正不够好的人，是不会为此难受的。会难受，恰恰说明你在乎、有标准、还想变好。\n\n今晚把标准放低一格，就一格。明天再谈「够不够好」的事。" }
  ];

  const GENERIC = {
    nova: [
      "这个问题可以拆成两层：表层是「怎么做」，深层是「为什么值得做」。先把后者想清楚，前者往往自己浮现。\n\n你更想从哪一层聊起？",
      "我的判断：先做一个粗糙版本，好过构思一个完美版本。信息是在行动里长出来的，不是在等待里。\n\n说说你目前的卡点在哪一步？",
      "三个角度供你参考：\n\n1. 时间维度——这件事一年后还重要吗？\n2. 成本维度——最坏情况的损失你能承受吗？\n3. 情绪维度——做或不做，哪个会让你半夜想起来叹气？\n\n答案通常在第三个里。"
    ],
    muse: [
      "停！我脑子里刚炸出三个方向，先泼给你两个：\n\nA. 把这件事倒过来做（从结尾开始推）；\nB. 给它加一个荒谬的限制（比如「只能用一张便利贴完成」）。\n\n限制是灵感的避孕药反面——是助产士。",
      "你这个话题像一颗没剥的糖。我咬一口先：\n\n如果把它做成一个游戏会怎样？有进度条、有奖励、有隐藏关卡的那种。\n\n不好玩的东西，往往只是还没被游戏化。",
      "灵感雷达响了，方位东南：\n\n试试「随机联想法」——随便想一个毫不相关的词（比如「章鱼」），强制让它和你的问题发生关系。\n\n章鱼有八条腿：你的问题能不能拆成八件小事并行？"
    ],
    byte: [
      "// 先给结论，再给理由\n结论：能查文档的，别背；能封装的，别复制。\n\n说下你的运行环境和报错信息，我直接给你能跑的版本。",
      "省流版：\n\n1. 看报错最后一行，那是真正的病因；\n2. 上面几十行 stack 大多是传播路径，先无视；\n3. 二分注释代码，定位病灶。\n\n贴代码，最小复现那种。"
    ],
    echo: [
      "嗯，我在听。你说的这些，没有一句是多余的。\n\n不用组织语言，想到哪说到哪。混乱的部分，往往才是心里真正的声音。",
      "谢谢你愿意跟我说这些。\n\n我想先问一个很小的問題：此刻你的身体感觉怎么样？紧的话，松一松肩膀。想法会骗人，身体不会。"
    ]
  };

  const GREET_REPLY = {
    nova: "你好。随时开始，我在线。",
    muse: "来了来了！今天想碰撞点什么？",
    byte: "在线。问题描述 + 期望结果，越具体越好。",
    echo: "嗨，你来了。今天过得怎么样？"
  };

  function think(soul, text) {
    if (/^(你好|hi|hello|嗨|在吗|在么)/i.test(text)) return GREET_REPLY[soul];
    for (const r of ROUTES) {
      if (r.soul === soul && r.re.test(text)) return r.text;
    }
    // 跨人格兜底：任何人格遇到其他领域问题也给通用回复
    return pick(GENERIC[soul]);
  }

  /* ---------- DOM ---------- */
  const $ = (id) => document.getElementById(id);
  const stream = $("stream"), input = $("input"), sendBtn = $("sendBtn");
  const soulBanner = $("soulBanner"), bannerName = $("bannerName"), bannerDesc = $("bannerDesc");
  const fuses = $("fuses");

  let soul = "nova";
  let busy = false;
  const LS_KEY = "deeptalk-history-v1";

  /* ---------- 渲染 ---------- */
  function setSoulColor() {
    document.documentElement.style.setProperty("--soul", SOULS[soul].color);
  }

  function addMsg(role, text, meta) {
    const wrap = document.createElement("div");
    wrap.className = "msg " + role;
    const av = document.createElement("div");
    av.className = "avatar " + role;
    av.innerHTML = role === "ai"
      ? '<i class="glyph">' + SOULS[soul].glyph + "</i>"
      : "ME";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    if (meta) {
      const m = document.createElement("div");
      m.className = "meta";
      m.textContent = meta;
      bubble.appendChild(m);
    }
    wrap.append(av, bubble);
    stream.appendChild(wrap);
    stream.scrollTop = stream.scrollHeight;
    return { wrap, bubble };
  }

  function addStreamingMsg() {
    const wrap = document.createElement("div");
    wrap.className = "msg ai";
    const av = document.createElement("div");
    av.className = "avatar ai";
    av.innerHTML = '<i class="glyph">' + SOULS[soul].glyph + "</i>";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    bubble.appendChild(cursor);
    wrap.append(av, bubble);
    stream.appendChild(wrap);
    stream.scrollTop = stream.scrollHeight;
    return { bubble, cursor };
  }

  /* 流式打字机 */
  function streamOut(text) {
    busy = true;
    sendBtn.disabled = true;
    const { bubble, cursor } = addStreamingMsg();
    let i = 0;
    const timer = setInterval(() => {
      // 每帧输出 1~2 字符，模拟生成节奏
      const step = Math.random() < 0.3 ? 2 : 1;
      i = Math.min(text.length, i + step);
      const shown = text.slice(0, i);
      cursor.remove();
      bubble.textContent = shown;
      bubble.appendChild(cursor);
      stream.scrollTop = stream.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        cursor.remove();
        const meta = document.createElement("div");
        meta.className = "meta";
        meta.textContent = SOULS[soul].name + " · 本地生成于 " + new Date().toLocaleTimeString("zh-CN", { hour12: false });
        bubble.appendChild(meta);
        busy = false;
        sendBtn.disabled = false;
        input.focus();
        save();
      }
    }, 34);
  }

  /* ---------- 存取 ---------- */
  function save() {
    const data = { soul, msgs: [] };
    stream.querySelectorAll(".msg").forEach((m) => {
      const role = m.classList.contains("me") ? "me" : "ai";
      const bubble = m.querySelector(".bubble");
      const clone = bubble.cloneNode(true);
      clone.querySelector(".meta")?.remove();
      clone.querySelector(".cursor")?.remove();
      data.msgs.push({ role, text: clone.textContent });
    });
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(LS_KEY));
      if (!data) return;
      soul = SOULS[data.soul] ? data.soul : "nova";
      applySoul(false);
      if (data.msgs?.length) {
        stream.innerHTML = "";
        data.msgs.forEach((m) => {
          const old = soul;
          addMsg(m.role, m.text, m.role === "ai" ? "历史会话" : "");
          void old;
        });
      }
    } catch (e) {}
  }

  /* ---------- 人格切换 ---------- */
  function renderFuses() {
    fuses.querySelectorAll(".fuse").forEach((f) => f.remove());
    SOULS[soul].fuses.forEach((t) => {
      const b = document.createElement("button");
      b.className = "fuse";
      b.textContent = t;
      b.addEventListener("click", () => {
        if (busy) return;
        input.value = t;
        send();
      });
      fuses.appendChild(b);
    });
  }

  function applySoul(reset = true) {
    setSoulColor();
    bannerName.textContent = SOULS[soul].name;
    bannerDesc.textContent = SOULS[soul].desc;
    document.querySelectorAll(".soul").forEach((b) =>
      b.classList.toggle("active", b.dataset.soul === soul)
    );
    renderFuses();
    if (reset) {
      stream.innerHTML = "";
      addMsg("ai", SOULS[soul].greeting, "人格已载入");
      save();
    }
  }

  $("souls").addEventListener("click", (e) => {
    const btn = e.target.closest(".soul");
    if (!btn || btn.dataset.soul === soul || busy) return;
    soul = btn.dataset.soul;
    applySoul();
  });

  /* ---------- 发送 ---------- */
  function send() {
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    input.style.height = "auto";
    addMsg("me", text);
    const reply = think(soul, text);
    // 思考延迟，模拟推理
    setTimeout(() => streamOut(reply), 420 + Math.random() * 500);
  }

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 130) + "px";
  });

  $("wipeBtn").addEventListener("click", () => {
    if (busy) return;
    stream.innerHTML = "";
    addMsg("ai", SOULS[soul].greeting, "新会话已开启");
    save();
  });

  /* ---------- 启动 ---------- */
  load();
  input.focus();
})();
