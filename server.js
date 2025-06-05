const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// API route to get products from db.json
app.get("/products", (req, res) => {
    fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Server error reading products" });
        }
        const products = JSON.parse(data).products;
        res.json(products);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
