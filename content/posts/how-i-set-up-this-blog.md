---
title: "How I Set Up This Blog (My Journey from Idea → Deployment)"
date: 2025-12-11
description: "A detailed walkthrough of how I built this site using Hugo + Cloudflare Pages, the decisions I made, the struggles I faced, and why I chose this stack."
tags: ["setup", "hugo", "cloudflare", "blogging"]
---

For a long time, I wanted a simple place on the internet where I could write about tech, document small wins, share problems I solve, or even drop personal thoughts. Not a fancy platform, not something overloaded with features — just a clean space where I could write **my way**, at my pace.

And today… you're reading this on **blog.krish2005.tech** — my new home on the web.

This is the story of how it came together.

---

# 🧠 **My Mindset: Keep It Simple, But Developer-Friendly**

I knew I wanted a few things right from the start:

- **Minimal setup** — because I don't want to spend weeks installing plugins.  
- **Fast & lightweight** — no bloat, no unnecessary JS.  
- **Markdown-based** — writing should feel natural.  
- **Free hosting** — because why pay for something simple?  
- **Customizable later as I grow** — I'm a developer; I *will* tweak things.

Basically:  
I wanted something like Medium's simplicity, but with GitHub-level control.

---

# 🔍 **Options I Considered**

Before jumping in, I looked at several options:

### **1. Write.as / BearBlog**  
They were beautifully minimal — but I eventually realized I'd want more customization.

### **2. Substack / Medium**  
Great writing experience, but:
- No full control  
- No real customization  
- Poor for dev-heavy posts  
- Hard to design my own structure later

### **3. Blogger / WordPress.com**  
These felt too old-school or too bloated.

### **4. Static site generators** like:
- **Hugo**
- **Jekyll**
- **Astro**
- **11ty**

These gave full control but required some setup — still worth it.

---

# 🚀 **Why I Chose Hugo + Cloudflare Pages**

This stack won for a few reasons:

### ✔ **Crazy fast builds** (Hugo compiles instantly)  
### ✔ **Markdown content**  
### ✔ **Free static hosting with Cloudflare Pages**  
### ✔ **Automatic HTTPS**  
### ✔ **Git-based workflow**  
### ✔ **Easy custom domain**  
### ✔ **Future customization is limitless**  

And the PaperMod theme made the whole site look clean and modern with almost zero effort.

So the decision was made:  
**Hugo for content → Cloudflare Pages for hosting.**

---

# 🧱 **The Actual Steps I Took (So You Can Do It Too)**

Here's exactly how I did it:

---

## **1. Install Hugo**

On Windows:
```bash
choco install hugo
```

Check:
```bash
hugo version
```

---

## **2. Create a new Hugo site**

```bash
hugo new site Blog
cd Blog
```

---

## **3. Add PaperMod theme**

```bash
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

Edit `hugo.toml` to include:

```toml
theme = "PaperMod"
```

---

## **4. Create first pages**

Homepage content, About page, and first post.

Example:

```bash
hugo new posts/hello-world.md
```

I edited them later to add proper text.

---

## **5. Preview locally**

```bash
hugo server -D
```

This was the moment where I finally *saw* my site.

---

## **6. Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

---

## **7. Deploy to Cloudflare Pages**

This part was trickier.

### At first, I accidentally created a **Worker instead of a Pages project**

This resulted in Cloudflare ignoring Hugo entirely and showing only:

```
Hello world
```

And later a **404 page**.

I spent time debugging it until I realized:

👉 I must use **Pages**, not Workers.

So I deleted the Worker and created a **Pages → Connect to Git** project.

Inside Cloudflare Pages, I set:

* Build command:
  ```
  hugo
  ```
* Output directory:
  ```
  public
  ```
* Env variable:
  ```
  HUGO_VERSION = 0.152.2
  ```

Then Cloudflare finally ran a real build.

---

## **8. Connecting my .tech domain**

When my domain became available, I added:

```
blog.krish2005.tech
```

Cloudflare automatically configured DNS and HTTPS.

Seeing my site live on a real domain was *so satisfying*.

---

# 🧩 **Problems I Faced & How I Solved Them**

### ❌ Problem 1 — Cloudflare kept showing "Hello world"

This was because it was deploying as a **Worker**, not a Page.

**Fix:** Delete Worker → Create Pages project.

---

### ❌ Problem 2 — 404 after deployment

This happened because Cloudflare deployed **0 files**.

**Fix:**
Ensure output directory = `public`
And Hugo actually builds properly.

---

### ❌ Problem 3 — Couldn't change `.pages.dev` URL

Turns out: Page subdomains are fixed.
Solution: use my custom `.tech` domain instead.

---

# 🎉 **What I Learned**

* Static site generators are powerful once you get past the initial setup.
* Cloudflare Pages is one of the best free dev tools available today.
* A blog doesn't have to be perfect — it just needs to exist.
* Writing is easier when you own your space.

---

# 🌱 **What's next?**

I'll be writing about:

* Things I learn
* Projects I build
* Tech experiments
* Mistakes & debugging stories
* Personal growth

This blog is not just a website — it's a timeline of me becoming a better developer.

If you've read this far:
**Thanks for joining me on day one.**