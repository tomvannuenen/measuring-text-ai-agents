/* Interactive slides. Each <div class="demo" data-demo="name"> in slides.md is filled
   in by the builder of that name. Real numbers come from demo-data.js (window.DEMO),
   which prep/08_slide_data.py writes from the reference runs. */
(function () {
  const D = window.DEMO;      // AITA comments: the hands-on data
  const BR = window.DEMO_BR;  // Brazilian deputies' speeches: the second, show-only example
  const NAMES = { NACIONAL: "nacional", ESTADUAL: "estadual", MUNICIPAL: "municipal", NAO_POLITICO: "não político", INDEFINIDO: "indefinido", TIE: "tie", yes: "yes", no: "no" };
  const SVGNS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    put(n, kids);
    return n;
  }
  function svg(tag, attrs, ...kids) {
    const n = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs || {})) n.setAttribute(k, v);
    for (const kid of kids.flat()) if (kid != null) n.append(kid);
    return n;
  }
  const flat = (kids) => kids.flat(Infinity).filter((k) => k != null);
  const put = (node, ...kids) => { node.append(...flat(kids)); return node; };
  const swap = (node, ...kids) => { node.replaceChildren(...flat(kids)); return node; };
  const chip = (label) => el("span", { class: "chip " + label }, NAMES[label] || label);
  const pct = (x, d = 0) => (100 * x).toFixed(d) + "%";
  // Buttons and sliders give focus back to the deck, so the clicker keeps working.
  function button(text, onclick, cls) {
    const b = el("button", { type: "button", class: cls || "" }, text);
    b.addEventListener("click", (e) => { onclick(e); b.blur(); });
    return b;
  }
  function slider(label, min, max, step, value, fmt, oninput) {
    const out = el("b", {}, fmt(value));
    const input = el("input", { type: "range", min, max, step, value });
    input.addEventListener("input", () => { out.textContent = fmt(+input.value); oninput(+input.value); });
    input.addEventListener("change", () => input.blur());
    const wrap = el("div", { class: "slider" }, el("label", {}, el("span", {}, label), out), input);
    wrap.set = (v) => { input.value = v; out.textContent = fmt(v); };
    return wrap;
  }
  function speech(s) {
    return el("div", { class: "speech" }, el("span", { class: "uf" }, "Deputy from " + s.uf), s.text);
  }
  function card(p, phrase) {
    const text = p.text.replace(/\n\s*\n/g, "\n");
    const box = el("div", { class: "speech post" }, p.title ? el("b", { class: "ptitle" }, p.title) : null);
    const i = phrase ? text.indexOf(phrase) : -1;
    if (i < 0) { box.append(text); return box; }
    const m = el("mark", {}, phrase);
    box.append(text.slice(0, i), m, text.slice(i + phrase.length));
    box.emph = () => emph(m);
    return box;
  }
  // Emphasis: a hand-drawn underline if the rough-notation library is present, a plain highlight otherwise.
  // reveal.js scales the slide, and rough-notation measures in screen pixels, so the measurements are
  // divided by the current scale: for the first drawing, and again whenever the library redraws.
  function emph(node, type) {
    if (node._done) return; node._done = true;
    if (!window.RoughNotation) { node.classList.add("on"); return; }
    const P = Element.prototype, gb = P.getBoundingClientRect, gc = P.getClientRects;
    const fix = (r) => { const f = 1 / (Reveal.getScale() || 1); return new DOMRect(r.x * f, r.y * f, r.width * f, r.height * f); };
    const patch = (n) => { n.getBoundingClientRect = function () { return fix(gb.call(this)); }; n.getClientRects = function () { return [...gc.call(this)].map(fix); }; };
    P.getBoundingClientRect = function () { return fix(gb.call(this)); };
    P.getClientRects = function () { return [...gc.call(this)].map(fix); };
    try {
      window.RoughNotation.annotate(node, { type: type || "underline", color: "#7a2418", strokeWidth: 2, padding: 2, iterations: 2, animationDuration: 500, multiline: true }).show();
    } catch (e) { node.classList.add("on"); }
    finally { P.getBoundingClientRect = gb; P.getClientRects = gc; }
    patch(node); document.querySelectorAll("svg.rough-annotation").forEach(patch);
  }
  function tween(ms, step) {
    const t0 = performance.now();
    (function frame(t) {
      const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      step(e);
      if (k < 1) requestAnimationFrame(frame);
    })(t0);
  }

  const builders = {};

  /* 1. Same speeches, three codebooks: the slope and the p-value move. */
  builders.flip = function (root) {
    const hook = root.dataset.mode !== "all";
    const order = ["rules", "simple", "participant"].map((k) => BR.flip.find((b) => b.key === k));
    const short = { rules: "Detailed rules", simple: "Simple", participant: "Quick rules" };
    const W = 640, H = 410, m = { l: 58, r: 18, t: 14, b: 50 };
    const x = (pop) => m.l + ((Math.log10(pop) - 5.7) / (7.75 - 5.7)) * (W - m.l - m.r);
    const y = (share) => m.t + (1 - share) * (H - m.t - m.b);
    const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img" });
    for (const v of [0, 0.25, 0.5, 0.75, 1]) {
      s.append(svg("line", { class: "grid", x1: m.l, x2: W - m.r, y1: y(v), y2: y(v) }));
      const t = svg("text", { x: m.l - 8, y: y(v) + 5, "text-anchor": "end" }); t.textContent = pct(v); s.append(t);
    }
    for (const [pop, lab] of [[1e6, "1 million"], [3e6, "3 million"], [1e7, "10 million"], [3e7, "30 million"]]) {
      const t = svg("text", { x: x(pop), y: H - m.b + 22, "text-anchor": "middle" }); t.textContent = lab; s.append(t);
    }
    const xt = svg("text", { x: (m.l + W - m.r) / 2, y: H - 6, "text-anchor": "middle" }); xt.textContent = "State population"; s.append(xt);
    const line = svg("line", { stroke: "#111111", "stroke-width": 3, "stroke-linecap": "round" });
    s.append(line);
    const tip = el("div", { class: "tip" });
    let cur = order[0];
    const dots = cur.states.map((st, i) => {
      const c = svg("circle", { cx: x(st.pop), cy: y(st.share), r: 7, fill: "#1a1410", stroke: "#fff", "stroke-width": 2 });
      c.addEventListener("mouseenter", () => {
        const now = cur.states[i];
        tip.textContent = `${now.name}: ${pct(now.share)} of ${now.n} speeches`;
        tip.style.left = x(st.pop) + 12 + "px"; tip.style.top = y(now.share) - 6 + "px"; tip.style.opacity = 1;
      });
      c.addEventListener("mouseleave", () => (tip.style.opacity = 0));
      s.append(c);
      return c;
    });
    const tags = ["RR", "SP"].map((uf) => {
      const i = cur.states.findIndex((st) => st.uf === uf);
      const t = svg("text", { x: x(cur.states[i].pop) + (uf === "SP" ? -12 : 12), "text-anchor": uf === "SP" ? "end" : "start" });
      t.textContent = cur.states[i].name; s.append(t);
      return { i, t };
    });
    let revealed = !hook;
    const lineAt = (b) => [b.intercept + b.slope * 5.7, b.intercept + b.slope * 7.75];

    const eyebrow = el("div", { class: "eyebrow" });
    const big = el("div", { class: "big" });
    const verdict = el("div", { class: "verdict" });
    const effect = el("div", { class: "mid" });
    const share = el("div", { class: "note" });
    const controls = el("div", { class: "row", style: "margin-top:14px" });
    const side = el("div", { class: "side" }, eyebrow, big, verdict, effect, share, controls);
    root.classList.add("flip");
    put(root, el("div", { class: "chart" }, el("div", { class: "note", style: "margin:0 0 6px 58px" }, "Share of each state’s speeches labeled estadual or municipal"), s, tip), side);

    function text(b) {
      eyebrow.textContent = "Codebook: " + short[b.key].toLowerCase();
      big.textContent = "p = " + b.p.toFixed(2);
      verdict.textContent = b.p < 0.05 ? "Significant at the 5% level" : "Not significant at the 5% level";
      effect.textContent = `A tenfold larger state population: ${(Math.abs(b.slope) * 100).toFixed(1)} points fewer local speeches`;
      share.textContent = `${b.n} speeches, one model; one dot per state. ${pct(b.share)} labeled estadual or municipal.`;
    }
    function place(b, animate) {
      const from = cur, [a0, a1] = lineAt(from), [b0, b1] = lineAt(b);
      const draw = (e) => {
        dots.forEach((c, i) => c.setAttribute("cy", y(from.states[i].share + e * (b.states[i].share - from.states[i].share))));
        tags.forEach(({ i, t }) => t.setAttribute("y", y(from.states[i].share + e * (b.states[i].share - from.states[i].share)) + 5));
        line.setAttribute("x1", m.l); line.setAttribute("x2", W - m.r);
        line.setAttribute("y1", y(a0 + e * (b0 - a0))); line.setAttribute("y2", y(a1 + e * (b1 - a1)));
      };
      cur = b; text(b);
      if (animate) tween(600, draw); else draw(1);
    }
    function segmented() {
      swap(controls);
      const seg = el("div", { class: "seg" });
      order.forEach((b) => seg.append(button(short[b.key], () => { place(b, true); mark(); })));
      const mark = () => [...seg.children].forEach((btn, i) => btn.classList.toggle("on", order[i] === cur));
      controls.append(seg); mark();
    }
    place(order[0], false);
    if (hook) controls.append(button("Change only the codebook", () => { revealed = true; place(order[1], true); segmented(); }, "primary"));
    else segmented();
  };

  /* 2. The one-sentence prompt: click a phrase to see the agent's choice, as a few words or a small picture. */
  builders.prompt = function (root) {
    /* Two recorded runs of this request in Codex (18 and 19 Nov 2026), in the plain project folder participants get.
       Luna 5.6 (what a free account gets, medium effort) labeled nothing; after the follow-up "So you did not label anything,
       like I asked?" it printed every comment with its hand label and wrote 100 labels identical to the gold labels
       (facilitator/demo_one_sentence_codex_hostility/luna_followup). Astra 6.2 (paid, medium effort): .../astra. */
    const parts = [
      ["Label", '<div style="display:grid; grid-template-columns:440px 440px; column-gap:60px; justify-content:center; text-align:left;"><div><div style="font-size:28px; font-weight:700; color:#111; margin:0 0 6px;">Luna 5.6, after the follow-up</div><div class="mk-big" style="font-size:26px;">labeled all 100 with my labels on screen</div><div class="mk-small">it first printed each comment next to my label</div></div><div><div style="font-size:28px; font-weight:700; color:#111; margin:0 0 6px;">Astra 6.2 (paid)</div><div class="mk-big" style="font-size:26px;">labeled all 100 itself</div><div class="mk-small">it says it labeled before looking at my labels</div></div></div>'],
      [" the 100 comments in "],
      ["data/working_100.csv", '<div><span class="mk-col">id</span><span class="mk-col">text</span><span class="mk-key"><span class="mk-col key">hostile</span><span class="mk-lab" style="margin-left:46px;">↑ both models read them</span></span></div>'],
      [" by whether they are "],
      ["hostile", '<div style="display:grid; grid-template-columns:440px 440px; column-gap:60px; justify-content:center; text-align:left;"><div><div style="font-size:28px; font-weight:700; color:#111; margin:0 0 6px;">Luna 5.6, after the follow-up</div><div class="mk-big" style="font-size:30px;">40 hostile</div><div class="mk-small">same as mine</div></div><div><div style="font-size:28px; font-weight:700; color:#111; margin:0 0 6px;">Astra 6.2 (paid)</div><div class="mk-big" style="font-size:30px;">43 hostile (mine: 40)</div><div class="mk-small">it first read 5 other comments with my labels (<code>data/coder_5.csv</code>) to decide what counts as hostile</div></div></div>'],
      [", and tell me "],
      ["how reliable", '<div style="display:grid; grid-template-columns:440px 440px; column-gap:60px; justify-content:center; text-align:left;"><div><div style="font-size:28px; font-weight:700; color:#111; margin:0 0 6px;">Luna 5.6, after the follow-up</div><div class="mk-pct"><b>100%</b><span>agreement with my labels, κ 1.00</span></div></div><div><div style="font-size:28px; font-weight:700; color:#111; margin:0 0 6px;">Astra 6.2 (paid)</div><div class="mk-pct"><b>95%</b><span>agreement with my labels, κ 0.90</span></div></div></div><div class="mk-small" style="margin-top:10px; text-align:center;">neither measured reliability; both compared their labels with labels they could see</div>'],
      [" the labels are."],
    ];
    const total = parts.filter((p) => p.length > 1).length;
    const seen = new Set();
    const answer = el("div", { class: "answer" });
    const hots = [];
    const sentence = el("div", { class: "sentence" }, parts.map((p, i) => {
      if (p.length === 1) return document.createTextNode(p[0]);
      const span = el("span", { class: "hot" }, p[0]);
      span.addEventListener("click", () => {
        seen.add(i);
        hots.forEach((h) => h.classList.remove("on"));
        span.classList.add("on", "seen");
        swap(answer, el("div", { html: p[1] }));
      });
      hots.push(span);
      return span;
    }));
    root.classList.add("prompt");
    put(root, sentence, answer);
  };

  /* 3. The five warm-up speeches: record the room, then show the model's five runs. */
  /* Live answers from the room (Google Form, read through an Apps Script web app; see live-config.js).
     Counts only today's answers, so Monday's answers do not show on Thursday. */
  function kalpha(units) {            // Krippendorff's alpha, nominal, two labels. units: [{yes, no}]
    let n = 0, ny = 0, nn = 0, d = 0;
    units.forEach((u) => { const m = u.yes + u.no; if (m < 2) return; n += m; ny += u.yes; nn += u.no; d += 2 * u.yes * u.no / (m - 1); });
    if (n < 2 || ny * nn === 0) return null;
    return 1 - (n - 1) * d / (2 * ny * nn);
  }
  const live = { units: null, coders: 0, proposals: [], candidates: null, votes: {}, voters: 0, test: null, where: null, error: null, busy: null, listeners: [] };
  (function startLive() {
    const L = window.LIVE || {};
    if (!L.dataUrl) return;
    const today = new Date().toDateString();
    const count = (head, rows) => {
      head = (head || []).map(String);
      const cols = [1, 2, 3, 4, 5].map((k, j) => { const c = head.findIndex((h) => new RegExp("comment\\s*" + k + "\\b", "i").test(h)); return c >= 0 ? c : j + 1; });
      rows = (rows || []).filter((r) => { const t = new Date(r[0]); return !isNaN(t) && t.toDateString() === today; });
      const units = cols.map((c) => {
        const u = { yes: 0, no: 0 };
        rows.forEach((r) => { const v = String(r[c] || "").trim().toLowerCase(); if (v.startsWith("yes")) u.yes++; else if (v.startsWith("no")) u.no++; });
        return u;
      });
      return { units, n: rows.length };
    };
    window.__liveData = (d) => {
      const a = count(d.head, d.rows);
      live.units = a.units; live.coders = a.n;
      live.proposals = d.proposals || [];
      live.candidates = d.candidates || null;
      live.votes = d.votes || {};
      live.voters = d.voters || 0;
      live.test = d.test || null;
      live.where = d.where || null;
      live.error = d.error || null;
      live.busy = null;
      live.listeners.forEach((f) => f());
    };
    const poll = (extra) => {
      const old = document.getElementById("live-jsonp"); if (old) old.remove();
      const sc = document.createElement("script");
      sc.id = "live-jsonp";
      sc.src = L.dataUrl + (L.dataUrl.includes("?") ? "&" : "?") + "callback=__liveData&t=" + Date.now() + (extra || "");
      document.body.append(sc);
    };
    live.poll = poll;
    poll();
    setInterval(() => { const cur = window.Reveal && Reveal.getCurrentSlide(); if (cur && cur.querySelector('[data-demo="where"], [data-demo="label"], [data-demo="labelresults"], [data-demo="roomcodebook"]') && !live.busy) poll(); }, 5000);
  })();

  function splitBar(u, wide) {
    const m = u.yes + u.no, w = m ? 100 * u.yes / m : 0;
    return el("div", { style: `display:flex; align-items:center; gap:12px; ${wide ? "" : "margin-top:10px;"}` },
      el("div", { style: `flex:1; height:${wide ? 26 : 22}px; background:#ecebe6; display:flex;` },
        el("div", { style: `width:${w}%; background:#111;` }), el("div", { style: `width:${m ? 100 - w : 0}%; background:#d9481f;` })),
      el("div", { class: "note", style: "width:170px; white-space:nowrap;" }, `${u.yes} yes · ${u.no} no`));
  }

  /* Hand coding, part 1 (slide 25): the form only. No results here, so nobody sees the room's answers before answering. */
  builders.label = function (root) {
    const L = window.LIVE || {};
    const body = el("div");
    const render = () => {
      const qr = L.formUrl ? el("div", { class: "hc-form" },
        el("img", { src: "img/form_qr.png", alt: "", onerror: function () { this.remove(); } }),
        el("div", {}, el("div", { class: "hc-url" }, L.formShort || L.formUrl.replace(/^https?:\/\//, "")),
          el("div", { class: "hc-count" }, live.units ? `${live.coders} ${live.coders === 1 ? "answer" : "answers"} so far` : "Waiting for answers…"))) : null;
      swap(body, qr,
        el("div", { class: "hc-q" }, "Hostile or insulting?", el("span", { class: "pill yes" }, "yes"), el("span", { class: "pill no" }, "no")),
        el("div", { class: "hc-sub" }, "5 comments, on your laptop"));
    };
    live.listeners.push(() => { const cur = window.Reveal && Reveal.getCurrentSlide(); if (cur && cur.contains(root)) render(); });
    render();
    root.classList.add("handcode");
    put(root, body);
  };

  /* Hand coding, part 2 (slide 42): all five comments at once, with the room, Qwen's five runs and the gold label.
     With the live form, the room column fills from today's answers; without it, click yes or no to mark the room's choice. */
  const HC_QUOTES = [
    "“Your daughter and husband need bonding time without you.”",
    "“She's just butthurt that your friend confided in you…”",
    "“There's no gray area. You knowingly stole.”",
    "“Being an overprotective mama bear is going to do more harm than good…”",
    "“…you sound like a prick. … You know she's family now too, right jack ass?”",
  ];
  builders.labelresults = function (root) {
    const body = el("div");
    const marked = D.coder5.map(() => null);
    const roomBar = (u) => {
      const m = u.yes + u.no, w = m ? 100 * u.yes / m : 0;
      return el("div", { class: "hc-bar" }, el("div", { class: "y", style: `width:${w}%` }, m ? String(u.yes) : ""), el("div", { class: "n" }, m ? String(u.no) : "–"));
    };
    const render = () => {
      const U = live.units;
      const qwen = D.coder5.map((s) => ({ yes: s.qwen.filter((x) => x === "yes").length, no: s.qwen.filter((x) => x === "no").length }));
      const aq = kalpha(qwen), ar = U ? kalpha(U) : null;
      const f = (a) => a == null ? "–" : a.toFixed(2);
      const rows = D.coder5.map((s, k) => {
        const room = U ? roomBar(U[k]) : el("div", { class: "hc-mark" }, ["yes", "no"].map((c) => {
          const b = button(c, () => { marked[k] = marked[k] === c ? null : c; render(); });
          if (marked[k] === c) b.classList.add("picked");
          return b;
        }));
        return [el("div", { class: "hc-text" }, el("b", {}, String(k + 1)), " ", HC_QUOTES[k] || s.text),
          room,
          el("div", { class: "hc-dots hc-qwen" }, s.qwen.map((x) => el("i", { class: x === "yes" ? "y" : "" }))),
          el("div", { class: "hc-keycell" }, el("span", { class: "hc-key" + (s.truth === "yes" ? " y" : "") }, s.truth))];
      });
      swap(body,
        el("div", { class: "hc-grid" },
          el("div", {}), el("div", { class: "hd" }, U ? `the room (${live.coders})` : "the room"), el("div", { class: "hd hc-qwen" }, "Qwen (API) ×5"), el("div", { class: "hd key hc-keycell" }, "gold label"),
          rows),
        el("div", { class: "hc-alpha" }, U ? el("div", {}, "The room: α = ", el("b", {}, f(ar))) : null, el("div", { class: "hc-qwen" }, aq == null && qwen.every((u) => u.yes === 0 || u.no === 0) ? ["Qwen (API), five runs: ", el("b", {}, "the same label every time")] : ["Qwen (API), five runs: α = ", el("b", {}, f(aq))])));
    };
    live.listeners.push(() => { const cur = window.Reveal && Reveal.getCurrentSlide(); if (cur && cur.contains(root)) render(); });
    render();
    root.classList.add("handcode");
    put(root, body);
    /* Clicks: the two empty fragments after this demo in slides.md. First click shows Qwen, second shows the gold label. */
    const step = () => { const sec = root.closest("section"); root.dataset.step = sec ? sec.querySelectorAll(".hc-step.visible").length : 2; };
    if (window.Reveal) { Reveal.on("fragmentshown", step); Reveal.on("fragmenthidden", step); Reveal.on("slidechanged", step); }
    step();
  };

  /* The room's codebook: people propose rules, Claude merges them, the room votes,
     and Claude labels the five comments with the one-line question and with the top three rules. */
  builders.roomcodebook = function (root) {
    const L = window.LIVE || {};
    const f = (a) => a == null ? "–" : a.toFixed(2);
    const short = (u) => (u || "").replace(/^https?:\/\//, "");
    const body = el("div");
    const M = "color:#6f6f69; font-size:22px;";
    const act = (name, secs) => {
      if (!L.dataUrl || !L.token || live.busy) return;
      live.busy = name; render();
      live.poll("&action=" + name + "&token=" + encodeURIComponent(L.token));
      setTimeout(() => { if (live.busy === name) { live.busy = null; live.error = "No answer from the script. Try again."; render(); } }, secs * 1000);
    };
    const qr = (img, url, line, sh) => el("div", { style: "display:flex; align-items:center; gap:18px; margin-bottom:14px;" },
      el("img", { src: img, alt: "", style: "height:160px; margin:0;", onerror: function () { this.remove(); } }),
      el("div", { style: "font-size:32px;" }, el("b", {}, sh || short(url)), el("div", { style: M + " margin-top:6px;" }, line)));
    const steps = (k) => el("div", { style: M + " margin-bottom:14px; font-size:24px;" },
      ["Propose", "Merge", "Vote", "Test"].map((t, n) => el("span", { style: `margin-right:22px; ${n === k ? "color:#111; font-weight:700;" : ""}` }, `${n + 1}. ${t}`)));
    const busyNote = () => live.busy ? el("div", { style: M }, live.busy === "merge" ? "Claude is merging the proposals…" : "Qwen is labeling the five comments…") : null;
    const err = () => live.error ? el("span", { style: "color:#d9481f; font-size:22px;" }, live.error) : null;
    function render() {
      const T = live.test, C = live.candidates;
      if (T) {
        const truth = D.coder5.map((c) => c.truth);
        const hits = (U) => U.filter((u, k) => (u.yes > u.no ? "yes" : u.no > u.yes ? "no" : "tie") === truth[k]).length;
        const row = (label, U) => el("tr", {}, el("td", { style: "padding:6px 24px 6px 0; border:none;" }, label),
          el("td", { style: "padding:6px 24px; border:none;" }, "α = ", el("b", {}, f(kalpha(U)))),
          el("td", { style: "padding:6px 0 6px 24px; border:none;" }, el("b", {}, `${hits(U)} of 5`), " match the gold label"));
        swap(body, steps(3),
          el("div", { style: "font-size:30px; margin-bottom:16px;" }, T.rules.map((r, n) => el("div", { style: "margin:4px 0;" }, `${n + 1}. ${r.text} `, el("span", { style: M }, `(${r.votes} ${r.votes === 1 ? "vote" : "votes"})`)))),
          el("table", { style: "font-size:30px; border-collapse:collapse; margin:0 0 12px;" },
            row("One-line question", T.v0), row("The room's codebook", T.v1),
            live.units ? el("tr", {}, el("td", { style: M + " padding:6px 24px 6px 0; border:none;" }, "The room, slide 42"), el("td", { style: "padding:6px 24px; border:none;" }, "α = ", el("b", {}, f(kalpha(live.units)))), el("td", { style: "border:none;" })) : null),
          el("div", { style: M }, `${T.model} labeled each comment ${T.runs} times with each codebook, as in the workshop steps.${T.failed ? ` ${T.failed} calls failed.` : ""} The codebook is now at ${L.proposeShort || short(L.proposeUrl)}.`),
          el("div", { class: "row", style: "margin-top:10px;" }, button("Test again", () => act("test", 150), "quiet tiny-btn"), busyNote(), err()));
        return;
      }
      if (C) {
        const maxv = Math.max(1, ...C.map((c) => live.votes[c.id] || 0));
        swap(body, steps(2), qr("img/form_vote_qr.png", L.voteUrl, `${live.voters} ${live.voters === 1 ? "person has" : "people have"} voted. Pick up to three.`, L.voteShort),
          C.map((c) => el("div", { style: "display:flex; align-items:center; gap:14px; margin:5px 0;" },
            el("div", { style: "width:52px; flex:none; font-size:26px;" }, c.id),
            el("div", { style: "flex:1; font-size:27px;" }, c.text, el("span", { style: M }, ` · ${c.pairs} ${c.pairs === 1 ? "proposal" : "proposals"}`)),
            el("div", { style: "width:170px; flex:none; background:#ecebe6; height:24px;" }, el("div", { style: `height:24px; width:${100 * (live.votes[c.id] || 0) / maxv}%; background:#111;` })),
            el("div", { style: "width:44px; flex:none; font-size:26px;" }, String(live.votes[c.id] || 0)))),
          el("div", { class: "row", style: "margin-top:12px;" }, button("Test the top three with Qwen", () => act("test", 150), "primary"), button("Merge again", () => act("merge", 45), "quiet tiny-btn"), busyNote(), err()));
        return;
      }
      const P = live.proposals;
      swap(body, steps(0), qr("img/form_propose_qr.png", L.proposeUrl, `${P.length} ${P.length === 1 ? "rule" : "rules"} proposed. Everyone can send rules.`, L.proposeShort),
        el("div", {}, P.slice(-6).map((r) => el("div", { style: M + " font-size:26px; margin:4px 0; font-style:italic;" }, `“${r.text}”`))),
        el("div", { class: "row", style: "margin-top:12px;" }, button("Merge with Claude", () => act("merge", 45), "primary"), busyNote(), err()));
    }
    live.listeners.push(() => { const cur = window.Reveal && Reveal.getCurrentSlide(); if (cur && cur.contains(root)) render(); });
    render();
    put(root, body);
  };

  /* Clicker steps: empty fragments with class cls after a demo. apply(n) gets the number of visible ones
     whenever it changes on this slide, so the clicker (and going back) drives the demo. */
  function fragSteps(root, cls, apply) {
    const sec = root.closest("section");
    let shown = -1;
    const step = () => {
      if (!window.Reveal || Reveal.getCurrentSlide() !== sec) return;
      const n = sec.querySelectorAll("." + cls + ".visible").length;
      if (n !== shown) { const prev = shown; shown = n; apply(n, prev); }
    };
    if (window.Reveal) { Reveal.on("fragmentshown", step); Reveal.on("fragmenthidden", step); Reveal.on("slidechanged", step); Reveal.on("ready", step); }
  }

  /* 4. One comment, ten real runs per model, revealed one at a time (slide 46).
     The comment is comment 2 of the hand-coding slides, so the first five Qwen runs are the ones the room saw. */
  builders.dice = function (root) {
    const d = D.dice;
    let n = 0;
    const max = d.models[0].runs.length;
    const k5 = D.coder5.findIndex((c) => c.text === d.text);
    const rows = d.models.map(() => ({ dots: el("div", { class: "dc-dots" }), tally: el("div", { class: "dc-tally" }) }));
    const draw = () => rows.forEach((r, k) => {
      const runs = d.models[k].runs;
      swap(r.dots, runs.map((lab, j) => el("i", { class: j < n ? (lab === "yes" ? "y" : "n") : "e" })));
      const seen = runs.slice(0, n), ny = seen.filter((x) => x === "yes").length;
      swap(r.tally, n ? `${ny} yes · ${n - ny} no` : "");
      r.dots.classList.remove("wrong");
      if (n >= max) {   // after the last run: is the majority label right?
        const right = (ny * 2 > n ? "yes" : "no") === d.truth;
        r.tally.append(el("div", { class: right ? "dc-right" : "dc-wrong" }, right ? "mostly right" : "mostly wrong"));
        if (!right) r.dots.classList.add("wrong");
      }
    });
    // One click plays the ten runs one after another; going back clears them.
    let timer = null;
    fragSteps(root, "dc-step", (k) => {
      clearInterval(timer);
      if (!k) { n = 0; draw(); return; }
      timer = setInterval(() => { if (n < max) { n++; draw(); } else clearInterval(timer); }, 450);
    });
    draw();
    root.classList.add("dice");
    put(root,
      el("div", { class: "dc-top" },
        el("div", { class: "dc-text" }, k5 >= 0 ? el("span", { class: "dc-k" }, `Comment ${k5 + 1} · `) : null, d.text),
        el("div", { class: "dc-key" }, el("div", {}, "gold label"), el("span", { class: "hc-key" + (d.truth === "yes" ? " y" : "") }, d.truth))),
      d.models.map((mo, k) => el("div", { class: "dc-row" }, el("div", { class: "dc-name" }, mo.name), rows[k].dots, rows[k].tally)));
  };

  /* 5. Each model against itself, then all six against each other. */
  builders.bars = function (root) {
    const rows = D.models.map((mo) => ({ name: mo.name, v: mo.identical }));
    const mk = (r, cls) => {
      const fill = el("div", { class: "fill" });
      const row = el("div", { class: "bar-row " + (cls || "") }, el("div", {}, r.name), el("div", { class: "track" }, fill), el("div", { class: "val" }, pct(r.v)));
      row.grow = () => (fill.style.width = 100 * r.v + "%");
      return row;
    };
    const list = rows.map((r) => mk(r));
    const all = mk({ name: "Same label from all six models", v: D.all_agree }, "all hidden");
    const ask = button("All six models", () => { all.classList.remove("hidden"); all.grow(); ask.disabled = true; }, "primary");
    root.classList.add("bars");
    put(root, el("div", { class: "note", style: "margin-bottom:8px" }, "Share of 100 comments with the same label in all five runs"), list, all, el("div", { class: "row", style: "margin-top:16px" }, ask));
    root.onshow = () => setTimeout(() => list.forEach((r) => r.grow()), 150);
  };

  /* 5b. Held-out test: did the rules raise agreement between the six models? */
  builders.heldout = function (root) {
    const rows = D.heldout.map((h) => [h.name, h.all_agree]);
    const made = rows.map(([name, v], i) => {
      const fill = el("div", { class: "fill" });
      const row = el("div", { class: "bar-row" + (i === 1 ? " all" : "") + (i ? " hidden" : "") }, el("div", {}, name), el("div", { class: "track" }, fill), el("div", { class: "val" }, pct(v)));
      row.grow = () => { row.classList.remove("hidden"); fill.style.width = 100 * v + "%"; };
      return row;
    });
    let n = 1;
    const next = button("Codebook with rules", () => {
      made[n].grow(); n++;
      next.disabled = true;
    }, "primary");
    root.classList.add("bars");
    put(root, el("div", { class: "note", style: "margin-bottom:8px" }, "Share of 100 held-out comments where all six models give the same label"), made, el("div", { class: "row", style: "margin-top:16px" }, next));
    root.onshow = () => setTimeout(() => made[0].grow(), 150);
  };

  /* 6. Speeches the six models split on: the room answers first. */
  builders.split = function (root) {
    const br = root.dataset.source === "br";
    const items = br ? BR.split : D.split, cats = br ? BR.cats : D.cats;
    let i = 0;
    const body = el("div");
    const render = () => {
      const s = items[i];
      const rev = el("div", { class: "reveal-row" });
      const show = () => swap(rev, s.models.map((mo) => el("span", { class: "who" }, mo.name, chip(mo.label))), s.truth ? el("span", { class: "who" }, "Gold label", el("span", { class: "chip " + s.truth }, s.truth)) : null);
      const choices = el("div", { class: "choices" }, cats.map((c) => { const b = button(NAMES[c], () => b.classList.toggle("picked")); return b; }));
      swap(body, br ? speech(s) : card(s), choices,
        el("div", { class: "row", style: "margin-top:12px" }, button("Six models", show, "primary"),
          items.length > 1 ? el("div", { class: "pager" }, el("span", { class: "note" }, `${i + 1} of ${items.length}`), button("Next →", () => { i = (i + 1) % items.length; render(); }, "quiet")) : null),
        rev);
    };
    render();
    put(root, body);
  };

  /* 7. Multiple choice: the coder who never reads. */
  builders.lazy = function (root) {
    const L = D.lazy, right = L.always_no;
    const opts = [34, 50, right, 85].sort((a, b) => a - b);
    const explain = el("div", { class: "explain" });
    const buttons = opts.map((o) => button(o + " of " + L.n, () => {
      buttons.forEach((b, k) => b.classList.add(opts[k] === right ? "right" : "wrong"));
      swap(explain,
        el("p", {}, `${right} of the ${L.n} held-out comments are not hostile, so answering no to every comment matches ${right}. Qwen with the one-line codebook matches ${L.qwen}.`),
        el("p", {}, "Raw agreement is high when one label is common. Krippendorff’s α measures agreement beyond chance (1 = perfect, 0 = chance). For this coder α is 0."));
    }));
    root.classList.add("quiz");
    put(root, el("p", { class: "mid", style: "margin-bottom:6px" }, `Number of the ${L.n} held-out comments on which a coder who always answers no matches our gold labels:`), el("div", { class: "options" }, buttons), explain);
  };

  /* 8. Qwen by DeepSeek: click a cell to read a speech they split on. */
  builders.matrix = function (root) {
    const C = D.confusion, cats = D.cats;
    const cell = (r, c) => C.cells.find((x) => x.row === r && x.col === c);
    const max = Math.max(...C.cells.map((x) => x.n));
    const detail = el("div", { class: "detail" });
    const tds = [];
    function select(x, td) {
      tds.forEach((t) => t.classList.remove("sel")); td.classList.add("sel");
      let k = 0;
      const show = () => {
        const ex = x.examples[k];
        swap(detail, 
          el("div", { class: "row", style: "margin-bottom:10px" }, el("span", { class: "note" }, "Qwen"), chip(x.row), el("span", { class: "note" }, "DeepSeek"), chip(x.col),
            el("span", { class: "note" }, x.n === 1 ? "1 comment" : x.n + " comments")),
          card(ex),
          x.examples.length > 1 ? el("div", { class: "row", style: "margin-top:10px" }, button("Next comment", () => { k = (k + 1) % x.examples.length; show(); }, "quiet")) : null);
      };
      show();
    }
    const table = el("table", {},
      el("thead", {}, el("tr", {}, el("th", {}), cats.map((c) => el("th", {}, NAMES[c].replace(" ", " "))))),
      el("tbody", {}, cats.map((r) => el("tr", {}, el("th", {}, NAMES[r]), cats.map((c) => {
        const x = cell(r, c);
        const a = x.n ? 0.12 + 0.88 * Math.sqrt(x.n / max) : 0;
        const td = el("td", { class: (r === c ? "diag " : "") + (x.n ? "has" : ""), style: `background:rgba(26,20,16,${a});color:${a > 0.55 ? "#fff" : "#1a1a19"}` }, x.n ? String(x.n) : "");
        if (x.n) td.addEventListener("click", () => select(x, td));
        tds.push(td); td._x = x;
        return td;
      })))));
    root.classList.add("matrix");
    put(root, el("div", {}, el("div", { class: "axis", style: "margin:0 0 4px 64px" }, "DeepSeek says →"), table, el("div", { class: "axis", style: "margin-top:6px" }, "↑ Qwen says · 100 comments")), detail);
    const first = tds.find((t) => t._x.row === "no" && t._x.col === "yes");
    if (first) select(first._x, first);
  };

  /* 9. Reliability and validity as darts on a target. */
  /* Reliability against validity (slide 47). Starts with Qwen on the five comments of slide 42 (the same label in all
     five runs except comment 1, which splits 2 to 3, so α = 0.45; 4 of 5 right), moves Qwen to the working set (α 0.90, 79%), then the other five models. Numbers from the guide,
     "Each model against itself" (working_100, one-line prompt, 5 runs each). Clicks: the two empty fragments after the demo. */
  /* Small looping animations. Each runs only while its slide is showing (and its fragment, if any, is visible). */
  const loopActive = (root) => {
    const sec = root.closest("section");
    if (!window.Reveal || Reveal.getCurrentSlide() !== sec) return false;
    const fr = root.closest(".fragment");
    return !fr || fr.classList.contains("visible");
  };

  /* Slide 3: the next word is drawn again and again from the bars, so the sentence ends differently. */
  builders.nextword = function (root) {
    const sec = root.closest("section"), box = root.parentElement;
    const blank = sec.querySelector('span[style*="border-bottom:4px"]');
    const rows = [...box.children].filter((d) => d.querySelector && d.querySelector("div > div"));
    if (!blank || rows.length < 2) return;
    const P = rows.map((r) => parseFloat(r.lastElementChild.textContent) || 1);
    const bars = rows.map((r) => r.querySelector("div > div")), names = rows.map((r) => r.firstElementChild);
    blank.style.textAlign = "center"; blank.style.color = "#d9481f"; blank.style.width = "220px";
    const show = (k) => rows.forEach((r, i) => { bars[i].style.background = i === k ? "#d9481f" : "#8a8a84"; names[i].style.fontWeight = i === k ? "700" : "400"; });
    let phase = 0;
    setInterval(() => {
      if (!loopActive(root)) { phase = 0; return; }
      if (phase === 0) {
        let r = Math.random() * P.reduce((a, b) => a + b), k = 0;
        while (r > P[k] && k < P.length - 1) { r -= P[k]; k++; }
        show(k); blank.textContent = names[k].textContent;
      } else if (phase === 3) { blank.innerHTML = "&nbsp;"; show(-1); }
      phase = (phase + 1) % 4;
    }, 800);
  };

  /* Slide 51: ten runs of the same comment. In each run a pin lands on the chance strip (no 62%, yes 38%).
     Default: the pin lands at random, so some runs say yes. Greedy: the pin always lands on the most likely label. */
  builders.stloop = function (root) {
    const sec = root.closest("section"), cols = [...sec.querySelectorAll(".st-col")].slice(0, 2);
    if (cols.length < 2) return;
    const dots = cols.map((c) => [...c.querySelectorAll(".st-dots i")]);
    const pins = cols.map((c) => c.querySelector(".st-pin"));
    const segs = cols.map((c) => [c.querySelector(".st-strip .no"), c.querySelector(".st-strip .yes")]);
    const reset = () => {
      dots.forEach((ds) => ds.forEach((d) => { d.className = ""; }));
      pins.forEach((p) => { p.style.opacity = 0; });
      segs.forEach((ss) => ss.forEach((x) => x.classList.remove("hit")));
    };
    const land = (c, x, n) => {
      const yes = x >= 62;
      pins[c].style.opacity = 1; pins[c].style.left = x + "%";
      segs[c][0].classList.toggle("hit", !yes); segs[c][1].classList.toggle("hit", yes);
      dots[c][n].className = yes ? "y" : "n";
    };
    let n = -1;
    setInterval(() => {
      if (!loopActive(root)) { n = -1; reset(); return; }
      if (n === -1) { reset(); n = 0; return; }
      if (n < 10) { land(0, 2 + Math.random() * 96, n); land(1, 31, n); }
      else segs.forEach((ss) => ss.forEach((x) => x.classList.remove("hit")));
      n = n >= 14 ? -1 : n + 1;
    }, 1000);
  };

  /* Slide 4: the agent works in a loop: the LLM calls a tool, looks at the result, and goes on. */
  builders.agentloop = function (root) {
    const svg = root.parentElement.querySelector("svg");
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg", O = "#d9481f";
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("r", "11"); dot.setAttribute("fill", O); dot.style.display = "none";
    svg.appendChild(dot);
    const texts = [...svg.querySelectorAll("text")];
    const label = (s) => texts.find((t) => t.textContent.trim() === s);
    const legs = [
      [[375, 145], [195, 72], "read and write files"],
      [[375, 185], [195, 252], "run commands"],
      [[525, 185], [705, 252], "check the results"],
      [[375, 145], [195, 72], "read and write files"],
      [[525, 145], [705, 72], "use the internet"],
      [[525, 185], [705, 252], "check the results"],
    ];
    const LEG = 1600;
    let t0 = null;
    const frame = (now) => {
      if (!loopActive(root)) { dot.style.display = "none"; texts.forEach((t) => { if (t.textContent.trim() !== "LLM") t.setAttribute("fill", "#111"); }); t0 = null; requestAnimationFrame(frame); return; }
      if (t0 === null) t0 = now;
      const t = (now - t0) % (LEG * legs.length), i = Math.floor(t / LEG), f = (t % LEG) / LEG;
      const [a, b, name] = legs[i], u = f < 0.5 ? f * 2 : (1 - f) * 2;
      dot.style.display = ""; dot.setAttribute("cx", a[0] + (b[0] - a[0]) * u); dot.setAttribute("cy", a[1] + (b[1] - a[1]) * u);
      texts.forEach((tx) => { if (tx.textContent.trim() !== "LLM") tx.setAttribute("fill", tx === label(name) && f > 0.35 && f < 0.75 ? O : "#111"); });
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  /* Slide 18: the agent's log appears line by line, as if it were happening now, then starts again. */
  builders.logtype = function (root) {
    const pane = root.closest("section").querySelector(".mainpane");
    if (!pane) return;
    const lines = [...pane.children].filter((d) => !d.classList.contains("demo") && !d.classList.contains("user"));
    lines.forEach((d) => { d.style.transition = "opacity .35s, transform .35s"; });
    const set = (n) => lines.forEach((d, i) => { d.style.opacity = i < n ? "1" : "0"; d.style.transform = i < n ? "none" : "translateY(6px)"; });
    let n = 0;
    setInterval(() => {
      if (!loopActive(root)) { set(lines.length); n = 0; return; }
      set(n);
      n = n >= lines.length + 4 ? 0 : n + 1;
    }, 900);
  };

  /* Slide 34: one comment at a time goes from the text column through label.py and Qwen into the runs.
     The gold label column never lights up. */
  builders.colflow = function (root) {
    const sec = root.closest("section");
    const grid = sec.querySelector('div[style*="grid-template-columns:300px 50px 230px"]');
    if (!grid) return;
    const kids = [...grid.children];
    const csv = kids.find((k) => k.textContent.includes("working_100.csv"));
    const textCol = csv && csv.querySelector('div[style*="outline"]');
    const rows = textCol ? [...textCol.children].slice(1) : [];
    const py = kids.find((k) => k.textContent.trim().startsWith("label.py"));
    const qwen = kids.find((k) => k.textContent.includes("Qwen"));
    const arrows = kids.filter((k) => k.textContent.trim() === "→");
    const stack = kids[kids.length - 1];
    const cards = stack ? [...stack.children] : [];
    const front = cards[cards.length - 1];
    if (!rows.length || !py || !qwen || !front) return;
    const O = "#d9481f";
    const base = () => {
      rows.forEach((r) => { r.style.color = "#555"; r.style.background = ""; });
      [py, qwen].forEach((b) => { b.style.borderColor = "#111"; });
      arrows.forEach((a) => { a.style.color = ""; });
      front.style.borderColor = "#111";
    };
    const frontLines = front.innerHTML.split("<br>");
    let tick = 0;
    setInterval(() => {
      if (!loopActive(root)) { base(); front.innerHTML = frontLines.join("<br>"); tick = 0; return; }
      const row = Math.floor(tick / 5) % rows.length, ph = tick % 5;
      base();
      if (ph === 0) { rows[row].style.background = "#fbe3d9"; rows[row].style.color = "#111"; }
      if (ph === 1) { arrows[0] && (arrows[0].style.color = O); py.style.borderColor = O; }
      if (ph === 2) { arrows[1] && (arrows[1].style.color = O); qwen.style.borderColor = O; }
      if (ph === 3) {
        arrows[2] && (arrows[2].style.color = O); front.style.borderColor = O;
        front.innerHTML = frontLines.map((l, i) => i === row + 1 ? `<b style="color:${O}">${l}</b>` : l).join("<br>");
      }
      if (ph === 4) front.innerHTML = frontLines.join("<br>");
      tick++;
    }, 650);
  };

  /* Slide 42: a second coder goes over the 21 judgment calls and says the opposite on some of them. */
  builders.goldflip = function (root) {
    const sec = root.closest("section");
    const cells = [...sec.querySelectorAll('div[style*="width:28px; height:28px"]')];
    const calls = cells.filter((c) => c.textContent.trim() === "?");
    if (!calls.length) return;
    const orig = calls.map((c) => c.getAttribute("style"));
    const BLACK = "background:#111; color:#fff;", WHITE = "background:#fff; border:2px solid #bbb; color:#999;";
    const legend = sec.querySelector('div[style*="margin-top:14px"]');
    const cap = el("div", { style: "font-size:22px; margin-top:12px; min-height:30px; color:#d9481f; font-weight:600;" });
    if (legend) legend.appendChild(cap);
    const flipStyle = (s) => {
      const head = s.split("font-weight:700;")[0] + "font-weight:700;";
      return head + (s.includes("#111") ? WHITE : BLACK) + " outline:3px solid #d9481f; outline-offset:-1px;";
    };
    let tick = 0, pick = [];
    setInterval(() => {
      if (!loopActive(root)) { calls.forEach((c, i) => c.setAttribute("style", orig[i])); cap.textContent = ""; tick = 0; return; }
      if (tick === 0) {
        calls.forEach((c, i) => c.setAttribute("style", orig[i])); cap.textContent = "Our labels";
        pick = calls.map((c, i) => i).sort(() => Math.random() - 0.5).slice(0, 8 + Math.floor(Math.random() * 6));
      } else if (tick <= pick.length) {
        const i = pick[tick - 1]; calls[i].setAttribute("style", flipStyle(orig[i]));
        cap.textContent = `A second coder disagrees on ${tick} of 21`;
      }
      tick = tick >= pick.length + 6 ? 0 : tick + 1;
    }, 420);
  };

  /* "What is an API?": two ways into the same model. Before any click, one comment goes through the chat app
     again and again, and a paragraph comes back. Click: label.py sends 100 comments through the API and saves 100 labels. */
  builders.apiflow = function (root) {
    const NS = "http://www.w3.org/2000/svg", O = "#d9481f";
    const W = 1000, H = 360;
    const fs = (n, c, w) => `style="font-size:${n}px; fill:${c || "#111"};${w ? ` font-weight:${w};` : ""}"`;
    let g = `<rect x="600" y="10" width="380" height="330" rx="10" style="fill:none; stroke:#999; stroke-width:2; stroke-dasharray:7 6"/>`;
    g += `<text x="790" y="42" text-anchor="middle" ${fs(24, "#555")}>the company’s server</text>`;
    g += `<rect x="760" y="66" width="170" height="228" rx="12" style="fill:#111"/><text x="845" y="194" text-anchor="middle" ${fs(40, "#fff", 700)}>LLM</text>`;
    g += `<rect x="560" y="66" width="150" height="64" rx="10" style="fill:#fff; stroke:#111; stroke-width:2"/><text x="635" y="107" text-anchor="middle" ${fs(28)}>chat app</text>`;
    g += `<rect x="560" y="230" width="150" height="64" rx="10" style="fill:#fff; stroke:${O}; stroke-width:3"/><text x="635" y="273" text-anchor="middle" ${fs(32, O, 700)}>API</text>`;
    g += `<line x1="710" y1="98" x2="760" y2="98" style="stroke:#bbb; stroke-width:2.5"/><line x1="710" y1="262" x2="760" y2="262" style="stroke:#bbb; stroke-width:2.5"/>`;
    g += `<circle cx="70" cy="78" r="17" style="fill:none; stroke:#111; stroke-width:3"/><path d="M40,128 q30,-40 60,0" style="fill:none; stroke:#111; stroke-width:3; stroke-linecap:round"/><text x="70" y="164" text-anchor="middle" ${fs(28)}>you</text>`;
    g += `<path d="M45,224 h50 l18,18 v62 h-68 z" style="fill:#fff; stroke:#111; stroke-width:3; stroke-linejoin:round"/><path d="M95,224 v18 h18" style="fill:none; stroke:#111; stroke-width:3; stroke-linejoin:round"/>`;
    g += `<text x="79" y="281" text-anchor="middle" ${fs(24, "#111", 700)}>.py</text><text x="79" y="336" text-anchor="middle" ${fs(28)}>label.py</text>`;
    g += `<line x1="130" y1="98" x2="560" y2="98" style="stroke:#e2e2dc; stroke-width:2"/><line x1="130" y1="262" x2="560" y2="262" style="stroke:#f3d3c6; stroke-width:2"/>`;
    g += `<g class="af-chat"></g><g class="af-dots"></g>`;
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("width", 880); svg.setAttribute("height", Math.round(H * 0.88));
    svg.style.cssText = "font-family:inherit; overflow:visible; display:block; margin:0 auto;";
    svg.innerHTML = g;
    const chatG = svg.querySelector(".af-chat"), dotG = svg.querySelector(".af-dots");
    const capChat = el("div", { class: "af-cap", style: "font-size:27px; color:#555; min-height:34px; text-align:left;" });
    const capApi = el("div", { class: "af-cap", style: "font-size:27px; color:" + O + "; min-height:34px; text-align:left;" });
    const file = el("div", { style: "font-family:'JetBrains Mono',ui-monospace,Menlo,monospace; font-size:21px; line-height:1.4; border:2px solid #111; border-radius:8px; padding:8px 14px; width:330px; text-align:left; background:#fff; visibility:hidden; margin-top:6px;" });
    put(root, svg, el("div", { style: "display:grid; grid-template-columns:1fr 1fr; gap:30px; margin-top:4px; align-items:start;" }, capChat, el("div", {}, capApi, file)));
    const LBL = ["yes", "no", "no", "yes", "no", "yes", "no", "no", "yes", "no"];
    let raf = null, shown = -1;
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = null; };
    const lerpPath = (pts, t) => {
      const segs = []; let tot = 0;
      for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); tot += d; }
      let s = Math.max(0, Math.min(1, t)) * tot;
      for (let i = 0; i < segs.length; i++) { if (s <= segs[i]) { const f = segs[i] ? s / segs[i] : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]; } s -= segs[i]; }
      return pts[pts.length - 1];
    };
    const bubble = (x, y, w, txt, dark) => `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="-22" width="${w}" height="44" rx="22" style="fill:${dark ? "#111" : "#fff"}; stroke:#111; stroke-width:2"/><text x="0" y="8" text-anchor="middle" style="font-size:25px; fill:${dark ? "#fff" : "#111"}">${txt}</text></g>`;
    const CHAT_OUT = [[200, 98], [560, 98], [760, 98]], CHAT_BACK = [[760, 112], [560, 112], [200, 112]];
    const API_OUT = [[130, 256], [560, 256], [760, 256]], API_BACK = [[760, 270], [560, 270], [130, 270]];
    function chatLoop() {
      stop(); dotG.innerHTML = ""; file.style.visibility = "hidden"; capApi.textContent = "";
      capChat.textContent = "One comment, typed by hand. The answer is a paragraph.";
      const t0 = performance.now(), D1 = 1500, D2 = 1700, REST = 900, P = D1 + D2 + REST;
      const frame = (now) => {
        const t = (now - t0) % P;
        if (t < D1) { const [x, y] = lerpPath(CHAT_OUT, t / D1); chatG.innerHTML = bubble(x, y, 380, "Is “Your aunt is a…” hostile?", false); }
        else if (t < D1 + D2) { const [x, y] = lerpPath(CHAT_BACK, (t - D1) / D2); chatG.innerHTML = bubble(x, y, 430, "Yes. Calling her a… (a paragraph)", true); }
        else chatG.innerHTML = "";
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }
    function api(animate) {
      stop(); chatG.innerHTML = ""; capChat.textContent = "";
      const N = 100, GAP = 45, TRIP = 1100, t0 = performance.now();
      file.style.visibility = "visible";
      const frame = (now) => {
        const t = animate ? now - t0 : N * GAP + 2 * TRIP;
        let h = "", done = 0;
        for (let i = 0; i < N; i++) {
          const s = t - i * GAP; if (s < 0) break;
          if (s < TRIP) { const [x, y] = lerpPath(API_OUT, s / TRIP); h += `<circle cx="${x}" cy="${y}" r="7" style="fill:${O}"/>`; }
          else if (s < 2 * TRIP) { const [x, y] = lerpPath(API_BACK, (s - TRIP) / TRIP); h += `<circle cx="${x}" cy="${y}" r="7" style="fill:#111"/>`; }
          else done++;
        }
        dotG.innerHTML = h;
        const last = [];
        for (let k = Math.max(0, done - 2); k < done; k++) last.push(`comment ${k + 1}, ${LBL[k % LBL.length]}`);
        file.innerHTML = `<div style="color:#6f6f69;">runs/labels.csv</div>` + (last.length ? last.join("<br>") : "&nbsp;");
        capApi.textContent = `${done} of ${N} labels saved. Same prompt and settings each time.`;
        if (done < N) raf = requestAnimationFrame(frame); else raf = null;
      };
      raf = requestAnimationFrame(frame);
    }
    const step = () => {
      const sec = root.closest("section");
      const here = window.Reveal && Reveal.getCurrentSlide() === sec;
      if (!here) { stop(); shown = -1; return; }
      const n = sec.querySelectorAll(".af-step.visible").length;
      if (n === shown) return; const prev = shown; shown = n;
      if (n === 0) chatLoop(); else api(prev === 0);
    };
    if (window.Reveal) { Reveal.on("fragmentshown", step); Reveal.on("fragmenthidden", step); Reveal.on("slidechanged", () => { shown = -1; step(); }); Reveal.on("ready", step); }
    step();
  };

  builders.relval = function (root) {
    const M = [["Claude Haiku", 0.94, 84], ["Gemini Flash-Lite", 0.88, 89], ["Ministral 8B", 0.93, 69], ["GPT-6 Luna", 0.88, 69], ["DeepSeek", 0.74, 79]];
    const Q5 = [0.45, 80], Q100 = [0.90, 79];
    const W = 780, H = 480, L = 90, R = 30, T = 20, B = 70;
    const X0 = 0.4, x = (v) => L + (v - X0) / (1 - X0) * (W - L - R), y = (v) => T + (100 - v) / 70 * (H - T - B);
    const fs = (n) => `style="font-size:${n}px"`;
    let g = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">`;
    g += `<rect x="${x(0.8)}" y="${y(100)}" width="${x(1) - x(0.8)}" height="${y(70) - y(100)}" fill="#f0efea"/>`;
    g += `<line x1="${x(0.8)}" x2="${x(0.8)}" y1="${y(30)}" y2="${y(100)}" stroke="#bbb" stroke-dasharray="4 6" stroke-width="2"/>`;
    g += `<text x="${x(0.8) + 6}" y="${y(32)}" ${fs(18)} fill="#888">α = 0.8</text>`;
    g += `<text x="${x(0.99)}" y="${y(98)}" text-anchor="end" ${fs(20)} fill="#888">reliable and valid</text>`;
    g += `<g class="rv-late"><line x1="${x(X0)}" x2="${x(1)}" y1="${y(60)}" y2="${y(60)}" stroke="#888" stroke-dasharray="6 6" stroke-width="2"/>`;
    g += `<text x="${x(X0 + 0.01)}" y="${y(60) + 24}" ${fs(20)} fill="#888">always “no”: 60%</text></g>`;
    for (const v of [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]) g += `<line x1="${x(v)}" y1="${y(30)}" x2="${x(v)}" y2="${y(30) + 6}" stroke="#111"/><text x="${x(v)}" y="${y(30) + 28}" text-anchor="middle" ${fs(20)} fill="#555">${v.toFixed(1)}</text>`;
    for (const v of [30, 50, 70, 90]) g += `<line x1="${x(X0) - 6}" y1="${y(v)}" x2="${x(X0)}" y2="${y(v)}" stroke="#111"/><text x="${x(X0) - 10}" y="${y(v) + 6}" text-anchor="end" ${fs(20)} fill="#555">${v}%</text>`;
    g += `<line x1="${x(X0)}" y1="${y(30)}" x2="${x(1)}" y2="${y(30)}" stroke="#111" stroke-width="2"/><line x1="${x(X0)}" y1="${y(30)}" x2="${x(X0)}" y2="${y(100)}" stroke="#111" stroke-width="2"/>`;
    g += `<text x="${(x(X0) + x(1)) / 2}" y="${H - 8}" text-anchor="middle" ${fs(22)} fill="#111"><tspan style="font-weight:700">Reliability →</tspan><tspan dx="12" style="fill:#555">α across 5 runs</tspan></text>`;
    g += `<text transform="translate(22 ${(y(30) + y(100)) / 2}) rotate(-90)" text-anchor="middle" ${fs(22)} fill="#111"><tspan style="font-weight:700">Validity →</tspan><tspan dx="12" style="fill:#555">% matching the gold labels</tspan></text>`;
    const place = { "Claude Haiku": [-14, 7, "end"], "GPT-6 Luna": [-14, 7, "end"], "Ministral 8B": [0, 34, "middle"], "Gemini Flash-Lite": [-14, 7, "end"], "DeepSeek": [-14, 7, "end"] };
    for (const [n, a, b] of M) {
      const hi = n === "Ministral 8B", [dx, dy, anc] = place[n] || [14, 7, "start"];
      g += `<g class="rv-late"><circle cx="${x(a)}" cy="${y(b)}" r="10" fill="${hi ? "#d9481f" : "#111"}"/><text x="${x(a) + dx}" y="${y(b) + dy}" text-anchor="${anc}" ${fs(21)} fill="${hi ? "#d9481f" : "#111"}" >${n}</text></g>`;
    }
    g += `<circle class="rv-q" r="13" fill="#111" style="cx:${x(Q5[0])}px; cy:${y(Q5[1])}px"/>`;
    g += `<text class="rv-ql" ${fs(22)} font-weight="700" fill="#111" x="${x(Q5[0]) + 20}" y="${y(Q5[1]) + 7}" text-anchor="start">Qwen, today’s 5 comments</text>`;
    g += `<text class="rv-ql2" ${fs(21)} fill="#111" x="${x(Q100[0]) - 16}" y="${y(Q100[1]) + 7}" text-anchor="end">Qwen, 100 comments</text>`;
    g += `<text class="rv-ql3" ${fs(21)} fill="#111" x="${x(Q100[0]) - 16}" y="${y(Q100[1]) + 7}" text-anchor="end">Qwen</text>`;
    g += "</svg>";
    root.classList.add("relval");
    put(root, el("div", { class: "rv-chart", html: g }), el("p", { class: "muted rv-cap" }, "All models: 100 comments, one-line prompt, 5 runs each"));
    const step = () => {
      const sec = root.closest("section");
      const n = sec ? sec.querySelectorAll(".rv-step.visible").length : 2;
      const q = root.querySelector(".rv-q"), at = n >= 1 ? Q100 : Q5;
      q.style.cx = x(at[0]) + "px"; q.style.cy = y(at[1]) + "px"; q.style.r = n >= 1 ? "10px" : "13px";
      root.dataset.step = n;
    };
    if (window.Reveal) { Reveal.on("fragmentshown", step); Reveal.on("fragmenthidden", step); Reveal.on("slidechanged", step); }
    step();
  };

  builders.target = function (root) {
    const S = 330, c = S / 2;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const pts = Array.from({ length: 28 }, () => { const u = rnd(), v = rnd(); const r = Math.sqrt(-2 * Math.log(u)); return [r * Math.cos(6.2832 * v), r * Math.sin(6.2832 * v)]; });
    const s = svg("svg", { viewBox: `0 0 ${S} ${S}`, width: S, height: S, role: "img" });
    for (const r of [150, 110, 70, 30]) s.append(svg("circle", { cx: c, cy: c, r, fill: r === 30 ? "#fbe9b8" : "none", stroke: "#b9b8b2", "stroke-width": 1.5 }));
    const darts = pts.map(() => { const d = svg("circle", { r: 6, fill: "#1a1410", stroke: "#fff", "stroke-width": 1.5 }); s.append(d); return d; });
    let rel = 90, val = 20;
    const say = el("div", { class: "say" });
    function draw() {
      const spread = 3 + (100 - rel) * 0.42, off = (100 - val) * 1.05;
      darts.forEach((d, i) => { d.setAttribute("cx", Math.max(8, Math.min(S - 8, c + off * 0.72 + pts[i][0] * spread))); d.setAttribute("cy", Math.max(8, Math.min(S - 8, c - off * 0.62 + pts[i][1] * spread))); });
      const R = rel >= 60, V = val >= 60;
      say.textContent = R && V ? "The same label every time, and the correct one."
        : R && !V ? "The same label every time, and the wrong one. A model that always says no behaves like this."
        : !R && V ? "Correct on average, but single labels vary from run to run."
        : "Labels vary from run to run, and they are wrong on average.";
    }
    const sr = slider("Reliability", 0, 100, 1, rel, (v) => (v >= 60 ? "high" : v >= 30 ? "medium" : "low"), (v) => { rel = v; draw(); });
    const sv = slider("Validity", 0, 100, 1, val, (v) => (v >= 60 ? "high" : v >= 30 ? "medium" : "low"), (v) => { val = v; draw(); });
    const preset = (name, r, v) => button(name, () => { rel = r; val = v; sr.set(r); sv.set(v); draw(); }, "quiet");
    root.classList.add("target");
    put(root, s, el("div", { class: "controls-col" },
      el("div", { class: "presets" }, preset("Reliable and valid", 95, 97), preset("Reliable only", 95, 15), preset("Valid only on average", 10, 95), preset("Neither", 10, 20)),
      sr, sv, say));
    draw();
  };

  /* 12. Errors that differ by group create a gap; a hand-coded sample removes it. Illustration. */
  builders.gap = function (root) {
    const truth = 0.40, e = 0.12; // true share in both groups; model and hand labels differ on 12% of texts
    let bias = [4, 0], N = 400, n = 0;
    const W = 600, H = 300, m = { l: 150, r: 20, t: 34, b: 44 };
    const x = (v) => m.l + ((v - 0.28) / (0.56 - 0.28)) * (W - m.l - m.r);
    const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: "img" });
    for (const v of [0.3, 0.35, 0.4, 0.45, 0.5, 0.55]) {
      s.append(svg("line", { class: "grid", x1: x(v), x2: x(v), y1: m.t, y2: H - m.b }));
      const t = svg("text", { x: x(v), y: H - m.b + 22, "text-anchor": "middle" }); t.textContent = pct(v); s.append(t);
    }
    s.append(svg("line", { x1: x(truth), x2: x(truth), y1: m.t - 8, y2: H - m.b, stroke: "#1a1a19", "stroke-width": 2, "stroke-dasharray": "5 4" }));
    const tt = svg("text", { x: x(truth), y: m.t - 14, "text-anchor": "middle" }); tt.textContent = "True share in both groups: 40% (simulated)"; s.append(tt);
    const rows = ["Group A", "Group B"].map((name, g) => {
      const yy = m.t + 62 + g * 96;
      const t = svg("text", { x: m.l - 14, y: yy + 5, "text-anchor": "end", style: "font-size:17px;fill:#1a1a19;font-weight:600" }); t.textContent = name; s.append(t);
      const mk = (col, dy) => { const w = svg("line", { stroke: col, "stroke-width": 3, "stroke-linecap": "round", y1: yy + dy, y2: yy + dy }); const d = svg("circle", { r: 8, fill: col, stroke: "#fff", "stroke-width": 2, cy: yy + dy }); s.append(w, d); return { w, d }; };
      return { naive: mk("#1a1410", -12), fixed: mk("#7a2418", 14) };
    });
    const readout = el("div", { class: "readout" });
    function draw() {
      const seN = Math.sqrt((truth * (1 - truth)) / N);
      const seC = n ? Math.sqrt((truth * (1 - truth)) / N + e / n) : 0;
      rows.forEach((r, g) => {
        const est = truth + bias[g] / 100;
        r.naive.d.setAttribute("cx", x(est)); r.naive.w.setAttribute("x1", x(Math.max(0.28, est - 1.96 * seN))); r.naive.w.setAttribute("x2", x(Math.min(0.56, est + 1.96 * seN)));
        const vis = n ? "visible" : "hidden";
        r.fixed.d.setAttribute("visibility", vis); r.fixed.w.setAttribute("visibility", vis);
        r.fixed.d.setAttribute("cx", x(truth)); r.fixed.w.setAttribute("x1", x(Math.max(0.28, truth - 1.96 * seC))); r.fixed.w.setAttribute("x2", x(Math.min(0.56, truth + 1.96 * seC)));
      });
      const gapv = bias[0] - bias[1], half = 196 * Math.SQRT2 * seN;
      const naive = `Model labels: difference ${gapv.toFixed(1)} points, ± ${half.toFixed(1)}` + (Math.abs(gapv) > half ? " (interval excludes zero)" : " (interval includes zero)");
      swap(readout, el("div", { html: '<i style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#1a1410;margin-right:8px"></i>' + naive }), n ? el("div", { html: `<i style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#7a2418;margin-right:8px"></i>Corrected with ${n} hand-coded texts per group: difference 0.0 points, ± ${(196 * Math.SQRT2 * seC).toFixed(1)}` }) : null);
    }
    const fmtB = (v) => (v > 0 ? "+" : "") + v + " points";
    root.classList.add("gap");
    put(root, 
      el("div", { class: "controls-col" },
        slider("Model’s error, group A", -6, 8, 0.5, bias[0], fmtB, (v) => { bias[0] = v; draw(); }),
        slider("Model’s error, group B", -6, 8, 0.5, bias[1], fmtB, (v) => { bias[1] = v; draw(); }),
        slider("Texts labeled per group", 2, 4.3, 0.01, Math.log10(N), (v) => Math.round(Math.pow(10, v) / 10) * 10 + "", (v) => { N = Math.round(Math.pow(10, v) / 10) * 10; draw(); }),
        slider("Hand-coded per group", 0, 800, 50, n, (v) => (v ? v + "" : "none"), (v) => { n = v; draw(); })),
      el("div", { class: "plot" }, s, el("div", { class: "key" }, el("span", { html: '<i style="background:#1a1410"></i>Model labels, 95% interval' }), el("span", { html: '<i style="background:#7a2418"></i>Corrected with the hand-coded sample, 95% interval' })), readout));
    draw();
  };

  /* Experiments of 13 Nov. Each builder shows a short note until its data exists. */
  const pending = (root) => put(root, el("p", { class: "note" }, "Data for this slide is produced by prep/run_variants.sh."));
  const modelSeg = (names, on) => { const seg = el("div", { class: "seg" }); names.forEach((n, k) => seg.append(button(n.split(" ")[0], () => on(k)))); seg.mark = (k) => [...seg.children].forEach((b, i) => b.classList.toggle("on", i === k)); return seg; };
  const barRow = (name, cls) => { const fill = el("div", { class: "fill" }), val = el("div", { class: "val" }); return { row: el("div", { class: "bar-row " + (cls || "") }, el("div", {}, name), el("div", { class: "track" }, fill), val), fill, val }; };

  /* The estimate: share labeled hostile, by model, against our gold labels. */
  builders.estimate = function (root) {
    const E = D.estimate, hook = root.dataset.mode === "hook";
    let cur = 0, n = hook ? 1 : E.books[0].models.length;
    const rows = E.books[0].models.map((m, k) => {
      const fill = el("div", { class: "fill" }), val = el("div", { class: "val" });
      const row = el("div", { class: "bar-row" + (k >= n ? " hidden" : "") }, el("div", {}, m.name), el("div", { class: "track" }, fill, el("div", { class: "truth", style: `left:${100 * E.truth}%` })), val);
      return { row, fill, val };
    });
    const big = el("div", { class: "big" }), sub = el("div", { class: "mid" });
    function draw() {
      const ms = E.books[cur].models;
      rows.forEach((r, k) => { r.fill.style.width = 100 * ms[k].v + "%"; r.val.textContent = pct(ms[k].v); r.row.classList.toggle("hidden", k >= n); });
      const shown = ms.slice(0, n).map((m) => m.v);
      big.textContent = n === 1 ? pct(shown[0]) : pct(Math.min(...shown)) + " to " + pct(Math.max(...shown));
      sub.textContent = n === 1 ? "of 100 comments are hostile, according to one model" : `of 100 comments are hostile, according to ${n} models` + (hook ? "" : `, with the ${E.books[cur].name.toLowerCase()}`);
      [...seg.children].forEach((b, k) => b.classList.toggle("on", k === cur));
    }
    const seg = el("div", { class: "seg" });
    E.books.forEach((b, k) => seg.append(button(b.name, () => { cur = k; draw(); })));
    root.classList.add("bars", "hookdemo");
    /* Label on the orange line itself, above the first bar. */
    const truthLabel = el("div", { class: "bar-row truthlabel" }, el("div", {}), el("div", { class: "tl-track" },
      el("div", { class: "tl", style: `left:${100 * E.truth}%`, html: `our gold labels, ${pct(E.truth)}<br>↓` })), el("div", {}));
    put(root, el("div", { class: "hooktop" }, big, sub), truthLabel, rows.map((r) => r.row),
      hook ? null : el("div", { class: "row", style: "margin-top:16px" }, seg));
    draw();
    /* Hook mode: each click on the slide adds a model (the empty "est-step" fragments after this demo in slides.md). */
    if (hook) {
      let done = false;
      const step = () => {
        const sec = root.closest("section");
        n = Math.min(rows.length, 1 + (sec ? sec.querySelectorAll(".est-step.visible").length : 0));
        draw();
        if (n >= rows.length && !done) { done = true; setTimeout(() => emph(big, "underline"), 600); }
        if (n < rows.length) done = false;
      };
      if (window.Reveal) { Reveal.on("fragmentshown", step); Reveal.on("fragmenthidden", step); Reveal.on("slidechanged", step); }
      step();
    }
  };

  /* The experiment, one comment: three steps, five runs each. */
  builders.steps = function (root) {
    /* The experiment on one comment (slide 52): Qwen, five runs per prompt version, in the style of slide 46. */
    const X = D.experiment.example;
    const NAME = { "1. One-line prompt": "One-line prompt", "2. Codebook": "Codebook", "3. Codebook, top_k = 1": "top_k = 1" };
    const k5 = D.coder5.findIndex((c) => c.text === X.text);
    let n = 0;
    const rows = X.steps.map((st) => ({ st, dots: el("div", { class: "dc-dots" }, st.runs.map(() => el("i", { class: "e" }))), tally: el("div", { class: "dc-tally" }) }));
    const show = (r) => {
      swap(r.dots, r.st.runs.map((lab) => el("i", { class: lab === "yes" ? "y" : "n" })));
      const ny = r.st.runs.filter((x) => x === "yes").length, right = (ny * 2 > r.st.runs.length ? "yes" : "no") === X.truth;
      swap(r.tally, `${ny} yes · ${r.st.runs.length - ny} no`, el("div", { class: right ? "dc-right" : "dc-wrong" }, right ? "right" : "wrong"));
      if (!right) r.dots.classList.add("wrong");
    };
    const hide = (r) => { swap(r.dots, r.st.runs.map(() => el("i", { class: "e" }))); swap(r.tally); r.dots.classList.remove("wrong"); };
    // Each click shows the next prompt version; going back hides it again.
    fragSteps(root, "st-step", (k) => { n = k; rows.forEach((r, i) => (i < k ? show(r) : hide(r))); });
    root.classList.add("dice");
    put(root,
      el("div", { class: "dc-top" },
        el("div", { class: "dc-text" }, k5 >= 0 ? el("span", { class: "dc-k" }, `Comment ${k5 + 1} · `) : null, X.text),
        el("div", { class: "dc-key" }, el("div", {}, "gold label"), el("span", { class: "hc-key" + (X.truth === "yes" ? " y" : "") }, X.truth))),
      el("div", { class: "dc-who" }, "Qwen"),
      rows.map((r) => el("div", { class: "dc-row" }, el("div", { class: "dc-name" }, NAME[r.st.name] || r.st.name), r.dots, r.tally)));
  };

  /* The experiment, 120 comments: two numbers per step and model. */
  builders.experiment = function (root) {
    const M = D.experiment.models;
    let cur = 0;
    const mk = (name) => { const fill = el("div", { class: "fill" }), val = el("div", { class: "val" }); return { row: el("div", { class: "bar-row exp" }, el("div", {}, name), el("div", { class: "track" }, fill), val), fill, val }; };
    const NAME = { "1. One-line prompt": "One-line prompt", "2. Codebook": "Codebook", "3. Codebook, top_k = 1": "Codebook, top_k = 1" };
    const groups = M[0].steps.map((st) => ({ name: NAME[st.name] || st.name, rel: mk("Reliability"), val: mk("Validity") }));
    groups.forEach((g) => g.val.row.classList.add("all"));
    const seg = el("div", { class: "seg" });
    M.forEach((m, k) => seg.append(button(m.name.split(" ")[0], () => { cur = k; draw(); })));
    function draw() {
      M[cur].steps.forEach((st, k) => {
        groups[k].rel.fill.style.width = 100 * st.identical + "%"; groups[k].rel.val.textContent = pct(st.identical);
        groups[k].val.fill.style.width = 100 * st.correct + "%"; groups[k].val.val.textContent = pct(st.correct);
      });
      [...seg.children].forEach((b, k) => b.classList.toggle("on", k === cur));
    }
    root.classList.add("bars", "expdemo");
    put(root, el("div", { class: "row", style: "margin-bottom:8px" }, seg),
      groups.map((g) => el("div", { class: "expgroup" }, el("div", { class: "eyebrow" }, g.name), g.rel.row, g.val.row)));
    draw();
  };

  /* Validity: agreement with the gold labels, per model, by codebook. */
  builders.validbars = function (root) {
    const V = D.validity;
    let cur = "v0";
    const rows = V.map((m) => { const fill = el("div", { class: "fill" }), val = el("div", { class: "val" }); return { row: el("div", { class: "bar-row" }, el("div", {}, m.name), el("div", { class: "track" }, fill), val), fill, val, m }; });
    const seg = el("div", { class: "seg" });
    [["v0", "One-line codebook"], ["v2", "Codebook with rules"]].forEach(([k, n]) => seg.append(button(n, () => { cur = k; draw(); })));
    function draw() {
      rows.forEach((r) => { const v = r.m[cur], c = r.m[cur === "v0" ? "crit0" : "crit2"]; r.fill.style.width = 100 * v + "%"; r.val.textContent = pct(v); r.row.title = `hostile comments found: ${pct(c)}`; });
      [...seg.children].forEach((b, k) => b.classList.toggle("on", (k === 0) === (cur === "v0")));
    }
    root.classList.add("bars", "wide");
    put(root, el("div", { class: "row", style: "margin-bottom:8px" }, seg, el("span", { class: "note" }, "Share of 100 held-out comments where the majority label matches our gold label")), rows.map((r) => r.row));
    draw();
  };

  /* Robustness and pushback (ideas 3 and 4). Data: demo-data-robust.js, from prep/09_robust_summary.py. */
  const RB = window.DEMO_ROBUST;

  // Mark the words that differ between two versions of a comment.
  function diffWords(a, b) {
    const A = a.split(/(\s+)/), B = b.split(/(\s+)/);
    return B.map((w, i) => (w.trim() && w !== A[i] ? el("mark", {}, w) : w));
  }

  function toggles(choices, onpick) {
    const seg = el("div", { class: "seg" });
    let cur = 0;
    const draw = () => [...seg.children].forEach((b, k) => b.classList.toggle("on", k === cur));
    choices.forEach((c, k) => seg.append(button(c, () => { cur = k; draw(); onpick(k); })));
    draw();
    return seg;
  }

  builders.robustedit = function (root) {
    const ex = RB.examples.edit;
    // GPT-6 Luna (closed weights, default settings) on the same comment: base and base2 from data/runs/robust_luna_push.csv and
    // robust_luna_naive_push.csv, the swap from robust_luna_gender1.csv and robust_luna_naive_gender1.csv (22 Nov). All "yes".
    const LUNA = { naive: { base: "yes", base2: "yes", gender: "yes" }, codebook: { base: "yes", base2: "yes", gender: "yes" } };
    root.classList.add("robust", "redit");
    const A = ex.text.split(/(\s+)/), B = ex.swapped.split(/(\s+)/);
    const k = A.findIndex((w, i) => w.trim() && w !== B[i]);
    const from = A[k], to = B[k];
    const cell = (base, now) => el("td", {}, chip(now), base === now ? el("span", { class: "same" }, "same") : el("span", { class: "changed" }, "changed"));
    const cols = [ex.naive, ex.codebook, LUNA.naive, LUNA.codebook];
    const row = (name, key) => el("tr", {}, el("td", {}, name), cols.map((c) => el("td", {}, chip(c[key]))));
    put(root,
      el("div", { class: "two-texts" },
        el("div", {}, el("div", { class: "eyebrow" }, "as written"), el("p", { class: "quote" }, diffWords(ex.swapped, ex.text))),
        el("div", {}, el("div", { class: "eyebrow" }, "genders swapped"), el("p", { class: "quote" }, diffWords(ex.text, ex.swapped)))),
      el("table", { class: "lab-table" },
        el("tr", { class: "grp" }, el("th", {}, ""), el("th", { colspan: "2" }, "Qwen (open weights)"), el("th", { colspan: "2" }, "GPT-6 Luna (closed weights)")),
        el("tr", {}, el("th", {}, ""), el("th", {}, "one-line prompt"), el("th", {}, "codebook"), el("th", {}, "one-line prompt"), el("th", {}, "codebook")),
        row("as written", "base"),
        row("as written, asked again", "base2"),
        el("tr", { class: "swap" }, el("td", {}, "genders swapped"), cols.map((c) => cell(c.base, c.gender)))),
      el("p", { class: "take" }, `Changing \u201c${from}\u201d to \u201c${to}\u201d flipped Qwen\u2019s label with the one-line prompt. Every other column kept its label.`),
      el("p", { class: "note" }, `Qwen with top_k = 1. Luna at its default settings. Gold label: ${ex.key === "yes" ? "hostile" : "not hostile"}.`));
  };

  builders.robustbars = function (root) {
    let m = 0, pr = 0;
    const names = RB.edit_names, keys = Object.keys(names), MAX = 30;
    const rows = keys.map((k, i) => {
      const fill = el("div", { class: "fill" }), val = el("div", { class: "val" });
      return { k, fill, val, row: el("div", { class: "bar-row" + (i === 0 ? " yard" : "") }, el("div", {}, names[k]), el("div", { class: "track" }, fill), val) };
    });
    function draw() {
      const model = ["Qwen", "DeepSeek"][m], prompt = ["one-line prompt", "codebook"][pr];
      const e = RB.edits.find((x) => x.model === model && x.prompt === prompt);
      rows.forEach((r) => { const v = e.changed[r.k]; r.fill.style.width = (100 * Math.min(v, MAX)) / MAX + "%"; r.val.textContent = v; });
    }
    root.classList.add("bars", "robust");
    put(root,
      el("div", { class: "row", style: "margin-bottom:10px" }, toggles(["Qwen", "DeepSeek"], (k) => { m = k; draw(); }), toggles(["One-line prompt", "Codebook"], (k) => { pr = k; draw(); })),
      el("div", { class: "note", style: "margin-bottom:6px" }, `Labels that changed, out of ${RB.n}. Each version ran once, with top_k = 1.`),
      rows.map((r) => r.row));
    root.onshow = () => setTimeout(draw, 150);
  };

  builders.pushback = function (root) {
    const ex = RB.examples.push;
    root.classList.add("robust", "push");
    const turns = [
      el("div", { class: "turn user" }, el("span", { class: "fork", style: "margin:0 0 4px" }, "The model sees the codebook, then the comment."), el("span", { class: "quote" }, ex.text)),
      el("div", { class: "turn bot" }, chip(ex.first)),
      el("div", { class: "turn user" }, "Are you sure?"),
      el("div", { class: "turn bot" }, chip(ex.after_sure)),
      el("div", { class: "turn user" }, "Are you sure? I think it's the opposite."),
      el("div", { class: "turn bot" }, chip(ex.after_opposite)),
    ];
    turns[2].append(el("span", { class: "fork" }, "Follow-up 1"));
    turns[4].append(el("span", { class: "fork" }, "Follow-up 2"));
    put(root, el("div", { class: "turns" }, turns),
      el("p", { class: "note" }, `Qwen with the codebook, top_k = 1. Each follow-up comes after the same first answer. Gold label: ${ex.key === "yes" ? "hostile" : "not hostile"}.`));
  };

  /* Changed labels per model, prompt and condition (slides 63 and 64). Columns are grouped by open and closed weights,
     each group ordered small to big (DeepSeek V4 Flash: 13B active parameters, Qwen3: 22B; Luna is OpenAI's smaller model,
     Sol the bigger one). rows: entries with model, prompt, a condition under `key` and a count under `val`. */
  function modelBars(root, cls, rows, key, val, kinds, note) {
    root.classList.add("bars", "robust", "pushbars", cls);
    const GROUPS = [["Open weights", [["DeepSeek"], ["Qwen"]]], ["Closed weights", [["Luna"], ["Sol"]]]]
      .map(([g, ms]) => [g, ms.filter(([m]) => rows.some((x) => x.model === m))]).filter(([, ms]) => ms.length);
    const prompts = [["one-line prompt", "one-line prompt"], ["codebook", "codebook"]];
    const fills = [];
    const sep = () => el("div", { class: "pb-sep" });
    // one row of model cells, with a separator column between the two groups
    const across = (f) => GROUPS.flatMap(([, ms], gi) => (gi ? [sep()] : []).concat(ms.map(([m]) => f(m))));
    const cell = (e) => {
      const fill = el("div", { class: "fill" + (e.prompt === "codebook" ? " cb" : "") });
      fills.push([fill, (100 * e[val]) / RB.n]);
      return el("div", { class: "pb-cell" }, el("div", { class: "track" }, fill), el("div", { class: "val" }, String(e[val])));
    };
    const grid = el("div", { class: "pb-grid", style: `grid-template-columns: 230px ${GROUPS.map(([, ms]) => ms.map(() => "1fr").join(" ")).join(" 30px ")};` },
      el("div", {}), GROUPS.flatMap(([g, ms], gi) => (gi ? [sep()] : []).concat([el("div", { class: "pb-group", style: `grid-column: span ${ms.length};` }, g)])),
      el("div", {}), across((m) => el("div", { class: "pb-head" }, m)));
    kinds.forEach(([k, name, quote]) => {
      grid.append(el("div", { class: "pb-kind" }, name, el("span", { class: "pb-quote" }, quote)));
      prompts.forEach(([pr, label]) => {
        grid.append(el("div", { class: "pb-label" }, label),
          ...across((m) => cell(rows.find((x) => x.model === m && x.prompt === pr && x[key] === k))));
      });
    });
    put(root, el("div", { class: "note", style: "margin-bottom:8px" }, note), grid);
    const draw = () => fills.forEach(([f, w]) => (f.style.width = w + "%"));
    root.onshow = () => setTimeout(draw, 150);
    draw();
  }

  builders.pushbars = function (root) {
    const models = RB.push.map((x) => x.model);
    const rerun = models.includes("Sol") || models.includes("Luna") ? " For Sol and Luna, a plain rerun already changes 1 to 6." : "";
    modelBars(root, "pushbars", RB.push, "push", "flipped",
      [["push_sure", "Asked again", "“Are you sure?”"], ["push_opposite", "Asked again, plus my opinion", "“Are you sure? I think it’s the opposite.”"]],
      `Labels that changed after the second turn, out of ${RB.n}.${rerun}`);
  };

  builders.framebars = function (root) {
    /* The user's opinion is added under the comment, in the same message (prep/run_frame.sh). */
    modelBars(root, "framebars", RB.frame || [], "frame", "changed",
      [["frame_yes", "User says it’s hostile", "“I think this comment is hostile.”"], ["frame_no", "User says it’s not hostile", "“I think this comment is not hostile.”"]],
      `Labels that changed when the user’s opinion was added to the question, out of ${RB.n}.`);
  };

  /* The room: the room's list of what a reviewer would want reported (slide 12), and a recap
     before "Items to report" that sets results from today next to that list. Kept in memory and, where allowed, in localStorage, so a reload
     keeps the answers. "Clear" on slide 12 empties all of it for the next session. */
  const ROOM_KEY = "workshop-room-v2";
  const ROOM = (() => { try { return JSON.parse(localStorage.getItem(ROOM_KEY)) || {}; } catch (e) { return {}; } })();
  ROOM.poll = ROOM.poll || {}; ROOM.ask = ROOM.ask || []; ROOM.results = ROOM.results || [];
  const roomSave = () => { try { localStorage.setItem(ROOM_KEY, JSON.stringify(ROOM)); } catch (e) {} };
  // A small "clear" button for a slide that keeps answers. The first click asks (the button text changes,
  // the question shows on hover); a second click within 4 seconds empties only that slide's part.
  // No confirm() pop-up: some browsers, like the Claude app's browser pane, block it and it returns false.
  const clearBtn = (question, empty, label) => {
    label = label || "clear";
    let armed = null;
    const b = button(label, () => {
      if (!armed) {
        b.textContent = "click again to " + label; b.classList.add("armed");
        armed = setTimeout(() => { armed = null; b.textContent = label; b.classList.remove("armed"); }, 4000);
        return;
      }
      clearTimeout(armed); armed = null; b.textContent = label; b.classList.remove("armed");
      empty(); roomSave();
    }, "quiet tiny-btn clear-btn");
    b.title = question;
    return b;
  };
  /* Reveal centers a slide when it opens. A list that grows while you type would run off
     the bottom, so the slide is centered again after each change. */
  const recenter = () => { if (window.Reveal && Reveal.isReady && Reveal.isReady()) Reveal.layout(); };

  function listColumn(key, title) {
    const ul = el("ul", { class: "items" });
    const draw = () => { swap(ul, ROOM[key].map((s) => el("li", {}, s))); recenter(); };
    const input = el("input", { type: "text" });
    input.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if (e.key === "Enter" && input.value.trim()) { ROOM[key].push(input.value.trim()); input.value = ""; roomSave(); draw(); }
      if (e.key === "Escape") input.blur();
    });
    draw();
    return { node: el("div", { class: "col" }, el("div", { class: "eyebrow" }, title), ul, input), draw };
  }

  const ASK_TITLE = "Questions about the labels";

  builders.asklist = function (root) {
    root.classList.add("handkeep");
    const a = listColumn("ask", ASK_TITLE);
    const clear = clearBtn("Clear the questions on this slide?", () => { ROOM.ask = []; a.draw(); });
    const all = clearBtn("Clear everything the room added today: the questions here, the results list near the end, and the dots you clicked on both \u201cWhere are you\u201d slides? Answers sent from phones stay.",
      () => { ROOM.poll = {}; ROOM.ask = []; ROOM.results = []; ROOM.where = { start: [], end: [] }; roomSave(); location.reload(); }, "clear all slides");
    put(root, el("div", { class: "cols" }, a.node), el("div", { class: "clear-row" }, clear, all));
    root.onshow = () => a.draw();
  };

  /* "Your answers from the start": the questions the room gave on "Reviewing a study that used model labels".
     Click a question to tick it (orange), click again to untick. */
  builders.roomrecap = function (root) {
    root.classList.add("handkeep", "recap");
    const marked = new Set();
    function draw() {
      const items = ROOM.ask.map((q, k) => {
        const li = el("li", { style: "cursor:pointer;" + (marked.has(k) ? " color:#d9481f;" : "") }, marked.has(k) ? "\u2713 " : "", q);
        li.addEventListener("click", () => { marked.has(k) ? marked.delete(k) : marked.add(k); draw(); });
        return li;
      });
      swap(root, el("div", { class: "col" },
        el("div", { class: "eyebrow" }, "Your questions from the start"),
        items.length ? el("ul", { class: "items", style: items.length > 8 ? "font-size:28px" : "" }, items) : el("p", { class: "note" }, "No questions were typed in at the start.")));
      recenter();
    }
    root.onshow = draw; draw();
  };


  /* "Where are you?" (slide 9, data-round="start") and "Where are you now?" (data-round="end", cut from the deck on 21 Nov; the end form is unused).
     Everyone answers two questions on their phone (forms 5 and 6 in the Google script); each answer is
     one dot in a 3 by 3 grid: what people have done (up) against whether they would trust AI to code
     their texts (across). At the end, the start dots become grey rings under the new orange dots.
     Without the live form, click a cell to add a dot and shift-click to remove one. */
  ROOM.where = ROOM.where || { start: [], end: [] };
  const WH_X = ["no", "not sure", "yes"];
  const WH_Y = [["never used AI"], ["only a chatbot"], ["an agent too"]];
  builders.where = function (root) {
    const L = window.LIVE || {}, round = root.dataset.round === "end" ? "end" : "start";
    const url = round === "end" ? L.whereNowUrl : L.whereUrl, sh = round === "end" ? L.whereNowShort : L.whereShort, qr = round === "end" ? "img/where_now_qr.png" : "img/where_qr.png";
    const W = 760, H = 500, Lm = 200, B = 70, T = 10, cw = (W - Lm - 10) / 3, ch = (H - B - T) / 3;
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.style.cssText = "font-family: inherit; overflow: visible;";
    let g = "";
    for (let i = 0; i <= 3; i++) g += `<line x1="${Lm + cw * i}" x2="${Lm + cw * i}" y1="${T}" y2="${H - B}" stroke="#e2e2dc" stroke-width="2"/>`;
    for (let j = 0; j <= 3; j++) g += `<line x1="${Lm}" x2="${W - 10}" y1="${T + ch * j}" y2="${T + ch * j}" stroke="#e2e2dc" stroke-width="2"/>`;
    WH_X.forEach((x, i) => g += `<text x="${Lm + cw * (i + 0.5)}" y="${H - B + 32}" text-anchor="middle" style="font-size:25px" fill="#111">${x}</text>`);
    g += `<text x="${Lm + (W - 10 - Lm) / 2}" y="${H - 4}" text-anchor="middle" style="font-size:22px" fill="#555">trust AI to code your texts →</text>`;
    WH_Y.forEach((y, j) => y.forEach((s, k) => g += `<text x="${Lm - 14}" y="${T + ch * (2 - j + 0.5) + 8 + (k - (y.length - 1) / 2) * 28}" text-anchor="end" style="font-size:23px" fill="#111">${s}</text>`));
    for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) g += `<rect class="wh-cell" data-d="${j}" data-t="${i}" x="${Lm + cw * i}" y="${T + ch * (2 - j)}" width="${cw}" height="${ch}" fill="transparent" style="cursor:pointer"/>`;
    g += `<g class="wh-dots" style="pointer-events:none"></g>`;
    svg.innerHTML = g;
    const dots = svg.querySelector(".wh-dots");
    const count = el("b", {}, "0"), word = el("span", {}, " answers");
    const side = el("div", { style: "text-align:center; width:230px;" },
      url ? el("img", { src: qr, alt: "", style: "width:220px; max-width:none; margin:0; border:none; box-shadow:none;", onerror: function () { this.remove(); } }) : null,
      url ? el("div", { style: "font-size:21px; margin-top:6px;" }, sh || url.replace(/^https?:\/\//, "")) : null,
      el("div", { style: "font-size:26px; margin-top:16px;" }, count, word));
    const pts = (r) => ((live.where && live.where[r]) || []).concat(ROOM.where[r]);
    const seen = {};
    const tally = (list) => { const c = {}; list.forEach(([d, t]) => { const k = d + "," + t; c[k] = (c[k] || 0) + 1; }); return c; };
    // size: dots per cell to lay out for, so that the rings and the dots of the end round share places
    function layer(list, style, size) {
      const cells = tally(list);
      Object.keys(cells).forEach((k) => {
        const [d, t] = k.split(",").map(Number), n = cells[k], N = Math.max(n, (size && size[k]) || 0);
        const per = N > 20 ? 7 : 5, gap = N > 20 ? 22 : 30, r = N > 20 ? 8 : 11, rows = Math.ceil(N / per);
        for (let m = 0; m < n; m++) {
          const row = Math.floor(m / per), inRow = Math.min(per, N - row * per), col = m % per;
          const c = document.createElementNS(NS, "circle");
          c.setAttribute("cx", Lm + cw * (t + 0.5) + (col - (inRow - 1) / 2) * gap);
          c.setAttribute("cy", T + ch * (2 - d + 0.5) + (row - (rows - 1) / 2) * gap);
          const id = style + k + ":" + m, fresh = !seen[id]; seen[id] = true;
          c.setAttribute("r", fresh ? 0 : r);
          if (style === "ring") { c.setAttribute("fill", "none"); c.setAttribute("stroke", "#999"); c.setAttribute("stroke-width", 2.5); c.setAttribute("stroke-dasharray", "4 3"); }
          else c.setAttribute("fill", style === "end" ? "#d9481f" : "#111");
          c.style.transition = "r .4s ease";
          dots.append(c);
          if (fresh) requestAnimationFrame(() => requestAnimationFrame(() => c.setAttribute("r", r)));
        }
      });
    }
    function draw() {
      dots.innerHTML = "";
      if (round === "end") {
        const a = tally(pts("start")), b = tally(pts("end")), size = {};
        Object.keys(a).concat(Object.keys(b)).forEach((k) => { size[k] = Math.max(a[k] || 0, b[k] || 0); });
        layer(pts("start"), "ring", size); layer(pts("end"), "end", size);
      }
      else layer(pts("start"), "start");
      const n = pts(round).length;
      count.textContent = n; word.textContent = n === 1 ? " answer" : " answers";
    }
    svg.addEventListener("click", (e) => {
      const c = e.target.closest(".wh-cell"); if (!c) return;
      const d = +c.dataset.d, t = +c.dataset.t, list = ROOM.where[round];
      if (e.shiftKey) { const k = list.findIndex((p) => p[0] === d && p[1] === t); if (k >= 0) list.splice(k, 1); }
      else list.push([d, t]);
      roomSave(); draw();
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    });
    live.listeners.push(() => { const cur = window.Reveal && Reveal.getCurrentSlide(); if (cur && cur.contains(root)) draw(); });
    root.classList.add("where");
    const clear = clearBtn("Clear the dots you clicked on this slide? Answers sent from phones stay.", () => { ROOM.where[round] = []; draw(); });
    put(root, el("div", { style: "display:flex; align-items:center; justify-content:center; gap:40px; margin-top:6px;" }, svg, side), el("div", { class: "clear-row" }, clear));
    root.onshow = draw; draw();
  };

  function init() {
    document.querySelectorAll(".reveal .demo[data-demo]").forEach((root) => {
      const b = builders[root.dataset.demo];
      if (b && !root.dataset.built) { root.dataset.built = "1"; b(root); }
    });
    const fire = (slide) => slide && slide.querySelectorAll(".demo").forEach((d) => d.onshow && d.onshow());
    Reveal.on("slidechanged", (ev) => fire(ev.currentSlide));
    fire(Reveal.getCurrentSlide());
    Reveal.layout();
  }
  window.initDemos = function () {
    if (window.VENDOR && window.VENDOR.rough) { const sc = document.createElement("script"); sc.src = "vendor/rough-notation/rough-notation.iife.js"; document.head.append(sc); }
    init();
  };
})();
