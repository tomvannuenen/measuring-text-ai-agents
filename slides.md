
# Using AI Agents to Label Text


<p class="muted">Tom van Nuenen · UC Berkeley D-Lab · São Paulo, November 2026</p>

<p style="font-size:30px; margin-top:40px;">Slides: <b style="color:#d9481f;">tomvannuenen.me/measuring-text-ai-agents</b></p>

---

## Get Codex on your laptop

<ol style="font-size:34px; line-height:1.6;">
<li>Download the ChatGPT app for macOS or Windows at <b>chatgpt.com/download</b>.</li>
<li>Open it and sign in. A free account is enough.</li>
<li>Click <b>ChatGPT ⌄</b> at the top left and choose <b>Codex</b>.</li>
</ol>

<img src="img/codex_menu.png" alt="The menu at the top left, before and after: ChatGPT, then Codex" style="width:80%; margin:18px auto 0; display:block; border-radius:10px; box-shadow:none;">

<p style="font-size:30px; font-weight:700; color:#d9481f; margin-top:18px;">Do this now. You will need Codex in a few minutes.</p>

<p class="muted" style="font-size:24px; margin-top:8px;">If you can’t install Codex, please follow along on the shared screen.</p>

---

## Your perceptions

<div class="demo" data-demo="where" data-round="start"></div>

---

## Large language models (LLMs)

<ul style="font-size:27px; line-height:1.4; margin:0 0 20px 1em; text-align:left;"><li class="fragment">An LLM is trained on huge amounts of text.</li><li class="fragment">ChatGPT, Claude and Gemini are powered by LLMs.</li><li class="fragment">An LLM writes by picking the next word, again and again.</li></ul>

<div class="fragment"><div class="demo" data-demo="llmchat"></div></div>

---

## Temperature

<ul style="font-size:27px; line-height:1.4; margin:0 0 6px 1em; text-align:left;"><li>Temperature sets how spread out the chances are.</li><li class="fragment tp-step">A high temperature spreads the chances over more words.</li><li class="fragment tp-step">A low temperature gives the top word almost all the chance.</li><li class="fragment tp-step">Temperature 0 always picks the top word.</li></ul>

<div class="demo" data-demo="tempdial"></div>

---

## Context windows

<div class="demo" data-demo="ctxwin"></div>

<span class="fragment cw-step"></span><span class="fragment cw-step"></span><span class="fragment cw-step"></span><span class="fragment cw-step"></span>

---

## Agents

<ul style="font-size:28px; line-height:1.45; margin:6px 0 24px 1em; max-width:1000px; text-align:left;"><li class="fragment">An agent is an LLM with tools.</li><li class="fragment">It reads files, runs Python, searches the web and makes charts.</li><li class="fragment">Today you use Codex.</li></ul>

<div class="fragment"><svg viewBox="0 0 900 330" width="900" height="330" style="font-family:inherit; overflow:visible; display:block; margin:0 auto;"><line x1="195" y1="72" x2="375.0" y2="145" stroke="#bbb" stroke-width="2.5"/><path d="M110,50 h24 l7,8 h39 v42 h-70 z" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="145" y="138" text-anchor="middle" font-size="22" fill="#111">read and write files</text><line x1="195" y1="252" x2="375.0" y2="185" stroke="#bbb" stroke-width="2.5"/><rect x="110" y="226" width="70" height="52" rx="7" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M124,242 l12,10 l-12,10" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="142" y1="264" x2="162" y2="264" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="145" y="318" text-anchor="middle" font-size="22" fill="#111">write and run code</text><line x1="705" y1="72" x2="525.0" y2="145" stroke="#bbb" stroke-width="2.5"/><circle cx="755" cy="72" r="29" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="755" cy="72" rx="12" ry="29" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="726" y1="72" x2="784" y2="72" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M730,58 h50 M730,86 h50" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="755" y="138" text-anchor="middle" font-size="22" fill="#111">search the web</text><line x1="705" y1="252" x2="525.0" y2="185" stroke="#bbb" stroke-width="2.5"/><path d="M724,222 v58 h64" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="734" y="252" width="12" height="24" fill="#111"/><rect x="752" y="236" width="12" height="40" fill="#d9481f"/><rect x="770" y="244" width="12" height="32" fill="#111"/><text x="755" y="318" text-anchor="middle" font-size="22" fill="#111">make a chart</text><rect x="375.0" y="123.0" width="150" height="84" rx="12" fill="#111"/><text x="450" y="176" text-anchor="middle" font-size="32" font-weight="700" fill="#fff">LLM</text></svg><div class="demo" data-demo="agentloop" style="display:none;"></div></div>

---

## How agents work

<div style="margin-top:28px;">
<div class="fragment" style="display:flex; gap:22px; align-items:baseline; margin:0 0 30px; text-align:left;"><span style="font-size:56px; font-weight:800; color:#d9481f; width:50px;">1</span><p style="font-size:34px; line-height:1.4; margin:0;">The agent works inside a <b>project folder</b> on your machine. That folder is its world. It reads and changes the files inside it.</p></div>
<div class="fragment" style="display:flex; gap:22px; align-items:baseline; margin:0 0 30px; text-align:left;"><span style="font-size:56px; font-weight:800; color:#d9481f; width:50px;">2</span><p style="font-size:34px; line-height:1.4; margin:0;">Everything it does is <b>recorded</b>. You can inspect every command it ran.</p></div>
<div class="fragment" style="display:flex; gap:22px; align-items:baseline; margin:0 0 30px; text-align:left;"><span style="font-size:56px; font-weight:800; color:#d9481f; width:50px;">3</span><p style="font-size:34px; line-height:1.4; margin:0;">It asks for <b>permission</b> before it goes outside the folder or online.</p></div>
</div>

---

## Get the workshop files

<div class="ex-tag">Step 1</div>


<p style="font-size:30px; line-height:1.45; margin:6px 0 4px; text-align:left;">Every prompt today is on our GitHub page, a website that stores project files. Open it now and keep it open.</p>

<div style="font-size:44px; font-weight:700; color:#d9481f; margin:0 0 14px; text-align:left;">tinyurl.com/mtai-workshop</div>

<div class="fragment">
<p style="font-size:30px; margin:0 0 12px; text-align:left;">Copy the step 1 prompt into a <b>New chat</b> in Codex. Click <b>Allow once</b>.</p>

<div style="display:grid; grid-template-columns:1.6fr 1fr; gap:24px; align-items:center;">
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px; line-height:30px; background:#f0efea; color:#111; border-radius:3px; padding:16px 20px; text-align:left;">Download the GitHub repository at<br><span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; color:#d9481f; font-weight:700;">tinyurl.com/mtai-workshop</span> as a ZIP, unzip it<br>on my Desktop as ai-workshop,<br>and tell me where the folder is. Then open<br>the repository's page in my browser.</div>
<img src="img/codex_allow_download.png" alt="Codex asks to connect to the internet and edit the Desktop: Allow once" style="width:100%; margin:0; border-radius:10px; box-shadow:none;">
</div>

</div>

<p class="fragment" style="font-size:28px; line-height:1.4; color:#6f6f69; margin-top:14px; text-align:left;">You can also open the link yourself, click Code → Download ZIP, and rename the folder ai-workshop.</p>

---

## Make the folder a project

<div class="ex-tag">Step 1</div>


<div style="display:grid; grid-template-columns:1.15fr 1fr; gap:34px; align-items:center; margin-top:10px;">
<ol style="font-size:28px; line-height:1.45; margin:0; text-align:left;">
<li>Above the chat box, click <b>Choose project</b>, then <b>New project</b>.</li>
<li>Click <b>Add</b> and choose the folder <code>ai-workshop</code> on your Desktop.</li>
<li>Check that it says <b>This computer</b>, then click <b>Create project</b>.</li>
<li>If Codex asks <b>Trust this folder?</b>, click <b>Trust folder</b>.</li>
</ol>
<img src="img/codex_create_project.png" alt="Create project, with the folder ai-workshop as its source folder, on This computer" style="width:100%; margin:0; border-radius:10px; box-shadow:none;">
</div>

