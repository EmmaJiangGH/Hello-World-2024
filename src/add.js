const fs = require('fs');
const path = require('path');
const express = require('express'); // Use Express to handle HTTP requests
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Path to your JSON file
const filePath = path.join(__dirname, 'progress.json');

// Function to load progress data
function loadProgress() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    return {}; // Return an empty object if the file doesn't exist
}

// Function to save progress data
function saveProgress(progress) {
    fs.writeFileSync(filePath, JSON.stringify(progress, null, 2), 'utf8');
    console.log("Progress saved!");
}

// Endpoint to save progress
app.post('/save-progress', (req, res) => {
    const progressData = req.body;
    saveProgress(progressData);
    res.send('Progress saved successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
