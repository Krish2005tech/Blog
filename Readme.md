# My Personal Blog

This is the source code for my personal blog built using **Hugo** and the **PaperMod** theme.  
The blog is deployed at:

👉 **https://blog.krish2005.tech**

## 🚀 Features

- Fast static site powered by Hugo  
- Clean and modern design with PaperMod  
- Responsive layout for mobile and desktop  
- Syntax-highlighted code blocks  
- Light/Dark theme toggle  
- Search page  
- Archives page  
- Custom About page  
- Easy to write posts using Markdown  

## 📦 Tech Stack

- **Hugo** (Static Site Generator)  
- **PaperMod Theme**  
- **Cloudflare Pages** for hosting  
- **Custom Domain**  

## 📁 Project Structure

```
myblog/
├── content/
│   ├── about/
│   ├── posts/
│   ├── search/
├── static/
│   └── images/
├── assets/
│   ├── css/
│   │   └── extended/
├── hugo.toml
└── themes/
    └── PaperMod/
```

## 📝 Creating a New Post

Run:

```sh
hugo new posts/my-new-post.md
```

Then write your content inside the newly created Markdown file.

## ▶️ Running the Blog Locally

```sh
hugo server -D
```

Preview at:

```
http://localhost:1313
```

## 🚀 Deploying

This site is deployed via **Cloudflare Pages** with:

- **Build command:** `hugo`
- **Output directory:** `public`
- **Environment variable:** `HUGO_VERSION = 0.152.2`

To build the static site locally:

```sh
hugo
```

The output appears in the `public/` folder.

## 🔧 Setup Instructions

1. **Install Hugo:**
   ```sh
   brew install hugo
   ```

2. **Clone this repository:**
   ```sh
   git clone https://github.com/Krish2005tech/Blog.git
   cd Blog
   ```

3. **Initialize submodules (PaperMod theme):**
   ```sh
   git submodule update --init --recursive
   ```

4. **Run locally:**
   ```sh
   hugo server -D
   ```

## 📜 License

This blog's source code is open for learning and personal reference. The posts/content are not allowed to be reused without permission.

---

**Built with ❤️ using Hugo and PaperMod**