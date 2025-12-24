---
title: "From Learning RAG to Deploying a Real Academic Q&A System"
date: 2025-12-24
draft: false
description: "How completing NVIDIA’s RAG course led me to build and deploy a real-world question-answering system for academic regulations using PDFs, embeddings, and Gradio."
tags:
  - rag
  - nvidia
  - llm
  - gradio
  - deployment
  - self-learning
  - ai-projects
---

Yesterday, I finally completed the **NVIDIA RAG (Retrieval-Augmented Generation) course**, and I was genuinely intrigued by how powerful this approach is.  
Without fine-tuning my own LLM, I could still build a system capable of answering questions about a **very specific domain** accurately and reliably.

That idea felt *strangely familiar*.

I am the **Vice President of the Board of Academic Interaction** at my institute, and I often get asked questions that seem obvious to me. Not because people are careless, but simply because most students are **unaware of the finer rules and regulations**. These rules *do* exist on the official website ([I’ll link it here](https://iitj.ac.in/office-of-academics/en/academic-regulations)) and also as PDFs but realistically, very few people read through them end to end.

So I thought:  
**Why not use my newly gained RAG knowledge and these PDFs to build a system that answers such questions directly?**

That’s how [**`rag.krish2005.tech`**](https://rag.krish2005.tech) was born.

---

## Building the RAG System

Creating the system itself was surprisingly straightforward.

I started by downloading the academic regulations PDF and breaking it into chunks.  
In total, I ended up with **64 chunks**, using:

- `chunk_size = 400`
- `overlap = 100`

Each chunk was then converted into embeddings using the **`nvidia/nv-embed-v1`** model.  
Instead of storing these in a vector database, I simply saved them in a **`.json` file**. This made the system lightweight, portable, and reduced unnecessary Python dependencies any backend could read the embeddings without extra setup.

For a small, static knowledge base, this approach felt clean and sufficient.

---

## Deployment Struggles (and UI Choices)

Deployment turned out to be more challenging than building the system itself.

Initially, I created a **FastAPI backend with a React frontend**. While it worked perfectly, the UI didn’t *feel* AI enough to me. I’ve grown accustomed to seeing AI and ML tools presented through **Gradio-style interfaces**, and subconsciously, that had become my mental model for AI products.

So I decided to switch.

Since Gradio can run as a static interface, I merged everything into a **single `app.py` file**:
- FastAPI logic
- Gradio frontend
- Retrieval + generation pipeline  

The entire project boiled down to just:
- `app.py`
- `requirements.txt`
- `embeddings.json`

Simple and clean.

---

## Hosting Decisions

My first choice for hosting was **Railway**, but hosting chatbots on its free tier goes against their policy, so that option was out.

Next, I tried **Render**. It worked fine functionally, but the **3-minute cold start** was a deal-breaker. No one is waiting that long for an AI-generated answer especially not students asking quick academic questions.

While looking for alternatives, I came across **Hugging Face Spaces**.

And honestly, it was *perfect*.

Hugging Face Spaces is clearly built with AI systems in mind, and the **Gradio-specific templates** made deployment incredibly smooth. The only limitation was that custom domains and webhooks require a Pro subscription. I worked around this by skipping CI/CD entirely and directly uploading the three files.

For the custom domain, I simply added a **redirect rule** from `rag.krish2005.tech` to the Hugging Face Space URL.

Hugging Face does have a cold start as well, but it’s much smaller, and thanks to the Gradio template, the entire process felt effortless.

---

## Final Thoughts

This project was deeply satisfying not just because it worked, but because it solved a **real problem** using something I had *just learned*. From understanding RAG, to chunking PDFs, to deployment trade-offs, every step taught me something practical.

I truly enjoyed **learning**, **building**, and most importantly, **deploying** this system.

And that, for me, is what makes these projects worth doing.
