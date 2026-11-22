## Get Codex on your laptop

<ol style="font-size:34px; line-height:1.6;">
<li>Download the ChatGPT app for macOS or Windows at <b>chatgpt.com/download</b>.</li>
<li>Open it and sign in. A free account is enough.</li>
<li>Click <b>ChatGPT ⌄</b> at the top left and choose <b>Codex</b>.</li>
</ol>

<img src="img/codex_menu.png" alt="The menu at the top left, before and after: ChatGPT, then Codex" style="width:80%; margin:18px auto 0; display:block; border-radius:10px; box-shadow:none;">

<p class="muted" style="margin-top:18px;">If you're on Linux or a Chromebook, please work with a neighbor!</p>

---

# Measuring Text with AI Agents

<p class="subtitle">Reliability, validity and reporting</p>


<p class="muted">Tom van Nuenen · UC Berkeley D-Lab · São Paulo, November 2026</p>

<p></p>

---

## Large language models (LLMs)

<p style="font-size:26px; color:#555; margin:0 0 30px;">This workshop is about using LLMs, agents, and about labeling text.</p>

<ul style="font-size:28px; line-height:1.45; margin:6px 0 24px 1em; max-width:1000px; text-align:left;"><li class="fragment">An LLM is trained on huge amounts of text.</li><li class="fragment">It writes by picking the next word, again and again.</li><li class="fragment">ChatGPT, Claude and Gemini all run on one.</li></ul>

<div class="fragment" style="display:grid; grid-template-columns:1fr 1.1fr; gap:36px; align-items:center;">
<div style="font-size:42px; font-weight:600; text-align:right; line-height:1.3; white-space:nowrap;">Maria is reading a <span style="display:inline-block; width:100px; border-bottom:4px solid #d9481f;">&nbsp;</span></div>
<div class="fragment" style="text-align:left;"><div style="display:grid; grid-template-columns:150px 1fr 64px; align-items:center; gap:14px; margin:9px 0; font-size:26px;"><span style="text-align:right; font-weight:700;">book</span><div style="height:28px; background:linear-gradient(#e2e2dc,#e2e2dc) left center / 100% 1px no-repeat;"><div style="width:91.1%; height:100%; background:#d9481f;"></div></div><span style="color:#555;">41%</span></div><div style="display:grid; grid-template-columns:150px 1fr 64px; align-items:center; gap:14px; margin:9px 0; font-size:26px;"><span style="text-align:right; font-weight:400;">newspaper</span><div style="height:28px; background:linear-gradient(#e2e2dc,#e2e2dc) left center / 100% 1px no-repeat;"><div style="width:37.8%; height:100%; background:#8a8a84;"></div></div><span style="color:#555;">17%</span></div><div style="display:grid; grid-template-columns:150px 1fr 64px; align-items:center; gap:14px; margin:9px 0; font-size:26px;"><span style="text-align:right; font-weight:400;">letter</span><div style="height:28px; background:linear-gradient(#e2e2dc,#e2e2dc) left center / 100% 1px no-repeat;"><div style="width:24.4%; height:100%; background:#8a8a84;"></div></div><span style="color:#555;">11%</span></div><div style="display:grid; grid-template-columns:150px 1fr 64px; align-items:center; gap:14px; margin:9px 0; font-size:26px;"><span style="text-align:right; font-weight:400;">story</span><div style="height:28px; background:linear-gradient(#e2e2dc,#e2e2dc) left center / 100% 1px no-repeat;"><div style="width:17.8%; height:100%; background:#8a8a84;"></div></div><span style="color:#555;">8%</span></div><div style="display:grid; grid-template-columns:150px 1fr 64px; align-items:center; gap:14px; margin:9px 0; font-size:26px;"><span style="text-align:right; font-weight:400;">menu</span><div style="height:28px; background:linear-gradient(#e2e2dc,#e2e2dc) left center / 100% 1px no-repeat;"><div style="width:8.9%; height:100%; background:#8a8a84;"></div></div><span style="color:#555;">4%</span></div><div style="font-size:20px; color:#6f6f69; margin:10px 0 0 164px;">Chance of each next word (an example)</div><div class="demo" data-demo="nextword" style="display:none;"></div></div>
</div>

---

## Agents

<ul style="font-size:28px; line-height:1.45; margin:6px 0 24px 1em; max-width:1000px; text-align:left;"><li class="fragment">An agent is an LLM with tools.</li><li class="fragment">It reads files, runs commands and checks the results.</li><li class="fragment">Today you use Codex.</li></ul>

<div class="fragment"><svg viewBox="0 0 900 330" width="900" height="330" style="font-family:inherit; overflow:visible; display:block; margin:0 auto;"><line x1="195" y1="72" x2="375.0" y2="145" stroke="#bbb" stroke-width="2.5"/><path d="M110,50 h24 l7,8 h39 v42 h-70 z" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="145" y="138" text-anchor="middle" font-size="22" fill="#111">read and write files</text><line x1="195" y1="252" x2="375.0" y2="185" stroke="#bbb" stroke-width="2.5"/><rect x="110" y="226" width="70" height="52" rx="7" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M124,242 l12,10 l-12,10" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="142" y1="264" x2="162" y2="264" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="145" y="318" text-anchor="middle" font-size="22" fill="#111">run commands</text><line x1="705" y1="72" x2="525.0" y2="145" stroke="#bbb" stroke-width="2.5"/><circle cx="755" cy="72" r="29" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="755" cy="72" rx="12" ry="29" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="726" y1="72" x2="784" y2="72" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M730,58 h50 M730,86 h50" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="755" y="138" text-anchor="middle" font-size="22" fill="#111">use the internet</text><line x1="705" y1="252" x2="525.0" y2="185" stroke="#bbb" stroke-width="2.5"/><rect x="730" y="220" width="50" height="64" rx="4" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M742,254 l9,9 l17,-19" stroke="#d9481f" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="755" y="318" text-anchor="middle" font-size="22" fill="#111">check the results</text><rect x="375.0" y="123.0" width="150" height="84" rx="12" fill="#111"/><text x="450" y="176" text-anchor="middle" font-size="32" font-weight="700" fill="#fff">LLM</text></svg><div class="demo" data-demo="agentloop" style="display:none;"></div></div>

---

## Text labeling

<ul style="font-size:28px; line-height:1.45; margin:6px 0 24px 1em; max-width:1000px; text-align:left;"><li class="fragment">Labeling puts each text in a category, such as “hostile” or not.</li><li class="fragment">Researchers then count the labels or compare groups.</li><li class="fragment">Today an LLM labels Reddit comments, and we check its labels.</li></ul>

<div class="fragment" style="max-width:1000px; margin:0;">
<div style="display:grid; grid-template-columns:1fr 50px 110px; gap:14px; font-size:22px; color:#6f6f69; margin-bottom:12px;"><span style="text-align:left;">Reddit comment</span><span></span><span>Hostile?</span></div>
<div style="display:grid; grid-template-columns:1fr 50px 110px; align-items:center; gap:14px; margin:0 0 22px;"><div style="font-size:25px; line-height:1.4; text-align:left; border-left:3px solid #bbb; padding-left:16px;">“Protect your son. He is a child and an emotionally vulnerable one with special needs.”</div><span style="font-size:32px; color:#999;">→</span><span><span class="pill no" style="font-size:26px; padding:2px 22px;">no</span></span></div><div style="display:grid; grid-template-columns:1fr 50px 110px; align-items:center; gap:14px; margin:0 0 22px;"><div style="font-size:25px; line-height:1.4; text-align:left; border-left:3px solid #bbb; padding-left:16px;">“…you knocked her up like a dumbass. You don’t get to impose your will as you see fit.”</div><span style="font-size:32px; color:#999;">→</span><span><span class="pill yes" style="font-size:26px; padding:2px 22px;">yes</span></span></div><div style="display:grid; grid-template-columns:1fr 50px 110px; align-items:center; gap:14px; margin:0 0 22px;"><div style="font-size:25px; line-height:1.4; text-align:left; border-left:3px solid #bbb; padding-left:16px;">“Say thanks for the great service and move on.”</div><span style="font-size:32px; color:#999;">→</span><span><span class="pill no" style="font-size:26px; padding:2px 22px;">no</span></span></div>
<div style="text-align:right; font-size:26px; margin-top:4px;">Hostile: <b style="color:#d9481f;">1 of 3</b></div>
</div>

---

## Get the workshop files

<div class="ex-tag">Step 1</div>


<p style="font-size:30px; line-height:1.45; margin:6px 0 12px; text-align:left;">The workshop files are in a GitHub repository: an online project folder that stores files, code, and revision history.</p>

<div class="fragment">
<p style="font-size:30px; margin:0 0 12px; text-align:left;">In Codex, click <b>New chat</b>, type this, and click <b>Allow once</b> when it asks.</p>

<div style="display:grid; grid-template-columns:1.6fr 1fr; gap:24px; align-items:center;">
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px; line-height:30px; background:#f0efea; color:#111; border-radius:3px; padding:16px 20px; text-align:left;">Download the GitHub repository at<br><span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; color:#d9481f; font-weight:700;">tinyurl.com/mtai-workshop</span> as a ZIP, unzip it<br>on my Desktop as measuring-text-ai-agents,<br>and tell me where the folder is. Then open<br>the repository's page in my browser.</div>
<img src="img/codex_allow_download.png" alt="Codex asks to connect to the internet and edit the Desktop: Allow once" style="width:100%; margin:0; border-radius:10px; box-shadow:none;">
</div>

<p style="font-size:28px; margin-top:20px;">Keep the GitHub page open. Every step and prompt today is on that page.</p>
</div>

<p class="fragment" style="font-size:28px; line-height:1.4; color:#6f6f69; margin-top:14px; text-align:left;">If you don't want to use Codex in your browser, open tinyurl.com/mtai-workshop yourself and click Code → Download ZIP.</p>

---

## Make the folder a project

<div class="ex-tag">Step 1</div>


<div style="display:grid; grid-template-columns:1.15fr 1fr; gap:34px; align-items:center; margin-top:10px;">
<ol style="font-size:28px; line-height:1.45; margin:0; text-align:left;">
<li>Under the chat box, click <b>Choose project</b>, then <b>New project</b>.</li>
<li>Click <b>Add</b> and choose the folder <code>measuring-text-ai-agents</code> on your Desktop.</li>
<li>Check that it says <b>This computer</b>, then click <b>Create project</b>.</li>
<li>If Codex asks <b>Trust this folder?</b>, click <b>Trust folder</b>.</li>
</ol>
<img src="img/codex_create_project.png" alt="Create project, with the folder measuring-text-ai-agents as its source folder, on This computer" style="width:100%; margin:0; border-radius:10px; box-shadow:none;">
</div>

<p style="font-size:28px; margin-top:24px;">Start every new chat in this project. Codex then works only inside this folder.</p>

---

## All your projects

<div class="ex-tag">Step 1</div>


<p style="font-size:30px; line-height:1.45; margin:6px 0 16px; text-align:left;">To see all your projects, click <b>⋯</b> in the left bar of Codex, then <b>Projects</b>. The <b>⋯</b> next to a project lets you archive or delete it.</p>

<img src="img/codex_projects.png" alt="Codex: the menu under the three dots in the left bar, with Projects, and the list of projects" style="width:84%; margin:0 auto; display:block; border-radius:10px; box-shadow:none;">

