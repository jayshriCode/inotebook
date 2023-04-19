const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../models/User');

//ROUTE 1: Get all the notes using GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: add a new note using POST "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [body('title', 'Enter a valid title').isLength({ min: 3 }),
body('description', 'Enter a valid description').isLength({ min: 5 })], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // If there are errors then return bad request & errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({ title, description, tag, user: req.user.id });
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

//ROUTE 3: update a note using PUT "/api/notes/updatenote/:id" login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated & update it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //check if authorised user is updating the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        //update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

//ROUTE 4: delete a note using DELETE "/api/notes/deletenote/:id" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //find the note to be delete & delete it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //check if authorised user is deleting the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        //update the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"succuss":"note has been deleted", note:note});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

module.exports = router;