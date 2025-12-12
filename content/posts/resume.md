---
title: "How I Built and Deployed My Online Resume"
date: 2025-12-12
description: "A breakdown of my mindset, workflow, and technical process behind creating an online resume hosted using GitHub, Cloudflare Pages, and a custom domain."
tags: ["resume", "cloudflare", "webdev", "deployment", "personal"]
---

# How I Built and Deployed My Online Resume

From local development to GitHub to Cloudflare Pages to custom domain.

Creating this online resume was more than a quick weekend project. I approached it like a proper engineering task, with structure, clarity of purpose, and long-term maintainability in mind. Here's a breakdown of my mindset and the exact process I followed.

Linked here is the live resume: [https://resume.krish2005.tech](https://resume.krish2005.tech)

---

## My Mindset While Building the Resume

When I started designing the resume, I had three clear goals:

### 1. Keep it simple, fast, and readable

Recruiters often spend less than 30 seconds scanning a resume. So I focused on clean typography, minimal color usage, clear section hierarchy, and mobile-friendly layouts.

The idea was to make the resume instantly understandable, without distractions.

### 2. Treat it like a real product

Even though it's "just" a resume, I wanted it to reflect my engineering standards. That meant using components, keeping data separate from UI, ensuring easy future updates, and writing maintainable code.

A resume evolves, so should its code.

### 3. Host it professionally and publicly

I didn't want a static PDF floating around. I wanted something linkable, version-controlled, easily updatable, accessible internationally, and fast and secure.

This naturally led to GitHub and Cloudflare Pages.

---

## Step 1: Writing and Structuring the Resume

I designed the resume as a small web app with Tailwind CSS for styling, semantic HTML for clean structure, and a responsive layout for mobile viewing.

I kept all content: education, skills, projects, and positions in separate structured objects. This way, updates become fast and safe, without touching layouts.

Example:

```js
const personalInfo = { ... }
const skills = [ ... ]
const projects = [ ... ]
```

This modular approach is the single biggest reason managing the resume feels frictionless.

---

## Step 2: Pushing the Resume to GitHub

Once the project structure felt solid, I initialized a GitHub repository:

```bash
git init
git add .
git commit -m "Initial resume website"
git branch -M main
git remote add origin https://github.com/krish2005tech/resume
git push -u origin main
```

Why GitHub? For version control, easy collaboration, CI/CD compatibility, public proof of work, and integration with Cloudflare Pages.

Having my resume in a repo also gives recruiters a glimpse into my coding style.

---

## Step 3: Deploying on Cloudflare Pages

Cloudflare Pages is perfect for static frontends: fast, secure, and globally cached.

### Steps I followed

1. Logged into Cloudflare Dashboard
2. Selected Pages and Create Project
3. Connected my GitHub repo
4. Set the build configuration:

```
Build command: npm run build
Output directory: dist
```

Cloudflare automatically builds the project on every push, giving me CI/CD for free.

### Why Cloudflare Pages?

Cloudflare Pages offers a globally distributed CDN, automatic HTTPS, zero downtime, smooth GitHub integration, and easy custom domains.

---

## Step 4: Adding My Custom Domain (resume.krish2005.tech)

Owning a branded subdomain makes the resume instantly shareable.

### Steps to set it up

1. Added a new Pages custom domain
2. Entered: resume.krish2005.tech
3. Cloudflare automatically suggested the CNAME record
4. I confirmed it in my DNS settings
5. HTTPS certificate auto-issued within seconds

Now anyone can visit:

https://resume.krish2005.tech

A clean, professional link.

---

## Final Thoughts

What started as a simple resume turned into a small but meaningful engineering project, one that reflects my mindset: simplicity in design, rigor in structure, professional deployment, and easy long-term maintainability.

This resume isn't just a document: it's an evolving project that showcases how I think and how I build.

If you're reading this, feel free to explore the code, the design, and the live site. Building your digital identity is an ongoing process, and this resume is a big step in mine.

Thanks for reading! If you want a blog about how I built my portfolio, deployed Hugo on Cloudflare, or integrated analytics, just let me know.