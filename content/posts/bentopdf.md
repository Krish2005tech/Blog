---
title: "Self Hosting, BentoPDF, and Running Privacy-First PDF Tools on My Own Domain"
date: 2025-12-14
draft: false
description: "Exploring self-hosting with BentoPDF — a privacy-first, open-source PDF tool that runs entirely in your browser, without ads or file uploads."
tags: ["self-hosting", "open-source", "privacy", "pdf", "bentopdf", "web-tools"]
---

I recently got a new domain for myself : **krish2005.tech**  and started exploring different things I could do with it. While researching ideas, I came across the concept of **self-hosting**.

In simple terms, self-hosting means improving **privacy and performance** by using **open-source software** and deploying it yourself instead of relying on third-party services. Since I'm just starting out, I didn't want to invest big money in server hardware right now. So instead of buying physical servers, I decided to use the cloud to host **small but useful tools**.

During this journey, I discovered **BentoPDF**.

## Why BentoPDF?

We all deal with PDFs regularly - compressing files, converting formats, merging pages, or splitting documents. Most of the time, we rely on **sketchy websites full of ads**, trackers, and upload limits just to get simple things done.

**BentoPDF** takes a completely different approach.

It lets you do all PDF operations **directly in your browser**. No files are uploaded to any server, which means:
- Better **privacy**
- No tracking or ads
- Faster performance
- 100% client-side processing

For someone interested in self-hosting and privacy-first tools, this felt perfect.

## My Deployment

Since BentoPDF is open source, I forked its repository and deployed a simple version on my own domain:

👉 **https://pdf.krish2005.tech**

I honestly can't explain how satisfying it feels to see a **clean, modern interface with zero ads** doing exactly what it promises. Because it's a **static website**, everything runs locally in your browser, and you don't have to worry about your files going anywhere.

You're free to use my instance for all PDF operations — completely ad-free and privacy-friendly.

## Do It Yourself: Self-Host BentoPDF

If you want to deploy BentoPDF on your own domain, it's actually very easy. Below are the basic steps.

### 1. Clone the Repository

```bash
git clone https://github.com/alam00000/bentopdf.git
cd bentopdf
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed.

```bash
npm install
```

### 3. Run Locally (for Testing)

```bash
npm run dev
```

Now open your browser and visit:

```
http://localhost:3000
```

### 4. Build the Static Site

Once everything looks good, generate the production build:

```bash
npm run build
```

This will create a static output that you can deploy anywhere.

### 5. Deploy Anywhere

Since BentoPDF is a static website, you can deploy it on:
* Vercel
* Netlify
* Cloudflare Pages
* GitHub Pages
* Or your own VPS


And that's it — you now have your own privacy-friendly PDF tool.

## Final Thoughts

This small project made me appreciate how powerful open-source software and self-hosting can be. Without spending any money on hardware, I was able to deploy a genuinely useful tool on my own domain.

This is just the beginning for krish2005.tech, and I'm excited to explore and self-host more tools like this in the future.