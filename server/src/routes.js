const fs = require('fs')

module.exports = (app) => {
    databaseFile = 'C:/Users/Argnos/Desktop/fullstack-project/server/db-pruebas.json'

    // Obtain the transcriptions
    app.get('/transcriptions', (req, res) => {
        fs.readFile(databaseFile, 'utf8', (err, data) => {
            if (err) res.status(500).send({ error: err })
            else res.send(JSON.parse(data))
        })
    })

    // Obtain a specific transcription
    app.get('/transcriptions/:id', (req, res) => {
        const id = parseInt(req.params.id)

        fs.readFile(databaseFile, 'utf8', (err, data) => {
            if (err) res.status(500).send({ error: err })
            else {
                // Obtain the specific object
                const jsonData = JSON.parse(data)
                const transc = jsonData.find(t => t.id === id)

                if (!transc) res.status(404).send({ message: 'Transcripcion no encontrada' })
                else res.send(transc)
            }
        })
    })

    // Add a transcription
    app.post('/transcriptions', (req, res) => {
        fs.readFile(databaseFile, 'utf8', (err, data) => {
            if (err) return res.status(500).send(err)

            else {
                // Obtain max id from json
                const jsonData = JSON.parse(data)
                const maxId = jsonData.reduce((max, t) => Math.max(max, t.id), 0)
                
                // Add the transcription to the json array
                const transcription = { id: maxId + 1, ...req.body }
                jsonData.push(transcription)
                
                // Write on the json
                fs.writeFile(databaseFile, JSON.stringify(jsonData, null, 4), err => {
                    if (err) return res.status(500).send(err)
                    res.status(201).send('Transcripcion creada')
                })
            }
        })
    })

    // Update a transcription
    app.put('/transcriptions/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const body = req.body

        fs.readFile(databaseFile, (err, data) => {
            if (err) res.status(500).send({ message: err})

            else {
                // Search for the transcription with id given
                const jsonData = JSON.parse(data)
                const index = jsonData.findIndex(t => t.id === id)
                
                if (index === -1) res.status(404).send({ message: 'Transcripcion no encontrada' })
                
                // Add the updated info to the json
                else {
                    jsonData[index] = { ...jsonData[index], ...body }
                    fs.writeFile(databaseFile, JSON.stringify(jsonData, null, 4), (err) => {
                        if (err) res.status(500).send({ msg: err })
                        res.status(200).send({ message: 'Transcripcion modificada' })
                    })
                }
            }
        })
    })

    // Delete a transcription
    app.delete('/transcriptions/:id', (req, res) => {
        const id = parseInt(req.params.id)

        fs.readFile(databaseFile, (err, data) => {
            if (err) res.status(500).send({ message: err})

            else {
                // Search for the transcription with id given
                const jsonData = JSON.parse(data)
                const index = jsonData.findIndex(t => t.id === id)
                
                if (index === -1) res.status(404).send({ message: 'Transcripcion no encontrada' })
                
                // Add the updated info to the json
                else {
                    jsonData.splice(index, 1)
                    fs.writeFile(databaseFile, JSON.stringify(jsonData, null, 4), (err) => {
                        if (err) res.status(500).send({ msg: err })
                        res.status(200).send({ message: 'Transcripcion eliminada' })
                    })
                }
            }
        })
    })
}
