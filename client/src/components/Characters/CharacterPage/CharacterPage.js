// import React, { Component } from 'react'
// import './CharacterPage.css'

// import ApiService from '../../../javascripts/apiService'


// export default class CharacterPage extends Component {
//   constructor() {
//     super();
//     this.state = { character: null, isfaved: false };
//     this.apiService = new ApiService();
//   }


//   componentDidMount() {
//     this.getCharacter(this.props.match.params.id);
//   }


//   render() {
//     return (this.state.character ?
//       <div>
//         <h1>{this.state.character.name}</h1>
//         <img src={this.state.character.img.path + '/portrait_uncanny.' + this.state.character.img.extension} alt={this.state.name} />
//         <p>Favs:{this.state.character.favs.length}</p>

//       </div>
//       : <div>
//         <p>Loading...</p>
//       </div>
//     )
//   }
// }


import React, { Component } from 'react'
import './CharacterPage.css'


import { Link } from "react-router-dom";
import ApiService from '../../../javascripts/apiService'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 800,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

class CharacterPage extends Component {
  constructor() {
    super();
    this.state = { character: null, isFav: false, user: null };
    this.apiService = new ApiService();
  }

  getCharacter(id) {
    return this.apiService.getCharacters({ id: id })
      .then(character => {
        let isFav = character.favs.includes(this.state.user._id)
        console.log("isfav:",isFav)
        //       this.setState({ ...this.state, comic: comic,isFav:isFav })}
        this.setState({ ...this.state, character: character, isFav: isFav })

      })
      .catch(err => console.log(err))
  }


  // componentDidMount() {
  //   this.getCharacter(this.props.match.params.id);
  // }

  // getComic(id) {
  //   return this.apiService.getComics({ id: id })
  //     .then(comic => {
  //       let isFav=comic.favs.includes(this.state.user._id)
  //       this.setState({ ...this.state, comic: comic,isFav:isFav })}
  //     )
  //     .catch(err => console.log(err))
  // }


  componentDidMount() {
    this.setState({ ...this.state, user: this.props.user }, () => {
      this.getCharacter(this.props.match.params.id)
        .catch(err => console.log(err))
    })

  }


  favHandler() {
    return this.apiService.toggleCharacterFav({ userId: this.state.user._id, characterId: this.state.character._id, isFav: this.state.isFav })
      .then(() => {
        return this.getCharacter(this.state.character.extId)
      })
  }

  render() {
    const { classes } = this.props;
    return (this.state.character && this.state.user ?
      <Card className={classes.card} style={{ margin: "100px auto" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={this.state.name}
            className={classes.media}
            height="900"
            image={this.state.character.img.path + '/portrait_uncanny.' + this.state.character.img.extension}
            title={this.state.character.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.character.name}
            </Typography>
            <Typography component="p">
              {this.state.character.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to="/" ><Button size="small" color="primary">
            Back
    </Button>
          </Link>
          <Button size="small" color="primary" onClick={() => this.favHandler()}>{this.state.isFav ? "Ya no me gusta" : "Me gusta"}</Button>
        </CardActions>
      </Card > :
      <div>
        <p>Loading...</p>
      </div>)
  }
}

export default withStyles(styles)(CharacterPage);

