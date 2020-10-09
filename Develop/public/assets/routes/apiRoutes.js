const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const db = require("../../../db/db.json")

function dbFunc() {
    return JSON.parse(fs.readFileSync("./db/db.json"))
}

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        const db = require("../../../db/db.json")
        res.send(dbFunc())
    });

    app.post("/api/notes", function(req, res) {
        const db = require("../../../db/db.json")

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
                res.send(dbFunc());
                console.log("New note created.")
            })
        })
    });

    app.delete("/api/notes/:id", function(req, res) {
        const db = require("../../../db/db.json")
        let notedID = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            
            const allNotes = JSON.parse(data)
            const newAllNotes = allNotes.filter(note => note.id != notedID);

            fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
                if (err) throw err;
                res.send(dbFunc());
                console.log("Note has been deleted.")
            })
        })
    })
}