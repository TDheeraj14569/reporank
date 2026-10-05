<div align="center">
  
  # 🚀 RepoRank
  
  **The Next-Generation Enterprise Coding Challenge Platform**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
  [![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  *Evaluating engineers on real-world architecture, not just algorithms.*
</div>

---

## 💡 The Vision

Traditional coding platforms test developers in a vacuum: *Reverse a linked list in a single file.* But in the real world, Software Engineers navigate complex, multi-file architectures, debug distributed race conditions, and fix memory leaks. 

**RepoRank bridges this gap.** It is a full-stack, browser-based IDE that drops developers into realistic enterprise repositories (Java Spring Boot, Python FastAPI, C++, Go) and challenges them to fix real bugs, pass complex test suites, and climb a global leaderboard.

---

## 🛠️ System Architecture

RepoRank is built with a highly robust **Remote Code Execution (RCE)** engine designed for maximum security, speed, and language agnosticism.

\\\mermaid
graph TD
    A[Browser Client / Monaco Editor] -->|JSON Payload: Code & Slug| B(Next.js API Route)
    B --> C{Execution Engine}
    C -->|Spawns Temp Sandbox| D[Docker Linux Container]
    D -->|Executes| E[uv / pytest]
    D -->|Executes| F[Maven / JUnit]
    D -->|Executes| G[GCC / C++17]
    D -->|Executes| H[Go Test]
    D -->|Executes| I[Node / Jest]
    E & F & G & H & I -->|Capture STDOUT/STDERR| J[Custom Output Parsers]
    J -->|Calculate Score| K[(Prisma DB / SQLite)]
    K --> B
    B --> A
\\\

---

## 🚀 Key Engineering Challenges Solved

Building a safe and lightning-fast RCE platform introduces significant technical hurdles. Here is how they were solved:

### 1. Secure & Ephemeral Code Execution
Running untrusted user code on a server is inherently dangerous. RepoRank utilizes a **Dockerized Linux Sandbox**. Every time a user clicks "Run Tests", the backend dynamically creates an isolated, temporary directory, injects the multi-file repository, and executes the compiler as a restricted \sandboxuser\ with strict time-to-live (TTL) limits to prevent infinite loop attacks.

### 2. Polyglot Output Parsing
Each language compiler outputs test results in completely different formats. I engineered custom Regex and AST parsers to intercept the raw \stdout\/\stderr\ from 5 different tools:
- **Java (Maven/Surefire)**: Hiding interactive progress bars (\-B\) and extracting JUnit failures.
- **Python (uv)**: Utilizing the blazing-fast Astral \uv\ package manager to install dependencies in milliseconds, then parsing \pytest\ output.
- **C++ (GCC)**: Compiling multiple headers/sources (\g++ -std=c++17 src/*.cpp tests/*.cpp\) and catching \SIGABRT\ assertion failures natively.

### 3. State Management & Browser IDE
Integrated Microsoft's **Monaco Editor** to provide a VS-Code-like experience in the browser. Engineered a complex React state manager to handle persistent multi-file navigation, syntax highlighting swapping, and live diffing against starter code without lag.

---

## 📸 Platform Previews

*(Note to Developer: Add screenshots of your app here to impress recruiters!)*

<details>
<summary><b>1. The Web IDE & Execution Terminal</b></summary>
[Add Screenshot of Editor Here]
</details>

<details>
<summary><b>2. Global Leaderboard & Gamification</b></summary>
[Add Screenshot of Leaderboard Here]
</details>

---

## ⚙️ Quick Start (Local Development)

Want to run the execution engine on your own hardware?

\\\ash
# 1. Clone the repository
git clone https://github.com/TDheeraj14569/reporank.git
cd reporank

# 2. Install dependencies
npm install

# 3. Initialize the database
npx prisma db push

# 4. Start the development server
npm run dev
\\\
*Visit \http://localhost:3000\ in your browser!*

---

## ☁️ Cloud Deployment (Production)

RepoRank is designed to be deployed to native Docker environments (like Railway or Render) so the cloud servers handle the heavy lifting of polyglot compilation.

1. Fork this repository.
2. Link the repository to [Railway.app](https://railway.app/).
3. Railway will automatically detect the massive \Dockerfile\, download the Debian Bookworm image, install all 5 compilers (Python, Java, C++, Go, Node), generate the Prisma database, and expose the live application.
