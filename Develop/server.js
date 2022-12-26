const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
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

app.get('/api/notes', (req, res) =>
    res.json(noteData)
);

app.post('/api/notes', (req, res) =>)

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);