<p style="font-size:28px; margin-top:24px;">Start every new chat in this project. Codex then works only inside this folder.</p>

---

## Text labeling in the social sciences

<ul style="font-size:28px; line-height:1.3; margin:2px 0 14px 1em; max-width:1040px; text-align:left;"><li class="fragment" style="margin-bottom:8px;">Labeling assigns each text to a category, such as “positive” or “negative”. It is the core of content analysis.<br><span style="font-size:21px; color:#888;">Krippendorff 2018</span></li><li class="fragment" style="margin-bottom:8px;">Social scientists label speeches, news, party manifestos and online comments to measure concepts such as policy positions or incivility.</li><li class="fragment" style="margin-bottom:8px;">Researchers count the labels and compare groups.</li><li class="fragment" style="margin-bottom:8px;">Errors in the labels change these results.<br><span style="font-size:21px; color:#888;">TeBlunthuis, Hase &amp; Chan 2024</span></li><li class="fragment">Today an LLM labels Reddit comments for <b>hostility</b>, and we check its labels.</li></ul>

<div class="fragment" style="max-width:1000px; margin:0;">
<div style="display:grid; grid-template-columns:1fr 50px 110px; gap:14px; font-size:22px; color:#6f6f69; margin-bottom:12px;"><span style="text-align:left;">Reddit comment</span><span></span><span>Hostile?</span></div>
<div style="display:grid; grid-template-columns:1fr 50px 110px; align-items:center; gap:14px; margin:0 0 12px;"><div style="font-size:25px; line-height:1.4; text-align:left; border-left:3px solid #bbb; padding-left:16px;">“Protect your son. He is a child and an emotionally vulnerable one with special needs.”</div><span style="font-size:32px; color:#999;">→</span><span><span class="pill no" style="font-size:26px; padding:2px 22px;">no</span></span></div><div style="display:grid; grid-template-columns:1fr 50px 110px; align-items:center; gap:14px; margin:0 0 12px;"><div style="font-size:25px; line-height:1.4; text-align:left; border-left:3px solid #bbb; padding-left:16px;">“…you knocked her up like a dumbass. You don’t get to impose your will as you see fit.”</div><span style="font-size:32px; color:#999;">→</span><span><span class="pill yes" style="font-size:26px; padding:2px 22px;">yes</span></span></div>
<div style="text-align:right; font-size:26px; margin-top:4px;">Hostile: <b style="color:#d9481f;">1 of 2</b></div>
</div>

---

## Text labeling through the years

<div class="era-wrap"><div class="era-list"><div class="fragment era-step era-row"><span class="y"><span class="since">since</span>1950s</span><span class="t">People label texts on paper sheets.<br><span class="s">Berelson 1952</span></span></div><div class="fragment era-step era-row"><span class="y"><span class="since">since</span>1960s</span><span class="t">Computers count dictionary words.<br><span class="s">Stone et al. 1966</span></span></div><div class="fragment era-step era-row"><span class="y"><span class="since">since</span>1980s</span><span class="t">Researchers tag text in software.<br><span class="s">ATLAS.ti, NVivo</span></span></div><div class="fragment era-step era-row"><span class="y"><span class="since">since</span>2000s</span><span class="t">Crowd workers label for pay.<br><span class="s">Mechanical Turk, 2005</span></span></div><div class="fragment era-step era-row"><span class="y"><span class="since">since</span>2020s</span><span class="t">Language models label from a written instruction.<br><span class="s">Gilardi, Alizadeh &amp; Kubli 2023</span></span></div></div><div class="era-stage"><figure class="era-fig"><div class="era-sheet"><div class="hd">LABELING SHEET <span>Story no. 0412</span></div><div class="ln">Topic: &nbsp;☐ politics &nbsp;☒ economy &nbsp;☐ crime</div><div class="ln">Tone toward the government:<br>☐ positive &nbsp;☒ neutral &nbsp;☐ negative</div><div class="ln">Labeler: R.M. &nbsp;&nbsp; Date: 3/11/1952</div></div><figcaption>An illustration of a paper labeling sheet</figcaption></figure><figure class="era-fig"><img src="img/era_ibm7090.jpg" alt="An IBM 7090 mainframe room in the early 1960s"><figcaption>The General Inquirer ran on IBM mainframes like this 7090. Photo: NASA, public domain.</figcaption></figure><figure class="era-fig"><img src="img/era_cap_us.png" alt="The United States page of the Comparative Agendas Project, with a chart of bills, hearings and laws by policy topic since 1946"><figcaption>The US Policy Agendas Project. Two trained people label most bills and laws by policy topic.</figcaption></figure><figure class="era-fig"><img src="img/era_wikipedia_detox.png" alt="Crowd workers were asked: Does the comment contain a personal attack or harassment? Five options follow."><figcaption>Crowd workers answered this question for over 100,000 Wikipedia comments. Wulczyn, Thain &amp; Dixon 2017</figcaption></figure><figure class="era-fig"><img src="img/era_gilardi2023.jpg" alt="Bar charts: ChatGPT accuracy and agreement compared with MTurk workers and trained annotators, on tweets and news articles"><figcaption>ChatGPT against MTurk workers and trained labelers on tweets and news. Gilardi, Alizadeh &amp; Kubli 2023</figcaption></figure></div></div>

<div class="demo" data-demo="eras" style="display:none;"></div>

---

## Are language models the future of text labeling?

<div style="display:flex; gap:32px; align-items:stretch;">
<div class="fragment" data-fragment-index="1" style="flex:1;">
<p style="font-size:30px; line-height:1.3; min-height:130px;">ChatGPT labeled tweets more accurately than MTurk crowd workers, at <b>1/30 the cost</b><br><span style="font-size:22px; color:#888;">Gilardi, Alizadeh &amp; Kubli 2023, PNAS</span></p>
<img src="img/mturk_closed.png" alt="mturk.com: Mechanical Turk is no longer available. Amazon Mechanical Turk permanently closed on September 30, 2026." style="width:100%; border:1px solid #ddd; margin:48px 0 0;">
</div>
<div class="fragment" data-fragment-index="2" style="width:4px; background:var(--accent);"></div>
<div class="fragment" data-fragment-index="2" style="flex:1;">
<p style="font-size:30px; line-height:1.3; min-height:130px;"><b>46%</b> of NLP papers in 2025 used a language model to evaluate their results. <b>43%</b> used people.<br><span style="font-size:22px; color:#888;">Yang et al. 2026</span></p>
<img src="img/llm_judge_trend_yang2026.png" alt="Share of NLP papers using each evaluation method, 2020 to 2025. LLM-as-a-judge rises from under 1% to 46% and passes human evaluation at 43%." style="width:108%; max-width:none; margin:0;">
</div>
</div>

---

## Reliability, validity and labeler bias

<div style="display:flex; gap:30px; align-items:stretch; margin-top:24px; text-align:left;">
<div class="fragment" data-fragment-index="1" style="flex:1;">
<p style="font-size:34px; font-weight:700; margin:0 0 10px;">Reliability</p>
<p style="font-size:28px; line-height:1.35; margin:0 0 26px; min-height:76px;">The same comment gets the same label when you ask again.</p>
<div style="font-size:20px; color:#6f6f69; margin-bottom:8px;">One comment, five runs</div>
<div><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">yes</span><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">yes</span><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">yes</span><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">yes</span><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">yes</span></div>
<p style="font-size:25px; line-height:1.4; margin-top:26px;">Today you run the model several times on the same comments.</p>
</div>
<div class="fragment" data-fragment-index="2" style="width:4px; background:var(--accent);"></div>
<div class="fragment" data-fragment-index="2" style="flex:1;">
<p style="font-size:34px; font-weight:700; margin:0 0 10px;">Validity</p>
<p style="font-size:28px; line-height:1.35; margin:0 0 26px; min-height:76px;">The label matches what we mean (a "gold label")</p>
<div style="font-size:20px; color:#6f6f69; margin-bottom:8px;">One comment</div>
<div><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">model says yes</span><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">gold label says yes</span><span style="font-size:30px; color:#d9481f; font-weight:700; vertical-align:middle;">✓</span></div>
<p style="font-size:25px; line-height:1.4; margin-top:26px;">Today you compare the model’s labels with our gold labels.</p>
</div>
<div class="fragment" data-fragment-index="3" style="width:4px; background:var(--accent);"></div>
<div class="fragment" data-fragment-index="3" style="flex:1;">
<p style="font-size:34px; font-weight:700; margin:0 0 10px;">Labeler bias</p>
<p style="font-size:28px; line-height:1.35; margin:0 0 26px; min-height:76px;">The label changes when something changes that should not matter.</p>
<div style="font-size:20px; color:#6f6f69; margin-bottom:8px;">One comment, two versions</div>
<div><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">as written: yes</span><span style="display:inline-block; padding:6px 16px; border-radius:6px; background:#e2e2dc; color:#111; font-size:24px; margin:0 6px 6px 0;">he → she: no</span><span style="font-size:30px; color:#d9481f; font-weight:700; vertical-align:middle;">✗</span></div>
<p style="font-size:25px; line-height:1.4; margin-top:26px;">Later you see how models react to changes like this.</p>
</div>
</div>

