# Measuring Text with AI Agents: Build the Pipeline

### Learning Objectives

- Have an agent write a labeling script and run it.
- Label 100 comments five times and read the reliability numbers.

### Sections
1. [Today's Task](#section1)
2. [The Agent Builds the Pipeline](#section3)
3. [Label 100 Comments, Five Times](#section4)
4. [Send the Uncertain Comments to a Stronger Model](#section5)
5. [Ask What It Decided](#section6)

<a id='section1'></a>

# Today's Task

On the Reddit forum r/AmItheAsshole (AITA), people describe a conflict and ask strangers whether they were in the wrong. Readers reply in comments.

The task is to decide whether a comment is hostile or insulting toward someone. Social scientists code hostility and incivility in news comments, political speech, protest coverage and social media, and the hard part is always the same: where do you draw the line? We keep this one task for the whole workshop.

Our first codebook (`codebook_v0.md`) is one line long:

```
Is this comment hostile or insulting toward someone?
```

with two labels, `yes` and `no`. Save it in your project:

```
Create a file codebook_v0.md with exactly this text:

Is this comment hostile or insulting toward someone?

Labels:
- yes
- no

Answer with the label only.
```

We coded every comment ourselves with a longer codebook. These **gold labels** are in the column `hostile`. They are an interpretation too: on about one comment in five, a careful coder could reasonably disagree.

The method follows Omer Yalcin's *Labeling Text with LLMs* (UMass Amherst). The comments come from a UC Berkeley course on computational social science.

<a id='section3'></a>

# The Agent Builds the Pipeline

Now let the model code the five comments you coded by hand in exercise 1, five times each. In a new conversation:

```
Write a script label.py that labels the comments in a CSV file using a codebook file
as the system prompt, following the rules in AGENTS.md. It should take the data file,
the codebook file, the number of runs, and an output file name as arguments, and
optionally the model, temperature, and top_k.

Then use it to label data/coder_5.csv with codebook_v0.md, 5 runs, saved to
runs/coder5_v0.csv. Show me a table with one row per comment and the label from each run.
```

Approve the steps as the agent asks. The first time, it will set up a virtual environment and install packages, which takes a minute.

📁 **No API?** Ask the agent to show you `../backup/coder5_v0_qwen.csv` (our results, one level up) as the same kind of table.

Check the agent's work. In the same conversation:

```
Show me the lines in label.py that set the model, the settings and the labels,
the line that reads the codebook, and the line that builds the message sent
to the model. Which columns of the CSV go into that message?
```

You don't need to write code, but you should be able to point at each of these decisions. The answer to the last question should be: only `text`.

🔔 **Question:** Did the model change its answer between runs on any comment? Does five identical answers mean the answer is *right*?

## Compare: the Room, Qwen and the Gold Labels

On the screen: the room's answers from exercise 1, Qwen's five runs, and our gold labels.

🔔 **Questions:**
- On which comments did the room agree? On which did it split?
- Where the room split, was the comment unclear, or the question?
- Where did Qwen agree with the room, and where with the gold labels?

Write down a rule that would settle each split. You'll need them in exercise 3.

<a id='section4'></a>

# Label 100 Comments, Five Times

```
Use label.py to label data/working_100.csv with codebook_v0.md, 5 runs,
saved to runs/working_v0_qwen.csv. Report the numbers AGENTS.md asks for.
```

📁 **No API?** Ask the agent to compute the same numbers from `../backup/working_v0_qwen.csv`.

Write down two numbers: **% identical** (comments with the same label in all five runs) and **Krippendorff's α**. Look at the count of each label: how many comments did the model label `yes`?

⚠️ **Warning:** Check which model answered. The agent's report and `runs/LOG.md` should name the model and provider that actually answered, as the API responses report them.

<a id='section5'></a>

# Send the Uncertain Comments to a Stronger Model

Keep Qwen's labels where its five runs agreed, and send only the other comments to a stronger model, as on slides 32–33:

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

📁 **No API?** Our result is on the slide: Qwen's runs agreed on 90 comments and split on 10. Claude got 9 of the 10 right, which raised the total from 79 to 84 of 100.

🔔 **Question:** On 15 comments, Qwen gave the same wrong label in all five runs. Which check would catch those?

<a id='section6'></a>

# Ask What It Decided

```
Which decisions did you make in this conversation that I didn't ask for?
List them, one line each.
```

🔔 **Question:** Which of these would a reviewer want to know about?

# Key Points

- Even a one-line codebook leaves room for disagreement between people.
- The agent wrote the pipeline, and made choices along the way. `AGENTS.md` fixed some of them in advance.
- **Reliability** (the same label when you ask again) is cheap to measure: 500 labels cost about one US cent.
