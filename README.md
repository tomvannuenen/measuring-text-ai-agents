# Measuring Text with AI Agents

These are the materials for a two-hour workshop by Tom van Nuenen (UC Berkeley D-Lab). Keep this page open while you work. Every prompt is here to copy, and the steps work in a group or on your own.

Start a new chat in Codex for each step, unless the step says otherwise.

1. [Get the project](#step-1-get-the-project)
2. [Look at the data, then code five comments by hand](#step-2-look-at-the-data-then-code-five-comments-by-hand)
3. [First try](#step-3-first-try)
4. [Ask for approval](#step-4-ask-for-approval)
5. [Give your agent rules](#step-5-give-your-agent-rules)
6. [Add the API key and test it](#step-6-add-the-api-key-and-test-it)
7. [Build the pipeline](#step-7-build-the-pipeline)
8. [Label 100 comments, five times](#step-8-label-100-comments-five-times)
9. [Ask a stronger model (optional)](#step-9-ask-a-stronger-model-optional)
10. [Write a rule](#step-10-write-a-rule)
11. [Your codebook and the held-out test](#step-11-your-codebook-and-the-held-out-test)
12. [Same comment, other gender](#step-12-same-comment-other-gender)
13. [Follow-up questions (optional)](#step-13-follow-up-questions-optional)
14. [Write it all down](#step-14-write-it-all-down)
15. [Build a dashboard (optional)](#step-15-build-a-dashboard-optional)

## Before you start

Bring a laptop (macOS or Windows) with the ChatGPT app installed, and sign in. A free account is enough. We use [Codex](https://chatgpt.com/codex/), OpenAI's coding agent, which is a mode in the ChatGPT app.

**No API?** If the key or the labeling model fails, the `backup` folder has our results. The steps say which file to use.

## Step 1. Get the project

Open the ChatGPT app, click **ChatGPT ⌄** at the top left, and choose **Codex**.

<img src="images/codex_menu.png" alt="The menu at the top left, before and after: ChatGPT, then Codex" width="500">

Click **New chat**, paste this, and click **Allow once** when Codex asks:

```
Download the GitHub repository at tinyurl.com/mtai-workshop as a ZIP,
unzip it on my Desktop as measuring-text-ai-agents, and tell me where
the folder is. Then open the repository's page in my browser.
```

Click **Choose project** under the chat box and create a new project. Click **Add** and choose the folder `project` inside `measuring-text-ai-agents` on your Desktop. Click **Create project**.

<img src="images/codex_create_project.png" alt="Create project, with the folder project as its source folder" width="440">

When Codex asks **Trust this folder?**, check that the path ends in `measuring-text-ai-agents/project`, then click **Trust folder**.

If the download doesn't work, click the green **Code** button on this page, then **Download ZIP**, and unzip it yourself. The folder is then called `measuring-text-ai-agents-main`, which works just as well.

## Step 2. Look at the data, then code five comments by hand

Paste this, and click **Allow once** when Codex asks:

```
Open reddit.com/r/AmItheAsshole in my browser.
Then open data/working_100.csv in my spreadsheet app.
```

The first is the forum the comments come from. The second is the data, with one comment per row. The column `hostile` already has a yes or no label for each comment.

In Excel, widen the column `text` to read the comments. A yellow bar about possible data loss is normal. Close the file without saving.

Then code five comments yourself. Paste:

```
Show me the five comments in data/coder_5.csv, numbered, with the full text only.
Don't show the column hostile.
```

For each comment, write down yes or no, alone, using only this question:

```
Is this comment hostile or insulting toward someone?
```

Keep your answers. In step 7 you compare them with the model's labels and with the column `hostile`.

## Step 3. First try

Paste this and approve what Codex asks. It takes a few minutes.

```
Label the 100 comments in data/working_100.csv by whether
they are hostile, and tell me how reliable the labels are.
```

## Step 4. Ask for approval

Click the approval chip in the text box and choose **Ask for approval**. From now on, Codex asks before it runs a command or uses the internet.

<img src="images/codex_permissions.png" alt="The approval setting: Ask for approval, Approve for me, and Full access" width="440">

## Step 5. Give your agent rules

Codex reads a file called `AGENTS.md` at the start of every chat. Paste:

```
Create a file called AGENTS.md in this project with exactly this content:

# Project rules

## Data
- The comments are in data/. Never modify anything in data/.
- Never open or read data/heldout_100.csv unless I explicitly ask for a held-out test.
- Work only inside this folder. Never read or write files outside it unless I ask.
- The column hostile holds our hand-coded gold labels. Never send it to a labeling model, and never use it to write a codebook.
- Save each labeling job as a new CSV in runs/, with one row per comment per run and the columns id, run, label. Never overwrite an earlier file.

## Labeling
- Call the labeling model through OpenRouter, with the openai Python package. Read the key from OPENROUTER_API_KEY in the .env file in this folder. Never print the key or copy it into any other file.
- Labeling models: qwen/qwen3-235b-a22b-2507 (the default) and deepseek/deepseek-v4-flash. Use provider DeepInfra only for both, with no fallbacks, and require providers to support every parameter we send.
- Use the codebook file I name as the system prompt. Send each comment as the user message: the column text, and nothing else.
- The labels are yes and no. Restrict answers to them with structured output. If a codebook lists different labels, ask me before running.
- API calls need network access, which the sandbox blocks. Ask for network access when you start each labeling job, instead of trying inside the sandbox first.
- Send at most 4 requests at a time, with max_tokens set to 20. Retry failed requests up to 5 times with increasing waits, following any Retry-After header, and report how many still failed.
- Append one line per labeling job to runs/LOG.md: date, data file, codebook, model, provider, settings, number of runs.
- Before any labeling job, tell me how many calls it will make and estimate the cost from the token counts in runs/test_call.json and the model's price on openrouter.ai. Wait for my OK.

## Reporting
- After every labeling job, report: the model and provider that actually answered (read them from the API responses), number of comments, number of runs, % of comments with identical labels across runs, Krippendorff's alpha (nominal, runs as coders), and the count of each label.
- If a job has only one run, say that reliability can't be computed.
- A comment's majority label is the label it got in most runs. If the labels tie, mark it TIE. When comparing models, or a model with the gold labels, a TIE counts as a disagreement.

## Workflow
- Install packages with pip into a virtual environment in this folder.
- Propose a plan before creating or editing files.
- After running a command, show the exact command and summarize the result.
```

Then check that it follows them, in the same chat:

```
Which columns could give away the answer, and how will you keep them away
from the labeling model?
```

## Step 6. Add the API key and test it

Paste:

```
Create a file called .env with one line, OPENROUTER_API_KEY=paste-your-key-here,
and open it in a text editor, so I can paste the key myself.
```

If the person running the workshop gives you a key, use that one. Otherwise, create a key at [openrouter.ai/keys](https://openrouter.ai/keys) and add a few dollars of credit. In the editor, replace `paste-your-key-here` with the key, then save and close. Never paste a key into the chat.

Then check that the key works with one call, in the same chat:

```
Make one test call to Qwen through OpenRouter, following AGENTS.md.
Use "Is this comment hostile or insulting toward someone? Answer yes or no."
as the system prompt, and the first comment in data/coder_5.csv as the user message.
Save the whole response to runs/test_call.json. Then show me the answer,
the model and provider that answered, and how many tokens it used.
```

Open `runs/test_call.json` and find the answer, the model and the provider.

## Step 7. Build the pipeline

Save the one-line codebook:

```
Create a file codebook_v0.md with exactly this text:
Is this comment hostile or insulting toward someone?
Labels:
- yes
- no
Answer with the label only.
```

Then have Codex write the labeling script and run it on the five comments you coded by hand:

```
Write a script label.py that labels the comments in a CSV file using a codebook file
as the system prompt, following the rules in AGENTS.md. It should take the data file,
the codebook file, the number of runs, and an output file name as arguments, and
optionally the model, temperature, and top_k.
Then use it to label data/coder_5.csv with codebook_v0.md, 5 runs, saved to
runs/coder5_v0.csv. Show me a table with one row per comment and the label from each run.
```

Check its work, in the same chat:

```
Show me the lines in label.py that set the model, the settings and the labels,
the line that reads the codebook, and the line that builds the message sent
to the model. Which columns of the CSV go into that message?
```

**No API?** Ask Codex to show you `../backup/coder5_v0_qwen.csv` as the same kind of table.

## Step 8. Label 100 comments, five times

```
Use label.py to label data/working_100.csv with codebook_v0.md, 5 runs,
saved to runs/working_v0_qwen.csv. Report the numbers AGENTS.md asks for.
```

Write down **% identical** and **Krippendorff's alpha**.

**No API?** Ask Codex to compute the same numbers from `../backup/working_v0_qwen.csv`.

## Step 9. Ask a stronger model (optional)

This step is optional. Try it at the end if you have time.

Send only the comments where Qwen's five runs disagreed to a stronger model:

```
Find the comments in runs/working_v0_qwen.csv where the five runs did not all
give the same label. As an exception to the labeling-model rule in AGENTS.md,
label only those comments once with anthropic/claude-opus-5.5 through OpenRouter
(any provider), using codebook_v0.md, saved to runs/escalated.csv.
Then compare with the column hostile in data/working_100.csv. Report:
how many comments had agreeing and disagreeing runs, how many of each Qwen got
right by majority label, how many of the disagreeing ones the stronger model got
right, and the total if we keep Qwen's agreeing labels and the stronger model's
labels for the rest.
```

Then, in the same chat:

```
Which decisions did you make in this conversation that I didn't ask for?
List them, one line each.
```

## Step 10. Write a rule

Alone or in pairs, find a comment that is hard to code:

```
Show me 5 comments from data/working_100.csv where the five runs in
runs/working_v0_qwen.csv did not all agree, with the full text as plain
paragraphs and each run's label. Don't show the gold labels, and don't suggest any rules.
```

**No API?** Use `../backup/working_v0_qwen.csv` in place of `runs/working_v0_qwen.csv`.

Write **one rule** that settles your comment, in your own words, without looking at the gold labels.

If you have time, check your rule against published work:

```
Find two published definitions of incivility or hostility in online comments,
with links to the papers. For each, tell me how it could help improve this rule:

[paste your rule here]
```

Open the links and check that each paper exists and says what the agent claims. Agents sometimes cite papers that don't exist.

## Step 11. Your codebook and the held-out test

In a group, collect everyone's rules in one place, such as a shared document, and vote. Keep the three rules with the most votes. On your own, use your rule from step 10, or write two or three. Paste the rules into this prompt:

```
Copy codebook_v0.md to codebook_v1.md. Just before the last line ("Answer with
the label only."), add a line "Rules:" and then the rules below, exactly as I wrote them.
If I also give changes to the question or the label definitions, make
exactly those changes. Do not add, remove, or rephrase anything else.
Then show me the whole new codebook.

[paste the rules here]
```

Then test the rules on 100 comments nobody has looked at:

```
Held-out test: label data/heldout_100.csv with codebook_v0.md and with codebook_v1.md,
3 runs each, saved to runs/heldout_v0.csv and runs/heldout_v1.csv.

Then compare the majority labels with the column hostile in
data/heldout_100.csv. For each codebook, report: % identical across runs, how many
of the 100 match the gold labels, and the count of each label.
Show me five comments the model got wrong with codebook_v1, with the text.
```

**No API?** Use `../backup/heldout_v0_qwen.csv` and `../backup/heldout_v1_qwen_reference.csv` (made with our rules, in `../backup/codebook_reference.md`).

## Step 12. Same comment, other gender

Suppose your research question is whether women who post get more hostile replies than men. For that question, a comment's label should not change when only the gender changes. Check that:

```
Make a folder edits/. Create edits/working_gender.csv: a copy of data/working_100.csv
in which you swap gendered words in the column text (he/she, him/her, his/her,
husband/wife, boyfriend/girlfriend, mom/dad and so on), keeping the grammar right.
Do not change data/. Show me three before-and-after examples.

Then, with codebook_v1.md, top_k = 1 and 1 run each, label:
data/working_100.csv twice (runs/robust_orig_a.csv and runs/robust_orig_b.csv),
and edits/working_gender.csv once (runs/robust_gender.csv).

Report how many of the 100 labels differ between the two runs of the original,
and how many differ between the original and the swapped version. For the swap, say how
many labels went from no to yes and from yes to no, separately for comments that
were about a woman and about a man before the swap.
Show me every comment whose label changed after the swap, with both versions of the text.
```

Compare the two numbers. Asking again with nothing changed also moves some labels, so only the changes beyond that point to gender. Noise moves labels both ways at random. If comments about women mostly move one way and comments about men the other, that points to bias. Look at the before-and-after examples too: the agent decides how to swap, for instance whether to rename people.

## Step 13. Follow-up questions (optional)

This step is optional. Try it at the end if you have time.

```
Add an option --followup to label.py. When it is set, after the model answers,
send its answer back as an assistant message and then send the follow-up text
as a new user message, with the same structured output. Save both labels:
columns id, run, label, label_after.

Label data/working_100.csv with codebook_v1.md, top_k = 1, 1 run,
first with --followup "Are you sure?" (runs/push_sure.csv),
then with --followup "Are you sure? I think it's the opposite." (runs/push_opposite.csv).

For each, report how many labels changed after the follow-up, and how many of the 100
match the column hostile before and after.
```

## Step 14. Write it all down

```
Write a file WORKFLOW.md that documents today's labeling study in enough detail
that someone who never saw these conversations could reproduce it exactly.

Include: the data and where it came from; the codebooks and which one is final;
the labeling models, providers, and every setting (temperature, top_k, structured
output, number of runs, concurrency); how % identical and Krippendorff's alpha were
computed; the held-out test and its results; any robustness or follow-up tests;
and how the labels were compared with the gold labels.

End with a section "Decisions I did not ask for", listing every choice you made
that I did not explicitly specify.
```

Read `WORKFLOW.md`, especially the last section. If something you expected is missing, ask Codex to check and update the file.

## Step 15. Build a dashboard (optional)

If you have time.

```
Build an interactive dashboard in an HTML file from this project's data and runs:
- a table of the 100 working comments, with my gold label and the label from each run
- a filter for comments where the runs disagree, or where they disagree with my label
- agreement with my labels and Krippendorff's alpha for each codebook I tried
- click a comment to see its full text and every label it got
```

Open yours. In a group, look at someone else's too.

## Use it on your own data

The same steps work for your own texts and your own concept.

1. Make a new folder with a subfolder `data/`. Put your texts in a CSV file there, one text per row, with the columns `id` and `text`.
2. Open the folder in Codex and choose **Ask for approval**, as in step 4.
3. Set aside a sample to code by hand before any model labels anything:

```
Draw 200 random rows from data/[your file].csv. Save 100 of them as
data/working_100.csv and the other 100 as data/heldout_100.csv.
Never open data/heldout_100.csv again unless I ask for a held-out test.
```

4. Code both files yourself, in a new column with your labels. Ask someone else to code some of them too, so you know how much people agree.
5. Paste the AGENTS.md prompt from step 5 and change what is specific to this workshop: the column with your hand labels, the labels, and the models.
6. Write a one-line codebook for your concept, as in step 7. Then follow steps 6 to 14.

## What's in the download

- `project/`: the data, as a small research project. This is the only folder you open in Codex.
- `backup/`: our results, in case the key or the labeling model fails.
- `images/`: the pictures on this page.

The comments come from the Reddit forum r/AmItheAsshole, in English. Each has our hand-coded label for hostility, in the column `hostile`. The method follows Omer Yalcin's *Labeling Text with LLMs* (UMass Amherst).

## Further reading

[Prompt engineering tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) by Anthropic. It has exercises on writing prompts, for example adding labeled examples or asking the model to reason before it answers. It uses Python notebooks and an Anthropic API key. You can test each of its tips with the method from step 12: change one thing in the codebook, label the same comments again, and count how many labels change.
