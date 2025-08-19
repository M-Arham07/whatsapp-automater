# WhatsApp Automater

A web-based WhatsApp automation tool built with **Next.js (App Router)**, **TypeScript**, **Socket.IO**, and **whatsapp-web.js**. It allows QR code-based login, message automation, and real-time updates via WebSockets.

---

## Features

- **QR Code Authentication** – Scan WhatsApp Web QR to login.
- **Real-time updates** – WebSocket-based connection for live events.
- **Automated messaging** – Send messages programmatically.
- **Responsive UI** – Built with Tailwind CSS and ShadCN UI.
- **Hooks & Context** – Clean React hooks for state management.

---

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI  
- **Backend:** Node.js, Socket.IO, whatsapp-web.js  
- **Utilities:** QR Code generation, real-time event handling

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/M-Arham07/whatsapp-automater.git
cd whatsapp-automater
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the WebSocket server

```bash
npm run socket

# or

npx nodemon --exec ts-node server/whatsapp-server.ts
```

### 4. Run the Next.js app

```bash
npm run dev
```

### 5. Open in browser

Visit [http://localhost:3000](http://localhost:3000) to access the automater.




---

## Usage

1. Open the web page.
2. Click the **Login** button to display QR code.
3. Scan the QR code using your WhatsApp app.
4. Once logged in, use automation features like sending messages.
5. WebSocket ensures live updates of message events.

---

## Notes

- Only works for personal WhatsApp accounts via WhatsApp Web.
- Ensure your Node.js version is **>=18**.
- Socket.IO server must be running for live updates.

---


