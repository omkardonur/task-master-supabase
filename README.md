# React Task Master

A professional, feature-rich Todo List application built with React and Vite. This application offers multiple views (List, Board, Calendar) to help you organize your tasks effectively, with support for **Supabase** backend sync and a robust offline mode.

## 🚀 Features

- **Multiple Views**:
  - 📋 **List View**: Standard task list with filtering (All, Active, Completed).
  - 📊 **Board View**: Kanban-style board (To Do, In Progress, Done) with drag-and-drop support.
  - 📅 **Calendar View**: Monthly grid view to see tasks by due date.
- **Task Management**:
  - Priority Levels (High, Medium, Low) with color-coded badges.
  - Due Dates.
  - Detailed view with Description/Notes.
  - **Comments**: Add timestamped comments to tasks.
  - **Attachments**: Upload and view files associated with tasks.
- **User Experience**:
  - 🌓 **Dark Mode**: Toggle between Light and Dark themes.
  - 📈 **Progress Bar**: Visual indicator of task completion.
  - ✨ **Animations**: Smooth transitions and delete animations.
- **Persistence**:
  - **Cloud Sync**: Integrates with Supabase for real-time database storage.
  - **Offline Fallback**: Automatically switches to LocalStorage if database connection fails.

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 (Variables, Grid, Flexbox)
- **Backend**: Supabase (PostgreSQL)
- **Containerization**: Docker

## 🏁 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/react-task-master.git
    cd react-task-master
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### 🗄️ Database Setup (Supabase)

To enable cloud sync, you need a Supabase project.

1.  Create a project at [supabase.com](https://supabase.com).
2.  Go to the **SQL Editor** in your Supabase dashboard.
3.  Copy the contents of `schema.sql` (located in the project root) and run it to create the table.
4.  Create a `.env` file in the root directory and add your keys (find them in Project Settings -> API):

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    *Note: If you skip this step, the app will run in **Offline Mode** using local storage.*

### Running the App

1.  **Run the development server:**
    ```bash
    npm run dev
    ```

2.  **Open your browser:**
    Navigate to `http://localhost:5173`.

    > **Note:** To access the app from another device on the same network, run `npm run dev -- --host`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` folder.

## 🐳 Running with Docker

You can also run the application in a Docker container.

1.  **Build the Docker image:**
    ```bash
    docker build -t react-crud .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 8080:80 react-crud
    ```

3.  **Access the app:**
    Open `http://localhost:8080`.

## 📂 Project Structure

The project follows a scalable feature-based architecture:

```
src/
├── components/           # Shared/Common UI components
│   └── layout/           # Layout components (Header, etc.)
├── features/             # Feature-specific modules
│   └── todos/            # Todo module
│       ├── api.js        # Supabase API integration layer
│       └── components/   # Components specific to Todos (Form, List, Board, etc.)
├── lib/                  # Library configurations (Supabase client)
├── App.jsx               # Main application container
├── App.css               # Global styles and themes
└── main.jsx              # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
