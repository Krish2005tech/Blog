---
title: "Building a Personal Links Page and Fixing an Icon Rendering Quirk"
date: 2025-12-17
draft: false
description: "The story of building links.krish2005.tech, a simple static page to showcase projects, and solving the small but annoying problem of mixing icons and images."
tags: ["web-development", "react", "personal-projects", "problem-solving", "frontend"]
---

Lately, I’ve been creating a bunch of small projects. Nothing huge, but enough that I needed a proper way to keep track of them. Sure, I *could* just look at the subdomain CNAME records in my DNS. But honestly — who wants to do that? And more importantly, how would I show others what I’m working on?

So I started thinking about the problem, and the first thing that came to mind was **Linktree**. It’s literally made for this exact use case: a simple page with links to things you’re working on.

Then I went down the open-source rabbit hole and found **LittleLink**. It’s a really solid project and very well done — but it didn’t quite match my vibe.

So I did what any programmer would do. I coded my own.

## Building links.krish2005.tech

The idea was simple:
- a static page
- a list of links
- a small icon for each project
- one main heading
- and a one-line description per link

I created a reusable link component, a basic page template, and just like that — 👉 **[https://links.krish2005.tech](https://links.krish2005.tech)** was born.

## The “pretty” problem I ran into

Like every coding journey, there *had* to be a small but annoying issue.

I was using icons from `lucide-react`, and they worked perfectly. But then I wanted to add custom images for some projects instead of icons. And boom — the page broke.

For lucide icons, I was doing something like this:

```jsx
<Icon name={iconName} size={24} />
```

This worked great... until I tried replacing `Icon` with an image. Obviously, you can’t just drop an `<img>` tag in place of a React icon component.

So instead of fighting it, I added an `iconType` property to each link item and rendered things differently based on that.

## The final solution

Here’s the final rendering logic:

```jsx
{iconType === "lucide" ? (
  <Icon name={iconName} size={24} />
) : iconType === "svg" ? (
  <img src={iconSrc} alt="" width={24} height={24} />
) : (
  <img src={iconSrc} alt="" className="rounded-md" width={24} height={24} />
)}
```

A really small problem, with a really simple solution. But I’m writing about it anyway — because that’s kind of the point of this personal web journal. To talk about things I usually wouldn’t, even if they’re small.

## Icons worth mentioning

If you’re looking for high-quality, open-source SVG icons, I highly recommend **[Feather Icons](https://feathericons.com/)**. Clean, minimal, and perfect for projects like this.

That’s it for today. Back to building.
