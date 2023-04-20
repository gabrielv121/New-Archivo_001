// Trigger click event on hidden file input element or any other way to open file picker dialog
document.getElementById('add-button').addEventListener('click', () => {
  // Trigger file picker dialog
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
});

// Handle file selection event
document.addEventListener('change', async (event) => {
  const fileInput = event.target;
  if (fileInput && fileInput.type === 'file') {
    const file = fileInput.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
        });
        // Process the response
        const data = await response.json();
        document.getElementById('response').textContent = `File URL: ${data.fileUrl}`;
      } catch (error) {
        // Handle any errors
        console.error('Error uploading file:', error);
      }
    }
  }
});
