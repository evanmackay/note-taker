let noteData = require("../data/noteData")


module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(noteData)
    });

    app.post("/api/notes", function(req, res) {
        noteData.push(req.body);
        return noteData
    });

    app.delete("/api/notes/:id", function(req, res) {
        
    })
}