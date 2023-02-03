const fs = require('fs')

module.exports = (app) => {
    dbPath = 'C:/Users/remoA/Desktop/VSC Proyects/fullstack-project/server/db-pruebas.json'

    // Obtain the transcriptions
    app.get('/transcriptions', (req, res) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) res.status(500).send({ error: err })
            else res.send(JSON.parse(data))
        })
    })

    // Add a transcription
    app.post('/transcriptions', (req, res) => {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) return res.status(500).send(err)

            // Obtain max id from json
            const jsonData = JSON.parse(data)
            const maxId = jsonData.reduce((max, t) => Math.max(max, t.id), 0)

            // Add the transcription to the json array
            const transcription = { id: maxId + 1, ...req.body }
            jsonData.push(transcription)

            // Write on the json
            fs.writeFile(dbPath, JSON.stringify(jsonData), err => {
                if (err) return res.status(500).send(err)
                res.status(201).send('Transcripcion creada')
            })
        })
    })

    // Update a transcription
    app.put('/transcriptions/:id', (req, res) => {
        res.json({ msg: `Updated the transcription with id ${req.params.id}` })
    })

    // Delete a transcription
    app.delete('/transcriptions/:id', (req, res) => {
        const id = req.params.id

        fs.readFile(dbFile, (err, data) => {
            if (err) req.status(500).send({ message: err })

            // Search for the transcription with id given
            const jsonData = JSON.parse(data)
            const index = jsonData.findIndex(i => i.id === id)

            if (index === -1) res.status(404).send({ message: 'Transcripcion no encontrada' })

            // Add the updated info to the json
            jsonData.splice(index, 1)
            fs.writeFile(dbFile, JSON.stringify(jsonData), (err) => {
                if (err) res.status(500).send({ msg: err })
                res.status(200).send({ message: 'Transcripcion eliminada' })
            })
        })
    })

    // Prueba
    app.get('/db-pruebas', (req, res) => {
        res.sendFile(dbPath)
    })
}
