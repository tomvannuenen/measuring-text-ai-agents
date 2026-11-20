# Measuring Text with AI Agents: Try It Yourself

### Learning Objectives

- Write codebook rules yourself and test them against the gold labels on held-out comments.
- Test whether small edits that should not matter change the labels.
- Test what a second turn ("Are you sure?") does to the labels.
- Write the study down so someone else could run it again.

### Sections
1. [The Prompt Is the Instrument](#section1)
2. [Robustness: Small Edits](#section2)
3. [Multi-Turn: Pushing Back](#section3)
4. [Take-Home: Write It Down](#section4)

Each section goes with one part of the slides. Start a new conversation for each.

<a id='section1'></a>

# The Prompt Is the Instrument

## 🥊 Challenge 3a: Write the Room's Codebook

In research, a coding team meets about its disagreements and agrees on shared rules. The room does the same, in four steps on the screen.

1. In pairs, pick a comment that is hard to code: the one from the hand-coding exercise you disagreed on most, or one where Qwen could not decide. To find those, ask:
   ```
   Show me 5 comments from data/working_100.csv where the five runs in
   runs/working_v0_qwen.csv did not all agree, with the full text and each
   run's label. Don't show the gold labels, and don't suggest any rules.
   ```
   📁 **No API?** Use `../backup/working_v0_qwen.csv` in place of `runs/working_v0_qwen.csv`.

   Write **one rule** that settles your comment, in your own words. **Do not look at the gold labels.** Some types of problem that came up when we prepared this:
   - Harsh criticism of what someone did, with no insult. Is "you were selfish" hostile?
   - Mild mockery, such as "butthurt" or "mama bear".
   - Swearing that is not aimed at anyone, or "the asshole" used as the forum's verdict.
2. Send your rule with the form on the screen (forms.gle/WTCqXkyYd6wM7Gsa6).
3. Claude merges the room's rules into a short list. Vote for up to three with the second form on the screen.
4. The three rules with the most votes become the room's codebook. Open forms.gle/WTCqXkyYd6wM7Gsa6 again to copy them, and paste them into this prompt:

```
Copy codebook_v0.md to codebook_v1.md. Insert the rules below just before the
last line ("Answer with the label only."), exactly as I wrote them.
If I also give changes to the question or the label definitions, make
exactly those changes. Do not add, remove, or rephrase anything else.
Then show me the whole new codebook.

[paste your rules, and any changed definitions, here]
```

⚠️ **Warning:** The agent will happily write rules for you, and they will sound good. Don't let it. Each rule is a **research decision** about the meaning of "hostile".

Now test the rules on comments you have not looked at, and compare with the gold labels:

```
Held-out test: label data/heldout_100.csv with codebook_v0.md and with codebook_v1.md,
3 runs each, saved to runs/heldout_v0.csv and runs/heldout_v1.csv.

Then compare the majority labels with the column hostile in
data/heldout_100.csv. For each codebook, report: % identical across runs, how many
of the 100 match the gold labels, and the count of each label.
Show me five comments the model got wrong with codebook_v1, with the text.
```

📁 **No API?** Use `../backup/heldout_v0_qwen.csv` and `../backup/heldout_v1_qwen_reference.csv` (made with our rules, in `../backup/codebook_reference.md`).

🔔 **Questions:**
- Did your rules raise the match with the gold labels? Did they raise % identical?
- Which of those two numbers could you have computed without gold labels?

<a id='section2'></a>

# Robustness: Small Edits

Swapping "she" and "he" in a comment does not make it more or less hostile. In this exercise you check whether the label also stays the same.

```
Make a folder edits/. Create edits/working_gender.csv: a copy of data/working_100.csv
in which you swap gendered words in the column text (he/she, him/her, his/her,
husband/wife, boyfriend/girlfriend, mom/dad and so on), keeping the grammar right.
Do not change data/. Show me three before-and-after examples.

Then, with codebook_v1.md, top_k = 1 and 1 run each, label:
data/working_100.csv twice (runs/robust_orig_a.csv and runs/robust_orig_b.csv),
and edits/working_gender.csv once (runs/robust_gender.csv).

Report how many of the 100 labels differ between the two runs of the original,
and how many differ between the original and the swapped version.
Show me every comment whose label changed after the swap, with both versions of the text.
```

The two runs of the original show how many labels change when nothing changes. Compare the swap with that number.

🔔 **Questions:**
- Did the swap change more labels than the rerun? By how much?
- Try a different edit: add "Edit: thanks for the award, kind stranger!" to the end of every comment, or reword the question in your codebook. Which edits would matter for *your* research question?

💡 **Tip:** On 120 comments, the one-line prompt changed 16 of Qwen's labels after a gender swap, and 8 with no edit at all. With our codebook, 13 still changed after the swap, against 5 with no edit.

<a id='section3'></a>

# Multi-Turn: Pushing Back

Annotation pipelines now often add a second turn. An agent checks its own labels, a second model reviews the first, or two models debate. In this exercise you test the effect of a second turn on the labels.

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

🔔 **Questions:**
- Which follow-up changed more labels? Did the changes move labels toward the gold labels or away from them?
- Where in a real pipeline does a second turn like this appear without anyone typing it?

💡 **Tip:** On 120 comments with our codebook, "Are you sure?" changed 4 of Qwen's labels. "I think it's the opposite" changed 45, and the matches with the gold labels fell from 97 to 78.

<a id='section4'></a>

# Take-Home: Write It Down

Today's measurement lives in two places: your files, and several long conversations full of decisions. Get them out:

```
Write a file WORKFLOW.md that documents today's labeling study in enough detail
that someone who never saw these conversations could reproduce it exactly.

Include: the data and where it came from; the codebooks and which one is final;
the labeling models, providers, and every setting (temperature, top_k, structured
output, number of runs, concurrency); how % identical and Krippendorff's alpha were
computed; the held-out test and its results; the robustness and follow-up tests;
and how the labels were compared with the gold labels.

End with a section "Decisions I did not ask for", listing every choice you made
that I did not explicitly specify.
```

Then go back to your first try in exercise 1, the one-sentence request. Put its answer next to your `WORKFLOW.md`.

🔔 **Question:** Which decisions did that first agent make without asking: model, definition, number of runs, the meaning of "reliable"? Did it use the gold-label column?

📚 **More:** for a longer, five-part version of this workshop, or the same study on Brazilian floor speeches with Portuguese codebooks, ask the instructor.

# Key Points

- The codebook is the instrument. Write its rules yourself, and test them on held-out texts against labels from people.
- Test robustness against a **rerun with nothing changed**. A change that is no bigger than the rerun is noise.
- A second turn can rewrite labels, mostly from right to wrong. Count every second turn in your pipeline as part of the instrument.
- Ask the agent for the **decisions you did not ask for**.