---

## r/AmItheAsshole

<p style="font-size:28px; margin:0 0 4px; text-align:left;">People describe a conflict and ask strangers to judge them.</p>

<div style="display:flex; gap:40px; align-items:flex-start; justify-content:space-between; margin-top:10px;">
<div style="width:640px;">
<img src="img/aita_post.png" alt="A post: AITA for refusing to lend my sister money after she spent months judging my financial decisions?" style="width:84%; border:1px solid #ddd; border-radius:8px; margin:0 0 8px;">
<img src="img/aita_reply.png" alt="A reply: NTA. Sounds like your parents are offering to pay. She is their daughter after all, they signed up for supporting her." style="width:84%; margin:0 0 0 16%; border:1px solid #ddd; border-radius:8px;">
<div class="fragment" data-fragment-index="1" style="margin:4px 0 0 calc(16% + 64px); font-size:26px; font-weight:700; color:#d9481f; text-align:left;">↑ The commenter writes the verdict.</div>

</div>
<img src="img/aita_sidebar.png" alt="The r/AmItheAsshole sidebar: tell us about a non-violent conflict, give both sides, and find out if you're right or the asshole. 2.5 million members." style="height:400px; border:1px solid #ddd; border-radius:8px; margin:0;">
</div>

<div class="fragment" data-fragment-index="2" style="display:flex; align-items:center; gap:14px; margin:12px 0 0 0;"><div style="flex:1; border:1px solid #ddd; border-radius:8px; background:#fff; padding:10px 16px; font-size:21px; line-height:1.4; text-align:left; color:#1a1a1b;">He broke up with you because you were ashamed to be with him. … First thing y’all did in public as a couple. <span style="border-bottom:3px solid #d9481f;">How cute :D</span></div><div style="width:290px; font-size:26px; font-weight:700; line-height:1.25; color:#d9481f; text-align:left;">← A labeler must decide if this is hostile.</div></div>

---

## This workshop has two parts

<div class="tw-task">
<img src="img/aita_reply_plain.png" style="height:96px;">
<span class="arr">→</span>
<span style="white-space:nowrap;">Hostile or insulting toward someone?</span> <span class="pill yes">yes</span> <span class="pill no">no</span>
</div>
<div class="tw-cards">
<div class="tw-card fragment"><div class="h">1. Working with an agent</div>
<ul style="font-size:28px; line-height:1.35; margin:0 0 0 1em; text-align:left;">
<li>What an agent is, and how it works in a project folder</li>
<li>Rules for the agent, and checking its log</li>
<li>The agent writes a script, and a model labels through the API</li>
</ul></div>
<div class="tw-card fragment"><div class="h">2. Checking the labels</div>
<ul style="font-size:28px; line-height:1.35; margin:0 0 0 1em; text-align:left;">
<li><b>Reliability:</b> the same label when you ask again</li>
<li><b>Validity:</b> the label matches the gold label</li>
<li><b>Labeler bias:</b> something irrelevant changes the label</li>
</ul></div>
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

## Model and effort

<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:12px; align-items:start;">
<div><img src="img/codex-model-select.png" alt="The model picker" style="height:160px; width:auto; max-width:100%; margin:0; border-radius:10px; box-shadow:none; display:block;"></div>
<div><img src="img/codex-effort.png" alt="The effort picker: Light, Medium, High, Extra High, Ultra" style="height:160px; width:auto; max-width:100%; margin:0; border-radius:10px; box-shadow:none; display:block;"></div>
</div>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:14px; text-align:left;">
<ul style="font-size:28px; line-height:1.35; margin:0 0 0 1em; text-align:left;"><li>The <b>model</b> is the brain of the agent.</li><li>Bigger, newer models do more, and use more of your limit.</li></ul>
<ul style="font-size:28px; line-height:1.35; margin:0 0 0 1em; text-align:left;"><li><b>Effort</b> is how long it thinks.</li><li>More effort helps on hard tasks, and uses more of your limit.</li></ul>
</div>

<p class="fragment" style="font-size:28px; margin:16px 0 0; text-align:left;">Codex lets you do a set amount of work every 5 hours. This is your <b>usage limit</b>.</p>
<div class="fragment" style="margin-top:12px; text-align:left;"><div style="font-size:24px; color:#6f6f69; margin-bottom:8px;">Codex messages per 5 hours, Plus plan (note: you are on a Free plan!)</div><div style="display:flex; gap:16px;"><div style="border:2px solid #111; border-radius:10px; padding:6px 16px; text-align:center; background:#fff;"><div style="font-size:21px; color:#6f6f69;">small model</div><div style="font-size:30px; font-weight:700; white-space:nowrap;">💬 350–3,000</div></div><div style="border:2px solid #111; border-radius:10px; padding:6px 16px; text-align:center; background:#fff;"><div style="font-size:21px; color:#6f6f69;">Sol</div><div style="font-size:30px; font-weight:700; white-space:nowrap;">💬 17–180</div></div><div style="border:2px solid #111; border-radius:10px; padding:6px 16px; text-align:center; background:#fff;"><div style="font-size:21px; color:#6f6f69;">biggest model</div><div style="font-size:30px; font-weight:700; white-space:nowrap;">💬 6–50</div></div></div></div>
<p class="fragment" style="font-size:28px; margin:16px 0 0; text-align:left;"><b style="color:#d9481f;">Start with Light effort.</b> See your usage at chatgpt.com/codex/settings/usage.<br><span style="font-size:21px; color:#888;">OpenAI, Codex pricing page, November 2026</span></p>

---

## The folder you downloaded

<div style="display:grid; grid-template-columns:auto 1fr; column-gap:40px; margin-top:14px; text-align:left; border:2px solid #111; border-radius:12px; padding:18px 26px; background:#fff;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 0px; color:#d9481f; font-weight:700;">ai-workshop/</div><div style="font-size:24px; color:#d9481f; padding:3px 0;">your Codex project</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">README.md</div><div style="font-size:24px; color:#555; padding:3px 0;">the workshop page, with every step</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">data/coder_5.csv</div><div style="font-size:24px; color:#555; padding:3px 0;">5 comments to label by hand</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">data/working_100.csv</div><div style="font-size:24px; color:#555; padding:3px 0;">100 comments to label</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">data/heldout_100.csv</div><div style="font-size:24px; color:#555; padding:3px 0;">100 comments kept for testing</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:24px; padding:3px 0 3px 30px;">images/</div><div style="font-size:24px; color:#555; padding:3px 0;">pictures for the workshop page</div></div>

<p style="font-size:28px; margin-top:20px;">Each data file has three columns: <code>id</code>, <code>text</code> and <code>hostile</code>.</p>

---

## Open the data first

<div class="ex-tag">Step 2</div>


<pre class="ft-code" style="margin:0 0 14px;"><code class="nohighlight" style="font-size:23px; padding:8px 18px;">Show me the first 10 rows of data/working_100.csv as a table.</code></pre>

