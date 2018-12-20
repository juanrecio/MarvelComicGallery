const express = require("express");
const apiRoutes = express.Router();
const myApiHandler = require('../javascripts/myApiHandler')
const myApi = new myApiHandler();

//TODO: cambiar forma de llamar a las apis, no mandar el objeto tal cual,
//cambios en alguna api hay que cambiar el Front!!!

apiRoutes.get("/characters", function (req, res, next) {
  if (req.query.search) {
    req.query.name = new RegExp(req.query.search, "gi");
    delete req.query.search;
  }
  myApi.getCharacters(req.query)
    .then(c => {
      return res.status(200).json(c)
    })
    .catch(err => console.log(err))
});


apiRoutes.get("/characters/:id", function (req, res, next) {
  myApi.getCharacterById(req.params.id, req.query.full)
    .then(c => {
      res.status(200).json(c)
    })
    .catch(err => console.log(err))
});

apiRoutes.get("/comics/:id", function (req, res, next) {
  myApi.getComicById(req.params.id)
    .then(c => {
      res.status(200).json(c)
    })
    .catch(err => console.log(err))
});

apiRoutes.get("/comics", function (req, res, next) {
  myApi.getComics(req.query)
    .then(c => {
      res.status(200).json(c)
    })
    .catch(err => console.log(err))
})


apiRoutes.patch("/comics/:id", function (req, res, next) {
  const operations = {
    "addFav": "addFavToComic",
    "removeFav": "removeFavFromComic"
  }
  const { op, ...object } = req.query;

  object.comicId = req.params.id;
  return myApi[operations[op]](object)
    .then(c => res.status(200).json(c))
    .catch(err => console.log(err))
});

apiRoutes.put("/list", function (req, res, next) {
  const { name, userId } = req.query;
  myApi.createList(name, userId)
    .then(list => res.status(200).json(list))
    .catch(err => console.log(err))
});

apiRoutes.patch("/list/:id", function (req, res, next) {
  const operations = {
    "addFav": "addFavToList",
    "removeFav": "removeFavFromList",
    "addComic": "addComicToList",
    "removeComic": "removeComicFromList"
  }
  const { op, ...object } = req.body;
  object.listId = req.params.id;
  return myApi[operations[op]](object)
    .then(c => res.status(200).json(c))
    .catch(err => console.log(err))
});

apiRoutes.delete("/list/:id", function (req, res, next) {
  return myApi.deleteList(req.params.id)
    .then(c => res.status(200).json(c))
    .catch(err => console.log(err))
})




module.exports = apiRoutes;
