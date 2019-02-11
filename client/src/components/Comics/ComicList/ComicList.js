import React, { Component } from 'react'
import './ComicList.css'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ComicCard from '../ComicCards/ComicCard'
import ApiService from '../../../javascripts/apiService'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
});

class ComicList extends Component {
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
    const { classes } = this.props;
    return (this.state.comics ?
      <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Latest comics"
        style={{textAlign: "left"}}/>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {(this.state.comics.map((comic, index) => {
            return <ComicCard comic={comic} key={index} />
          }))}


        </GridList>
      </div>
    </Card>
      : <div>
        <p>Loading...</p>
      </div>
    )
  }
}

export default withStyles(styles)(ComicList);