<table style="width:100%; border-collapse:collapse; margin:0;"><thead><tr><th style="padding:10px 16px; text-align:left; font-family:monospace; font-size:26px; border-bottom:2px solid #111; width:15%;">id</th><th style="padding:10px 16px; text-align:left; font-family:monospace; font-size:26px; border-bottom:2px solid #111;">text</th><th style="padding:10px 16px; text-align:left; font-family:monospace; font-size:26px; border-bottom:2px solid #111; width:16%; color:#d9481f;">hostile</th></tr></thead><tbody>
<tr><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-family:monospace; font-size:18px; color:#888;">t1_emiclu6</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:24px; line-height:1.3;">“If the guy wanted to close your bag, he could have told you that your bag was open. 99% chance he’s a pickpocket, 1% socially dysfunctional idiot.”</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:26px; font-weight:700; color:#d9481f; white-space:nowrap;">yes</td></tr>
<tr><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-family:monospace; font-size:18px; color:#888;">t1_ejielm1</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:24px; line-height:1.3;">“Don’t pick up random drinks in a club, that’s just plain rude. Also, don’t get blackout drunk/high when you’re out with someone.”</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:26px; font-weight:700; color:#111; white-space:nowrap;">no</td></tr>
<tr><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-family:monospace; font-size:18px; color:#888;">t1_eci2a24</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:24px; line-height:1.3;">“She’s playing the Shitty Life Olympics. It’d be one thing to bring it up in a productive and mature way, but…”</td><td style="padding:12px 16px; border-bottom:1px solid #ddd; vertical-align:top; font-size:26px; font-weight:700; color:#d9481f; white-space:nowrap;">yes<div style="font-size:16px; font-weight:400; color:#888;">ambiguous</div></td></tr>
</tbody></table>

<div style="display:flex; font-size:20px; color:#555; margin-top:12px;"><div style="width:15%; padding:0 16px;">Reddit’s id</div><div style="flex:1; padding:0 16px;">the comment: all a labeler sees</div><div style="width:16%; padding:0 16px; color:#d9481f;">our gold labels<br>40 of 100 “yes”</div></div>

<p class="yt-copy">Copy it from step 2 on the GitHub page. Then open the file yourself: in <code>ai-workshop/data</code> on your Desktop, double-click <code>working_100.csv</code>.</p>

---

## Label five comments by hand

<div class="ex-tag">Step 2</div>


<div class="demo" data-demo="label"></div>

<p class="fragment" style="font-size:30px; margin-top:18px; text-align:left;">If the definition is unclear to you, it is unclear to the model too.</p>

---

## Your first try: just ask for labels

<div class="ex-tag">Step 3</div>


<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; margin-top:10px;">
<p style="font-size:28px; line-height:1.4; margin:0; text-align:left;">Start a new chat, click <b>Choose project</b> and pick <code>ai-workshop</code>. Then paste <span style="white-space:nowrap">step 3</span> from the GitHub page and approve what Codex asks.</p>
<img src="img/codex_approve.png" alt="Permissions: Deny or Allow once" style="width:100%; margin:0; border-radius:8px; box-shadow:none;">
</div>

<div style="position:relative; width:520px; margin:16px 0 0;"><img src="img/codex_choose_project.png" alt="A new chat in Codex: This computer and Choose project above the chat box" style="width:100%; margin:0; border-radius:10px; box-shadow:none; display:block;"><div style="position:absolute; left:39%; top:8%; width:32%; height:22%; border:4px solid #d9481f; border-radius:10px;"></div></div>

<pre class="ft-code"><code class="nohighlight" style="font-size:26px; padding:18px 22px;">Label the 100 comments in data/working_100.csv by whether
they are hostile, and tell me how reliable the labels are.</code></pre>

<p class="yt-copy">Copy it from step 3 on the GitHub page.</p>

---

## The agent’s log

<div class="ex-tag">Step 3</div>

<div style="display:grid; grid-template-columns:500px 1fr; gap:36px; align-items:start; margin-top:10px; text-align:left;">
<div><img src="img/codex_log_expanded.png" alt="Codex activity: Read files, ran a command, opened to show a Python command and the comments it printed, then Success." style="width:100%; border-radius:8px; margin:0;"></div>
<ul style="font-size:29px; line-height:1.3; margin:0 0 0 1em;">
<li style="margin-bottom:18px;">Click <b>Read files, ran a command</b>, then a command.</li>
<li style="margin-bottom:18px;">The box shows what the model saw.</li>
<li style="margin-bottom:18px;">Open your own log. Did a command print <code>hostile</code>?</li>
<li class="fragment" style="margin-bottom:18px;">The log never shows why the agent chose a label.</li>
<li class="fragment" style="margin-bottom:18px;">A reason per label helps with disagreements. The model writes that reason itself, so it may not be the real reason.<br><span style="font-size:22px; color:#888;">Turpin et al. 2023</span></li>
</ul>
</div>

---

## Your agent’s reliability number

<p style="font-size:36px; line-height:1.35; margin:30px 0 10px; text-align:left;">Which number did your agent report as reliability?<br>How did it get that number?</p>

<div class="fragment" style="margin-top:34px; text-align:left;">
<div style="background:#1b1b1b; color:#ececec; border-radius:10px; padding:16px 20px; font-size:28px; line-height:1.4; max-width:1000px;">My labels agreed with the existing hand-coded labels on 98 of 100 comments, with Cohen’s κ = 0.96.</div>
<div style="font-size:22px; color:#6f6f69; margin-top:8px;">My agent, GPT-6.2 Sol on Light</div>
</div>

<p class="fragment" style="font-size:30px; line-height:1.35; margin-top:30px; text-align:left;">Codex had read my labels before it labeled. The score says nothing about reliability.<br><span style="color:#6f6f69;">In Codex's own words: “The comparison is unblinded.”</span></p>

---

## Maximum effort for everything?

<div style="display:grid; grid-template-columns:380px 1fr; gap:40px; align-items:start; margin-top:14px; text-align:left;">
<div><img src="img/codex-effort.png" alt="The Codex menu with Model, Effort and Speed. The effort options are Light, Medium, High, Extra High and Ultra, which consumes usage limits faster." style="width:100%; border-radius:8px; margin:0;"><div style="font-size:21px; color:#6f6f69; margin-top:8px;">The effort menu in Codex</div><svg viewBox="0 0 380 256" width="100%" role="img" aria-label="A big sledgehammer labeled maximum effort swinging down on one tiny nut labeled yes or no." style="display:block; margin-top:16px; background:#fff; border:1px solid #d6d6cf; border-radius:8px;">
<defs>
<linearGradient id="steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9bec6"/><stop offset=".5" stop-color="#7d838c"/><stop offset="1" stop-color="#555b63"/></linearGradient>
<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d39a5c"/><stop offset="1" stop-color="#9c6a38"/></linearGradient>
</defs>
<text x="190" y="32" text-anchor="middle" style="font-size:22px; font-weight:800; letter-spacing:1px;" fill="#d9481f">MAXIMUM EFFORT</text>
<g transform="rotate(16 186 206)">
<rect x="206" y="130" width="140" height="17" rx="6" fill="url(#wood)" stroke="#7a5228" stroke-width="1.5"/>
<rect x="312" y="128" width="36" height="21" rx="7" fill="#2b2b2b"/>
<rect x="160" y="72" width="52" height="134" rx="6" fill="url(#steel)" stroke="#3f444b" stroke-width="2"/>
<rect x="160" y="72" width="52" height="13" rx="4" fill="#4a4f57"/>
<rect x="160" y="193" width="52" height="13" rx="4" fill="#4a4f57"/>
</g>
<ellipse cx="170" cy="232" rx="11" ry="7" fill="#c8a26a" stroke="#8a6a3a" stroke-width="2"/>
<line x1="30" y1="241" x2="350" y2="241" stroke="#bbb" stroke-width="2"/>
<text x="192" y="236" style="font-size:21px;" fill="#6f6f69">yes / no</text>
</svg></div>
<ul style="font-size:30px; line-height:1.3; margin:0 0 0 1em;">
<li style="margin-bottom:18px;">It may be tempting to always pick the highest effort.</li>
<li class="fragment" style="margin-bottom:18px;">But: longer thinking has been shown to make yes-or-no labels worse in some cases.<br><span style="font-size:22px; color:#888;">Huang &amp; Wang 2026</span></li>
<li class="fragment" style="margin-bottom:18px;">Reasoning on easy questions can cost many times more tokens, for the same answer.<br><span style="font-size:22px; color:#888;">Chen et al. 2024</span></li>
<li class="fragment" style="margin-bottom:18px;">High effort helps on long tasks. One label is a short task.</li>
</ul>
</div>

