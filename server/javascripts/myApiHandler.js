
const Character = require('../models/Character')

const Comic = require('../models/Comic')
const List = require('../models/List')

const marv = require("../javascripts/marvelApiHandler");
const marvelApi = new marv();


class myApiHandler {

  getCharacterById(extId, full) {
    return Character.findOne({ extId: extId })
      .then(inChar => {
        if (full != "true") {
          return inChar
        }

        else {
          return marvelApi.getCharacterById(extId)
            .then(extChar => {
              extChar = extChar.data.results[0];
              return ({ name: inChar.name, extId: inChar.extId, favs: inChar.favs, img: inChar.img, description: extChar.description, comics: extChar.comics, series: extChar.series, events: extChar.events })
            })
        }
      })
  }


  getCharacters({ sortBy = "", limit = Number.MAX_SAFE_INTEGER, ...searchObject }) {
    //TODO: Check sort
    return Character.find(searchObject).limit(parseInt(limit))
      .then(chars => {
        if (sortBy === "favs") {
          chars = Array.from(chars).sort((a, b) => {
            return a.favs.length > b.favs.length;
          })
        }
        return (chars);
      }
      )
  }

  getComicById(extId) {
    //TODO: comprobar si hace alguna llamada para la que solo requiera los favs
    //entonces separar para no llamar siempre a la API externa
    return Comic.findOne({ extId: extId })
      .then(inComic => {
        return marvelApi.getComicById(extId)
          .then(extComic => {
            extComic = extComic.data.results[0];
            if (!inComic) extComic.favs = [];
            else extComic.favs = inComic.favs;
            return extComic;
          })
      })
      .catch(err => err)
  }

  // getComics({ sortBy = "", limit = Number.MAX_SAFE_INTEGER, ...searchObject }) {
  getComics(comicsSelector) {
    return marvelApi.getComics(comicsSelector)
      .then(c => c.data.results)
      .catch(err => console.log(err))
  }

  getComicFavsById(extId) {
    return Comic.find({ favs: { "$in": [extId] } })
      .then(c => c.data)
      .catch(err => console.log(err));
  }

  createList(name, userId) {
    return List.add(name, userId)
      .then(c => c)
      .catch(err => console.log(err))
  }



  addFavToComic({ comicId, userId }) {
    return Comic.findOne({ extId: comicId })
      .then(comic => {
        if(comic){
        if (!comic.favs.includes(userId)) {
          comic.favs.push(userId);
          return Comic.findOneAndUpdate({ extId: comicId }, comic)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return comic}
        else {
            return Comic.add(comicId,userId)
        }
        
      })
  }

  removeFavFromComic({ comicId, userId }) {
    return Comic.findOne({ extId: comicId })
      .then(comic => {
        let index = comic.favs.indexOf(userId);
        if (index > -1) {
          comic.favs.splice(index, 1);
          return Comic.findOneAndUpdate({ extId: comicId }, comic)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return comic
      })
  }

  //TODO: refactorizar para usar la misma función?? addFav,removeFav,addComic,removeComic
  addFavToList({ listId, userId }) {
    return List.findById(listId)
      .then(list => {
        if (!list.favs.includes(userId)) {
          list.favs.push(userId);
          return List.findByIdAndUpdate(listId, list)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return list
      })
  }
  removeFavFromList({ listId, userId }) {
    return List.findById(listId)
      .then(list => {
        let index = list.favs.indexOf(userId);
        if (index > -1) {
          list.favs.splice(index, 1);
          return List.findByIdAndUpdate(listId, list)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return list
      })
  }

  addComicToList({ listId, comicId }) {
    return List.findById(listId)
      .then(list => {
        if (!list.comics.includes(comicId)) {
          list.favs.push(comicId);
          return List.findByIdAndUpdate(listId, list)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return list
      })
  }

  removeComicFromList({ listId, comicId }) {
    return List.findById(listId)
      .then(list => {
        let index = list.favs.indexOf(comicId);
        if (index > -1) {
          list.favs.splice(index, 1);
          return List.findByIdAndUpdate(listId, list)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return list
      })
  }

  deleteList(listId) {
    return List.findByIdAndDelete(listId)
      .then(c => c)
      .catch(err => console.log(err))
  }


}

module.exports = myApiHandler;