<p style="font-size:28px; margin-top:16px;">Deleting a project leaves the files on your Desktop.</p>

---

## Your perceptions

<div class="demo" data-demo="where" data-round="start"></div>

---

## Are language models the future of text labeling?

<div style="display:flex; gap:32px; align-items:stretch;">
<div style="flex:1;">
<p style="font-size:30px; line-height:1.3; min-height:130px;">More accurate than MTurk crowd workers, at <b>1/30 the cost</b><br><span style="font-size:22px; color:#888;">Gilardi, Alizadeh &amp; Kubli 2023, PNAS</span></p>
<img src="img/mturk_closed.png" alt="mturk.com: Mechanical Turk is no longer available. Amazon Mechanical Turk permanently closed on September 30, 2026." style="width:100%; border:1px solid #ddd; margin:48px 0 0;">
</div>
<div style="width:4px; background:var(--accent);"></div>
<div style="flex:1;">
<p style="font-size:30px; line-height:1.3; min-height:130px;">Language-model judges overtook people: <b>46%</b> vs <b>43%</b> of papers<br><span style="font-size:22px; color:#888;">Yang et al. 2026, NLP papers in 2025</span></p>
<img src="img/llm_judge_trend_yang2026.png" alt="Share of NLP papers using each evaluation method, 2020 to 2025. LLM-as-a-judge rises from under 1% to 46% and passes human evaluation at 43%." style="width:108%; max-width:none; margin:0;">
</div>
</div>

---

## If that is true, we should check the models’ labels

<p style="font-size:30px; line-height:1.3;"><b>Few</b> of 27 papers in flagship journals checked the model labels they used<br><span style="font-size:22px; color:#888;">Desai, Card &amp; Jacobs 2026</span></p>

<div style="max-width:1000px; margin-top:44px;">
<div style="font-size:26px; color:#6f6f69; margin:0 0 14px;">Checks in the papers’ 50 measurement tasks</div>
<div style="display:flex; align-items:center; gap:14px; margin:20px 0;"><div style="width:400px; font-size:32px; text-align:right; white-space:nowrap;">Compared with other labels</div><div style="flex:1; background:#ecebe6; height:48px;"><div style="width:76%; height:48px; background:#111;"></div></div><div style="width:60px; font-size:32px;">38</div></div>
<div style="display:flex; align-items:center; gap:14px; margin:20px 0;"><div style="width:400px; font-size:32px; text-align:right; white-space:nowrap;">A known hypothesis</div><div style="flex:1; background:#ecebe6; height:48px;"><div style="width:18%; height:48px; background:#111;"></div></div><div style="width:60px; font-size:32px;">9</div></div>
<div style="display:flex; align-items:center; gap:14px; margin:20px 0;"><div style="width:400px; font-size:32px; text-align:right; white-space:nowrap;">Reliability (repeated runs)</div><div style="flex:1; background:#ecebe6; height:48px;"><div style="width:10%; height:48px; background:#111;"></div></div><div style="width:60px; font-size:32px;">5</div></div>
<div style="display:flex; align-items:center; gap:14px; margin:20px 0;"><div style="width:400px; font-size:32px; text-align:right; white-space:nowrap;">Nothing</div><div style="flex:1; background:#ecebe6; height:48px;"><div style="width:16%; height:48px; background:#d9481f;"></div></div><div style="width:60px; font-size:32px;">8</div></div>
</div>

---

## Reviewing a study that used model labels

A study used an AI agent to label **10,000** texts. What would you ask about those labels before you trust the study's findings?

<div class="demo" data-demo="asklist"></div>

---

## r/AmItheAsshole

<div style="display:flex; gap:40px; align-items:flex-start; justify-content:space-between; margin-top:10px;">
<div style="width:640px;">
<img src="img/aita_post.png" alt="A post: AITA for refusing to lend my sister money after she spent months judging my financial decisions?" style="width:100%; border:1px solid #ddd; border-radius:8px; margin:0 0 10px;">
<img src="img/aita_reply.png" alt="A reply: NTA. Sounds like your parents are offering to pay. She is their daughter after all, they signed up for supporting her." style="width:84%; margin:0 0 0 16%; border:1px solid #ddd; border-radius:8px;">
</div>
<img src="img/aita_sidebar.png" alt="The r/AmItheAsshole sidebar: tell us about a non-violent conflict, give both sides, and find out if you're right or the asshole. 2.5 million members." style="height:430px; border:1px solid #ddd; border-radius:8px; margin:0;">
</div>

---

## Today's task

<div class="tk-reply">
<img src="img/aita_reply_plain.png" alt="A reply: NTA. Sounds like your parents are offering to pay. She is their daughter after all, they signed up for supporting her.">
</div>
<div class="tk-row v2">
<div class="tk-q"><div>Hostile or insulting toward someone?</div><span>Yes</span> <span>No</span></div>
</div>

---

## Measurement Validity

<p style="font-size:26px; color:#555; margin:0 0 12px;"></p>

<div class="lv-wrap">
<div class="lv-col">
<div class="lv off"><span class="n">1</span><div class="b"><b>Background concept</b><span>hostility in online talk</span></div></div>
<div class="lv-arr">↓ conceptualization</div>
<div class="lv"><span class="n">2</span><div class="b"><b>Systematized concept</b><span>“attacks a person: insults, mockery, threats, contempt”</span></div></div>
<div class="lv-arr">↓ operationalization</div>
<div class="lv"><span class="n">3</span><div class="b"><b>Indicator</b><span>the prompt: one line, or the codebook</span></div></div>
<div class="lv-arr">↓ scoring</div>
<div class="lv"><span class="n">4</span><div class="b"><b>Scores</b><span>yes or no for each comment</span></div></div>
</div>
<div class="lv-loop"><div class="ln"></div><div class="hd"></div></div>
<div class="lv-lab">check,<br>then revise</div>
</div>

<p class="muted lv-cite">Adcock &amp; Collier (2001), “Measurement Validity: A Shared Standard for Qualitative and Quantitative Research,” <i>American Political Science Review</i></p>

---

## The model you pick changes the result

<div class="demo" data-demo="estimate" data-mode="hook"></div>

<span class="fragment est-step"></span><span class="fragment est-step"></span><span class="fragment est-step"></span><span class="fragment est-step"></span><span class="fragment est-step"></span>

---

## This workshop: how labeling changes with setup

<div class="tw-task">
<img src="img/aita_reply_plain.png">
<span class="arr">→</span>
<span>Hostile?</span> <span class="pill yes">yes</span> <span class="pill no">no</span>
</div>
<div class="tw-cards">
<div class="tw-card fragment"><div class="h">Agents vs APIs</div>
<div class="req"><span class="hl">Label</span> the comments by whether they are <span class="hl">hostile</span></div>
<div class="cap">advantages of the API</div></div>
<div class="tw-card fragment"><div class="h">The prompt</div>
<div class="rows"><div>Prompt A → <span class="pill yes">yes</span></div><div>Prompt B → <span class="pill no">no</span></div></div>
<div class="cap">another way to ask</div></div>
<div class="tw-card fragment"><div class="h">Robustness</div>
<div class="rows"><div>“…her <b>brother</b>…” → <span class="pill yes">yes</span></div><div>“…his <b class="or">sister</b>…” → <span class="pill no">no</span></div></div>
<div class="cap">a small edit</div></div>
<div class="tw-card fragment"><div class="h">Multi-turn</div>
<div class="chat"><div><span class="pill yes">yes</span></div><div class="bub">Are you sure? I think it's the opposite.</div><div><span class="pill no">no</span></div></div>
<div class="cap">a follow-up question</div></div>
</div>

---

## Agents: just ask for a label?

<div class="appwin">
  <div class="titlebar"><span class="dots"><i></i><i></i><i></i></span><span>Codex: starter</span></div>
  <div class="appbody">
    <div class="sidebar">
      <div class="thread active">Label comments</div>
      <div class="thread">New thread</div>
    </div>
    <div class="mainpane">
      <div class="msg user">Label the comments in comments.csv.</div>
      <div class="step err">Ran <code>python label.py</code> · FileNotFoundError: comments.csv</div>
      <div class="step">Listed files · found <code>data/working_100.csv</code></div>
      <div class="step">Edited <code>label.py</code></div>
      <div class="step ok">Ran <code>python label.py</code></div>
      <div class="reply">The file was in <code>data/</code>, so I updated the path. Labels saved to <code>runs/working_v0.csv</code>.</div>
    </div>
  </div>
</div>

<div class="demo" data-demo="logtype" style="display:none;"></div>

---

## What makes it an agent

<div style="margin-top:28px;">
<div class="fragment" style="display:flex; gap:22px; align-items:baseline; margin:0 0 30px; text-align:left;"><span style="font-size:56px; font-weight:800; color:#d9481f; width:50px;">1</span><p style="font-size:34px; line-height:1.4; margin:0;">The agent works inside a <b>project folder</b> on your machine. That folder is its world.</p></div>
<div class="fragment" style="display:flex; gap:22px; align-items:baseline; margin:0 0 30px; text-align:left;"><span style="font-size:56px; font-weight:800; color:#d9481f; width:50px;">2</span><p style="font-size:34px; line-height:1.4; margin:0;">Everything it does is <b>recorded</b>. You can inspect every command it ran.</p></div>
<div class="fragment" style="display:flex; gap:22px; align-items:baseline; margin:0 0 30px; text-align:left;"><span style="font-size:56px; font-weight:800; color:#d9481f; width:50px;">3</span><p style="font-size:34px; line-height:1.4; margin:0;">It asks for <b>permission</b> before it runs commands or edits files.</p></div>
</div>

---

## Open and closed models

<div style="display:grid; grid-template-columns:1fr 1fr; gap:56px; margin-top:16px;">
<div style="text-align:left;"><h3 style="font-size:38px; margin:0 0 14px;">Closed weights</h3><svg viewBox="0 0 470 210" width="470" height="210" style="font-family:inherit; overflow:visible; display:block; margin:0 auto;"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#111"/></marker></defs><text x="40" y="112" text-anchor="middle" font-size="26" font-weight="400" fill="#111">you</text><line x1="78" y1="92" x2="200" y2="92" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><text x="139" y="80" text-anchor="middle" font-size="20" font-weight="400" fill="#555">your text</text><line x1="200" y1="132" x2="78" y2="132" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><text x="139" y="158" text-anchor="middle" font-size="20" font-weight="400" fill="#555">an answer</text><rect x="212" y="22" width="240" height="176" rx="12" fill="none" stroke="#999" stroke-width="2" stroke-dasharray="7 6"/><text x="332" y="52" text-anchor="middle" font-size="20" font-weight="400" fill="#555">the company’s servers</text><rect x="262" y="78" width="140" height="76" rx="12" fill="#111" stroke="#111" stroke-width="2"/><text x="332" y="125" text-anchor="middle" font-size="26" font-weight="600" fill="#fff">model</text></svg><p style="font-size:26px; line-height:1.4; margin:18px 0 10px;">Only the company has the model. It can change or retire the model at any time.</p><p style="font-size:23px; color:#555; margin:0;">GPT-6.2 Sol and GPT-6 Luna (OpenAI), Claude Opus 5.5 (Anthropic), Gemini (Google)</p></div>
<div style="text-align:left;"><h3 style="font-size:38px; margin:0 0 14px;">Open weights</h3><svg viewBox="0 0 470 210" width="470" height="210" style="font-family:inherit; overflow:visible; display:block; margin:0 auto;"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#111"/></marker></defs><rect x="165" y="6" width="140" height="70" rx="12" fill="#111" stroke="#111" stroke-width="2"/><text x="235" y="50" text-anchor="middle" font-size="26" font-weight="600" fill="#fff">model</text><text x="318" y="47" text-anchor="start" font-size="20" font-weight="400" fill="#555">public download</text><line x1="205" y1="78" x2="115" y2="128" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><line x1="265" y1="78" x2="355" y2="128" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><rect x="20" y="132" width="190" height="62" rx="12" fill="#fff" stroke="#111" stroke-width="2"/><text x="115" y="170" text-anchor="middle" font-size="23" font-weight="400" fill="#111">your computer</text><rect x="260" y="132" width="190" height="62" rx="12" fill="#fff" stroke="#111" stroke-width="2"/><text x="355" y="170" text-anchor="middle" font-size="23" font-weight="400" fill="#111">any provider</text></svg><p style="font-size:26px; line-height:1.4; margin:18px 0 10px;">Anyone can download the model and run it. The same version stays available, so others can repeat your study.</p><p style="font-size:23px; color:#555; margin:0;">Qwen3 (Alibaba), DeepSeek V4 (DeepSeek), Llama (Meta), gpt-oss (OpenAI), Mistral</p></div>
</div>

