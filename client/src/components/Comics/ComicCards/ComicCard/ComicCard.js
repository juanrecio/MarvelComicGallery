import React, { Component } from 'react'
import './ComicCard.css'

import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from "react-router-dom";
// import IconButton from '@material-ui/core/IconButton';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



const styles = theme => ({
  title: {
    color: `white`,

    textShadow: `-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;`
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class ComicCard extends Component {
  constructor() {
    super();
    this.state = { comic: null, user: null };
  }

  getComic() {
    this.setState({ ...this.state, comic: this.props.comic });

  }

  componentDidMount() {
    this.getComic();
  }
  
  render() {
    const { classes } = this.props;
    return (this.state.comic ?
      <GridListTile>
        <Link to={'/comics/'+this.state.comic.id} ><img src={this.state.comic.thumbnail.path + '/portrait_uncanny.' + this.state.comic.thumbnail.extension}
          alt={this.state.comic.title} style={{ border: '1px solid black' }} />
          </Link>
        <GridListTileBar
          // title={this.state.comic.title}
          classes={{
            root: classes.titleBar,
            // title: classes.title,
          }}
          // actionIcon={
          //   <IconButton style={{ color: '#eeeeee' }}>{this.state.comic.favs.length}
          //     <FavoriteBorderIcon className={classes.title}></FavoriteBorderIcon>
          //   </IconButton>
          // }
        />
      </GridListTile>
      : <div>
        <p>Loading...</p>
      </div>
    )
  }
}

export default withStyles(styles)(ComicCard);