---

## Light or high effort

<p style="font-size:24px; margin:0 0 6px; color:#555;">GPT-6.2 Sol, the same request, in two new copies of the project. Light is the free default.</p>

<div style="display:grid; grid-template-columns:1fr 40px 1fr; text-align:left;">
<div style="font-size:30px; font-weight:700;">Light</div><div></div><div style="font-size:30px; font-weight:700; color:#d9481f;">High</div>
<div style="font-size:24px; color:#555; padding:10px 0 4px;">time</div><div></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:21%; background:#bbb; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">39 s</b></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:100%; background:#d9481f; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">3 min 06 s</b></div>
<div style="font-size:24px; color:#555; padding:10px 0 4px;">commands</div><div></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:40%; background:#bbb; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">4</b></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:100%; background:#d9481f; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">10</b></div>
<div style="font-size:24px; color:#555; padding:10px 0 4px;">tokens it wrote, thinking included</div><div></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:25%; background:#bbb; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">1,500</b></div><div></div><div style="display:flex; align-items:center; gap:12px;"><div style="flex:1;"><div style="height:26px; width:100%; background:#d9481f; border-radius:4px;"></div></div><b style="font-size:28px; width:150px;">6,000</b></div>
<div style="font-size:24px; color:#d9481f; padding:14px 0 4px; font-weight:700;">what it read</div><div></div><div></div><div style="font-size:26px;">every row, with my labels</div><div></div><div style="font-size:26px;">the text, and how many of my labels say hostile (40)</div>
<div style="font-size:24px; color:#555; padding:14px 0 4px;">same as mine</div><div></div><div></div><div style="font-size:30px; font-weight:700;">98 of 100</div><div></div><div style="font-size:30px; font-weight:700; color:#d9481f;">97 of 100</div>
</div>

<p style="font-size:28px; margin-top:22px; text-align:left;">High took five times as long, for the same score.</p>

---

## What is an API?

<p style="font-size:28px; line-height:1.45; margin:0 0 10px; text-align:left;">You can use a big LLM in two ways. People use a chat app. Programs use an <b>API</b>, which lets a program send the model text and get its answer back.</p>

<div class="demo" data-demo="apiflow"></div>
<span class="fragment af-step"></span>

---

## The agent and the labeling model

<p style="font-size:28px; margin:6px 0 4px; text-align:left;"><b style="color:#d9481f;">1</b>&nbsp; The agent writes <code>label.py</code> once. It never sees the API key.</p>
<p style="font-size:28px; margin:0 0 6px; text-align:left;"><b style="color:#d9481f;">2</b>&nbsp; <code>label.py</code> sends one comment at a time to Qwen and saves the labels.</p>

<div style="display:grid; grid-template-columns:300px 50px 230px 50px 220px 50px 150px; justify-content:center; align-items:center; margin-top:20px; row-gap:6px;">
<div style="border:2px solid #111; border-radius:12px; padding:18px; text-align:left; background:#fff; padding:0; overflow:hidden;">
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; padding:8px 12px; color:#6f6f69; border-bottom:1px solid #e2e2dc;">working_100.csv</div>
<div style="display:flex; font-size:22px;">
<div style="flex:1.3; outline:3px solid #d9481f; outline-offset:-3px;"><div style="padding:8px 12px; font-weight:700;">text</div><div style="padding:4px 12px; color:#555;">Your aunt is…</div><div style="padding:4px 12px; color:#555;">She can choose…</div><div style="padding:4px 12px; color:#555;">Honestly…</div><div style="padding:4px 12px 12px; color:#555;">ESH, both…</div></div>
<div style="flex:1; color:#bbb; border-left:1px solid #e2e2dc;"><div style="padding:8px 12px; font-weight:700; line-height:1.15;">gold label</div><div style="font-size:60px; text-align:center; padding-top:10px;">🔒</div><div style="font-size:19px; text-align:center; color:#888;">never sent</div></div>
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


<p class="fragment" style="font-size:28px; line-height:1.35; margin-top:16px; text-align:left;">Hosted models change over time, which is called <b>drift</b>. Write down the model version, the provider and the date. <span style="font-size:21px; color:#888;">Chen, Zaharia &amp; Zou 2023</span></p>

<div class="demo" data-demo="colflow" style="display:none;"></div>

---

## One long chat or one call per comment

<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; text-align:left;">
<div style="border:2px solid #bbb; border-radius:12px; padding:14px 18px;"><div style="font-size:26px; font-weight:700; margin-bottom:10px;">One long chat</div><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111; opacity:.35; text-decoration:line-through;">your instructions</div><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111;">files it listed</div><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111;">commands and their output</div><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111;">comment 1, comment 2 … comment 100</div><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111;">the labels so far</div><ul style="font-size:28px; line-height:1.3; margin:12px 0 0 1em; text-align:left;"><li>Each label depends on everything before it.</li><li>Early instructions can get lost.</li><li>Labels can change over time.</li></ul></div>
<div class="fragment" style="border:2px solid #d9481f; border-radius:12px; padding:14px 18px;"><div style="font-size:26px; font-weight:700; margin-bottom:10px; color:#d9481f;">One call per comment</div><div style="border:2px solid #111; border-radius:8px; padding:6px 6px 0; margin:0 0 8px;"><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111;">codebook</div><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111; background:#f6ddd3;">comment 1</div></div><div style="border:2px solid #111; border-radius:8px; padding:6px 6px 0; margin:0 0 8px;"><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111;">codebook</div><div style="display:block; border-radius:6px; padding:4px 12px; margin:0 0 4px; font-size:20px; text-align:left; background:#e2e2dc; color:#111; background:#f6ddd3;">comment 2</div></div><div style="font-size:20px; color:#6f6f69;">… one call for each comment</div><ul style="font-size:28px; line-height:1.3; margin:12px 0 0 1em; text-align:left;"><li>The codebook never changes.</li><li>One comment at a time.</li><li><code>label.py</code> works this way.</li></ul></div>
</div>

---

## AGENTS.md


<div style="display:grid; grid-template-columns:400px 1fr; gap:28px; margin-top:18px; text-align:left; align-items:start;">
<div style="border:2px solid #111; border-radius:12px; padding:16px 18px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:21px; white-space:nowrap; line-height:1.8; background:#fff;">ai-workshop/<br>&nbsp;&nbsp;<b style="color:#d9481f; border:2px solid #d9481f; border-radius:6px; padding:0 6px;">AGENTS.md</b><br>&nbsp;&nbsp;README.md<br>&nbsp;&nbsp;data/</div>
<div style="border:2px solid #111; border-radius:12px; overflow:hidden; background:#fff;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px; padding:8px 14px; color:#6f6f69; border-bottom:1px solid #e2e2dc;">AGENTS.md</div>
<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:23px; line-height:1.6; padding:14px 18px; white-space:pre-wrap;"># Project rules
- Never modify anything in data/.
- The column hostile holds our gold labels.
  Never send it to a labeling model.
- Propose a plan before creating or editing files.</div></div>
</div>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:34px; margin-top:30px; font-size:30px; line-height:1.4; text-align:left;">
<p style="margin:0;">Codex reads it at the start of every conversation. Claude Code reads <code>CLAUDE.md</code> the same way.</p>
<p style="margin:0;">Your first try ran without one. Let's ask Codex to create it with our rules.</p>
</div>

---

