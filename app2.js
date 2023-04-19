document.getElementById('add-button').addEventListener('click', () => {
    // Trigger click event on hidden file input element
    document.getElementById('fileInput').click();
  });
  
    const fileInput = document.getElementsByName('file')[0];
    const file = fileInput.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
      document.getElementById('response').textContent = `File URL: ${data.fileUrl}`;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  