<p style="font-size:27px; margin-top:26px;">Codex runs on Sol, a closed model. Our labels come from Qwen, an open model, through OpenRouter (a managed AI gateway and routing platform)</p>

---

## Smaller and bigger models

<p style="font-size:26px; color:#555; margin:0 0 14px;">OpenAI doesn’t publish how big Sol and Luna are (the price is the best clue)</p>

<div style="font-size:22px; color:#555; text-align:left;">Price per million tokens of output (a token is about ¾ of a word)</div>
<div style="display:grid; grid-template-columns:120px 1fr 150px; align-items:center; gap:16px; margin:10px 0; font-size:26px;"><b>Luna</b><div style="height:26px; background:linear-gradient(#e2e2dc,#e2e2dc) left center / 100% 1px no-repeat;"><div style="width:5.0%; height:100%; background:#8a8a84;"></div></div><span style="text-align:right;">$0.50</span></div><div style="display:grid; grid-template-columns:120px 1fr 150px; align-items:center; gap:16px; margin:10px 0; font-size:26px;"><b>Sol</b><div style="height:26px; background:linear-gradient(#e2e2dc,#e2e2dc) left center / 100% 1px no-repeat;"><div style="width:100.0%; height:100%; background:#d9481f;"></div></div><span style="text-align:right;">$10</span></div>

<table style="width:100%; border-collapse:collapse; font-size:26px; margin-top:22px;"><tr style="color:#555; border-bottom:1px solid #bbb;"><td style="padding:8px; text-align:left;">My test, 120 comments</td><td style="padding:8px;">Luna</td><td style="padding:8px;">Sol</td></tr><tr style="border-bottom:1px solid #e2e2dc;"><td style="padding:10px 8px; text-align:left;">Agree with the labels in the data, one-line prompt</td><td style="padding:10px 8px;">92</td><td style="padding:10px 8px;">105</td></tr><tr style="border-bottom:1px solid #e2e2dc;"><td style="padding:10px 8px; text-align:left;">Agree with the labels in the data, codebook</td><td style="padding:10px 8px;">110</td><td style="padding:10px 8px;">113</td></tr><tr style="border-bottom:1px solid #e2e2dc;"><td style="padding:10px 8px; text-align:left;">Cost of the codebook test, 720 calls</td><td style="padding:10px 8px;">$0.06</td><td style="padding:10px 8px;">$0.78</td></tr></table>

<p style="font-size:27px; margin-top:22px;">With a good codebook, the small model comes close for less than a tenth of the cost.</p>

---

## Model and effort

<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:12px; align-items:start;">
<div><img src="img/codex-model-select.png" alt="The model picker" style="width:100%; margin:0; border-radius:10px; box-shadow:none; display:block;"></div>
<div><img src="img/codex-effort.png" alt="The effort picker: Light, Medium, High, Extra High, Ultra" style="width:100%; margin:0; border-radius:10px; box-shadow:none; display:block;"></div>
</div>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:18px; font-size:27px; line-height:1.4; text-align:left;">
<p style="margin:0;">The <b>model</b> is the brain that does the work. Bigger, newer models do more, and use up your limits faster.</p>
<p style="margin:0;"><b>Effort</b> is how long it thinks. More effort helps on hard tasks, and also uses up limits faster.</p>
</div>

<p style="font-size:26px; margin-top:20px;">Today the defaults are fine. If you hit the free limits, pick a smaller model or lower effort.</p>

---

## What you downloaded

<div style="display:grid; grid-template-columns:auto 1fr; column-gap:40px; margin-top:14px; text-align:left; border:2px solid #111; border-radius:12px; padding:18px 26px; background:#fff;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 0px; color:#d9481f; font-weight:700;">measuring-text-ai-agents/</div><div style="font-size:24px; color:#d9481f; padding:3px 0;">your Codex project</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">README.md</div><div style="font-size:24px; color:#555; padding:3px 0;">the workshop page, with every step</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">data/coder_5.csv</div><div style="font-size:24px; color:#555; padding:3px 0;">5 comments to code by hand</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">data/working_100.csv</div><div style="font-size:24px; color:#555; padding:3px 0;">100 comments to label</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">data/heldout_100.csv</div><div style="font-size:24px; color:#555; padding:3px 0;">100 comments kept aside for testing</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">images/</div><div style="font-size:24px; color:#555; padding:3px 0;">pictures for the workshop page</div></div>

<p style="font-size:28px; margin-top:20px;">Each data file has three columns: <code>id</code>, <code>text</code> and <code>hostile</code>.</p>

---

## Open the data first

<div class="ex-tag">Step 2</div>


<div style="display:grid; grid-template-columns:auto 1fr; gap:8px 14px; align-items:center; margin:0 0 14px; text-align:left;"><span style="font-size:26px; font-weight:700; color:#d9481f;">1</span><pre class="ft-code" style="margin:0;"><code class="nohighlight" style="font-size:23px; padding:8px 18px;">Open reddit.com/r/AmItheAsshole in the Codex browser.</code></pre><span style="font-size:26px; font-weight:700; color:#d9481f;">2</span><pre class="ft-code" style="margin:0;"><code class="nohighlight" style="font-size:23px; padding:8px 18px;">Show me the first 10 rows of data/working_100.csv as a table.</code></pre></div>

<table style="width:100%; border-collapse:collapse; margin:0;"><thead><tr><th style="padding:10px 16px; text-align:left; font-family:monospace; font-size:26px; border-bottom:2px solid #111; width:15%;">id</th><th style="padding:10px 16px; text-align:left; font-family:monospace; font-size:26px; border-bottom:2px solid #111;">text</th><th style="padding:10px 16px; text-align:left; font-family:monospace; font-size:26px; border-bottom:2px solid #111; width:16%; color:#d9481f;">hostile</th></tr></thead><tbody>
<tr><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-family:monospace; font-size:18px; color:#888;">t1_emiclu6</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:24px; line-height:1.3;">“If the guy wanted to close your bag, he could have told you that your bag was open. 99% chance he’s a pickpocket, 1% socially dysfunctional idiot.”</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:26px; font-weight:700; color:#d9481f; white-space:nowrap;">yes</td></tr>
<tr><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-family:monospace; font-size:18px; color:#888;">t1_ejielm1</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:24px; line-height:1.3;">“Don’t pick up random drinks in a club, that’s just plain rude. Also, don’t get blackout drunk/high when you’re out with someone.”</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:26px; font-weight:700; color:#111; white-space:nowrap;">no</td></tr>
<tr><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-family:monospace; font-size:18px; color:#888;">t1_eci2a24</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:24px; line-height:1.3;">“She’s playing the Shitty Life Olympics. It’d be one thing to bring it up in a productive and mature way, but…”</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:26px; font-weight:700; color:#d9481f; white-space:nowrap;">yes<div style="font-size:16px; font-weight:400; color:#888;">judgment call</div></td></tr>
</tbody></table>

<div style="display:flex; font-size:20px; color:#555; margin-top:12px;"><div style="width:15%; padding:0 16px;">Reddit’s id</div><div style="flex:1; padding:0 16px;">the comment: all a coder sees</div><div style="width:16%; padding:0 16px; color:#d9481f;">our gold labels<br>40 of 100 “yes”</div></div>

<p class="yt-copy">Copy them from step 2 on the GitHub page. If Codex asks to control your screen, click Deny.</p>

---

## Code five comments by hand

<div class="ex-tag">Step 2</div>


<div class="demo" data-demo="label"></div>

---

## Your first try: one sentence

<div class="ex-tag">Step 3</div>


<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; margin-top:10px;">
<p style="font-size:30px; line-height:1.45; margin:0; text-align:left;">Start a new chat in your project. Copy <span style="white-space:nowrap">step 3</span> from the GitHub page, paste it, and approve what Codex asks.</p>
<img src="img/codex_approve.png" alt="Permissions: Deny or Allow once" style="width:100%; margin:0; border-radius:8px; box-shadow:none;">
</div>

<pre class="ft-code"><code class="nohighlight" style="font-size:26px; padding:18px 22px;">Label the 100 comments in data/working_100.csv by whether
they are hostile, and tell me how reliable the labels are.</code></pre>

<p class="yt-copy">Copy it from step 3 on the GitHub page.</p>

---

## Coding agents and their rules

<ul style="font-size:32px; line-height:1.5; margin-top:30px;">
<li style="margin-bottom:28px;">Told not to show a model the test questions, an agent showed them anyway in <b>12 of 84</b> runs.<br><span class="muted" style="font-size:21px;">Rank et al. 2026</span></li>
<li>Told not to send email, an agent sent one, and only its log showed it.<br><span class="muted" style="font-size:21px;">Ye et al. 2026</span></li>
</ul>

---

## What did your agent do?

<p style="font-size:22px; color:#555; margin:0 0 10px;">GPT-6.2 Sol Light (Leve)</p>

<div class="wa-grid">
<div class="wa" style="padding:16px 18px;"><b>Wrote code, or read and decided?</b><div style="background:#1b1b1b; color:#ececec; border-radius:10px; padding:12px 16px; font-size:20px; line-height:1.45; margin-top:12px; text-align:left;"><span style="color:#9a9a9a;">Ran</span> <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px;">python3 -c '… hostile = {1, 2, 3, 7, 13, 14, …}'</span></div></div>
<div class="wa" style="padding:16px 18px;"><b>Mentioned the <code>hostile</code> column?</b><div style="background:#1b1b1b; color:#ececec; border-radius:10px; padding:12px 16px; font-size:20px; line-height:1.45; margin-top:12px; text-align:left;">The CSV already contains hand-coded labels. I’ll preserve those, add my judgments in a separate column, and report agreement with the existing labels.</div></div>
<div class="wa" style="padding:16px 18px;"><b>“Reliable” meant… which number?</b><div style="background:#1b1b1b; color:#ececec; border-radius:10px; padding:12px 16px; font-size:20px; line-height:1.45; margin-top:12px; text-align:left;">My labels agreed with the existing hand-coded labels on 98 of 100 comments, with Cohen’s κ = 0.96.</div></div>
<div class="wa" style="padding:16px 18px;"><b>Saved the labels to a file?</b><div style="background:#1b1b1b; color:#ececec; border-radius:10px; padding:12px 16px; font-size:20px; line-height:1.45; margin-top:12px; text-align:left;">I labeled all 100 comments in <span style="color:#7fb3ff;">working_100_labeled.csv</span>.</div></div>
</div>

