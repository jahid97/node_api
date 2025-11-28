const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuid } = require('uuid');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());               
app.use(express.static("public"));  // using frontend

app.use(morgan("dev"));       

// --- ORIGINAL ENDPOINT (kept as-is)
app.get("/outfit", (req, res) => {
    const tops = ['t-shirt', 'sweater', 'shirt', 'hoodie',
                'polo-shirt', 'tank-top', 'jersey', 'jacket',
                'blazer', 'coat', 'kurta', 'sherwani',
                'waistcoat', 'sweatshirt'];
    const jeans = ['jeans', 'shorts', 'lungi', 'joggers',
                'chinos', 'cargo-pants', 'trousers',
                'pajamas', 'track-pants', 'capri', 'dress-pants'];
    const shoes = ['sneakers', 'sandals', 'boots', 'flats',
                'loafers', 'oxfords', 'derby', 'flip-flops',
                'crocs', 'running-shoes', 'formal-shoes', 'slippers'];

    res.json({ top: _.sample(tops), jeans: _.sample(jeans), shoes: _.sample(shoes) });
});

// --- COMMENT CREATION (original, untouched)
app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;

    if (!content) {
        return res.sendStatus(400);
    }

    await fs.mkdir("data/comments", { recursive: true });
    await fs.writeFile(`data/comments/${id}.txt`, content);

    res.status(201).json({ id });
});

// --- GET COMMENT BY ID (original, untouched)
app.get("/comments/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
        res.json({ content });
    } catch {
        res.sendStatus(404);
    }
});


// **GET ALL COMMENTS**
app.get("/comments", async (req, res) => {
    try {
        const files = await fs.readdir("data/comments");
        const comments = [];
        for (const file of files) {
            const id = file.split(".")[0];
            const content = await fs.readFile(`data/comments/${file}`, "utf-8");
            comments.push({ id, content });
        }
        res.json(comments);
    } catch {
        res.json([]);
    }
});

// --- Update comment
app.put("/comments/:id", async (req, res) => {
    const id = req.params.id;
    const content = req.body.content;
    if (!content) return res.sendStatus(400);

    try {
        await fs.access(`data/comments/${id}.txt`);
        await fs.writeFile(`data/comments/${id}.txt`, content);
        res.json({ message: "Updated successfully" });
    } catch {
        res.sendStatus(404);
    }
});

// --- Delete comment 
app.delete("/comments/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await fs.unlink(`data/comments/${id}.txt`);
        res.json({ message: "Deleted successfully" });
    } catch {
        res.sendStatus(404);
    }
});

// --- Health check 
app.get("/health", (req, res) => {
    res.json({ status: "OK", time: new Date().toISOString() });
});

// --- Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

// --- Start server
app.listen(3000, () => console.log("Server started on port 3000 and base link http://localhost:3000"));