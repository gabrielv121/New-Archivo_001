document.getElementById('add-button').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevents the default behavior of the link
    try {
      const handle = await window.showOpenFilePicker(); // Opens the file picker dialog
      const file = await handle[0].getFile(); // Retrieves the selected file
      // Handle the file object, e.g., upload it to your server or perform other operations
      console.log('Selected file:', file);
    } catch (err) {
      console.error('Error selecting file:', err);
    }
  });