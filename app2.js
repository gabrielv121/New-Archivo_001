document.getElementById('add-button').addEventListener('click', () => {
  // Trigger click event on hidden file input element
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', async (event) => {
  const fileInput = event.target;
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      if (data.fileUrl) {
        document.getElementById('response').textContent = `File URL: ${data.fileUrl}`;
      } else {
        throw new Error('File URL not found in response');
      }
    } else {
      throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
});
