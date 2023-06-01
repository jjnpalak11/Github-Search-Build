import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';

const User = ({getUser,user}) => {
  
  const {login} =useParams();
  
  useEffect(()=>{
    getUser({login});
  });

    const{name}={user};
    
    return (
      <div>{name}</div>
    )
}

export default User