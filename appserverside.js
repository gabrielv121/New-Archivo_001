const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import cors middleware
const app = express();

app.use(cors()); // Enable cors for all routes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the destination folder for storing uploaded files
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Set the filename of the uploaded file
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage });
  
  app.post('/upload', upload.single('file'), (req, res) => {
    // File is uploaded and stored at req.file
    // Generate file URL based on server's domain and file's location on the server
    const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
    
    // Send the file URL as a respons
    res.json({ fileUrl });
  });
  
  const port = 3000; // or any other port of your choice
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
