const fs = require('fs'); // File system module
const path = require('path'); // Path module for file paths
const express = require('express'); // Use Express to handle HTTP requests
const cors = require('cors'); // Import CORS
const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(cors());

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
    return { tasksCompleted: 0, workCycles: 0 }; // Default values if file doesn't exist
}

// Function to save progress data
function saveProgress(progress) {
    fs.writeFileSync(filePath, JSON.stringify(progress, null, 2), 'utf8');
    console.log("Progress saved to file:", progress);
}

// Endpoint to save progress
app.post('/save-progress', (req, res) => {
    const progress = { ...loadProgress(), ...req.body }; // Merge with existing data
    saveProgress(progress);
    res.send('Progress saved successfully!');
});

// Endpoint to load progress
app.get('/load-progress', (req, res) => {
    const progress = loadProgress(); // Load from file
    res.json(progress); // Send the current progress data
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
