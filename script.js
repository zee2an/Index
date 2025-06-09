const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.post('/scrape', (req, res) => {
    const url = req.body.url;
    axios.get(url)
    .then((response) => {
        const $ = cheerio.load(response.data);
        const images = [];
        $('img').each((index, element) => {
            const src = $(element).attr('src');
            if (src) {
                images.push(src);
            }
        });
        res.json(images);
    })
    .catch((error) => console.error(error));
});