---

## What the agent did

<div style="display:grid; grid-template-columns:1.4fr 1fr; gap:26px; margin-top:16px; text-align:left;">
<div>
<p style="font-size:28px; margin:0 0 12px;"><b>1.</b> It printed every row, with my label at the end.</p>
<div style="background:#1b1b1b; color:#e6e6e6; border-radius:12px; padding:18px 20px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px; line-height:1.6;">
['id', 'text', <b style="color:#ff8a4c;">'hostile'</b>]<br>
1 ['t1_ef1h4r8', 'You pretended to…', <b style="color:#ff8a4c;">'yes'</b>]<br>
2 ['t1_eg1squv', 'you asked her nicely…', <b style="color:#ff8a4c;">'yes'</b>]<br>
3 ['t1_ejs5jya', 'It was his Wedding Day…', <b style="color:#ff8a4c;">'yes'</b>]<br>
4 ['t1_ekcsth6', 'you weren’t worried…', <b style="color:#ff8a4c;">'no'</b>]<br>
<span style="color:#9a9a9a;">… 100 rows</span></div>
</div>
<div>
<p style="font-size:28px; margin:0 0 12px;"><b>2.</b> Then it wrote its labels as a list of row numbers.</p>
<div style="background:#1b1b1b; color:#e6e6e6; border-radius:12px; padding:18px 20px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px; line-height:1.6;">hostile = {1, 2, 3, 7, 13,<br>&nbsp;&nbsp;14, 15, 19, 22, 24,<br>&nbsp;&nbsp;28, 29, 32, 36, …}</div>
<p style="font-size:32px; margin:20px 0 0;"><b style="color:#d9481f;">98 of 100</b> are the same as mine.</p>
</div>
</div>

<p style="font-size:30px; color:#333; margin-top:22px; text-align:left;">In its own words: “I saw the original labels during inspection, so the comparison is unblinded.”</p>

---

## Light or high effort

<p style="font-size:24px; margin:0 0 6px; color:#555;">GPT-6.2 Sol, the same request, in two fresh copies of the project. Light is the free default.</p>

<div style="display:grid; grid-template-columns:1fr 40px 1fr; text-align:left;">
<div style="font-size:30px; font-weight:700;">Light</div><div></div><div style="font-size:30px; font-weight:700; color:#d9481f;">High</div>
<div style="font-size:24px; color:#555; padding:10px 0 4px;">time</div><div></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:21%; background:#bbb; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">39 s</b></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:100%; background:#d9481f; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">3 min 06 s</b></div>
<div style="font-size:24px; color:#555; padding:10px 0 4px;">commands</div><div></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:40%; background:#bbb; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">4</b></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:100%; background:#d9481f; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">10</b></div>
<div style="font-size:24px; color:#555; padding:10px 0 4px;">tokens it wrote, thinking included</div><div></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:25%; background:#bbb; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">1,500</b></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:100%; background:#d9481f; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">6,000</b></div>
<div style="font-size:24px; color:#d9481f; padding:14px 0 4px; font-weight:700;">what it read</div><div></div><div></div><div style="font-size:26px;">every row, with my labels</div><div></div><div style="font-size:26px;">the text only, plus my 5 warm-up labels</div>
<div style="font-size:24px; color:#555; padding:14px 0 4px;">same as mine</div><div></div><div></div><div style="font-size:30px; font-weight:700;">98 of 100</div><div></div><div style="font-size:30px; font-weight:700; color:#d9481f;">97 of 100</div>
</div>

<p style="font-size:28px; margin-top:22px; text-align:left;">Light matched more because it read my labels. High did not look, and still matched 97.</p>

---

## What is an API?

<p style="font-size:28px; line-height:1.45; margin:0 0 10px; text-align:left;">Every big LLM has two ways in. People use a chat app. Programs use an <b>API</b>, which lets a program send the model text and get its answer back.</p>

<div class="demo" data-demo="apiflow"></div>
<span class="fragment af-step"></span>

---

## Agents and APIs

<div style="display:flex; align-items:stretch; margin-top:20px; min-height:520px;">
<div style="flex:1; border:2px solid #111; border-radius:14px; padding:24px 26px; display:flex; flex-direction:column;">
<div style="display:flex; justify-content:space-between; align-items:baseline;"><b style="font-size:46px;">Agent</b><span style="font-size:26px; color:#888;">Codex</span></div>
<div style="background:#f0efea; padding:10px 18px; border-radius:12px; font-size:27px; margin-top:18px; align-self:flex-end;">Label the comments.</div>
<div style="font-size:26px; line-height:1.7; margin:14px 0 0 4px; color:#3a3a37; text-align:left;"><span class="fragment" data-fragment-index="1">read <code>data/</code></span><br><span class="fragment" data-fragment-index="2">wrote <code>label.py</code></span><br><span class="fragment" data-fragment-index="3">ran <code>label.py</code>, fixed an error</span><br><span class="fragment" data-fragment-index="4">ran it again …</span></div>
<div style="border:1px solid #cfcfc8; border-radius:14px; padding:12px 16px; margin-top:auto; text-align:left;">
<div style="color:#aaa; font-size:22px;">Ask anything</div>
<div style="display:flex; gap:12px; margin-top:8px;"><span style="border:1px solid #cfcfc8; border-radius:999px; padding:5px 16px; font-size:22px; background:#fff; white-space:nowrap;">GPT-6.2 Sol Light</span><span style="border:1px solid #cfcfc8; border-radius:999px; padding:5px 16px; font-size:22px; background:#fff; white-space:nowrap;">Ask for approval</span></div>
</div>
<div style="display:flex; gap:12px; font-size:22px; color:#d9481f; margin-top:6px; text-align:left;"><span style="width:168px; padding-left:16px;">model, effort</span><span style="padding-left:16px;">permissions</span></div>
</div>
<div class="fragment fade-right" data-fragment-index="3" style="width:140px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
<code style="font-size:22px; background:none !important;">label.py</code>
<div style="font-size:64px; line-height:1;">→</div>
<div style="font-size:22px; color:#888;">calls</div>
</div>
<div class="fragment fade-up" data-fragment-index="3" style="flex:1; border:2px solid #111; border-radius:14px; padding:24px 26px; display:flex; flex-direction:column;">
<div style="display:flex; justify-content:space-between; align-items:baseline;"><b style="font-size:46px;">API</b><span style="font-size:26px; color:#888;">one call</span></div>
<div style="display:flex; align-items:center; gap:10px; margin-top:18px; flex-wrap:wrap;"><span style="font-size:22px; color:#888;">model</span><span style="border:1px solid #cfcfc8; color:#555; border-radius:999px; padding:4px 14px; font-size:22px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; white-space:nowrap;">gpt-6.2-sol</span><span style="border:2px solid #d9481f; color:#d9481f; font-weight:700; border-radius:999px; padding:4px 14px; font-size:22px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; white-space:nowrap;">qwen3-235b</span><span style="font-size:20px; color:#d9481f;">today: cheap</span></div>
<div style="background:#f0efea; border:1px solid #e2e2dc; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; line-height:1.65; padding:16px 20px; margin-top:12px; text-align:left;">temperature: <b>0</b><br>top_k: <b>1</b><br>prompt: codebook<br>text: "Your aunt is a…"</div>
<div style="font-size:44px; text-align:center; color:#888; line-height:1.2;">↓</div>
<div style="align-self:center; background:#111; color:#fff; border-radius:999px; padding:6px 34px; font-size:32px;">yes</div>
<div style="margin-top:auto; font-size:24px; color:#888; text-align:center;">🔑 key &nbsp;·&nbsp; $ per call</div>
</div>
</div>

---

## Better: the agent builds, a model labels through the API

<div style="display:grid; grid-template-columns:300px 50px 230px 50px 220px 50px 150px; justify-content:center; align-items:center; margin-top:20px; row-gap:6px;">
<div></div><div></div>
<div style="text-align:center;"><div style="display:inline-block; background:#f0efea; border-radius:12px; padding:10px 22px; font-size:28px;">Agent</div><div style="font-size:22px; color:#888; margin-top:4px;">writes ↓</div></div>
<div></div><div></div><div></div><div></div>
<div style="border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; padding:0; overflow:hidden;">
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; padding:8px 12px; color:#6f6f69; border-bottom:1px solid #e2e2dc;">working_100.csv</div>
<div style="display:flex; font-size:22px;">
<div style="flex:1.3; outline:3px solid #d9481f; outline-offset:-3px;"><div style="padding:8px 12px; font-weight:700;">text</div><div style="padding:4px 12px; color:#555;">Your aunt is…</div><div style="padding:4px 12px; color:#555;">She can choose…</div><div style="padding:4px 12px; color:#555;">Honestly…</div><div style="padding:4px 12px 12px; color:#555;">ESH, both…</div></div>
<div style="flex:1; color:#bbb; border-left:1px solid #e2e2dc;"><div style="padding:8px 12px; font-weight:700; line-height:1.15;">gold label</div><div style="font-size:60px; text-align:center; padding-top:10px;">🔒</div></div>
</div>
</div>
<div style="text-align:center; font-size:46px;">→</div>
<div style="border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; min-height:200px; display:flex; flex-direction:column; justify-content:center;">
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:25px; font-weight:700;">label.py</div>
<div style="font-size:23px; color:#555; line-height:1.5; margin-top:10px;">codebook<br>settings</div>
</div>
<div style="text-align:center; font-size:46px;">→</div>
<div style="border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; min-height:200px; text-align:center; display:flex; flex-direction:column; justify-content:center;">
<div style="font-size:30px; font-weight:700;">Qwen</div>
<div style="font-size:22px; color:#888;">via the API</div>
<div style="font-size:21px; color:#555; margin-top:14px;">every call<br>logged</div>
</div>
<div style="text-align:center; font-size:46px;">→</div>
<div style="position:relative; height:190px;"><div style="position:absolute; left:36px; top:36px; width:110px; height:150px; border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; padding:10px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; line-height:1.4;">run 5<br>yes<br>no<br>yes<br>no</div><div style="position:absolute; left:27px; top:27px; width:110px; height:150px; border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; padding:10px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; line-height:1.4;">run 4<br>yes<br>no<br>yes<br>no</div><div style="position:absolute; left:18px; top:18px; width:110px; height:150px; border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; padding:10px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; line-height:1.4;">run 3<br>yes<br>no<br>yes<br>no</div><div style="position:absolute; left:9px; top:9px; width:110px; height:150px; border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; padding:10px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; line-height:1.4;">run 2<br>yes<br>no<br>yes<br>no</div><div style="position:absolute; left:0px; top:0px; width:110px; height:150px; border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; padding:10px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; line-height:1.4;">run 1<br>yes<br>no<br>yes<br>no</div></div>
</div>
<div style="display:grid; grid-template-columns:auto auto; justify-content:center; column-gap:70px; row-gap:10px; margin-top:40px; font-size:28px; text-align:left; white-space:nowrap;">
<span><span style="color:#2a7d2a; font-weight:700;">✓</span> never sees the key</span>
<span><span style="color:#2a7d2a; font-weight:700;">✓</span> same every run</span>
<span><span style="color:#2a7d2a; font-weight:700;">✓</span> can run it 5 times</span>
<span><span style="color:#2a7d2a; font-weight:700;">✓</span> each comment alone <span style="color:#888;">(stateless)</span></span>
</div>

