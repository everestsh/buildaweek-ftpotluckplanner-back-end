import React, { useEffect, useState } from "react";
import { useParams} from 'react-router-dom';
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

const User = (props) => {
    const [friend, setFriend] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        // axios.get(`http://localhost:9000/api/friends/${id}`, {
        //   headers: {
        //     authorization: token
        //   }
        // })
        axiosWithAuth()
        .get(`/users/${id}`)
          .then(resp=> {
            console.log("user", resp.data)
            setFriend(resp.data)
          })
          .catch(err=> {
            console.log(err.response.data);
          })

    },[])

    return (
        <div>
            {/* <h1>Friend {id}</h1> */}
            {/* <h3>Name :{friend.name}</h3> */}


            <h3>Name :{props.friend.name}</h3>
            {/* <p>age: {props.friend.age}</p> */}
            {/* <p>email:{props.friend.email}</p> */}
        </div>
    )
}
export default User;