---
title: "Revisiting Web Connections: Building a Simple Chatroom with WebSockets"
date: 2025-12-16
description: "A hands-on revisit of modern web communication beyond REST APIs, where I built a simple chatroom using WebSockets, FastAPI, React, and Tailwind."
tags: ["websockets", "fastapi", "react", "tailwind", "learning"]
---

Lately, I felt the need to revisit **web communication methods** beyond the usual REST APIs.  
REST works great, but it's not the only option anymore. There are other approaches like **GraphQL**, **WebSockets**, and **Server-Sent Events (SSE)** — each solving different problems.

So instead of just reading theory, I decided to **build something small and practical**.

That's how **https://chat.krish2005.tech** came to life.

---

## The Idea

I built a **simple chatroom app** where:
- A user enters their name
- Joins or creates a room
- Shares a **6-digit room code** with others
- And… just chats

Nothing fancy. No message history. No accounts.  
Just a clean, real-time experience.

The goal was learning, not building a production-scale app.

---

## Tech Stack

Here's what I used:

- **Backend:** FastAPI (Python)
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS

One small but important note about **Tailwind**.

Recently, the way Tailwind is imported has changed. Instead of the old muscle-memory approach, we now need to:
- Update the `postcss.config.js`
- Import Tailwind using:

```css
@import "tailwindcss";
```

Because of years of habit, I kept making this mistake at first 😅
But apart from that, the overall setup was **pretty smooth**.

---

## Understanding WebSockets (Using My Chat App)

WebSockets turned out to be **simpler than I expected**.

The biggest advantage they provide is that **we don't need polling**.
Once a WebSocket connection is established, the **server can push data to clients instantly**.

In my FastAPI app, the flow looks something like this:

- Client connects to a WebSocket endpoint
- Server accepts the connection
- Messages are exchanged as **JSON**
- Server broadcasts incoming messages to all users in the same room

A simplified snippet looks like this:

```python
await websocket.accept()

while True:
    data = await websocket.receive_text()
    await broadcast_to_room(data)
```

That's basically it.

No request–response cycle.
No repeated API calls.
Just a persistent connection.

---

## How Messages Are Handled

One important thing to note:
**The server does not store messages**.

It simply:

1. Receives a message from one client
2. Broadcasts it to everyone in that chatroom

This keeps the system:

- Lightweight
- Easy to reason about
- Perfect for learning WebSockets

WebSockets are honestly a **simple but powerful tool** when real-time updates are needed.

---

## Deployment Choices

For deployment, I used my current favorite combo:

- **Frontend:** Cloudflare Pages
- **Backend:** Render

Render does have a **cold start**, which can cause a small delay on the first connection.
But since this was a learning project and not a full-scale app, that tradeoff was totally fine for me.

I also split things nicely using subdomains:

- `chat.krish2005.tech` → Frontend
- `socket.krish2005.tech` → WebSocket backend

Initially, I considered something like:

```
api.krish2005.tech/ws
```

But that requires extra proxying steps, so I'll leave that experiment for another day.

---

## Features Implemented

Nothing over-engineered, just the essentials:

- Create a room
- Join a room using a code
- Light / Dark mode
- Mobile responsive UI
- Prevent users from joining a room with the **same username** (for simplicity)

---

## Final Thoughts

This project was a **great refresher** on how real-time web communication works.
It reminded me that sometimes the best way to learn isn't reading docs — it's building something small and breaking it a few times along the way.

WebSockets might look intimidating at first, but once you try them, they feel surprisingly natural.

Definitely something I'll be using more often going forward.