const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/scrape', (req, res) => {
    const url = req.body.url;
    axios.get(url)
    .then((response) => {
        const $ = cheerio.load(response.data);
        const images = [];
        $('img').each((index, element) => {
            const src = $(element).attr('src');
            if (src && src.startsWith('http')) {
                images.push(src);
            }
        });
        res.json(images);
    })
    .catch((error) => console.error(error));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
