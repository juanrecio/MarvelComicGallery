import AuthService from '../../../javascripts/AuthService';
import React, { Component } from 'react'
import './CharacterCards.css'
import ApiService from '../../../javascripts/apiService'
import CharacterCard from './CharacterCard'
require('dotenv').config()



export default class CharacterCards extends Component {
  constructor() {
    super();
    this.apiService = new ApiService();
    this.state = { characters: null, user: null };
  }

  getCharacters(characs) {
    return this.apiService.getCharacters(characs)
      .then(characters => this.setState({ ...this.state, characters: characters }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getCharacters(this.props.characters)
    .then(() =>this.setState({ ...this.state, user: this.props.user }))
      .catch(err=>console.log(err))
  }


  render() {
    return (this.state.characters ?
      <div className="characters-cards">
        {(this.state.characters.map((charac, index) => {
          return <CharacterCard character={charac} key={index} />
        }))}
      </div>
      : <div>
        <p>Loading...</p>
      </div>
    )
  }
}
