---
title: "Building a JWT Decoder/Encoder: When Your Favorite Tool Changes"
date: 2025-12-18
description: "How I built a custom JWT decoder and encoder with real-time editing, signature verification, and a clean interface after jwt.io removed the edit functionality"
tags: ["jwt", "react", "web-development", "cybersecurity", "tailwind", "authentication"]
---

## The Problem

Today was a very brief but satisfying project - building a JWT decoder and encoder from scratch. I've been acquainted with JWT (JSON Web Tokens) since a long time now. I use them extensively for stateless authentication in my web apps, and as a cybersecurity enthusiast, I've solved several CTF challenges related to JWT and some of its vulnerabilities over the years.

My go-to tool for working with JWTs has always been the default debugger provided by [jwt.io](https://jwt.io). It was pretty good enough with a clean interface and the option to change contents of tokens to generate new ones. But quite recently, they removed the option to edit tokens directly. Now we can only paste JWTs, decode them, and check signatures - with a completely separate tool needed to create new tokens.

This felt like a step backward, so I thought about this problem and decided to solve it today.

**Check it out here: [jwt.krish2005.tech](https://jwt.krish2005.tech)**

## The Solution

I created a simple React (Vite) app with an interface much similar to the original jwt.io, but with the editing functionality intact. The application features a clean, responsive layout that works seamlessly on both desktop and mobile devices.

### Key Features

**Real-time Bidirectional Editing**: The most important feature - you can paste a JWT and it automatically decodes into three sections (Header, Payload, and Signature). But more importantly, you can edit the Header and Payload sections directly, and the JWT token updates in real-time while preserving the signature. This allows you to quickly modify token contents and see the changes immediately.

**Smart Signature Management**: Instead of auto-generating signatures on every edit (which would defeat the purpose of testing invalid tokens), I implemented a deliberate approach:
- Editing Header/Payload updates the JWT but keeps the signature unchanged
- A dedicated "Generate JWT" button creates a new valid signature using the provided secret key
- This separation allows you to test both valid and invalid token scenarios

**Visual Validation States**: For aesthetics and functionality, I added a color-coded border system around the JWT input that provides instant visual feedback:
- 🔴 **Red**: Invalid JWT format - the token structure is malformed or can't be decoded
- 🟡 **Yellow**: Valid JWT structure but signature not verified - either no secret key is provided or the signature doesn't match
- 🟢 **Green**: Valid and verified JWT - the signature matches the provided secret key

**Additional Features**:
- **Dark/Light Mode**: A theme toggle for comfortable viewing in any lighting condition
- **Expiry Countdown**: If the JWT contains an `exp` field, a live countdown timer shows exactly when the token expires
- **Copy Buttons**: Quick copy functionality for the JWT token, Header, Payload, and Secret
- **Color-coded JWT Components**: When displaying a valid JWT, the three parts (Header.Payload.Signature) are shown in different colors for easy visual identification
- **Highlighted Fields**: Important payload fields like `exp`, `iat`, and `iss` are visually emphasized

## The Automation Touch

And finally, because automation is the soul of a programmer, I made a small `setup-tailwind.js` script to automate the Tailwind CSS setup process. No more manually installing dependencies, configuring files, and updating imports - just run one script and you're ready to go. It's these small quality-of-life improvements that make development more enjoyable.

## Technical Implementation

The app handles JWT encoding and decoding using native browser APIs for Base64URL operations and the Web Crypto API for HMAC-SHA256 signature generation and verification. This means no external dependencies for the core JWT functionality - everything runs client-side in the browser.

The real-time editing system uses React's state management to keep the JWT token, decoded components, and UI in perfect sync. When you modify the Header or Payload, it triggers an update that re-encodes only those parts while preserving the existing signature, maintaining the separation between content editing and signature generation.

## Why Build This?

Some might ask - why build this when jwt.io exists? The answer is simple: control and functionality. When a tool you rely on changes in a way that limits your workflow, sometimes the best solution is to build your own. This project took just a few hours but resulted in a tool that's tailored exactly to my needs - and hopefully useful to others who miss the old jwt.io editing functionality.

Plus, it's always a good exercise to build something you use regularly. You gain a deeper understanding of how JWTs work under the hood, and you end up with a tool that does exactly what you want, nothing more, nothing less.

**Try it out: [jwt.krish2005.tech](https://jwt.krish2005.tech)**