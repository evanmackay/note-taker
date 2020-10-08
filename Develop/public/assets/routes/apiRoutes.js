const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const db = require("../../../db/db.json")

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.send(db)
    });

    app.post("/api/notes", function(req, res) {
        
        let noteID = uuidv4()
        let newNote = {
            id: noteID,
            title: req.body.title,
            text: req.body.text
        };

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const allNotes = JSON.parse(data)

            allNotes.push(newNote)

            fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("New note created.")
            })
        })
    });

    app.delete("/api/notes/:id", function(req, res) {
        let notedID = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            
            const allNotes = JSON.parse(data)
            const newAllNotes = allNotes.filter(note => note.id != notedID);

            fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("Note has been deleted.")
            })
        })
    })
}