## Create AGENTS.md

<div class="ex-tag">Steps 4 and 5</div>

<div class="yt-row"><span class="n">1</span><div><div class="txt">Click the approval button under the chat box and choose <b>Ask for approval</b>.</div></div></div><div class="yt-row"><span class="n">2</span><div><div class="yt-box">Create a file called AGENTS.md in this project with exactly this content:<br>&nbsp;<br># Project rules<br>- The comments are in data/. Never modify anything in data/.<br><span class="more">…</span></div></div></div><div class="yt-row"><span class="n">3</span><div><div class="yt-box">Which columns could reveal the answer, and how will you keep them away<br>from the labeling model?</div></div></div>

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

## Add your key

<div class="ex-tag">Step 6</div>

<div class="yt-row"><span class="n">1</span><div><div class="yt-box">Create a new file called .env with one line, OPENROUTER_API_KEY=paste-your-key-here,<br>and open it in a text editor. I will paste the key myself.<br>Don't open or read the file after that.</div></div></div><div class="yt-row"><span class="n">2</span><div><div style="display:flex; align-items:center; gap:22px;"><div class="txt">Copy the key you were given into the file that opens. <b>Save the file</b> (⌘S or Ctrl+S), then close it.</div></div></div></div>

<p class="yt-copy">Copy the prompt from step 6 on the GitHub page.</p>

<p class="yt-look">Never paste the key into the chat.</p>

---

## One test call

<div class="ex-tag">Step 6</div>


<p style="font-size:27px; margin:0 0 8px; text-align:left;">Before labeling anything, check that the key works with one call to Qwen.</p>

<pre class="ft-code" style="margin:0;"><code class="nohighlight" style="font-size:20px; padding:10px 20px;">Make one test call to Qwen through OpenRouter, following AGENTS.md.
Use "Is this comment hostile or insulting toward someone? Answer yes or no."
as the system prompt, and the first comment in data/coder_5.csv as the user message.
Save the whole response to runs/test_call.json. Then show me the answer,
the model and provider that answered, and how many tokens it used.</code></pre>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; margin-top:10px;">
<div style="border:2px solid #111; border-radius:10px; text-align:left; background:#fff;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:19px; padding:8px 14px; border-bottom:1px solid #e2e2dc; color:#6f6f69;">runs/test_call.json</div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:21px; line-height:1.6; padding:12px 16px;"><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"model": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">"qwen/qwen3-235b-a22b-2507",</span></div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"provider": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">"DeepInfra",</span></div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"content": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; color:#d9481f; font-weight:700;">"yes",</span></div><div style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:20px;">"usage": <span style="font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important;">{ "total_tokens": … }</span></div></div></div></div>
<p style="font-size:26px; line-height:1.45; margin:0; text-align:left;">The answer comes back as a file. It says which model and provider answered, and how many tokens the call used. <span style="color:#6f6f69;">Shortened here. Yours has more.</span></p>
</div>

<p class="yt-copy">Copy it from step 6 on the GitHub page.</p>

<p class="yt-look">Open <code>data/coder_5.csv</code> and read the first comment. Does the model’s answer match yours from step 2?</p>

---

## What happens when an agent makes an  API call

<div class="fragment" style="display:grid; grid-template-columns:44px 140px 1.3fr 1fr; gap:14px; align-items:center; margin:0 0 12px; text-align:left;"><span style="display:inline-flex; width:40px; height:40px; border-radius:50%; background:#111; color:#fff; align-items:center; justify-content:center; font-size:22px; font-weight:700;">1</span><span style="font-size:22px; font-weight:700; color:#111;">Codex</span><span style="font-size:24px; line-height:1.3;">reads the first comment in <code>data/coder_5.csv</code></span><span style="background:#1b1b1b; color:#e6e6e6; border-radius:8px; padding:7px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px; line-height:1.4;">Your daughter and husband need…</span></div><div class="fragment" style="display:grid; grid-template-columns:44px 140px 1.3fr 1fr; gap:14px; align-items:center; margin:0 0 12px; text-align:left;"><span style="display:inline-flex; width:40px; height:40px; border-radius:50%; background:#111; color:#fff; align-items:center; justify-content:center; font-size:22px; font-weight:700;">2</span><span style="font-size:22px; font-weight:700; color:#111;">Codex</span><span style="font-size:24px; line-height:1.3;">writes a short Python script</span><span style="background:#1b1b1b; color:#e6e6e6; border-radius:8px; padding:7px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px; line-height:1.4;">client.chat.completions.create(<br>&nbsp;&nbsp;model="qwen/qwen3-235b…",<br>&nbsp;&nbsp;messages=[question, comment])</span></div><div class="fragment" style="display:grid; grid-template-columns:44px 140px 1.3fr 1fr; gap:14px; align-items:center; margin:0 0 12px; text-align:left;"><span style="display:inline-flex; width:40px; height:40px; border-radius:50%; background:#111; color:#fff; align-items:center; justify-content:center; font-size:22px; font-weight:700;">3</span><span style="font-size:22px; font-weight:700; color:#111;">the script</span><span style="font-size:24px; line-height:1.3;">sends the comment to the API with your key</span><span style="background:#1b1b1b; color:#e6e6e6; border-radius:8px; padding:7px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px; line-height:1.4;">POST openrouter.ai/api/v1/…</span></div><div class="fragment" style="display:grid; grid-template-columns:44px 140px 1.3fr 1fr; gap:14px; align-items:center; margin:0 0 12px; text-align:left;"><span style="display:inline-flex; width:40px; height:40px; border-radius:50%; background:#d9481f; color:#fff; align-items:center; justify-content:center; font-size:22px; font-weight:700;">4</span><span style="font-size:22px; font-weight:700; color:#d9481f;">Qwen</span><span style="font-size:24px; line-height:1.3;">answers, and the script saves the answer</span><span style="background:#1b1b1b; color:#e6e6e6; border-radius:8px; padding:7px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px; line-height:1.4;">runs/test_call.json<br>"content": "yes"</span></div><div class="fragment" style="display:grid; grid-template-columns:44px 140px 1.3fr 1fr; gap:14px; align-items:center; margin:0 0 12px; text-align:left;"><span style="display:inline-flex; width:40px; height:40px; border-radius:50%; background:#111; color:#fff; align-items:center; justify-content:center; font-size:22px; font-weight:700;">5</span><span style="font-size:22px; font-weight:700; color:#111;">Codex</span><span style="font-size:24px; line-height:1.3;">reads the file and tells you in the chat</span><span style="background:#1b1b1b; color:#e6e6e6; border-radius:8px; padding:7px 12px; font-family:'JetBrains Mono',ui-monospace,Menlo,monospace !important; font-size:18px; line-height:1.4;">Qwen answered “yes”.</span></div>
<p class="fragment" style="font-size:25px; line-height:1.4; margin-top:14px; text-align:left;">Two models take part. Codex (using GPT-6.2 Sol) writes and runs the code and tells you the result. Qwen 3 gives the label through the API.</p>

---

## Build the labeling script

<div class="ex-tag">Step 7</div>

<div class="yt-row"><span class="n">1</span><div><div class="yt-box">Create a file codebook_v0.md with exactly this text:<br>Is this comment hostile or insulting toward someone?<br><span class="more">…</span></div></div></div><div class="yt-row"><span class="n">2</span><div><div class="yt-box">Write a script label.py that labels the comments in a CSV file using a codebook file<br>as the system prompt, following the rules in AGENTS.md.<br><span class="more">…</span></div></div></div><div class="yt-row"><span class="n">3</span><div><div class="yt-box">Show me the lines in label.py that set the model, the settings and the labels,<br>the line that reads the codebook, and the line that builds the message sent<br><span class="more">…</span></div></div></div>

<p class="yt-copy">Copy the three prompts from step 7 on the GitHub page.</p>

<p class="yt-look">Check that only the comment text goes to Qwen.</p>

---

## Your answers, Qwen and the gold labels

<p style="font-size:24px; color:#6f6f69; margin:0 0 6px; text-align:left;">Compare this with your own table from step 7. Black means yes.</p>

