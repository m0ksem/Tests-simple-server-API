var mongodb = require('mongodb')
var express = require('express')
var bodyParser = require('body-parser')
var config = require('./config')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var MongoClient = mongodb.MongoClient

var url = config.mongodbServerURL

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log('Unable to connect to mongoDB server')
    }
    else {
        app.post('/register', (request, response, next) => {
            let login =  request.body.login
            let password =  request.body.password

            let db = client.db(config.mongodbDatabaseName)

            db.collection('users').find({'username': login}).count(function (err, number) {
                if (number != 0) {
                    response.json(0)
                    console.log('User already exist [' + login + ']')
                } else {
                    db.collection('users').insertOne({'username': login, 'password': password}, function (error, res) {
                        response.json(1)
                        console.log('Registration new user [' + login + ']')                
                    })
                }
            })
        })

        app.post('/login',  (request, response, next) => {
            let login = request.body.login
            let password = request.body.password
            
            let db = client.db(config.mongodbDatabaseName)

            db.collection('users').find({'username': login}).count(function (err, number) {
                if (number == 0) {
                    response.json(0)
                    console.log('User not found [' + login + ', ' + password + ']')
                } else {
                    db.collection('users').findOne({username: login}, function (error, user) {
                        if (user.password == password) {
                            response.json(1)
                            console.log('User logined + [' + login + ']') 
                        } else {
                            response.json(2)
                            console.log('Some one trying to login (' + login + ') with wrong password (' + password + ')')
                        }   
                    })
                }
            })
        })

        app.post('/database/tests/add', (request, response, next) => {
            let body = request.body

            let db = client.db(config.mongodbDatabaseName)
            
            db.collection('tests').insertOne(body, function (error, res) {
                response.jsonp({"response": 1})               
            })
 
            console.log("Test added by " + body.author + ' "' + body.name +  '"')
        })

        app.get('/database/tests/getAll', (request, response, next) => {
            console.log("Tests request")

            let db = client.db(config.mongodbDatabaseName)

            db.collection('tests').find().toArray().then(items => {
                response.jsonp(items)
            })
        })


        app.post('/database/tests/edit', (request, response, next) => {
            let body = request.body

            let db = client.db(config.mongodbDatabaseName)
            
            db.collection('tests').replaceOne({ "_id":  mongodb.ObjectId(body.id) }, body)

            console.log('Test edited [' + body.id + ']')
        })

        app.post('/database/tests/delete', (request, response, next) => {
            let body = request.body

            let db = client.db(config.mongodbDatabaseName)
            
            db.collection('tests').deleteOne({ "id": mongodb.ObjectId(body.id)}).then(v => {
                response.json(v)
            })

            console.log('Deleted test [' + body.id + ']')
        })

        app.listen(3000, (a) => {
            console.log('Server runing port 3000')
        })
    }
})