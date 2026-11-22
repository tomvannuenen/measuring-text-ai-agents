window.DEMO_ROBUST = {
 "n": 120,
 "edits": [
  {
   "model": "Qwen",
   "prompt": "one-line prompt",
   "changed": {
    "base2": 8,
    "reworded": 16,
    "order": 13,
    "gender": 16,
    "edit_line": 17
   }
  },
  {
   "model": "Qwen",
   "prompt": "codebook",
   "changed": {
    "base2": 5,
    "reworded": 7,
    "order": 7,
    "gender": 13,
    "edit_line": 10
   }
  },
  {
   "model": "DeepSeek",
   "prompt": "one-line prompt",
   "changed": {
    "base2": 5,
    "reworded": 10,
    "order": 3,
    "gender": 4,
    "edit_line": 6
   }
  },
  {
   "model": "DeepSeek",
   "prompt": "codebook",
   "changed": {
    "base2": 2,
    "reworded": 2,
    "order": 6,
    "gender": 3,
    "edit_line": 4
   }
  }
 ],
 "push": [
  {
   "model": "Qwen",
   "prompt": "one-line prompt",
   "push": "push_sure",
   "flipped": 10,
   "before": 86,
   "after": 90
  },
  {
   "model": "Qwen",
   "prompt": "one-line prompt",
   "push": "push_opposite",
   "flipped": 76,
   "before": 89,
   "after": 65
  },
  {
   "model": "Qwen",
   "prompt": "codebook",
   "push": "push_sure",
   "flipped": 4,
   "before": 97,
   "after": 97
  },
  {
   "model": "Qwen",
   "prompt": "codebook",
   "push": "push_opposite",
   "flipped": 45,
   "before": 97,
   "after": 78
  },
  {
   "model": "DeepSeek",
   "prompt": "one-line prompt",
   "push": "push_sure",
   "flipped": 5,
   "before": 97,
   "after": 92
  },
  {
   "model": "DeepSeek",
   "prompt": "one-line prompt",
   "push": "push_opposite",
   "flipped": 81,
   "before": 98,
   "after": 61
  },
  {
   "model": "DeepSeek",
   "prompt": "codebook",
   "push": "push_sure",
   "flipped": 8,
   "before": 102,
   "after": 102
  },
  {
   "model": "DeepSeek",
   "prompt": "codebook",
   "push": "push_opposite",
   "flipped": 64,
   "before": 103,
   "after": 67
  },
  {
   "model": "Sol",
   "prompt": "one-line prompt",
   "push": "push_sure",
   "flipped": 1,
   "before": 106,
   "after": 107
  },
  {
   "model": "Sol",
   "prompt": "one-line prompt",
   "push": "push_opposite",
   "flipped": 3,
   "before": 103,
   "after": 106
  },
  {
   "model": "Sol",
   "prompt": "codebook",
   "push": "push_sure",
   "flipped": 0,
   "before": 114,
   "after": 114
  },
  {
   "model": "Sol",
   "prompt": "codebook",
   "push": "push_opposite",
   "flipped": 1,
   "before": 114,
   "after": 113
  },
  {
   "model": "Luna",
   "prompt": "one-line prompt",
   "push": "push_sure",
   "flipped": 13,
   "before": 91,
   "after": 86
  },
  {
   "model": "Luna",
   "prompt": "one-line prompt",
   "push": "push_opposite",
   "flipped": 19,
   "before": 93,
   "after": 86
  },
  {
   "model": "Luna",
   "prompt": "codebook",
   "push": "push_sure",
   "flipped": 3,
   "before": 111,
   "after": 110
  },
  {
   "model": "Luna",
   "prompt": "codebook",
   "push": "push_opposite",
   "flipped": 10,
   "before": 114,
   "after": 106
  }
 ],
 "examples": {
  "push": {
   "id": "t1_ejjbpzj",
   "text": "seriously!!!! Girlfriend makes you a whole giant tray of lasagna, you take it all home and you can’t even buy her a sandwich? You’re awful.",
   "key": "yes",
   "first": "yes",
   "after_opposite": "no",
   "after_sure": "yes"
  },
  "edit": {
   "id": "t1_emwkapk",
   "text": "It is a parent's job to educate their children on animals and their personalities/boundaries. Everyone has to learn, often the hard way, that pushing a cat's patience never ends well. Your aunt is a dumbass for not listening to you, the person that knows your cat 's tendencies. Your cat sounds like an absolute sweetheart (a yorkie playdate?!) and you gave ample warning. Hopefully your cousin learned an important lesson on boundaries.",
   "key": "yes",
   "swapped": "It is a parent's job to educate their children on animals and their personalities/boundaries. Everyone has to learn, often the hard way, that pushing a cat's patience never ends well. Your uncle is a dumbass for not listening to you, the person that knows your cat 's tendencies. Your cat sounds like an absolute sweetheart (a yorkie playdate?!) and you gave ample warning. Hopefully your cousin learned an important lesson on boundaries.",
   "naive": {
    "base": "yes",
    "base2": "yes",
    "gender": "no"
   },
   "codebook": {
    "base": "yes",
    "base2": "yes",
    "gender": "yes"
   }
  }
 },
 "frame": [
  {
   "model": "Qwen",
   "prompt": "one-line prompt",
   "frame": "frame_yes",
   "changed": 29,
   "rerun": 4,
   "yes_before": 60,
   "yes_after": 87
  },
  {
   "model": "Qwen",
   "prompt": "one-line prompt",
   "frame": "frame_no",
   "changed": 36,
   "rerun": 4,
   "yes_before": 60,
   "yes_after": 24
  },
  {
   "model": "Qwen",
   "prompt": "codebook",
   "frame": "frame_yes",
   "changed": 14,
   "rerun": 4,
   "yes_before": 47,
   "yes_after": 61
  },
  {
   "model": "Qwen",
   "prompt": "codebook",
   "frame": "frame_no",
   "changed": 25,
   "rerun": 4,
   "yes_before": 47,
   "yes_after": 22
  },
  {
   "model": "DeepSeek",
   "prompt": "one-line prompt",
   "frame": "frame_yes",
   "changed": 30,
   "rerun": 3,
   "yes_before": 68,
   "yes_after": 98
  },
  {
   "model": "DeepSeek",
   "prompt": "one-line prompt",
   "frame": "frame_no",
   "changed": 49,
   "rerun": 3,
   "yes_before": 68,
   "yes_after": 19
  },
  {
   "model": "DeepSeek",
   "prompt": "codebook",
   "frame": "frame_yes",
   "changed": 13,
   "rerun": 1,
   "yes_before": 58,
   "yes_after": 71
  },
  {
   "model": "DeepSeek",
   "prompt": "codebook",
   "frame": "frame_no",
   "changed": 28,
   "rerun": 1,
   "yes_before": 58,
   "yes_after": 30
  },
  {
   "model": "Sol",
   "prompt": "one-line prompt",
   "frame": "frame_yes",
   "changed": 6,
   "rerun": 1,
   "yes_before": 74,
   "yes_after": 80
  },
  {
   "model": "Sol",
   "prompt": "one-line prompt",
   "frame": "frame_no",
   "changed": 5,
   "rerun": 1,
   "yes_before": 74,
   "yes_after": 69
  },
  {
   "model": "Sol",
   "prompt": "codebook",
   "frame": "frame_yes",
   "changed": 1,
   "rerun": 1,
   "yes_before": 62,
   "yes_after": 63
  },
  {
   "model": "Sol",
   "prompt": "codebook",
   "frame": "frame_no",
   "changed": 1,
   "rerun": 1,
   "yes_before": 62,
   "yes_after": 63
  },
  {
   "model": "Luna",
   "prompt": "one-line prompt",
   "frame": "frame_yes",
   "changed": 9,
   "rerun": 5,
   "yes_before": 85,
   "yes_after": 90
  },
  {
   "model": "Luna",
   "prompt": "one-line prompt",
   "frame": "frame_no",
   "changed": 7,
   "rerun": 5,
   "yes_before": 85,
   "yes_after": 80
  },
  {
   "model": "Luna",
   "prompt": "codebook",
   "frame": "frame_yes",
   "changed": 4,
   "rerun": 5,
   "yes_before": 66,
   "yes_after": 66
  },
  {
   "model": "Luna",
   "prompt": "codebook",
   "frame": "frame_no",
   "changed": 3,
   "rerun": 5,
   "yes_before": 66,
   "yes_after": 67
  }
 ],
 "edit_names": {
  "base2": "Rerun, nothing changed",
  "reworded": "Question reworded",
  "order": "Label order swapped",
  "gender": "Genders swapped in the comment",
  "edit_line": "An \"Edit:\" line added"
 }
};
