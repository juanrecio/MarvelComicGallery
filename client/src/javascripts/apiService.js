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
    query = id ?
      `/${id}`
      :
      Object.keys(queryObj).reduce((acc, ele) => {
        return `${acc}${ele}=${queryObj[ele]}`
      }, "?");
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
        return `${acc}${ele}=${queryObj[ele]}`
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
      .then(res => console.log("apiservicetogglecomicfav", res))
      .catch((err) => {
        console.log(err)
      })
  }
}

export default ApiService;