<div class="demo" data-demo="colflow" style="display:none;"></div>

---

## Working with an agent: plan, act, check



<div style="display:flex; align-items:stretch; gap:12px; margin-top:24px;">
<div style="flex:1; border:2px solid #111; border-radius:14px; padding:28px 22px; display:flex; flex-direction:column; gap:30px; min-height:400px;">
<div style="font-size:31px; font-weight:700; text-align:center; white-space:nowrap;">The user plans</div>
<div style="background:#f0efea; border:1px solid #e2e2dc; font-family:'JetBrains Mono',monospace; font-size:22px; line-height:1.5; padding:16px;"><div style="font-weight:700; margin-bottom:6px;">AGENTS.md</div>- Never modify anything in data/.<br>- The labels are yes and no.</div>
</div>
<div style="align-self:center; font-size:44px; color:#888;">→</div>
<div style="flex:1; border:2px solid #111; border-radius:14px; padding:28px 22px; display:flex; flex-direction:column; gap:30px; min-height:400px;">
<div style="font-size:31px; font-weight:700; text-align:center; white-space:nowrap;">The agent acts</div>
<div style="border:1px solid #e2e2dc; padding:16px; font-size:24px;"><div>Run <code style="font-size:22px;">python label.py</code>?</div><div style="display:flex; gap:12px; margin-top:20px;"><span style="background:#111; color:#fff; padding:8px 20px; border-radius:6px;">Approve</span><span style="border:1px solid #111; padding:8px 20px; border-radius:6px;">Deny</span></div></div>
</div>
<div style="align-self:center; font-size:44px; color:#888;">→</div>
<div style="flex:1; border:2px solid #111; border-radius:14px; padding:28px 22px; display:flex; flex-direction:column; gap:30px; min-height:400px;">
<div style="font-size:31px; font-weight:700; text-align:center; white-space:nowrap;">The user checks</div>
<div style="display:flex; flex-direction:column; gap:12px;"><div style="background:#111; color:#fff; border-radius:18px 18px 4px 18px; padding:12px 16px; font-size:22px; line-height:1.3;">Show me the lines that set the model.</div><div style="background:#111; color:#fff; border-radius:18px 18px 4px 18px; padding:12px 16px; font-size:22px; line-height:1.3;">Which decisions did you make that I didn't ask for?</div></div>
</div>
</div>

---

## The agent reads AGENTS.md first


<div style="display:grid; grid-template-columns:400px 1fr; gap:28px; margin-top:18px; text-align:left; align-items:start;">
<div style="border:2px solid #111; border-radius:12px; padding:16px 18px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:21px; white-space:nowrap; line-height:1.8; background:#fff;">measuring-text-ai-agents/<br>&nbsp;&nbsp;<b style="color:#d9481f; border:2px solid #d9481f; border-radius:6px; padding:0 6px;">AGENTS.md</b><br>&nbsp;&nbsp;README.md<br>&nbsp;&nbsp;data/</div>
<div style="border:2px solid #111; border-radius:12px; overflow:hidden; background:#fff;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px; padding:8px 14px; color:#6f6f69; border-bottom:1px solid #e2e2dc;">AGENTS.md</div>
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:23px; line-height:1.6; padding:14px 18px; white-space:pre-wrap;"># Project rules
- Never modify anything in data/.
- The column hostile holds our gold labels.
  Never send it to a labeling model.
- Propose a plan before creating or editing files.</div></div>
</div>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:34px; margin-top:30px; font-size:30px; line-height:1.4; text-align:left;">
<p style="margin:0;">Codex reads it at the start of every conversation. Claude Code reads <code>CLAUDE.md</code> the same way.</p>
<p style="margin:0;">Your first try ran without one. Next, you ask Codex to create it with our rules.</p>
</div>

---

## Ask for approval, then give your agent rules

<div class="ex-tag">Steps 4 and 5</div>

<div class="yt-row"><span class="n">1</span><div><div class="txt">Click the approval chip under the chat box and choose <b>Ask for approval</b>.</div></div></div><div class="yt-row"><span class="n">2</span><div><div class="yt-box">Create a file called AGENTS.md in this project with exactly this content:<br>&nbsp;<br># Project rules<br>- The comments are in data/. Never modify anything in data/.<br><span class="more">…</span></div></div></div><div class="yt-row"><span class="n">3</span><div><div class="yt-box">Which columns could give away the answer, and how will you keep them away<br>from the labeling model?</div></div></div>

<p class="yt-copy">Copy the prompts from steps 4 and 5 on the GitHub page.</p>

---

## API keys



<p style="font-size:28px; margin:4px 0 0; text-align:left;">An API key is a password that lets <code>label.py</code> use the API. Every call is charged to it.</p>

<div style="display:flex; align-items:center; gap:20px; margin-top:22px;">
<div style="flex:1.45; border:1px solid #d6d6cf; border-radius:6px; text-align:left;">
<div style="background:#f0efea; color:#6f6f69; font-size:20px; padding:8px 14px; border-bottom:1px solid #e2e2dc;">● ● ● &nbsp; API keys</div>
<div style="padding:16px 20px 18px;">
<div style="display:flex; justify-content:space-between; align-items:center;"><b style="font-size:32px;">Keys</b><span style="background:#111; color:#fff; border-radius:6px; padding:6px 16px; font-size:20px;">+ Create key</span></div>
<table style="width:100%; border-collapse:collapse; font-size:24px; margin-top:14px;">
<tr style="color:#888; border-bottom:1px solid #e2e2dc;"><td style="padding:8px 12px;">Name</td><td style="padding:8px 12px;">Key</td><td style="padding:8px 12px;">Spent</td><td></td></tr>
<tr style="border-bottom:1px solid #eee;"><td style="padding:9px 12px;">table 1</td><td style="padding:9px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">sk-or-…7f2c</td><td style="padding:9px 12px;">$0.40</td><td style="padding:9px 8px;"><span style="border:2px solid #d9481f; color:#d9481f; border-radius:6px; padding:3px 12px; font-size:20px;">Revoke</span></td></tr><tr style="border-bottom:1px solid #eee;"><td style="padding:9px 12px;">table 2</td><td style="padding:9px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">sk-or-…a91e</td><td style="padding:9px 12px;">$0.31</td><td style="padding:9px 8px;"><span style="border:2px solid #d9481f; color:#d9481f; border-radius:6px; padding:3px 12px; font-size:20px;">Revoke</span></td></tr><tr style="border-bottom:1px solid #eee;"><td style="padding:9px 12px;">table 3</td><td style="padding:9px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">sk-or-…05bd</td><td style="padding:9px 12px;">$0.52</td><td style="padding:9px 8px;"><span style="border:2px solid #d9481f; color:#d9481f; border-radius:6px; padding:3px 12px; font-size:20px;">Revoke</span></td></tr>
</table>
</div>
</div>
<div class="fragment" data-fragment-index="1" style="font-size:60px;">→</div>
<div style="flex:1; display:flex; flex-direction:column; gap:30px;">
<div class="fragment" data-fragment-index="1"><div style="border:2px solid #111; border-radius:10px; text-align:left;">
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:22px; padding:8px 16px; border-bottom:1px solid #e2e2dc; color:#6f6f69;">.env</div>
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:23px; padding:18px 16px; line-height:1.5;">OPENROUTER_API_KEY=<br>sk-or-…7f2c</div>
</div>
<div style="font-size:22px; color:#555; margin-top:8px; text-align:left;">a file in your project. <code>label.py</code> reads the key from here.</div></div>
<div class="fragment" data-fragment-index="2" style="display:flex; align-items:center; gap:18px; font-size:28px; text-align:left;">
<div style="position:relative; background:#f0efea; border-radius:18px 18px 4px 18px; padding:14px 20px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:23px;">sk-or-…<span style="position:absolute; left:50%; top:50%; transform:translate(-50%,-52%); color:#d9481f; font-size:70px; font-family:inherit;">✗</span></div>
<span>never paste it into the agent's chat</span>
</div>
</div>
</div>

---

## API keys in the news

<div class="news-shots">
<img class="a" src="img/news_register_metr.jpg" alt="The Register, 1 Sept 2026: Attacker stole a METR API key, used $600K worth of credits, and no one noticed for weeks">
<img class="b" src="img/news_gitguardian_2026.jpg" alt="GitGuardian, 17 Mar 2026: The State of Secrets Sprawl 2026: AI-Service Leaks Surge 81% and 29M Secrets Hit Public GitHub">
</div>

---

## Add your key

<div class="ex-tag">Step 6</div>

<div class="yt-row"><span class="n">1</span><div><div class="yt-box">Create a file called .env with one line, OPENROUTER_API_KEY=paste-your-key-here,<br>and open it in a text editor, so I can paste the key myself.</div></div></div><div class="yt-row"><span class="n">2</span><div><div style="display:flex; align-items:center; gap:22px;"><div class="txt">Copy the key you were given into the file that opens. Save it and close it.</div></div></div></div>

<p class="yt-copy">Copy the prompt from step 6 on the GitHub page.</p>

<p class="yt-look">Never paste the key into the chat.</p>

---

## One test call

<div class="ex-tag">Step 6</div>


<p style="font-size:27px; margin:0 0 12px; text-align:left;">Before labeling anything, check that the key works with one call to Qwen.</p>

<pre class="ft-code" style="margin:0;"><code class="nohighlight" style="font-size:20px; padding:14px 20px;">Make one test call to Qwen through OpenRouter, following AGENTS.md.
Use "Is this comment hostile or insulting toward someone? Answer yes or no."
as the system prompt, and the first comment in data/coder_5.csv as the user message.
Save the whole response to runs/test_call.json. Then show me the answer,
the model and provider that answered, and how many tokens it used.</code></pre>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; margin-top:18px;">
<div style="border:2px solid #111; border-radius:10px; text-align:left; background:#fff;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; padding:8px 14px; border-bottom:1px solid #e2e2dc; color:#6f6f69;">runs/test_call.json</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:21px; line-height:1.6; padding:12px 16px;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"model": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">"qwen/qwen3-235b-a22b-2507",</span></div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"provider": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">"DeepInfra",</span></div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"content": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; color:#d9481f; font-weight:700;">"yes",</span></div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"usage": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">{ "total_tokens": … }</span></div></div></div></div>
<p style="font-size:26px; line-height:1.45; margin:0; text-align:left;">The answer comes back as a file. It says which model and provider answered, and how many tokens the call used. <span style="color:#6f6f69;">Shortened here. Yours has more.</span></p>
</div>

<p class="yt-copy">Copy it from step 6 on the GitHub page.</p>

---

## Build the labeling script

<div class="ex-tag">Step 7</div>

