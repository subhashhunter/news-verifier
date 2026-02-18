const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

// Middleware
app.use(cors()); // Allows the extension to communicate with this server
app.use(express.json()); // Parses incoming JSON data

// The "Verify" Route for your extension
app.post('/verify', (req, res) => {
    console.log("--- New Package Received from Extension ---");
    
    // Updated to match the 'category' and 'payload' keys sent by your extension
    console.log("Category:", req.body.category); 
    console.log("Payload:", req.body.payload);
    console.log("Timestamp:", req.body.timestamp);

    // Mock response for testing until real logic is integrated
    res.json({
        label: "Authentic (Mocked)",
        confidence: 0.95
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});