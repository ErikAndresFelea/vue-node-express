module.exports = (app) => {
    // Obtain the transcriptions
    app.get('/home', (req, res) => {
        res.json({ msg: `All transcriptions here` })
    }),

    // Add a transcription
    app.get('/add', (req, res) => {
        res.json({ msg: `Add a new transcription` })
    }),
    
    // Update a transcription
    app.get('/update/:id', (req, res) => {
        res.json({ msg: `Updated the transcription with id ${req.params.id}` })
    }),

    // Delete a transcription
    app.get('/delete/:id', (req, res) => {
        res.json({msg: `Deleted the transcription with id ${req.params.id}`})
    })
}
