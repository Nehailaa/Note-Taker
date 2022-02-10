// Modules
const router = require('express').Router();
let db = require('../db/db.js');
const fs = require("fs");

// Getting Notes
router.get('/notes', (req, res) => {
    console.log("TRY");
    // res.status(200).json(JSON.parse(db.getNotes()));
    db.getNotes()
    .then(notes => res.status(200).json(notes))
    .catch(err => res.json(err))
});

// Posting Notes 
router.post('/notes', (req, res) => {
    db
        .addNote(req.body)
        .then(note => res.json(note))
        .catch(err => res.status(400).json(err))
});

// // Saving Notes
// router.put('/notes', (req, res) => {
//     db.saveNotes(JSON.stringify(notes));
// })

// Deleteing Notes 
router.delete('/notes/:id', (req, res) => {
    db
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(400).json(err))
});

// Exporting
module.exports = router;