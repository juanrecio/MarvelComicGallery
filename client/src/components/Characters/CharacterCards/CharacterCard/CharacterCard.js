import React, { Component } from 'react'
import './CharacterCard.css'


export default class CharacterCard extends Component {
  constructor (){
    super();
    this.state = { character: null , user: null};
}

getCharacter() {
      this.setState({ ...this.state, character: this.props.character });

}

componentDidMount() {
  this.getCharacter();

}
  render() {
    return (this.state.character?
      <div>
        <h1>{this.state.character.name}</h1>
        <img src={this.state.character.img.path + '/portrait_uncanny.' + this.state.character.img.extension} alt={this.state.name}/>
        <p>favs: {this.state.character.favs.length}</p>
      </div>
      :<div>
        <p>Loading...</p>
      </div>
    )
  }
}