<div class="yt-row"><span class="n">1</span><div><div class="yt-box">Create a file codebook_v0.md with exactly this text:<br>Is this comment hostile or insulting toward someone?<br><span class="more">…</span></div></div></div><div class="yt-row"><span class="n">2</span><div><div class="yt-box">Write a script label.py that labels the comments in a CSV file using a codebook file<br>as the system prompt, following the rules in AGENTS.md.<br><span class="more">…</span></div></div></div><div class="yt-row"><span class="n">3</span><div><div class="yt-box">Show me the lines in label.py that set the model, the settings and the labels,<br>the line that reads the codebook, and the line that builds the message sent<br><span class="more">…</span></div></div></div>

<p class="yt-copy">Copy the three prompts from step 7 on the GitHub page.</p>

<p class="yt-look">Check that only the comment text goes to Qwen.</p>

---

## The prompt: comparing answers to Qwen

<div class="demo" data-demo="labelresults"></div>
<span class="fragment hc-step"></span><span class="fragment hc-step"></span>

---

## Cohen’s kappa and Krippendorff’s alpha

<div style="display:grid; grid-template-columns:1fr 1.25fr; gap:44px; margin-top:12px; text-align:left;">
<div><div style="font-size:30px; font-weight:700; margin-bottom:4px;">Cohen’s kappa</div><p style="font-size:24px; margin:0 0 14px; color:#444;">Two coders. How often do they agree, beyond what chance would give?</p><div style="display:grid; grid-template-columns:130px 1fr 1fr 50px; gap:6px; align-items:center;"><div></div><div style="font-size:18px; color:#888; text-align:center;">me</div><div style="font-size:18px; color:#888; text-align:center;">the agent</div><div style="font-size:18px; color:#888; text-align:center;"></div><div style="font-size:20px; color:#555;">comment 1</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="font-size:28px; text-align:center; color:#2a7d2a;">✓</div><div style="font-size:20px; color:#555;">comment 2</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="font-size:28px; text-align:center; color:#2a7d2a;">✓</div><div style="font-size:20px; color:#555;">comment 3</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="font-size:28px; text-align:center; color:#d9481f;">✗</div><div style="font-size:20px; color:#555;">comment 4</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="font-size:28px; text-align:center; color:#2a7d2a;">✓</div></div></div>
<div><div style="font-size:30px; font-weight:700; margin-bottom:4px; color:#d9481f;">Krippendorff’s alpha</div><p style="font-size:24px; margin:0 0 14px; color:#444;">The same idea for any number of coders, even when some labels are missing.</p><div style="display:grid; grid-template-columns:130px repeat(5,1fr); gap:6px; align-items:center;"><div></div><div style="font-size:18px; color:#888; text-align:center;">run 1</div><div style="font-size:18px; color:#888; text-align:center;">run 2</div><div style="font-size:18px; color:#888; text-align:center;">run 3</div><div style="font-size:18px; color:#888; text-align:center;">run 4</div><div style="font-size:18px; color:#888; text-align:center;">run 5</div><div style="font-size:20px; color:#555;">comment 1</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="font-size:20px; color:#555;">comment 2</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="font-size:20px; color:#555;">comment 3</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#d9481f; color:#fff; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">yes</div><div style="font-size:20px; color:#555;">comment 4</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div><div style="background:#e8e6df; color:#555; border-radius:6px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:700;">no</div></div></div>
</div>

<p style="font-size:26px; margin-top:24px;">The agents reported kappa: their labels against mine. Today we use alpha, with five runs of one model as the coders.</p>

---

## Gold labels are an interpretation too

<div style="display:flex; gap:48px; align-items:flex-start; margin-top:24px;">
<div>
<div style="display:grid; grid-template-columns:repeat(10,28px); gap:5px;"><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div></div>
<div style="margin-top:14px;">
<div style="display:flex; align-items:center; gap:10px; font-size:22px; margin:6px 0;"><span style="width:20px; height:20px; border-radius:3px; display:inline-block; box-sizing:border-box; background:#111;"></span>hostile: 40</div>
<div style="display:flex; align-items:center; gap:10px; font-size:22px; margin:6px 0;"><span style="width:20px; height:20px; border-radius:3px; display:inline-block; box-sizing:border-box; background:#fff; border:2px solid #bbb;"></span>not hostile: 60</div>
<div style="display:flex; align-items:center; gap:10px; font-size:22px; margin:6px 0;"><span style="width:20px; height:20px; border-radius:3px; display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; border:2px solid #bbb; color:#999; font-weight:700; font-size:15px;">?</span>a judgment call: 21</div>
</div>
</div>
<div style="flex:1;">
<div style="border:1px solid #ddd; border-radius:8px; padding:14px 18px; font-size:22px; line-height:1.4; background:#fff; margin-bottom:8px;">You don’t feel comfortable having sex with strangers but you’ve also had three one-night stands? Get over yourself.</div>
<div style="font-size:20px; color:#d9481f; font-weight:600; margin:0 0 22px 6px;">our label: hostile, a judgment call</div>
<div style="border:1px solid #ddd; border-radius:8px; padding:14px 18px; font-size:22px; line-height:1.4; background:#fff; margin-bottom:8px;">Come on, you’re a grown-ass adult, you presumably function in society, surely you can figure out how to run a vacuum cleaner…</div>
<div style="font-size:20px; color:#d9481f; font-weight:600; margin:0 0 22px 6px;">our label: not hostile, a judgment call</div>
</div>
</div>

<div class="demo" data-demo="goldflip" style="display:none;"></div>

---

## Label 100 comments, five times

<div class="ex-tag">Step 8</div>

<div class="yt-box">Use label.py to label data/working_100.csv with codebook_v0.md, 5 runs,<br>saved to runs/working_v0_qwen.csv. Report the numbers AGENTS.md asks for.</div>

<p class="yt-copy">Copy it from step 8 on the GitHub page.</p>

<p class="yt-look">This takes a few minutes. Write down % identical and Krippendorff’s alpha.</p>

---

## Same prompt, same comment, ten runs



<div class="demo" data-demo="dice"></div>

---

## Reliability and validity

<div class="demo" data-demo="relval"></div>
<span class="fragment rv-step"></span><span class="fragment rv-step"></span>

<p class="fragment" style="font-size:26px; margin:14px 0 0; text-align:left;">A third check comes in step 12: the label should stay the same when only something irrelevant changes, like the gender in a comment.</p>

---

## Ask a stronger model when the cheap one is unsure

<div class="fl-grid">
<div class="fl-box fl-start"><b>100 comments</b><br>DeepSeek, 5 runs each</div>
<div class="fl-arr">↗</div>
<div class="fl-box"><i class="md y"></i><i class="md y"></i><i class="md y"></i><i class="md y"></i><i class="md y"></i><br>all 5 agree: <b>74</b></div>
<div class="fl-arr">→</div>
<div><div class="fl-act">keep its label</div><div class="fl-bar" style="width:370px;"><div style="flex:65; background:#111;"></div><div style="flex:9; background:#d9481f;"></div></div><div class="fl-res"><b>88%</b> right</div></div>
<div class="fl-arr">↘</div>
<div class="fl-box" style="outline:3px solid #d9481f; outline-offset:4px;"><i class="md y"></i><i class="md y"></i><i class="md"></i><i class="md y"></i><i class="md"></i><br>runs split: <b>26</b></div>
<div class="fl-arr">→</div>
<div><div class="fl-act">ask a stronger model</div><div class="fl-bar" style="width:130px;"><div style="flex:14; background:#111;"></div><div style="flex:12; background:#d9481f;"></div></div><div class="fl-res"><b>54%</b> right on its own</div></div>
</div>

<div class="fl-foot"><div>Li et al. (2026): same accuracy or better, at <b>41%</b> of the cost</div></div>

---

## Does a stronger model fix it?



<div class="fl-grid">
<div class="fl-box fl-start"><b>100 comments</b><br>Qwen, 5 runs each</div>
<div class="fl-arr">↗</div>
<div class="fl-box"><i class="md y"></i><i class="md y"></i><i class="md y"></i><i class="md y"></i><i class="md y"></i><br>all 5 agree: <b>90</b></div>
<div class="fl-arr fragment" data-fragment-index="2">→</div>
<div class="fragment" data-fragment-index="2"><div class="fl-act">keep Qwen’s label</div><div class="fl-bar" style="width:450px;"><div style="flex:75; background:#111;"></div><div style="flex:15; background:#d9481f;"></div></div><div class="fl-res">75 right · <span class="fl-sw">15 steady and wrong</span></div></div>
<div class="fl-arr">↘</div>
<div class="fl-box"><i class="md y"></i><i class="md y"></i><i class="md"></i><i class="md y"></i><i class="md"></i><br>runs split: <b>10</b></div>
<div class="fl-arr fragment" data-fragment-index="1">→</div>
<div class="fragment" data-fragment-index="1"><div class="fl-act">ask Claude Opus 5.5, once</div><div class="fl-bar" style="width:50px;"><div style="flex:9; background:#111;"></div><div style="flex:1; background:#d9481f;"></div></div><div class="fl-res">9 right <span class="fl-grey">(Qwen alone: 4)</span></div></div>
</div>

<div class="fl-foot"><div class="fragment" data-fragment-index="1"><b>79 → 84</b> of 100 right</div><div class="fl-next fragment" data-fragment-index="2">only a better prompt can fix these 15 →</div></div>
<p class="muted fl-cite">Li et al. (2026)</p>

---

## Three versions of one prompt

<div class="pv-row">
<div class="pv-card"><div class="h">1. One-line prompt</div><div class="pv-code">Is this comment hostile or insulting toward someone?<br><br>yes / no</div></div>
<div class="pv-arr"><div>→</div><span>+ rules</span></div>
<div class="pv-card"><div class="h">2. Codebook</div><div class="pv-code">Does the comment attack a person?<br><br>Name-calling: yes.<br>Harsh criticism of an action: no.<br>…</div></div>
<div class="pv-arr"><div>→</div><span>+ setting</span></div>
<div class="pv-card"><div class="h">3. top_k = 1</div><div class="pv-code">Same codebook.<br><br><span class="pv-bar on">no</span><span class="pv-bar">yes</span><br>Always the most likely word.</div></div>
</div>

---

## Settings: temperature, top_k, greedy

<div class="st-row">
<div class="st-col"><div class="h">Default</div><div class="st-bars"><div><span>no</span><i style="width:180px;"></i></div><div><span>yes</span><i style="width:110px;"></i></div></div><div class="st-dots"><i class=""></i><i class=""></i><i class="y"></i><i class=""></i><i class="y"></i><i class=""></i><i class=""></i><i class="y"></i><i class=""></i><i class="y"></i></div></div>
<div class="st-col"><div class="h">Greedy</div><div class="st-bars"><div><span>no</span><i class="on" style="width:180px;"></i></div><div><span>yes</span><i style="width:110px;"></i></div></div><div class="st-dots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="st-cap">top_k = 1, or temperature = 0</div></div>
<div class="st-col"><div class="h">Who lets you set it</div>
<div class="st-av"><span>Open models (Qwen, DeepSeek)</span><b>✓</b></div>
<div class="st-av"><span>Gemini</span><b>✓</b></div>
<div class="st-av"><span>GPT-5 reasoning</span><b class="no">✗ mostly</b></div>
<div class="st-av"><span>Claude, current API</span><b class="no">✗</b></div>
</div>
</div>

<div class="demo" data-demo="stloop" style="display:none;"></div>

<p class="st-foot">Hosted models: still some randomness <span class="muted">(Atil et al. 2025)</span></p>

---

## The experiment on one comment

