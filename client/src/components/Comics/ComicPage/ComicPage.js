import React, { Component } from 'react'
import './ComicPage.css'

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

class ComicPage extends Component {
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
  const { classes } = this.props;
  return(this.state.comic && this.state.user ?
    <Card className={classes.card} style={{margin:"100px auto"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={this.state.comic.tittle}
          className={classes.media}
          height="900"
          image={this.state.comic.thumbnail.path + '/detail.' + this.state.comic.thumbnail.extension}
          title={this.state.comic.tittle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.state.comic.title}
      </Typography>
          <Typography component="p">
            {this.state.comic.description}
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

export default withStyles(styles)(ComicPage);


