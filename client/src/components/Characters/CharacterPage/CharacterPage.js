import React, { Component } from 'react'
import './CharacterPage.css'

import ApiService from '../../../javascripts/apiService'


export default class CharacterPage extends Component {
  constructor (){
    super();
    this.state = { character: null, isfaved:false};
    this.apiService = new ApiService();
}

getCharacter(id) {
  return this.apiService.getCharacters({id:id})
    .then(character => this.setState({ ...this.state, character: character }))
    .catch(err => console.log(err))
}

  
componentDidMount() {
  this.getCharacter(this.props.match.params.id);
}


render() {
  // console.log(this.character)
    return (this.state.character?
      <div>
        <h1>{this.state.character.name}</h1>
        <img src={this.state.character.img.path + '/portrait_uncanny.' + this.state.character.img.extension} alt={this.state.name}/>
        <p>Favs:{this.state.character.favs.length}</p>

      </div>
      :<div>
        <p>Loading...</p>
      </div>
    )
  }
}


