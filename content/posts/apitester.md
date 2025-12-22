---
title: "Building a Lightweight API Tester for Quick Endpoint Checks"
date: 2025-12-22
draft: false
description: "A simple browser-based API testing tool for developers who need quick endpoint validation without the overhead of full-featured applications"
tags: ["web development", "api", "tools"]
---

Over the weekend, I built another mini tool: **https://apitester.krish2005.tech/**.

I've been using **Postman** for a while now. It's been my go-to tool for API testing, and I've also experimented with other similar options like **Insomnia**. Truthfully speaking, these tools work incredibly well and have tons of powerful features. But here's the thing that started bothering me. I wasn't really using all those features they had to offer.

Most of the time, I only needed the basic functionality. The advanced features came in handy occasionally, maybe when I was creating some type of **documentation** or generating a detailed **report for APIs**. But that was rare. My day-to-day goal was much simpler: I just wanted to test if an endpoint was **online** and **working properly**. When approaching things from a **cybersecurity perspective**, I'd check a few other quirks and edge cases. But at its core, my workflow was straightforward—sending a simple **GET** or **POST** request and checking the response.

That's when I thought: why not make something lighter?

I wanted a **small website** that could run directly in the browser. Something I could keep open in a tab while I'm working on my **frontend draft**, so I could quickly check my **backend endpoints** without switching between applications. Since it uses a simple **fetch** call under the hood, it perfectly mimics how a general website would behave when making API requests. This makes it ideal for testing real-world scenarios.

I tried to keep the **UI as close to Postman as possible** so it feels familiar and intuitive. The tool includes options to **copy** and **download** the response in both **JSON** and **HTML** formats, exactly as received from the server. It's minimal, fast, and does exactly what I need—nothing more, nothing less.

Sometimes the best tools are the ones you build for yourself.