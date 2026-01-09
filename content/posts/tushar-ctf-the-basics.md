---
title: "Inkarsika Devlog #1: Solving the Basics Chapter"
description: "A walkthrough of the Basics chapter of Inkarsika a cryptic, web-based puzzle adventure that turns you into a digital detective."
date: 2026-01-09
draft: false
tags:
  - ctf
  - puzzles
  - cryptic
  - web
  - devlog
  - inkarsika
---

So hi everyone 👋  
We’re meeting again after a long time.

I was a bit occupied recently onboarding the academics for the new semester, and also evaluating and helping with **IGNUS**, the biggest fest of my college. Things got busy pretty quickly.

Amidst all this, I wanted to talk about something interesting.

Some of you might know this from **Cryptic Hunt**, an event under **Prometeo**. You may also be familiar with cryptic crosswords. A senior from my institute built something along similar lines, but in a fully digital and interactive way.

Introducing **Inkarsika** 👉 https://inkarsika.tusharbhatt.com/

It’s a cryptic puzzle adventure where you slowly become a **digital detective** dealing with web obfuscation, forensics, hidden clues, and unconventional problem-solving.

In this devlog, I’ll walk you through the various challenges and how I solved them.

Currently, Inkarsika is divided into **two major sections**, each having 7 episodes:
- **Basics**
- **The Cat**

I’ve completed **all episodes in Basics** and **3 in The Cat**, so let’s get started.

---

## Basics Chapter Solutions Walkthrough

Today, I’m sharing the solutions for the **Basics** chapter.

---

### 1. Start (10 points)
**Link:**  
https://inkarsika.tusharbhatt.com/chapter/basics/episode/start  

**Hint:**  
> Sometimes the answer is in plain sight

**Answer:** `welcome`

**Solution:**  
The word `welcome` was present on the page, but hidden using black text on a black background:

```html
<p style="color:black"> welcome </p>
````

Classic hidden-in-plain-sight trick.

---

### 2. Question (10 points)

**Link:**
[https://inkarsika.tusharbhatt.com/chapter/basics/episode/question](https://inkarsika.tusharbhatt.com/chapter/basics/episode/question)

**Hint:**

> you'll need to go to the answer
> look in between

**Page Title:** `look below`

**Answer:** `different place`

**Solution:**
Changing the URL from `question` to `answer` reveals the solution:

```
/episode/answer
```

Simple URL manipulation does the job.

---

### 3. Source Code (10 points)

**Link:**
[https://inkarsika.tusharbhatt.com/chapter/basics/episode/source-code](https://inkarsika.tusharbhatt.com/chapter/basics/episode/source-code)

**Hint:**

> sometimes the answer is hidden deeper

**Answer:** `goodjob`

**Solution:**
Inspecting the page source reveals an HTML comment:

```html
<!-- goodjob -->
```

---

### 4. Hidden (10 points)

**Link:**
[https://inkarsika.tusharbhatt.com/chapter/basics/episode/hidden](https://inkarsika.tusharbhatt.com/chapter/basics/episode/hidden)

**Answer:** `yessir`

**Solution:**
The page shows an image of two cars, with one number plate blurred.

On closer inspection, the plate spells **YES** in Morse code.
Inspecting the source gives another clue:

```html
<!-- ?sir -->
```

Combining both → **YES + SIR** = `yessir`.

---

### 5. Listen Closely (10 points)

**Link:**
[https://inkarsika.tusharbhatt.com/chapter/basics/episode/musicroom](https://inkarsika.tusharbhatt.com/chapter/basics/episode/musicroom)

**Hint:**

> I'm gonna be famous, I'm gonna be famous

**Answer:** `hellfire`

**Solution:**
Inspecting the page reveals a broken audio tag:

```html
<au dio="" data-bg-audio="" loop="" preload="auto" src="/audio/sound1.mp3"></au>
```

After downloading and playing the audio file manually, it clearly speaks the word **hellfire**.

---

### 6. The Other Side (15 points)

**Link:**
[https://inkarsika.tusharbhatt.com/chapter/basics/episode/notoverhere](https://inkarsika.tusharbhatt.com/chapter/basics/episode/notoverhere)

This one took me the **most time**.

**Hints found:**

```html
<!-- hmm, where have i seen this again... -->
<!-- come overhere -->
```

**Page Title:** `its not here`
**On-page text:** `something is not right here...`

**Answer:** `adamwashere`

**Solution:**
Changing the URL from `notoverhere` to:

```
/episode/overhere
```

reveals a new hint:

> *"he was made in the image of god"*

The page shows the **right side of the Creation of God** artwork.

I went deep here reading Genesis, checking song lyrics like *Image of God*, and chasing all sorts of references.

Finally, a forum hint suggested editing the image source:

```html
<img src="/images/os/handofgod.png">
```

Viewing the related **Hand of Adam** image reveals the answer:

👉 `adamwashere`

---

### 7. Stardust (20 points)

**Link:**
[https://inkarsika.tusharbhatt.com/chapter/basics/episode/stardust](https://inkarsika.tusharbhatt.com/chapter/basics/episode/stardust)

**Answer:** `evilcat`

**Solution:**
This one felt familiar.

The page contains an audio file:

```html
<audio data-bg-audio="" loop="" preload="auto" src="/audio/sound2.wav"></audio>
```

The background noise felt unusual, so I opened it in **Audacity**, viewed the **spectrogram**, and extracted the hidden text.

Result: **evilcat** 🐈‍⬛

---

## Closing Thoughts

That wraps up the **Basics** chapter.

Inkarsika does a great job of blending curiosity, web knowledge, and patience into each challenge. I’ll be sharing **The Cat** chapter solutions next things start getting much more interesting there.

Stay curious, and happy hunting 🧩

```