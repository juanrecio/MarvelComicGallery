import React, { Component } from 'react'
import './ListPage.css'

// import { Link } from "react-router-dom";
import ApiService from '../../../javascripts/apiService'

import { withStyles } from '@material-ui/core/styles';

const styles = {
};

class ListPage extends Component {
  constructor() {
    super();
    this.state = { list: null, isFav: false, user: null, isOwner: false };
    this.apiService = new ApiService();
  }

  getList(id) {
    return this.apiService.getLists({ id: id })
      .then(list => {
        let isFav = list.favs.includes(this.state.user._id)
        let isOwner = list.userId === this.state.user._id;
        this.setState({ ...this.state, list: list, isFav: isFav, isOwner: isOwner })
      }
      )
      .catch(err => console.log(err))
  }


  componentDidMount() {
    this.setState({ ...this.state, user: this.props.user }, () => {
      this.getList(this.props.match.params.id)
        .catch(err => console.log(err))
    })

  }


  // favHandler() {
  //   return this.apiService.toggleComicFav({ userId: this.state.user._id, comicId: this.state.comic.id, isFav: this.state.isFav })
  //   .then(()=>{
  //     return this.getComic(this.state.comic.id)
  //      })
  // }

  render() {
    // const { classes } = this.props;
    const { list } = this.state;
    return (this.state.list && this.state.user ?
      <div>
        <p>Name: {list.name}</p>
        <p>Owner Id:{list.userId}</p>
        <p>Number of favs: {list.nFavs}</p>
        <p>Am I fav?:{this.state.isFav ? "sí" : "no"}</p>
        <p>Am I the owner?:{this.state.isOwner ? "sí" : "no"}</p>
        <p>I am: {this.state.user._id}</p>
      </div> :
      <div>
        <p>Loading...</p>
      </div>)
  }
}

export default withStyles(styles)(ListPage);


