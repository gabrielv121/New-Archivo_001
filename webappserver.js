const axios = require('axios'); // Import Axios library

const fileInput = document.getElementById('file-input'); // Get the file input element
const addBtn = document.getElementById('add-button'); // Get the add button element
const fileContainer = document.getElementById('file-container'); // Get the file container element
const previewImg = document.getElementById('preview-img'); // Get the img element for preview

// Add change event listener to the file input for image preview
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]; // Get the selected file from the file input

  // Create a FileReader object to read the file
  const reader = new FileReader();

  // Set onload event listener to the FileReader to handle successful file read
  reader.onload = (e) => {
    // Set the src attribute of the img element to the data URL of the read file
    previewImg.src = e.target.result;
  };

  // Read the file as Data URL
  reader.readAsDataURL(file);
});

addBtn.addEventListener('click', () => {
  // Add click event listener to the add button

  const file = fileInput.files[0]; // Get the selected file from the file input

  // Create FormData object to send the file as multipart/form-data
  const formData = new FormData();
  formData.append('file', file);

  // Make POST request to the /upload endpoint with the FormData
  axios.post('./upload', formData)
    .then(response => {
      console.log('File uploaded successfully:', response.data);
      // Handle successful file upload, e.g., show success message, update UI, etc.

      // Assuming the server response contains the URL or path of the uploaded file(s)
      // For simplicity, let's assume the response is an array of file objects with 'url' property
      const filesArray = response.data.files; // Update the filesArray with server response

      // Clear the container element
      fileContainer.innerHTML = '';

      // Loop through the array of file objects
      for (const file of filesArray) {
        // Create a new element based on the file type
        let fileElement;
        if (file.type.startsWith('image/')) {
          // If the file is an image, create an <img> element
          fileElement = document.createElement('img');
          fileElement.src = file.url;
          fileElement.alt = file.name;
        } else if (file.type.startsWith('audio/')) {
          // If the file is an audio file, create an <audio> element
          fileElement = document.createElement('audio');
          fileElement.src = file.url;
          fileElement.controls = true;
        } else if (file.type.startsWith('video/')) {
          // If the file is a video file, create a <video> element
          fileElement = document.createElement('video');
          fileElement.src = file.url;
          fileElement.controls = true;
        } else {
          // For other file types, create a download link
          fileElement = document.createElement('a');
          fileElement.href = file.url;
          fileElement.download = file.name;
          fileElement.textContent = 'Download ' + file.name;
        }

        // Append the file element to the file container
        fileContainer.appendChild(fileElement);
      }
    })
    .catch(error => {
      console.error('File upload failed:', error);
      // Handle file upload error, e.g., show error message, update UI, etc.
    });
});
