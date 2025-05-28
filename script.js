// Get the button element
const createFolderBtn = document.getElementById('create-folder-btn');

// Add an event listener to the button
createFolderBtn.addEventListener('click', async () => {
    // Check if the File System Access API is supported
    if ('showDirectoryPicker' in window) {
        try {
            // Show directory picker
            const directoryHandle = await window.showDirectoryPicker();
            
            // Create a new folder
            const folderHandle = await directoryHandle.getDirectoryHandle('myFolder', { create: true });
            
            // Create a new file in the folder
            const fileHandle = await folderHandle.getFileHandle('example.txt', { create: true });
            
            // Get a writable stream for the file
            const writable = await fileHandle.createWritable();
            
            // Write data to the file
            await writable.write('Hello, World!');
            
            // Close the writable stream
            await writable.close();
            
            console.log('Folder and file created successfully!');
        } catch (error) {
            console.error('Error creating folder or file:', error);
        }
    } else {
        console.log('File System Access API is not supported in this browser.');
    }
});