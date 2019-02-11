
// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Character = require("../models/Character");
const marv = require("../javascripts/marvelApiHandler");
const marvelApi = new marv();



mongoose
  .connect('mongodb://localhost/server', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let characters = [];
marvelApi.getAllCharactersPromises()
  .then(promises => {
    Promise.all(promises)
      .then(valuesSet => {
        valuesSet.forEach(values => {
           values.forEach(value => {
            characters.push({ extId: value.id, name: value.name, img: value.thumbnail })
          })
        });
      })
      .then(() => {
        Character.deleteMany()
          .then(() => {
            return Character.create(characters)
          })
          .then(charactersCreated => {
            console.log(`${charactersCreated.length} characters created`);
          })
          .then(() => {
            // Close properly the connection to Mongoose
            mongoose.disconnect()
          })
          .catch(err => {
            mongoose.disconnect()
            throw err
          })
      }
      )
      .catch(reason => {
        console.log(reason)
      });

  })