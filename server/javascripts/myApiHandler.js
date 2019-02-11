
const Character = require('../models/Character');

const Comic = require('../models/Comic');
const List = require('../models/List');
const User = require('../models/User');


const Marv = require('../javascripts/marvelApiHandler');


class myApiHandler {
  constructor() {
    this.marvelApi = new Marv();
  }

  getCharacterById(extId, full) {
    return Character.findOne({ extId })
      .then((inChar) => {
        if (full !== 'true') {
          return inChar;
        }
        return this.marvelApi.getCharacterById(extId)
          .then((extChar) => {
            [extChar, ...rest] = extChar.data.results;
            return ({
              name: inChar.name, extId: inChar.extId, favs: inChar.favs, img: inChar.img, description: extChar.description, comics: extChar.comics, series: extChar.series, events: extChar.events,
            });
          });
      });
  }


  getCharacters({ sortBy = "name", order = 1, limit = Number.MAX_SAFE_INTEGER, ...searchObject }) {
    return Character.find(searchObject)
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .then(chars => chars
      )
  }

  getComicById(extId) {
    //TODO: comprobar si hace alguna llamada para la que solo requiera los favs
    //entonces separar para no llamar siempre a la API externa
    return Comic.findOne({ extId: extId })
      .then(inComic => {
        return this.marvelApi.getComicById(extId)
          .then(extComic => {
            extComic = extComic.data.results[0];
            if (!inComic) extComic.favs = [];
            else extComic.favs = inComic.favs;
            return extComic;
          })
      })
      .catch(err => err)
  }

  getComics(comicsSelector) {
    return this.marvelApi.getComics(comicsSelector)
      .then(c => c.data.results)
      .catch(err => console.log(err))
  }

  getComicFavsById(extId) {
    return Comic.find({ favs: { "$in": [extId] } })
      .then(c => c.data)
      .catch(err => console.log(err));
  }

  createList(listObject) {
    return List.add(listObject)
      .then(c => c)
      .catch(err => console.log(err))
  }

  addFavToCharacter({ characterId, userId }) {
    return Character.findById(characterId)
      .then(char => {
        userId += "";
        if (!char.favs.includes(userId)) {
          char.favs.push(userId);
          char.nFavs++;
          return Character.findByIdAndUpdate(characterId, char)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return char
      }
      )
  }

  removeFavFromCharacter({ characterId, userId }) {
    return Character.findById(characterId)
      .then(char => {
        let index = char.favs.indexOf(userId);
        if (index > -1) {
          char.favs.splice(index, 1);
          char.nFavs--;
          return Character.findByIdAndUpdate(characterId, char)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return char
      })
  }


  addFavToComic({ comicId, userId }) {
    return Comic.findOne({ extId: comicId })
      .then(comic => {
        if (comic) {
          if (!comic.favs.includes(userId)) {
            comic.favs.push(userId);
            return Comic.findOneAndUpdate({ extId: comicId }, comic)
              .then(c => c.data)
              .catch(err => console.log(err))
          }
          else return comic
        }
        else {
          return Comic.add(comicId, userId)
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
        console.log("incluye:", list.comics.includes(comicId))
        if (!list.comics.includes(comicId)) {
          list.comics.push(comicId);
          return List.findByIdAndUpdate(listId, list)
            .then(c => c)
            .catch(err => console.log(err))
        }
        else return list
      })
  }

  addComicToNewList({ comicId, userId }) {
    return User.findById(userId)
      .then(user => {
        if (!user.comicUnwantedList.includes(comicId)) {
          user.comicUnwantedList.push(comicId)
        }
        return (user.comicUnwantedList);
      })
      .catch(err => console.log(err));
  }

  removeComicFromList({ listId, comicId }) {
    return List.findById(listId)
      .then(list => {
        let index = list.comics.indexOf(comicId);
        if (index > -1) {
          list.comics.splice(index, 1);
          return List.findByIdAndUpdate(listId, list)
            .then(c => c.data)
            .catch(err => console.log(err))
        }
        else return list
      })
  }

  getList(listId) {
    return List.findById(listId)
      .then(list => list)
      .catch(err => console.log(err))
  }

  getLists({ sortBy = "name", order = 1, limit = Number.MAX_SAFE_INTEGER, ...searchObject }) {
    return List.find(searchObject)
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .then(lists => lists)
  }

  deleteList(listId) {
    return List.findByIdAndDelete(listId)
      .then(c => c)
      .catch(err => console.log(err))
  }


}

module.exports = myApiHandler;

