const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
const morgan = require('morgan')
const AWS = require('aws-sdk')

const app = express()
app.use(morgan('combined'))
// app.use(bodyParser.json())
// app.use(cors())

// Routes
require('./src/routes')(app)

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

app.set('port', process.env.PORT || 8081);
app.use(morgan('dev'));
app.use(express.json());

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})