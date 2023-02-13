const fs = require('fs')
const AWS = require('aws-sdk')

module.exports = (app) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ 
        region: 'eu-central-1',
        endpoint: 'https://dynamodb.eu-central-1.amazonaws.com',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    const tableName = 'semanticbots-db'

    // GET all transcriptions
    app.get('/transcriptions', (req, res) => {
        dynamodb.scan({ TableName: tableName }, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.json(result.Items)
        })
    })

    // GET a specific transcription
    app.get('/transcriptions/:id', (req, res) => {
        const id = parseInt(req.params.id)

        const params = {
            TableName: tableName,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id
            }
        }
        dynamodb.query(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.json(result.Items)
        })
    })

    // POST a transcription
    app.post('/transcriptions', (req, res) => {
        const params = {
            TableName: tableName,
            Item: {
                "id": req.body.id,
                "version": req.body.version,
                "block": req.body.block,
                "unit": req.body.unit,
                "title": req.body.title,
                "text": req.body.text
            }
        }
    
        dynamodb.put(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.status(200).send({ message: 'Transcripcion añadida' })
        })
    })

    // PUT a transcription
    app.put('/transcriptions/:id/:version', (req, res) => {
        const id = parseInt(req.params.id)
        const version = parseInt(req.params.version)

        const params = {
            TableName: tableName,
            Item: {
                "id": id,
                "version": version,
                "block": req.body.block,
                "unit": req.body.unit,
                "title": req.body.title,
                "text": req.body.text
            }
        }

        dynamodb.put(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.status(200).send({ message: 'Transcripcion modificada' })
        })
       /*
        const id = parseInt(req.params.id)
        const version = parseInt(req.params.version)
        const block = req.body.block
        const unit = req.body.unit
        const title = req.body.title
        const text = req.body.text

        const params = {
            TableName: tableName,
            Key: {
                'id': {N: id},
                'version': {N: version}
            },
            UpdateExpression: 'Set #block = :block, #unit = :unit, title = :title, #text = :text',
            ExpressionAttributeNames: { 
                '#block': 'block',
                '#unit': 'unit',
                '#text': 'text'
             },
            ExpressionAttributeValues: {
                ':block': {S: block},
                ':unit': {S: unit},
                ':title': {S: title},
                ':text': {S: text},
            }
        }

        dynamodb.update(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.status(200).send({ message: 'Transcripcion modificada' })
        })
        */
    })

    // DELETE a transcription
    app.delete('/transcriptions/:id/:version', (req, res) => {
        const id = parseInt(req.params.id)
        const version = parseInt(req.params.version)

        const params = {
            TableName: tableName,
            Key: {
                'id': id,
                'version': version
            },
        }

        dynamodb.delete(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.status(200).send({ message: 'Transcripcion borrada' })
        })
        /*
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
        */
    })
}
