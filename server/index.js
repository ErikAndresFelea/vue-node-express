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
    else if(data.Table.TableStatus === 'ACTIVE') console.log('Tabla existe')
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
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
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

/*
// Amazon S3 conection
const s3 = new AWS.S3({
    region: 'eu-central-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const bucketName = 'semanticbots-database'
s3.headBucket({ Bucket: bucketName }, (err) => {
    if (err === null) console.log('Bucket already exists')
    else if (err.statusCode === 404) {
        const bucektParams = {
            Bucket: bucketName,
            CreateBucketConfiguration: {
                LocationConstraint: "eu-central-1"
            }
        }

        s3.createBucket(bucektParams, (err) => {
            if (err) console.log(err, '\nError creating the bucket')
            else console.log('Bucket created')
        })
        
        s3.waitFor('bucketExists', { Bucket: bucketName }, (err) => {
            if (err) console.log(err, '\nError during waitFor(bucketExists)')
            else {
                // const publicAccess = {
                //     Bucket: bucketName,
                //     PublicAccessBlockConfiguration: {
                //         BlockPublicAcls: true,
                //         BlockPublicPolicy: true,
                //         IgnorePublicAcls: true,
                //         RestrictPublicBuckets: true
                //     }
                // }
                // 
                // s3.putPublicAccessBlock(publicAccess, (err) => {
                //     if (err) console.log(err, '\nError giving public permisions')
                //     else console.log('Public permissions set')
                // })
                // Does not work together with putBucketVersioning(). Work latter on this
    
                const versionControl = {
                    Bucket: bucketName,
                    VersioningConfiguration: {
                        Status: 'Enabled'
                    }
                }
                
                s3.putBucketVersioning(versionControl, (err) => {
                    if (err) console.log(err, '\nError setting version control')
                    else console.log('Version control enabled')
                })
            }
        }) // s3.waitFor
    } // s3.heabucket error = 404
    else console.log('Dont have permission')
})
*/

// Set server
app.set('port', process.env.PORT || 8081);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})