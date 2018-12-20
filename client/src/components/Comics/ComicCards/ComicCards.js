import React, { Component } from 'react'
import './ComicCards.css'
import ComicCard from './ComicCard'
import ApiService from '../../../javascripts/apiService'
require('dotenv').config()

export default class ComicCards extends Component {
  constructor() {
    super();
    this.apiService = new ApiService();
    this.state = { comics: null ,user:null};
  }

  getComics(comics) {
    return this.apiService.getComics(comics)
      .then(comics => this.setState({ ...this.state, comics: comics }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getComics(this.props.comics)
    .then(() =>this.setState({ ...this.state, user: this.props.user }))
      .catch(err=>console.log(err))  }

  render() {
    return (this.state.comics ?
      <div className="comics-cards">
        {(this.state.comics.map((com, index) => {
          return <ComicCard comic={com} key={index} />
        }))}
      </div>
      : <div>
        <p>Loading...</p>
      </div>
    )
  }
}
