# SketchRoom – Real-Time Collaborative Whiteboard

SketchRoom is a fully interactive, real-time collaborative whiteboard. It allows multiple users to draw, write, chat, and insert images together on a shared canvas — making it ideal for brainstorming, remote teaching, and collaborative design.

Built with modern web technologies and real-time communication, SketchRoom is lightweight, fast, and doesn’t require any login or database.

## Features

### Core Functionality

- Real-Time Collaboration – Sync all drawing actions, movements, and messages instantly using WebSockets.
- Real-Time Chat – Communicate with other users in the room while drawing.
- Drawing Tools:
  - Pencil (Curve / Freehand)
  - Line
  - Rectangle
  - Circle
- Customizable Toolbar:
  - Draggable and Collapsible
  - Icon-based layout with labels
  - Color Picker and Line Width Control
- Text Insertion – Add styled text anywhere on the canvas.
- Image Upload – Insert and move images directly on the board.
- Background Picker – Change canvas background color.
- Undo / Redo – Step backward or forward through actions.
- Clear Canvas – Wipe the entire canvas instantly.
- Download Canvas – Save the current board as an image.
- Room Sharing – Share the board with others via URL.

## Tech Stack

Frontend:
- React (with TypeScript)
- Tailwind CSS
- HTML5 Canvas
- Recoil (state management)
- Framer Motion (animations)
- React Icons

Backend:
- Node.js
- Express.js
- Socket.IO

## Getting Started

```bash
# 1. Clone the Repository
git clone https://github.com/your-username/sketchroom.git
cd sketchroom

# 2. Install Dependencies
npm install

# 3. Run the development server:
npm run dev

# Terminal 2 (Frontend)
npm run dev:client

# 4. Build the project:
npm run build
# 5. Start the production server:
npm start
