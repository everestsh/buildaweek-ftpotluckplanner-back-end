import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import UsersList from './components/UsersList';
import User from './components/User';
import AddUser from './components/AddUser';

import PrivateRoute from './components/PrivateRoute';
import {fetchStart, fetchSuccess} from './actions'

function App(props) {
      // const [isLoggedIn, setIsLoggedIn] = useState (false)
  // const isLoggedIn = localStorage.getItem('token');
  const {isLoggedIn, fetchStart, fetchSuccess} = props
  console.log("App.js isLoggedIn", isLoggedIn)

  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     fetchStart()
  //     console.log("fetchStart ",isLoggedIn)
  //   }else{
  //     fetchSuccess()
  //     console.log("fetchSuccess ",isLoggedIn)
  //   }
  //  },[isLoggedIn])

  
  return (
    <Router>
      <div className="App">
        <h2>Client Auth Project</h2>
        <h2>{props.isLoggedIn}</h2>
        <h2></h2>
        <ul>
          <li>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          </li>
          <li>
          <Link to="/logout">Logout</Link>
          </li>
          <li>
          {<Link to="/users">UsersList</Link>}
          {/* {isLoggedIn && <Link to="/users">UsersList</Link>} */}
          </li>
          <li>
         { isLoggedIn && <Link to="/add">AddUser</Link>}
          </li>
        </ul>
        <Switch>
          <Route path="/users/:id"   component={User} /> 
          <PrivateRoute  path="/users" component={UsersList} />
          <Route  path="/add" component={AddUser} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />    
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  console.log("App.js mapStateToProps", state)
  return({
    isLoggedIn: state.isLoggedIn 
  })
}

export default connect(mapStateToProps,{fetchStart, fetchSuccess})(App);
