import React, { Component } from 'react'
import './ComicPage.css'

import ApiService from '../../../javascripts/apiService'


export default class ComicPage extends Component {
  constructor() {
    super();
    this.state = { comic: null, isFav: false, user: null };
    this.apiService = new ApiService();
  }

  getComic(id) {
    return this.apiService.getComics({ id: id })
      .then(comic => {
        let isFav=comic.favs.includes(this.state.user._id)
        this.setState({ ...this.state, comic: comic,isFav:isFav })}
      )
      .catch(err => console.log(err))
  }


  componentDidMount() {
    this.setState({ ...this.state, user: this.props.user },()=>{
      this.getComic(this.props.match.params.id)
      .catch(err=>console.log(err))
    })
    
  }


  favHandler() {
    return this.apiService.toggleComicFav({ userId: this.state.user._id, comicId: this.state.comic.id, isFav: this.state.isFav })
    .then(()=>{
      return this.getComic(this.state.comic.id)
       })
  }

  render() {
    return (this.state.comic ?
      <div>
        <h1>{this.state.comic.name}</h1>
        <img src={this.state.comic.thumbnail.path + '/portrait_uncanny.' + this.state.comic.thumbnail.extension} alt={this.state.name} />
        <p>Favs:{this.state.comic.favs.length}</p>
        <p>{this.state.isFav ? "es favorito" : "no es favorito"}</p>
        <button onClick={() => this.favHandler()}>{this.state.isFav ? "Ya no me gusta" : "Me gusta"}</button>
        {/* <button onClick={()=>{}}>Añadir a lista</button> */}
      </div>
      : <div>
        <p>Loading...</p>
      </div>
    )
  }
}


