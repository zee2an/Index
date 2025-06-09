const urlInput = document.getElementById('url-input');
const scrapeButton = document.getElementById('scrape-button');
const imageContainer = document.getElementById('image-container');

scrapeButton.addEventListener('click', () => {
    const url = urlInput.value;
    fetch('http:                           
        method: '//localhost:3000/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url }),
    })
    .then((response) => response.json())
    .then((images) => {
        imageContainer.innerHTML = '';
        images.forEach((image) => {
            const img = document.createElement('img');
            img.src = image;
            img.classList.add('image');
            imageContainer.appendChild(img);
        });
    })
    .catch((error) => console.error(error));
});
