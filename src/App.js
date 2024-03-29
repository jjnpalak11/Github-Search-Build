import React, { Fragment,Component } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import {About} from './components/pages/About';
import Search from './components/users/Search';
import {Alert} from './components/layout/Alert';

 export class App extends Component{
  state={
    users:[],
    user:{},
    repos:[],
    loading:false,
    alert:null
  };
  
  searchUsers = async (text) =>{
    this.setState({loading:true});

    const res=await axios.get(
                        `https://api.github.com/search/users?q=${text}&client_id= ${
                process.env.REACT_APP_GITHUB_CLIENT_ID}
              &client_secret=${
                process.env.REACT_APP_GITHUB_CLIENT_SECRET
              }`);

    this.setState({users: res.data.items, loading:false});        
  }
  
  //Get single Github user
  getUser= async username => {
    this.setState({loading:true});

    const res=await axios.get(
                       `https://api.github.com/users/${username}?client_id= ${
                        process.env.REACT_APP_GITHUB_CLIENT_ID}
                        &client_secret=${
                        process.env.REACT_APP_GITHUB_CLIENT_SECRET
                        }`); 

    this.setState({user: res.data, loading:false});   
  } 

  //Get user's repos
  getUserRepos= async username => {
    this.setState({loading:true});

    const res=await axios.get(
                       `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id= ${
                        process.env.REACT_APP_GITHUB_CLIENT_ID}
                        &client_secret=${
                        process.env.REACT_APP_GITHUB_CLIENT_SECRET
                        }`); 

    this.setState({repos: res.data, loading:false});   
  } 
  
  clearUsers=()=> this.setState({users:[], loading:false});

  setAlert=(msg,type)=>{
        this.setState({alert:{msg, type} });
  }

  render(){
    const{users,loading,user,repos}=this.state;

      return (
        <Router>
      <div className='App'>
        <Navbar/>
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Routes>
            <Route path='/' element={
              <>
                <Search 
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers}
              setAlert={this.setAlert}
              />
              <Users loading={loading} users={users}/>
              </> 
            }/>
          </Routes>
          <Routes>
            <Route path='/about' element={<About/>}/>
          </Routes>
          <Routes>
            <Route path='/user/:login' element={
            <>
            <User getUser={this.getUser} 
                  getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
              />
            </>
      }/>
          </Routes>
        </div>
      </div>
      </Router>
    );
 }
}
        
export default App;
