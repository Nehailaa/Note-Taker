const util = require('util');
const fs = require('fs');
const uuid = require('uuid/v1');
const { parse } = require('path');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    read() {
        return readFileAsync('db/db.json', 'utf-8')
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read().then(notes => {
            let determinedNotes;
            try {
                determinedNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                determinedNotes = []
            }

            return determinedNotes;
        })
    }

    addNote(note) {
        const { title, text } = note;
        if(!title || !text) {
            throw new Error('Tile and text are required for the note!');
        };

        const newNote = { title, text, id: uuid() };
        
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    };


    removeNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes));
    };
};

module.exports = new DB();