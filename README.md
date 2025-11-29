# Outfit Suggestion & Comment API

## Live : https://restful-api-mi05.onrender.com/

## 📝 Description

This project is a simple backend RESTful API built with Node.js and Express. It serves two main purposes:

1.  **Outfit Generator:** Provides a random suggestion for a top, bottom (jeans/trousers), and shoes.
2.  **Comment Manager:** A basic RESTful API that allows users to create, view, update, and delete comments. Comments are persisted on the file system in the `data/comments` directory.

The project also includes a simple static HTML/JavaScript frontend located in the `public/` folder to demonstrate the Comment Manager API's functionality.

## ✨ Features

### API Endpoints
| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/outfit` | Generates a random outfit (top, jeans, shoes). |
| **POST** | `/comments` | Creates a new comment. (Requires `content` in request body) |
| **GET** | `/comments` | Retrieves all existing comments. |
| **PUT** | `/comments/:id` | Updates a specific comment by ID. (Requires `content` in request body) |
| **DELETE** | `/comments/:id` | Deletes a specific comment by ID. |
| **GET** | `/health` | Simple health check endpoint. |

### Frontend
A basic web interface is available at the root URL (`/`) which demonstrates how to interact with the Comment Manager API using vanilla JavaScript (fetch API).

## 🚀 Installation and Setup

### Prerequisites
* Node.js (v18 or higher recommended)

### Steps

1.  **Clone or Download:** Ensure you have the project files.
2.  **Install Dependencies:** Open your terminal in the project root directory and run:

    ```bash
    npm install
    ```

3.  **Data Directory:** Make sure the data directory for comments exists:

    ```bash
    mkdir -p data/comments
    ```

## ▶️ Running the Project

To start the server, use the defined `start` script:

```bash
node index.js
```

The server will start on port 3000 (or the one configured in index.js).

Accessing the Application if you are running it on local
API Root: http://localhost:3000

Project live link: https://restful-api-mi05.onrender.com/

## ⚙️ Project Structure
```bash
my_project/
├── data/
│   └── comments/       # Stores individual comment files (.txt)
├── public/
│   └── index.html      # Frontend for the Comment Manager
├── index.js            # Main Express server and API logic
├── package.json        # Project metadata and dependencies
└── README.md           # This file
```


## 🛠️ Technologies Used
Node.js

Express.js (Web framework)

uuid (For generating unique IDs for comments)

lodash (Utility library, used for random outfit selection)

cors (For enabling Cross-Origin Resource Sharing)

morgan (HTTP request logger)
