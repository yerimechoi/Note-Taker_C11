const express = require('express');
const path = require('path');
const fs = require('fs');

const uuid = require('./helpers/uuid');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use (express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.json(data);
    })
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
          title,
          text,
          id: uuid(),
        };

        fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            let parseData = JSON.parse(data);
            console.log(parseData)
            parseData.push(newNote);
                fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(parseData), (err,data) => {
                if (err) {
                console.log(err);
                }
                console.log(data);
            });
        })

        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(201).json(response);
        console.log(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

//delete
// similar to post
// get the note by id provided in req.params
// filter out notes without that id and update json file with filtered notes
// .filter RESEARCH!!!

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);