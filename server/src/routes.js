const uuid = require('uuid')
const AWS = require('aws-sdk')
const fs = require('fs')

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
    app.get('/transcriptions/:id/:version', (req, res) => {
        const id = req.params.id
        const version = parseInt(req.params.version)

        const params = {
            TableName: tableName,
            Key: {
                'id': id,
                'version': version
            }
        }
        
        dynamodb.get(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.json(result.Item)
        })
    })

    // POST a transcription
    app.post('/transcriptions', (req, res) => {
        const id = uuid.v4()
        const params = {
            TableName: tableName,
            Item: {
                "id": id,
                "version": req.body.version,
                "latest": req.body.latest,
                "block": req.body.block,
                "unit": req.body.unit,
                "title": req.body.title,
                "text": req.body.text
            }
        }
    
        dynamodb.put(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.status(200).send(params.Item)
        })
    })

    /* Poblar la base de datos
    app.post('/transcriptions/all', (req, res) => {
        fs.readFile('output.json', (err, data) => {
            if (err) throw err
            const obj = JSON.parse(data)
            
            for (let i = 0; i < obj.length; i++) {
                const params = {
                    TableName: tableName,
                    Item: obj[i]
                }

                dynamodb.put(params, (error, result) => {
                    if (error) res.status(500).json({ error })
                    else console.log({ message: 'All good' })
                })
            }
          })
        res.status(200).send({ message: 'All good' })
    }) */

    // PUT a transcription
    app.put('/transcriptions/:id/:version', (req, res) => {
        const id = req.params.id
        const version = parseInt(req.params.version)

        const params = {
            TableName: tableName,
            Item: {
                "id": id,
                "version": version,
                "latest": req.body.latest,
                "block": req.body.block,
                "unit": req.body.unit,
                "title": req.body.title,
                "text": req.body.text
            }
        }

        dynamodb.put(params, (error, result) => {
            if (error) res.status(500).json({ error })
            else res.status(200).send(params.Item)
        })
    })

    // DELETE transcriptions from given version
    app.delete('/transcriptions/:id/:version', (req, res) => {
        const id = req.params.id
        const start = parseInt(req.params.version)

        const paramsQuerry = {
            TableName: tableName,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: { ':id': id }
        }

        dynamodb.query(paramsQuerry, function(error, result) {
            if (error) res.status(500).json({ error })
            else {
                const data = result.Items
                for (let i = start; i < data.length; i++) {
                    const paramsDelete = {
                        TableName: tableName,
                        Key: {
                            'id': data[i].id,
                            'version': data[i].version
                        },
                    }
        
                    dynamodb.delete(paramsDelete, (error, result) => {
                        if (error) res.status(500).json({ error })
                    })
                }
            }
        })

        res.status(200).send({ message: 'Transcripciones borradas' })
    })
    
    // DELETE all transcriptions with same id
    app.delete('/transcriptions/:id', (req, res) => {
        const id = req.params.id

        const paramsQuerry = {
            TableName: tableName,
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: { ':id': id }
        }

        dynamodb.query(paramsQuerry, function(error, result) {
            if (error) res.status(500).json({ error })
            else {
                const data = result.Items
                for (let i = 0; i < data.length; i++) {
                    const paramsDelete = {
                        TableName: tableName,
                        Key: {
                            'id': data[i].id,
                            'version': data[i].version
                        },
                    }
        
                    dynamodb.delete(paramsDelete, (error, result) => {
                        if (error) res.status(500).json({ error })
                    })
                }
            }
        })

        res.status(200).send({ message: 'Transcripciones borradas' })
    })
}
