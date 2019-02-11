import React, { Component } from 'react'
import CharacterCards from '../Characters/CharacterCards'
import ComicCards from '../Comics/ComicList'
import Grid from '@material-ui/core/Grid';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }


  componentDidMount() {
   this.setState({ ...this.state, user: this.props.user })
  }

  render() {
    return (
      this.state.user?
      <div >
        <Grid container spacing={24} justify='space-around'>
          <Grid className="home-grid" item xs={10} style={{marginTop: '50px',marginBottom: '50px'}}>
            <CharacterCards user={this.state.user} characters={{ limit: "20", sortBy: "nFavs",order:"-1" }} />
          </Grid> 
          <Grid item xs={10}>
          <ComicCards user={this.state.user} comics={{limit:"7", sortBy:"latests"}}/>
          </Grid>
        </Grid>
      </div>
      :
      <div>
        <p>Loading...</p>
      </div>
    )
  }
}

