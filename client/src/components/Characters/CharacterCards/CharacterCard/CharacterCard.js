import React, { useState, useEffect, useContext } from 'react'
import './CharacterCard.css'

import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ApiService from '../../../../javascripts/apiService'
import { UserContext } from '../../../../App'



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

function CharacterCard(props) {
  const { classes } = props;
  const [user, setUser] = useState(useContext(UserContext));
  const [character, setCharacter] = useState(null);
  const [fav, setFav] = useState({ nFavs: 0, isFav: false });
  const [apiService, setApiService] = useState(new ApiService());

  useEffect(() => {
    if (user && !character && props.character) {
      const char = props.character;
      setCharacter({
        id: char._id,
        name: char.name,
        img: char.img.path + '/standard_xlarge.' + char.img.extension,
      });
      setFav({
        isFav: char.favs.includes(user._id),
        nFavs: char.favs.length
      });
    }
  })

  function favHandler() {
    apiService.toggleCharacterFav({ userId: user._id, characterId: character.id, isFav: fav.isFav }).then(() => {
      setFav({
        nFavs: (fav.isFav ? --fav.nFavs : ++fav.nFavs),
        isFav: !fav.isFav
      })
    }
    )
  }


  return (character && user ?
    <GridListTile>
      <img src={character.img}
        alt={character.name} style={{ border: '1px solid black' }} />
      <GridListTileBar
        title={character.name}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <IconButton style={{ color: '#eeeeee' }}>{fav.nFavs}
            {fav.isFav ?
              <FavoriteIcon onClick={() => favHandler()} className={classes.title}></FavoriteIcon>
              :
              <FavoriteBorderIcon onClick={() => favHandler()} className={classes.title}></FavoriteBorderIcon>
            }
          </IconButton>
        }
      />
    </GridListTile>
    : <div>
      <p>Loading...</p>
    </div>
  )
}

export default withStyles(styles)(CharacterCard);
