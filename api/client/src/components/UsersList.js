import React, { useEffect, useState } from "react";
import axios from 'axios';
import Friend from './User';

import axiosWithAuth from '../utils/axiosWithAuth';

const UsersList = (props) => {
    const initstate = []
    

    const [friends, setFriends] = useState(initstate)

    useEffect(()=>{
        const token = localStorage.getItem("token");

        // axios.get('http://localhost:9000/api/', {
        //   headers: {
        //     authorization: token
        //   }
        // })
        axiosWithAuth()
        .get('/users')
          .then(resp=> {
            // console.log("FriendsList", resp.data)
            setFriends(resp.data)
          })
          .catch(err=> {
            console.log(err.response.data);
          })

    },[])
    console.log("UsersList", friends)
    return (
        <div className="friends-list">
            <h2>All the User!</h2>
            {/* <button onClick={handleClick}>Add More Friends!</button> */}
            {friends.map(friend => {
                // return (<Friend friend={friend} key={friend.id} />);
                return (
                  <h3 key={friend.user_id}>Name :{friend.username}</h3>
                )
            })}
        </div>
    )
}
export default UsersList;