<div class="demo" data-demo="steps"></div>

---

## The codebook makes both models better

<div class="demo" data-demo="experiment"></div>

---

## Recent research on codebook prompts



<div class="small">

| Finding | Source |
|---|---|
| The content of a prompt matters more than prompting techniques. | Çelebi &amp; Penczynski (2026) |
| Models fill in vague definitions without saying so. Better models keep the same bias. | Halterman &amp; Keith (2026) |
| The best prompt style depends on the task. Personas and step-by-step instructions can lower accuracy. | McLaren et al. (2026) |
| Small changes in wording shift the labels. | Atreja et al. (2024); Barrie et al. (2025) |
| A separate prompt for each category works better than one prompt for all categories. | Dunivin (2025) |

</div>

---

## Write a rule

<div class="ex-tag">Step 10</div>

<p class="yt-intro">Alone or in pairs, find a comment that is hard to code.</p>

<div class="yt-box">Show me 5 comments from data/working_100.csv where the five runs in<br>runs/working_v0_qwen.csv did not all agree, with the full text as plain<br>paragraphs and each run’s label. Don’t show the gold labels, and don’t suggest any rules.</div>

<p class="yt-copy">Copy it from step 10 on the GitHub page.</p>

<p class="yt-look">Write one rule that settles your comment, in your own words, without looking at the gold labels.</p>

---

## The room's codebook

<div class="ex-tag">Step 11</div>


<div class="demo" data-demo="roomcodebook"></div>

<div class="ho-lock"><div class="g"><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><span>🔒</span></div><div><b>Then: held-out 100</b><br>test once, unseen</div></div>

---

## Your codebook and the held-out test

<div class="ex-tag">Step 11</div>

<div class="yt-row"><span class="n">1</span><div><div class="yt-box">Copy codebook_v0.md to codebook_v1.md. Just before the last line (“Answer with<br>the label only.”), add a line “Rules:” and then the rules below, exactly as I wrote them.<br><span class="more">…</span></div></div></div><div class="yt-row"><span class="n">2</span><div><div class="yt-box">Held-out test: label data/heldout_100.csv with codebook_v0.md and with codebook_v1.md,<br>3 runs each, saved to runs/heldout_v0.csv and runs/heldout_v1.csv.<br><span class="more">…</span></div></div></div>

<p class="yt-copy">Copy the two prompts from step 11 on the GitHub page.</p>

<p class="yt-look">Paste the room’s three rules at the end of the first prompt.</p>

---

## Same comment, other gender



<p style="font-size:26px; margin:0 0 10px; text-align:left;">If you compare how women and men are treated, the label should not depend on gender.</p>

<div class="demo" data-demo="robustedit"></div>

---

## Swap the gender words

<div class="ex-tag">Step 12</div>

<div class="yt-box">Make a folder edits/. Create edits/working_gender.csv: a copy of data/working_100.csv<br>in which you swap gendered words in the column text (he/she, him/her, his/her,<br>husband/wife, boyfriend/girlfriend, mom/dad and so on), keeping the grammar right.<br><span class="more">…</span></div>

<p class="yt-copy">Copy it from step 12 on the GitHub page.</p>

<p class="yt-look">Compare the swap with a plain rerun. Only the changes beyond the rerun point to gender.</p>

---

## Labels that change after small edits

<div class="demo" data-demo="robustbars"></div>

---

## Robustness in recent research

<div class="two">
<div class="card"><b>Moral judgments of whole posts</b>Four models judged 2,939 dilemmas. Small surface edits changed 7.5% of verdicts. Retelling the post in the third person changed 24.3%.<br><span class="muted">van Nuenen &amp; Sachdeva (2026), FAccT</span></div>
<div class="card"><b>Prompt rewordings and false positives</b>For 94% of hypotheses with no real effect, a few rewordings of the prompt were enough to produce a significant result.<br><span class="muted">Baumann et al. (2025)</span></div>
</div>

---

## Multi-turn: one comment, two follow-ups



<div class="demo" data-demo="pushback"></div>

---

## Sycophancy: your view in the question

<div class="demo" data-demo="framebars"></div>

---

## Sycophancy: pushback after the answer

<div class="demo" data-demo="pushbars"></div>

---

## Multi-turn in recent research

<div class="two">
<div class="card"><b>Debate between models</b>In more than 30,000 debates, GPT-4.1 changed its verdict in 1–3% of cases. Claude and Gemini changed theirs in 28–41%. The order of speaking also changed the outcome.<br><span class="muted">Sachdeva &amp; van Nuenen (2026), COLM</span></div>
<div class="card"><b>Models share their errors</b>When two models are both wrong, they agree on the wrong answer about 60% of the time.<br><span class="muted">Kim et al. (2025), ICML</span></div>
</div>

---

## Write it all down

<div class="ex-tag">Step 14</div>


<p style="font-size:30px; margin:6px 0 0;">Today’s analysis lives in your files and in long chats full of decisions. Chats are where research decisions become opaque.</p>

<pre class="ft-code" style="margin:14px 0 0;"><code class="nohighlight" style="font-size:22px; padding:16px 20px;">Write a file WORKFLOW.md that documents today's labeling study in enough detail
that someone who never saw these conversations could reproduce it exactly.

Include: the data, the codebooks, the models, providers and every setting,
how the reliability numbers were computed, and every test and its results.

End with a section "Decisions I did not ask for".</code></pre>

<p class="yt-copy">Copy it from step 14 on the GitHub page.</p>

<p class="yt-look">What does a good entry in this file look like?</p>

---

## Read WORKFLOW.md

<div class="ex-tag">Step 14</div>


<p style="font-size:30px; margin:6px 0 10px;">Read it, especially the last section. Look for decisions you didn’t know were made. For instance:</p>

<ul style="font-size:28px; line-height:1.5;">
<li>which provider answered, and whether it fell back to another one</li>
<li>how failed calls were retried, and how many still failed</li>
<li>how a tie between runs was counted</li>
<li>whether answers like “Yes.” were cleaned up before counting</li>
<li>whether the codebook was changed before it was sent</li>
</ul>

<p style="font-size:30px; margin-top:16px;">If any of these are missing, ask the agent to investigate and update the file.</p>

---

## Build something with your results

<div class="ex-tag">Step 15</div>


<p class="yt-intro">Research outputs don’t have to be static images pasted into slides.</p>

<pre class="ft-code" style="margin:14px 0 0;"><code class="nohighlight" style="font-size:22px; padding:16px 20px;">Build an interactive dashboard in an HTML file from this project's data and runs:
- a table of the 100 working comments, with my gold label and the label from each run
- a filter for comments where the runs disagree, or where they disagree with my label
- agreement with my labels and Krippendorff's alpha for each codebook I tried
- click a comment to see its full text and every label it got</code></pre>

<p class="yt-copy">Copy it from step 15 on the GitHub page.</p>

<p style="font-size:30px; margin-top:22px;">Open yours, then look at your neighbor’s. Do they look different from yours?</p>

---

## Your answers from the start

Name a result from today that shows why one of these items matters.

<div class="demo" data-demo="roomrecap"></div>

---

## Six sources of variation

<div class="sv-grid">
<div class="sv"><b>Runs</b><div class="big">8 of 120</div><span>labels changed on a plain rerun</span><i>slide 60</i></div>
<div class="sv"><b>Models</b><div class="big">44–74%</div><span>call the same 100 hostile</span><i>slide 16</i></div>
<div class="sv"><b>Wording</b><div class="big">73 → 79%</div><span>match the gold labels, one line → codebook</span><i>slide 53</i></div>
<div class="sv"><b>Settings</b><div class="big">78 → 97%</div><span>same label in 5 runs, top_k = 1</span><i>slide 53</i></div>
<div class="sv"><b>Small edits</b><div class="big">16 of 120</div><span>labels changed by a gender swap</span><i>slide 60</i></div>
<div class="sv"><b>Follow-ups</b><div class="big">76 of 120</div><span>flipped after “I think it’s the opposite”</span><i>slide 64</i></div>
</div>

---

## What to report

<ul style="font-size:32px; line-height:1.5; margin-top:24px;">
<li>The codebook, word for word</li>
<li>The model, provider, settings and date</li>
<li>Agreement across runs, and with your hand labels</li>
<li>The decisions the agent made, from WORKFLOW.md</li>
</ul>

---

## When to use a model

<div class="two">
<div class="card fragment"><b>Use a model</b><ul><li>There are too many texts to read yourself.</li><li>You can define it in a few sentences.</li><li>The meaning goes beyond single words, like sarcasm.</li><li>You can hand-label a sample to check it.</li></ul></div>
<div class="card fragment"><b>Skip it</b><ul><li>There are only about 50 texts.</li><li>The answer is already in your data.</li><li>A word search finds it, like every comment with “idiot”.</li><li>You can’t define what counts.</li></ul></div>
</div>

<p class="fragment" style="font-size:26px; line-height:1.4; margin-top:20px; text-align:left;">Through an API, your texts go to a company’s server. If they must stay private, run an open-weights model on your own computer.</p>

---

## Further reading

<div class="tiny">

| Topic | Reference |
|---|---|
| Method used today | Yalcin (2026), *Labeling Text with LLMs* |
| Practical guides | Törnberg (2024), *Sociologica* · Fang, Garcia Bernardo &amp; van Kesteren (2026), arXiv:2604.09638 |
| Codebooks and concepts | Halterman &amp; Keith (2025), *Political Analysis*; (2026), ACL |
| Prompt design | Çelebi &amp; Penczynski (2026), *PLOS One* · McLaren et al. (2026), arXiv:2603.26898 · Atreja et al. (2024) |
| Stability | Barrie, Palaiologou &amp; Törnberg (2025), arXiv:2407.02039 |
| Validation and risk | Desai, Card &amp; Jacobs (2026), arXiv:2607.07915 · Baumann et al. (2025), arXiv:2509.08825 |
| Robustness | van Nuenen &amp; Sachdeva (2026), arXiv:2603.05651 |
| Multi-turn | Sachdeva &amp; van Nuenen (2026), arXiv:2510.10002 |
| Reliability of models | Atil et al. (2025), arXiv:2408.04667 · Kim et al. (2025), ICML, "Correlated Errors in Large Language Models" |
| Correcting estimates | Angelopoulos et al. (2023), *Science* · Egami et al. (2023) |

</div>

---

## How this workshop was built

<img src="img/claude_in_my_browser.png" alt="Chrome showing Claude working in the Apps Script project for this workshop's live slides" style="width:100%; border:1px solid #ddd; margin:10px 0 12px;">

<p class="muted">Claude setting up this workshop's live slides in my browser, 16 November.</p>

---

## Q&A





<p class="muted"></p>

---

## Four sets of comments

<div class="ds-row">
<div class="ds-col warm"><div class="h">Warm-up <span>5</span></div><div class="ds-grid"><i class="y"></i><i class="y"></i><i></i><i></i><i></i></div><div class="cap">you code 5 by hand</div></div>
<div class="ds-arrow">→</div>
<div class="ds-col"><div class="h">Working <span>100</span></div><div class="ds-grid"><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="cap">build and tune on these</div></div>
<div class="ds-arrow">→</div>
<div class="ds-col locked"><div class="h">Held-out <span>100</span></div><div class="ds-grid"><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="ds-lock">🔒</div><div class="cap">test once, unseen</div></div>
<div class="ds-arrow">→</div>
<div class="ds-col"><div class="h">Experiment <span>120</span></div><div class="ds-grid"><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i class="y"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="cap">compare prompts, edits, follow-ups</div></div>
</div>
<div class="ds-key"><i class="y"></i> sides with the poster <i></i> doesn't (answer key)</div>

