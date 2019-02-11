import axios from "axios";
require('dotenv').config()


class ApiService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_API}`,
      withCredentials: true
    })
  }

  //TODO: Refactorizar y usar la misma funcion?

  //TODO: objeto con propiedades del queryObj y su correspondiente "query"
  //para la llamada, para no hacer tan dependiente apiService del resto

  getCharacters({ id, ...queryObj }) {
    let query;
    query = (id ?
      `/${id}`
      :
      Object.keys(queryObj).reduce((acc, ele) => {
        return `${acc}${ele}=${queryObj[ele]}&`
      }, "?"));
    return this.service.get(`/characters${query} `)
      .then(res => res.data)
      .catch((err) => {
        console.log(err)
      })
  }

  getComics({ id, ...queryObj }) {
    let query;
    query = id ?
      `/${id}`
      :
      Object.keys(queryObj).reduce((acc, ele) => {
        return `${acc}&${ele}=${queryObj[ele]}`
      }, "?");
    return this.service.get(`/comics${query} `)
      .then(res => res.data)
      .catch((err) => {
        console.log(err)
      })
  }


  toggleComicFav({ userId, comicId, isFav }) {
    let query = `/${comicId}?op=${(isFav ? "removeFav" : "addFav")}&userId=${userId}`
    return this.service.patch(`/comics${query}`)
      .then(res => res.data)
      .catch((err) => {
        console.log(err)
      })
  }

  toggleCharacterFav({ userId, characterId, isFav }) {
    let query = `/${characterId}?op=${(isFav ? "removeFav" : "addFav")}&userId=${userId}`
    return this.service.patch(`/characters${query}`)
      .then(res => res.data)
      .catch((err) => {
        console.log(err)
      })
  }

  getLists({ id, ...queryObj }) {
    let query;
    query = id ?
      `/${id}`
      :
      Object.keys(queryObj).reduce((acc, ele) => {
        return `${acc}&${ele}=${queryObj[ele]}`
      }, "?");
    return this.service.get(`/lists${query} `)
      .then(res => res.data)
      .catch((err) => {
        console.log(err)
      })
  }


  //TODO:check
  toggleListFav({ userId, listId, isFav }) {
    let query = `/${listId}?op=${(isFav ? "removeFav" : "addFav")}&userId=${userId}`
    return this.service.patch(`/lists${query}`)
      .then(res => res.data)
      .catch((err) => {
        console.log(err)
      })
  }

  //TODO:Check
  //TODO: Is user neccesary?
  addComicToList({ comicId, listId, userId }) {
    return this.service.patch(`/lists/${listId}`, { comicId: comicId, op: "addComic", userId: userId })
      .then(res => res)
      .catch(err => console.log(err))
  }
}

export default ApiService;