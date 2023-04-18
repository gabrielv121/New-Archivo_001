// Frontend code to handle file upload
const axios = require('axios'); // Import Axios library

const fileInput = document.getElementById('file-input'); // Get the file input element
const addBtn = document.getElementById('add-button'); // Get the add button element

addBtn.addEventListener('click', () => {
  // Add click event listener to the add button

  const file = fileInput.files[0]; // Get the selected file from the file input

  // Create FormData object to send the file as multipart/form-data
  const formData = new FormData();
  formData.append('file', file);

  // Make POST request to the /upload endpoint with the FormData
  axios.post('/upload', formData)
    .then(response => {
      console.log('File uploaded successfully:', response.data);
      // Handle successful file upload, e.g., show success message, update UI, etc.
    })
    .catch(error => {
      console.error('File upload failed:', error);
      // Handle file upload error, e.g., show error message, update UI, etc.
    });
});
