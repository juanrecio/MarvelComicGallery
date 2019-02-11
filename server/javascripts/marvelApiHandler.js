const axios = require('axios');
require('dotenv').config();
const md5 = require('md5');


class marvelAPIHandler {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.MARVELURL,
      withCredentials: true,
    })
  }

  getCharacters(offset = 0, limit = 100) {
    return this.service.get(`characters?offset=${offset}&limit=${limit}&${this.getAuth()}`)
      .then(response =>
        response.data)
      .catch(err => console.log(err))
  }

  getCharacterById(id) {
    return this.service.get(`characters?id=${id}&${this.getAuth()}`)
      .then(response =>
        response.data)
      .catch(err => console.log(err))
  }


  getAllCharactersPromises() {
    return this.service.get(`characters?&${this.getAuth()}`)
      .then(response => {
        let promises = [];
        let count = 0;
        let total = response.data.data.total;
        while (total > count) {
          promises.push(this.getCharacters(count).then(res => res.data.results));
          count += 100;
        }
        return promises;
      }
      )
      .catch(err => console.log(err));
  }

  getComicById(id) {
    return this.service.get(`comics?id=${id}&${this.getAuth()}`)
      .then(response => response.data)
      .catch(err => console.log(err))
  }

  getComics({ limit = 100, sortBy, id }) {
    const sortedBy = {
      latests: "dateDescriptor=thisMonth&orderBy=-onsaleDate&offset=50"
    }
    let query = id ?
      `/${id}`
      :
      `?` +
      (limit ? `limit=${limit}&` : ``) +
      (sortBy ? `${sortedBy[sortBy]}&` : '');
    return this.service.get(`/comics${query}${this.getAuth()}`)
      .then(res => res.data)
      .catch((err) => {
        console.log(err)
      })
  }

  getAuth() {
    let ts = Math.floor(Math.random() * 100000).toString();
    let hash = md5(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY);
    return (`ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`);
  }

}
module.exports = marvelAPIHandler;
