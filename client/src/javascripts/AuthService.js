import axios from "axios";
require ('dotenv').config()
class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_API}/auth`,
      withCredentials: true
    })
  }

  signup = (user) => {
    return this.service.post('/signup', user)
    .then(response => response.data)
  }

  login = (user) => {
    return this.service.post('/login', user)
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
    .catch(err => console.log(err))
  }

  logout = () => {
    return this.service.get('/logout')
    .then(response => response.data);
  }
}

export default AuthService;