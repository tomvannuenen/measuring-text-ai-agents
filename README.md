# Measuring Text with AI Agents

These are the materials for a two-hour workshop by Tom van Nuenen (UC Berkeley D-Lab).

## Before you start

Bring a laptop (macOS or Windows) with the ChatGPT app installed, and sign in. A free account is enough.

At the start of the workshop, open Codex in the ChatGPT app (click **ChatGPT ⌄** at the top left and choose **Codex**), click **New chat**, and paste:

```
Download github.com/tomvannuenen/measuring-text-ai-agents as a ZIP,
unzip it on my Desktop, and tell me where the folder is.
```

Then open only the folder called `project` as your Codex project. If the download doesn't work, click the green **Code** button on this page, then **Download ZIP**, and unzip it yourself.

## The exercises

1. [Setup](exercises/1_Setup.md)
2. [Build the pipeline](exercises/2_Build_the_Pipeline.md)
3. [Try it yourself](exercises/3_Try_It.md)

## The data

The comments come from the Reddit forum r/AmItheAsshole, and they are in English. Each has our hand-coded label for hostility.

- `project/`: the data, as a small research project. This is the folder your agent works in.
- `exercises/`: the three exercises.
- `backup/`: results we prepared earlier, in case the internet or the API fails.
