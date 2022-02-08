// Modules
const router = require('express').Router();
const db = require('../db/db.json');

// Recouping Notes
router.get('notes', (req, res) => {
    res.status(200).json(JSON.parse(db.getNotes()));
});

// Creating Notes 
router.post('/notes', (req, res) => {
    db
        .addNote(req.body)
        .then(note => res.json(note))
        .catch(err => res.status(400).json(err))
});

// Deleteing Notes 
router.delete('/notes/:id', (req, res) => {
    db
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(400).json(err))
});

// Exporting
module.exports = router;