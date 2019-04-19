'use strict'
const Bluebird = require('bluebird')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = 'mongodb://localhost:27017/todo'

Bluebird.promisifyAll(MongoClient)

module.exports.up = next => {
  let mClient = null
  return MongoClient.connect(url)
  .then(client => {
    mClient = client
    return client.db();
  })
  .then(db => {
    const Todo = db.collection('tasks')
    Todo.insert([
      {content: "test1", isChecked: false},
      {content: "test2", isChecked: true},
      {content: "test3", isChecked: false},
      {content: "test4", isChecked: true},
      {content: "test5", isChecked: false},
      {content: "test6", isChecked: true},
    ])
  })
  .then(() => {
    mClient.close()
    return next()
  })
   .catch(err => next(err))
}

module.exports.down = next => {
let mClient = null
return MongoClient
   .connect(url)  
   .then(client => {
    mClient = client
    return client.db()
  })
  .then(db =>
    db.collection('tasks').remove({}))
  .then(() => {
    mClient.close()
    return next()
  })
  .catch(err => next(err))

}