<div class="demo" data-demo="labelresults"></div>
<p class="fragment hc-step rv-def">Reliability means the same label when you ask again.</p>
<p class="fragment hc-step rv-def">Validity means the label matches what we mean, here our gold label.</p>

---

## Open and closed models

<div style="display:grid; grid-template-columns:1fr 1fr; gap:56px; margin-top:16px;">
<div style="text-align:left;"><h3 style="font-size:38px; margin:0 0 14px;">Closed weights</h3><svg viewBox="0 0 470 210" width="470" height="210" style="font-family:inherit; overflow:visible; display:block; margin:0 auto;"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#111"/></marker></defs><text x="40" y="112" text-anchor="middle" font-size="26" font-weight="400" fill="#111">you</text><line x1="78" y1="92" x2="200" y2="92" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><text x="139" y="80" text-anchor="middle" font-size="20" font-weight="400" fill="#555">your text</text><line x1="200" y1="132" x2="78" y2="132" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><text x="139" y="158" text-anchor="middle" font-size="20" font-weight="400" fill="#555">an answer</text><rect x="212" y="22" width="240" height="176" rx="12" fill="none" stroke="#999" stroke-width="2" stroke-dasharray="7 6"/><text x="332" y="52" text-anchor="middle" font-size="20" font-weight="400" fill="#555">the company’s servers</text><rect x="262" y="78" width="140" height="76" rx="12" fill="#111" stroke="#111" stroke-width="2"/><text x="332" y="125" text-anchor="middle" font-size="26" font-weight="600" fill="#fff">model</text></svg><p style="font-size:26px; line-height:1.4; margin:18px 0 10px;">Only the company has the model. It can change or remove the model at any time.</p><p style="font-size:23px; color:#555; margin:0;">GPT-6.2 Sol and GPT-6 Luna (OpenAI), Claude Opus 5.5 (Anthropic), Gemini (Google)</p></div>
<div style="text-align:left;"><h3 style="font-size:38px; margin:0 0 14px;">Open weights</h3><svg viewBox="0 0 470 210" width="470" height="210" style="font-family:inherit; overflow:visible; display:block; margin:0 auto;"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#111"/></marker></defs><rect x="165" y="6" width="140" height="70" rx="12" fill="#111" stroke="#111" stroke-width="2"/><text x="235" y="50" text-anchor="middle" font-size="26" font-weight="600" fill="#fff">model</text><text x="318" y="47" text-anchor="start" font-size="20" font-weight="400" fill="#555">public download</text><line x1="205" y1="78" x2="115" y2="128" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><line x1="265" y1="78" x2="355" y2="128" stroke="#111" stroke-width="2.5" marker-end="url(#ah)"/><rect x="20" y="132" width="190" height="62" rx="12" fill="#fff" stroke="#111" stroke-width="2"/><text x="115" y="170" text-anchor="middle" font-size="23" font-weight="400" fill="#111">your computer</text><rect x="260" y="132" width="190" height="62" rx="12" fill="#fff" stroke="#111" stroke-width="2"/><text x="355" y="170" text-anchor="middle" font-size="23" font-weight="400" fill="#111">any provider</text></svg><p style="font-size:26px; line-height:1.4; margin:18px 0 10px;">Anyone can download the model and run it. The same version stays available, so others can repeat your study.</p><p style="font-size:23px; color:#555; margin:0;">Qwen3 (Alibaba), DeepSeek V4 (DeepSeek), Llama (Meta), gpt-oss (OpenAI), Mistral</p></div>
</div>

<p style="font-size:27px; margin-top:26px;">Codex runs on Sol, a closed model. Our labels come from Qwen, an open model, through OpenRouter (a service that passes your request to a model provider)</p>

---

## Three versions of one prompt

<p style="font-size:26px; line-height:1.4; margin:0 0 14px; text-align:left;">A clearer prompt should improve validity. A lower temperature should improve reliability.</p>

<div class="pv-row">
<div class="pv-card"><div class="h">1. One-line prompt</div><div class="pv-code">Is this comment hostile or insulting toward someone?<br><br>yes / no</div></div>
<div class="pv-arr fragment" data-fragment-index="1"><div>→</div><span>+ rules</span></div>
<div class="pv-card fragment" data-fragment-index="1"><div class="h">2. Codebook</div><div class="pv-code">Does the comment attack a person?<br><br>Name-calling: yes.<br>Harsh criticism of an action: no.<br>…</div></div>
<div class="pv-arr fragment" data-fragment-index="2"><div>→</div><span>+ setting</span></div>
<div class="pv-card fragment" data-fragment-index="2"><div class="h">3. Temperature 0</div><div class="pv-code">Same codebook.<br><br><span class="pv-bar on">no</span><span class="pv-bar">yes</span><br>Always the most likely label.</div></div>
</div>

---

## Importance of temperature

<div class="st-row">
<div class="st-col"><div class="h">Default</div><div class="st-strip"><div class="no" style="width:62%;">no 62%</div><div class="yes" style="width:38%;">yes 38%</div><i class="st-pin"></i></div><div class="st-cap">The model draws a label at random, weighted by these chances.</div><div class="st-dots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
<div class="st-col fragment" data-fragment-index="1"><div class="h">Greedy</div><div class="st-strip"><div class="no" style="width:62%;">no 62%</div><div class="yes" style="width:38%;">yes 38%</div><i class="st-pin"></i></div><div class="st-cap">Set the temperature to 0.</div><div style="font-size:20px; font-weight:700; color:#d9481f; line-height:1.3; text-align:left;">↑ Closed-weight models don’t always allow this.</div><div class="st-dots"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
<div class="st-col fragment" data-fragment-index="4"><div class="h">Models with greedy</div>
<div class="st-av"><span>Open models (Qwen, DeepSeek)</span><b>✓</b></div>
<div class="st-av"><span>Gemini</span><b>✓</b></div>
<div class="st-av"><span>GPT-5 reasoning</span><b class="no">✗</b></div>
<div class="st-av"><span>Claude, current API</span><b class="no">✗</b></div>
</div>
</div>

<div class="demo" data-demo="stloop" style="display:none;"></div>

<ul class="st-defs">
<li class="fragment" data-fragment-index="2">Temperature sets how spread out the chances are.</li>
<li class="fragment" data-fragment-index="3">Greedy always takes the most likely label.</li>
</ul>

<p class="st-foot">Each dot is one run of the same comment. Orange means yes. <span class="fragment" data-fragment-index="4">Even with greedy settings, hosted models keep some randomness <span class="muted">(Atil et al. 2025)</span>.</span></p>

---

## The codebook helps all three models

<div class="demo" data-demo="experiment"></div>

---

## Smaller and bigger models

<p style="font-size:28px; color:#555; margin:0 0 14px;">OpenAI doesn’t publish how big Sol and Luna are (the price is the best clue)</p>

<table style="width:100%; border-collapse:collapse; font-size:28px; margin-top:22px;"><tr style="color:#555; border-bottom:1px solid #bbb;"><td style="padding:8px; text-align:left;"></td><td style="padding:8px;">Luna</td><td style="padding:8px;">Sol</td></tr><tr style="border-bottom:1px solid #e2e2dc;"><td style="padding:10px 8px; text-align:left;">Price per million output tokens (a token is about ¾ of a word)</td><td style="padding:10px 8px;">$0.50</td><td style="padding:10px 8px;">$10</td></tr><tr style="border-bottom:1px solid #e2e2dc;"><td style="padding:10px 8px; text-align:left;">Agree with the labels in the data, one-line prompt, of 120</td><td style="padding:10px 8px;">92</td><td style="padding:10px 8px;">105</td></tr><tr style="border-bottom:1px solid #e2e2dc;"><td style="padding:10px 8px; text-align:left;">Agree with the labels in the data, codebook, of 120</td><td style="padding:10px 8px;">110</td><td style="padding:10px 8px;">113</td></tr><tr style="border-bottom:1px solid #e2e2dc;"><td style="padding:10px 8px; text-align:left;">Cost of the codebook test, 720 calls</td><td style="padding:10px 8px;">$0.06</td><td style="padding:10px 8px;">$0.78</td></tr></table>

