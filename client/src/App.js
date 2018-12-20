import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import CharacterCards from './components/Characters/CharacterCards'
import ComicCards from './components/Comics/ComicCards'
import AuthService from "./javascripts/AuthService"
import Signup from './components/Users/Signup'
import Login from './components/Users/Login'
import CharacterPage from './components/Characters/CharacterPage';
import ComicPage from './components/Comics/ComicPage';



class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };

    this.authService = new AuthService();

    this.fetchUser();
  }

  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => this.setState({ ...this.state, user }));
  };

  getUser = user => {
    this.setState({ ...this.state, user });
  };

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null }));
  };

  
  
  render() {
    const welcome = this.state.user ? (
      <div>
        <p>Hola {this.state.user.username}</p>
        <button onClick={this.logout}>Logout</button>
        <Switch>
          <Route path="/cogetUser={this.getUser} mics" render={() => <ComicCards getUser={this.getUser} />} />
          <Route path="/characters/:id" render={(props) => <CharacterPage user={this.state.user} {...props}/>} />
          <Route path="/characters" render={() => <CharacterCards user={this.state.user} characters={{limit:"5", sortBy:"favs"}} />} />
          <Route path="/comics/:id" render={(props) => <ComicPage user={this.state.user} {...props} />} />
          <Route path="/comics" render={() => <ComicCards user={this.state.user} comics={{limit:"20", sortBy:"latest"}} />} />
        </Switch>
      </div>
    ) : (
        <div>
          <p>No user</p>
          <Link to="/">Home</Link> - <Link to="/signup">Signup</Link> -{" "}
          <Link to="/login">Login</Link>
        </div>
      );

    return (
      <div className="App">
        {welcome}
        {/* <Message user={this.state.user} /> */}
        <Route
          path="/signup"
          render={() => <Signup getUser={this.getUser} />}
        />
        <Route path="/login" render={() => <Login getUser={this.getUser} />} />
      </div>
    );
  }

}

export default App; 
