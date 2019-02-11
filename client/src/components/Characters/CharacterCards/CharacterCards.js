import React, { Component } from 'react'
import CharacterCard from './CharacterCard'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ApiService from '../../../javascripts/apiService'
import './CharacterCards.css'
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

class CharacterCards extends Component {
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
      .then(() => this.setState({ ...this.state, user: this.props.user }))
      .catch(err => console.log(err))
  }
  render() {
    const { classes } = this.props;
    return (this.state.characters && this.state.user?
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Characters"
          style={{textAlign: "left"}}/ >
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={2.5}>
            {(this.state.characters.map((charac, index) => {
              return <CharacterCard character={charac} key={index} user={this.state.user}/>
            }))}
          </GridList>
        </div>
      </Card>
      : <div>
        <p>Loading...</p>
      </div>)
  }
}

export default withStyles(styles)(CharacterCards);
