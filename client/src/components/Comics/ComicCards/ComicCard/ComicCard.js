import React, { Component } from 'react'
import './ComicCard.css'


export default class ComicCard extends Component {
  constructor (){
    super();
    this.state = { comic: null };
}

getComic() {
      this.setState({ ...this.state, comic: this.props.comic });

}

componentDidMount() {
  this.getComic();
}
  render() {
    return (this.state.comic?
      <div>
        <h1>{this.state.comic.title}</h1>
        <img src={this.state.comic.thumbnail.path + '/portrait_uncanny.' + this.state.comic.thumbnail.extension} alt={this.state.name}/>
      </div>
      :<div>
        <p>Loading...</p>
      </div>
    )
  }
}