---

<!-- .slide: data-visibility="uncounted" -->

## Appendix: more on reliability, validity and reporting

Slides from the full version of this workshop, for review afterwards: reliability across runs and models, the held-out test, validity against the answer key, the stress test, correcting estimates, and related tools.

---

<!-- .slide: data-visibility="uncounted" -->
## Three questions about a measure produced by a model

<div class="three">
<div class="card"><b>Who made the decisions?</b>The model, the labels, the wording of the prompt, the treatment of doubtful cases.</div>
<div class="card"><b>Is it repeatable?</b>The same labels on a second run, and with a second model.</div>
<div class="card"><b>Is it correct?</b>The labels match a careful human coder's labels.</div>
</div>

In this workshop we build a labeling study with a coding agent and test it against each question.

---

<!-- .slide: data-visibility="uncounted" -->
## Chat assistants: the user runs the code

<div class="chat">
  <div class="msg user">Label these comments. I get <code>KeyError: 'body'</code>. Can you fix my code?</div>
  <div class="msg bot">
    <div class="codebox"><div class="codebar"><span>python</span><span>Copy code</span></div><pre>df = pd.read_csv("comments.csv")
comments = df["text"]</pre></div>
    The column is named <code>text</code>. Try this instead.
  </div>
  <div class="msg user">Ran it. Now I get <code>FileNotFoundError: comments.csv</code></div>
</div>

---

<!-- .slide: data-visibility="uncounted" -->
## Measurement with a model: five steps

<div class="flow">
  <div class="box"><b>Concept</b><span>Does the comment side with the poster?</span></div>
  <div class="arrow">→</div>
  <div class="box"><b>Codebook</b><span>A written definition, with a rule for each label</span></div>
  <div class="arrow">→</div>
  <div class="box"><b>Procedure</b><span>A human coder, a keyword rule, or a model given the codebook</span></div>
  <div class="arrow">→</div>
  <div class="box"><b>Check</b><span>Reliability and validity</span></div>
  <div class="arrow">→</div>
  <div class="box"><b>Use</b><span>Label all texts; count and compare</span></div>
</div>

A model replaces the procedure. The other four steps remain the researcher's work.

<p class="muted">Adcock &amp; Collier (2001) · Krippendorff (2018) · Grimmer, Roberts &amp; Stewart (2022)</p>

---

<!-- .slide: data-visibility="uncounted" -->
## Reliability: human coders and language models

<div class="small">

| Source of variation | Human coding | Model labeling |
|---|---|---|
| Repetition | The same coder, later (rarely measured) | Repeated runs. Cheap to measure. Persists under fixed settings |
| Instructions | One codebook | Paraphrases of the same prompt can give different labels |
| Coder | Agreement between coders | Agreement between models, and between providers of one model |
| Time | Coder drift | Hosted models and infrastructure change without notice |

</div>

For a model, each row is a separate reliability figure. Most papers report the first, if any.

<p class="muted">Barrie, Palaiologou &amp; Törnberg (2025) · Atil et al. (2025) · Cronbach et al. (1972)</p>

---

<!-- .slide: data-visibility="uncounted" -->
## Two sources of variation in this workshop

| Source | Effect |
|---|---|
| The coding agent (Codex) | The code it writes differs between participants |
| The labeling model (Qwen, DeepSeek) | The labels differ between runs of the same code |

---

<!-- .slide: data-visibility="uncounted" -->
## Within-model agreement across five runs

<div class="demo" data-demo="bars"></div>

---

<!-- .slide: data-visibility="uncounted" -->
## Between-model disagreement: two comments

<div class="demo" data-demo="split"></div>

---

<!-- .slide: data-visibility="uncounted" -->
## Qwen and DeepSeek: cross-tabulation of labels

<div class="demo" data-demo="matrix"></div>

---

<!-- .slide: data-visibility="uncounted" -->
## Revising the codebook: types of borderline case

<div class="small">

| Type | Example | Possible rule |
|---|---|---|
| Whose behavior? | "She asked for it. Play stupid games, win stupid prizes." | Criticism of others in the story is support: yes |
| Tone or verdict? | "You should have apologized. Yes, she was overreacting." | Judge the conclusion |
| Advice | "Talk to her before the party." | Judge past actions only |
| Who is "you"? | "You're making this entirely about you." | "You" is the poster |

</div>

Write the rules blind to the answer key. Test them on fresh comments.

---

<!-- .slide: data-visibility="uncounted" -->
## A procedure for revising a prompt

<div class="small">

1. Write the prompt as instructions for a human coder: context, definitions, exclusion criteria.
2. Label a working set several times, with more than one model. Read the unstable and conflicting cases.
3. Group those cases by type. Add one rule per type, with an example from unscored texts.
4. With several categories, ask one yes/no question per category.
5. Check stability under paraphrases of the prompt, as well as repeated runs.
6. Test each revision on held-out texts and against hand labels. Fix the prompt before labeling everything.

</div>

<p class="muted">Törnberg (2024) · Barrie, Palaiologou &amp; Törnberg (2025) · Lin &amp; Zhang (2025) · Fang, Garcia Bernardo &amp; van Kesteren (2026)</p>

---

<!-- .slide: data-visibility="uncounted" -->
## Held-out test: agreement between six models, by codebook

<div class="demo" data-demo="heldout"></div>

With the rules, all six models give the same label on more than twice as many comments.

---

<!-- .slide: data-visibility="uncounted" -->
## Validity: problems specific to language models

<div class="small">

| Threat | Evidence |
|---|---|
| Models share errors | When two models are both wrong, they give the same wrong answer about 60% of the time (Kim et al. 2025) |
| Tone is read as stance | Here: polite criticism labeled as support; harsh support labeled as criticism |
| Undefined concepts are filled in silently | Models fill in "support" silently (Halterman &amp; Keith 2026) |
| Errors differ between groups | Estimates are biased even when overall accuracy exceeds 90% (Egami et al. 2023) |

</div>

The remedy is unchanged: comparison with labels from people.

---

<!-- .slide: data-visibility="uncounted" -->
## Baseline: a coder who always answers "yes"

<div class="demo" data-demo="lazy"></div>

---

<!-- .slide: data-visibility="uncounted" -->
## Validity requires human labels

A model cannot check its own labels. A reference set labeled by people is needed.

- A random sample, labeled by hand with the same codebook.
- Two coders where possible. If they disagree, the codebook is revised first.
- Agreement between trained human coders is the upper limit for a model.
- Model and human labels are compared label by label, and the disagreements are read.

---

<!-- .slide: data-visibility="uncounted" -->
## Agreement with the answer key, by model and codebook

<div class="demo" data-demo="validbars"></div>

---

<!-- .slide: data-visibility="uncounted" -->
## The estimate: share of comments that side with the poster

<div class="demo" data-demo="estimate"></div>

---

<!-- .slide: data-visibility="uncounted" -->
## Stress test: an agent instructed to maximize agreement

Challenge 4: "Make the agreement between runs, and between the two models, as high as possible on the held-out set. Change whatever you need to."

Changes to look for in the agent's report:
- Temperature 0 and `top_k = 1`: runs repeat more; accuracy stays the same.
- A new definition that pushes most comments to one label.
- Rules written from the held-out comments, which then stop being held out.

Then check the final codebook against the answer key.

---

<!-- .slide: data-visibility="uncounted" -->
## Risk: choosing the prompt that gives the result

In a replication of 37 annotation tasks from 21 published studies, using 18 models:

- State-of-the-art models led to an incorrect conclusion for about 31% of hypotheses; smaller models for about half.
- With a few paraphrases of the prompt, a false positive could be produced for 94% of null hypotheses.
- The risk was highest for effects close to the significance threshold.
- Human-labeled data reduced false positives and improved the choice of model.

<p class="muted">Baumann et al. (2025), "Large Language Model Hacking"</p>

---

<!-- .slide: data-visibility="uncounted" -->
## From chat history to a written specification

After the exercises, the study exists in the project files and in several long conversations.

<div class="two">
<div class="card"><b>Vague</b>"The comments were labeled with an LLM several times and agreement was high."</div>
<div class="card"><b>Specific</b>"Qwen3-235B through OpenRouter, provider DeepInfra. Prompt: codebook_v1.md, verbatim. Five runs per comment. Percent identical, α, and agreement with the answer key for each model."</div>
</div>

The agent writes the specification and lists every decision it made on its own.

---

<!-- .slide: data-visibility="uncounted" -->
## Correcting estimates for labeling error

<div class="two">
<div class="card"><b>Analogy</b>A scale that reads too heavy can still be used. Weigh a few people on an accurate scale as well, compute the average error, and subtract it.</div>
<div class="card"><b>With labels</b>Hand-label a random sample. For those texts both labels are known, so the model's average error can be estimated and subtracted from the estimate.</div>
</div>

A model can be accurate overall and still err in different directions for different groups. A difference between groups then partly reflects the model.

<p class="muted">Angelopoulos et al. (2023) · Egami, Hinck, Stewart &amp; Wei (2023)</p>

---

<!-- .slide: data-visibility="uncounted" -->
## Simulation: group-specific error and a hand-coded correction

<div class="demo" data-demo="gap"></div>

---

<!-- .slide: data-visibility="uncounted" -->
## Related: AI co-scientist tools

Systems of several agents that propose hypotheses, search literature and draft papers. Two were given a question about Brazilian deputies: why do those from less populous states speak more about their own state?

<div class="small">

| Tool | Output |
|---|---|
| Open Coscientist (hypotheses) | Five research designs, all concerning federal transfers. None mentions malapportionment or how the speeches were labeled. |
| OpenScience (literature) | Five real papers. For one, the reported finding (deputies' bills are mostly local) is the reverse of the paper's. |

</div>

<p class="muted">D-Lab workshop: github.com/dlab-berkeley/AI-Science-Coscientist</p>

---

<!-- .slide: data-visibility="uncounted" -->

## Appendix: the same method on Brazilian political speeches

Three slides for review after the session. They apply the workshop's method to official summaries of 2025 floor speeches in the Câmara dos Deputados.

The complete version of that study, with lessons, Portuguese codebooks, data and reference runs, is in the `camara/` folder of the workshop repository.

---


<!-- .slide: data-visibility="uncounted" -->

## Appendix: Brazilian deputies' floor speeches

**Data.** Official summaries of 2025 floor speeches in the Câmara dos Deputados.

**Label.** The level of government the speech is about: nacional, estadual, municipal, não político, indefinido.

**Question.** Do deputies from less populous states speak more about their own state and municipalities?

**Reliability.** Each of six models gave identical labels across five runs for 76–97% of 100 speeches. All six agreed on 73%.

<p class="muted">Câmara dos Deputados, Dados Abertos · full materials in the <code>camara/</code> folder</p>

---


<!-- .slide: data-visibility="uncounted" -->

## Appendix: two speeches, six models

<div class="demo" data-demo="split" data-source="br"></div>

---


<!-- .slide: data-visibility="uncounted" -->

## Appendix: the estimate under three codebooks

<div class="demo" data-demo="flip" data-mode="all"></div>
