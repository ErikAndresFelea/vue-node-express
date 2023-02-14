const uuid = require('uuid')
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

    // DELETE one transcription
    app.delete('/transcriptions/:id/:version', (req, res) => {
        const id = req.params.id
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
