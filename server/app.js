const express = require('express');
const multer = require('multer'); // For handling file uploads
const path = require('path');

const app = express();

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle file upload logic here
  // You can access the uploaded file using req.file
  // and return the appropriate response with file information
  const file = req.file;
  const fileUrl = `/uploads/${file.filename}`; // Assuming files are served from /public/uploads folder
  const fileObject = {
    name: file.originalname,
    type: file.mimetype,
    url: fileUrl
  };
  res.json({ files: [fileObject] }); // Return file information as JSON response
});

// Start the server
const port = 5000; // You can use any preferred port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