<p style="font-size:28px; margin-top:22px;">With a codebook, the small model does almost as well for under a tenth of the cost.</p>

---

## Human label variation

<p class="muted lv-cite" style="margin-top:0 !important;">Plank (2022); Aroyo &amp; Welty (2015)</p>

<div style="display:flex; gap:48px; align-items:flex-start; margin-top:24px;">
<div>
<div style="display:grid; grid-template-columns:repeat(10,28px); gap:5px;"><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#111; color:#fff;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;">?</div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div><div style="width:28px; height:28px; border-radius:4px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700;background:#fff; border:2px solid #bbb; color:#999;"></div></div>
<div style="margin-top:14px;">
<div style="display:flex; align-items:center; gap:10px; font-size:22px; margin:6px 0;"><span style="width:20px; height:20px; border-radius:3px; display:inline-block; box-sizing:border-box; background:#111;"></span>hostile: 40</div>
<div style="display:flex; align-items:center; gap:10px; font-size:22px; margin:6px 0;"><span style="width:20px; height:20px; border-radius:3px; display:inline-block; box-sizing:border-box; background:#fff; border:2px solid #bbb;"></span>not hostile: 60</div>
<div style="display:flex; align-items:center; gap:10px; font-size:22px; margin:6px 0;"><span style="width:20px; height:20px; border-radius:3px; display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; border:2px solid #bbb; color:#999; font-weight:700; font-size:15px;">?</span>ambiguous: 21</div>
</div>
</div>
<div style="flex:1;">
<div style="border:1px solid #ddd; border-radius:8px; padding:14px 18px; font-size:22px; line-height:1.4; background:#fff; margin-bottom:8px;">You don’t feel comfortable having sex with strangers but you’ve also had three one-night stands? Get over yourself.</div>
<div style="font-size:20px; color:#d9481f; font-weight:600; margin:0 0 22px 6px;">our label: hostile, ambiguous</div>
<div style="border:1px solid #ddd; border-radius:8px; padding:14px 18px; font-size:22px; line-height:1.4; background:#fff; margin-bottom:8px;">Come on, you’re a grown-ass adult, you presumably function in society, surely you can figure out how to run a vacuum cleaner…</div>
<div style="font-size:20px; color:#d9481f; font-weight:600; margin:0 0 22px 6px;">our label: not hostile, ambiguous</div>
</div>
</div>

<div class="demo" data-demo="goldflip" style="display:none;"></div>

---

## Write a rule

<div class="ex-tag">Step 8</div>

<p class="yt-intro">Pick the comment you found hardest to label in step 2.</p>

<div class="yt-box">Show me the five comments in data/coder_5.csv again, numbered, with the full text only.<br>Don’t show the column hostile.</div>

<p class="yt-copy">Copy it from step 8 on the GitHub page.</p>

<p class="yt-look">Write one rule that tells a labeler if that comment is hostile. Start it like this:</p>

<p style="font-size:32px; line-height:1.5; margin:10px 0 0 36px; text-align:left; color:#d9481f; font-weight:700;">A comment is hostile when…<br>A comment is not hostile when…</p>

---

## Test your rule on 100 new comments

<div class="ex-tag">Step 9</div>

<p class="yt-intro">This prompt adds your rule to the codebook. Then the agent labels 100 new comments with it, three times.</p>

<div class="yt-box">Make codebook_v1.md: a copy of codebook_v0.md with a line “Rules:” and my rule<br>below added just before the last line. Change nothing else.<br>Then run a held-out test: label data/heldout_100.csv with codebook_v1.md, 3 runs,<br>saved in runs/. Tell me the % identical across runs and how many of the 100<br>match the column hostile.<br><br>[paste your rule here]</div>

<p class="yt-copy">Copy it from step 9 on the GitHub page, and paste your rule at the bottom.</p>

---

## Everyone's rules on 100 new comments

<div class="ex-tag">Step 9</div>

<div class="demo" data-demo="roomscores"></div>

---

## Labeler bias

<p style="font-size:30px; margin:0 0 12px; text-align:left;">The label changes when something changes that should not matter.</p>

<ul style="font-size:28px; line-height:1.4; margin:0 0 10px 1em; text-align:left;"><li><b>In the comment:</b> swap the genders, such as “he” and “she”.</li><li><b>From the user:</b> say what you think the label is. This is called sycophancy.</li></ul>

<p style="font-size:28px; font-weight:700; margin:14px 0 2px; text-align:left;">How many of the 120 labels changed</p>
<table style="border-collapse:collapse; font-size:28px; margin:6px 0 0; text-align:left;"><tr style="color:#6f6f69; font-size:22px;"><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc;">Model and prompt</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right;">Asked again</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right;">Genders swapped</td></tr><tr><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc;">Qwen, one-line prompt</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right;">8</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right; font-weight:700;">16</td></tr><tr><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc;">Qwen, codebook</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right;">5</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right; font-weight:700;">13</td></tr><tr><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc;">DeepSeek, one-line prompt</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right;">5</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right; font-weight:700;">4</td></tr><tr><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc;">DeepSeek, codebook</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right;">2</td><td style="padding:8px 14px; border-bottom:1px solid #e2e2dc; text-align:right; font-weight:700;">3</td></tr></table>

<p class="fragment" style="font-size:28px; margin-top:16px; text-align:left;">Human labelers show this bias too. Their beliefs and identity change their labels.<br><span style="font-size:21px; color:#888;">Sap et al. 2022, “Annotators with Attitudes”</span></p>

---

## Labeler bias: sycophancy

<div class="demo" data-demo="pushbars"></div>

---

## Write it all down

<div class="ex-tag">Step 11</div>


<p style="font-size:30px; margin:6px 0 0;">Today’s analysis is spread over your files and long chats. Decisions made in a chat are hard to see later.</p>

<pre class="ft-code" style="margin:14px 0 0;"><code class="nohighlight" style="font-size:22px; padding:16px 20px;">Write a file WORKFLOW.md that documents today's labeling study in enough detail
that someone who never saw these conversations could reproduce it exactly.

Include: the data, the codebooks, the models, providers and every setting,
how the reliability numbers were computed, and every test and its results.

End with a section "Decisions I did not ask for".</code></pre>

<p class="yt-copy">Copy it from step 11 on the GitHub page.</p>

<p class="yt-look">Read it, especially the last section. Look for decisions you didn’t know were made. If something is missing, ask the agent to update the file.</p>

---

## Build something with your results

<div class="ex-tag">Step 12</div>


<p class="yt-intro">Research outputs don’t have to be static images pasted into slides.</p>

<pre class="ft-code" style="margin:14px 0 0;"><code class="nohighlight" style="font-size:22px; padding:16px 20px;">Build an interactive dashboard in an HTML file from this project's data and runs:
- a table of the 100 held-out comments, with the gold label (column hostile) and the label from each run
- a filter for comments where the runs disagree, or where they disagree with the gold label
- agreement with the gold labels and Krippendorff's alpha for each codebook I tried
- click a comment to see its full text and every label it got</code></pre>

<p class="yt-copy">Copy it from step 12 on the GitHub page.</p>

<p style="font-size:30px; margin-top:22px;">Open yours. Each person’s dashboard will look different.</p>

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
| Agents and test data | Rank et al. (2026), PostTrainBench, arXiv:2603.08640 |
| Robustness | van Nuenen &amp; Sachdeva (2026), arXiv:2603.05651 |
| Human labeler bias | Sap et al. (2022), “Annotators with Attitudes”, NAACL |
| Multi-turn | Sachdeva &amp; van Nuenen (2026), arXiv:2510.10002 |
| Reliability of models | Atil et al. (2025), arXiv:2408.04667 · Kim et al. (2025), ICML, "Correlated Errors in Large Language Models" |
| Correcting estimates | Angelopoulos et al. (2023), *Science* · Egami et al. (2023) |

</div>

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
- Temperature 0: runs repeat more; accuracy stays the same.
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
