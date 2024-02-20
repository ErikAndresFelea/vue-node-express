const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const AWS = require('aws-sdk')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())

// Access AWS
const dynamodb = new AWS.DynamoDB({
    region: 'eu-central-1',
    endpoint: 'https://dynamodb.eu-central-1.amazonaws.com',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const name = 'semanticbots-db'
dynamodb.describeTable({ TableName: name }, (err, data) => {
    if (err) createTable(name)
    else if (data.Table.TableStatus === 'ACTIVE') console.log('Tabla existe')
})

// DynamoDb table
function createTable(tName) {
    const params = {
        TableName: tName,
        KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' },
            { AttributeName: 'version', KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
            { AttributeName: 'version', AttributeType: 'N' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 15,
            WriteCapacityUnits: 2
        }
    }

    dynamodb.createTable(params, (err, data) => {
        if (err) console.log('Tabla no creada: ', err.message)
        else {
            console.log('Tabla creada')
        }
    })
}

// Routes
require('./src/routes')(app)

// Set server
app.set('port', process.env.PORT || 8081);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})
