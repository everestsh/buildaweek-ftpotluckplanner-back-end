import React, { useState } from "react";
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

const AddUser = (props) => {
    const initatate = {
        id: 2222,
        name: '',
        age: 0,
        email: ''
    }
    
    const [value, setValue] = useState(initatate)
    const handleChange = (e) => {
        setValue({ 
               ...value,
               [e.target.name]: e.target.value
        })
         console.log(value)
    }

    const postNewItem = newValue=> {
        const token = localStorage.getItem("token");
        // console.log("login")
        // axios.post('http://localhost:9000/api/articles', )
        // axios.post('http://localhost:9000/api/friends',newValue, {
        //     headers: {
        //       authorization: token
        //     }
        //   })
        axiosWithAuth()
        .post(`/users`, newValue)
        .then(resp=> {
          console.log(resp);
          props.history.push('/users');
        })
        .catch(err => {
          console.log(err);
        })
    }
    const submitItem = () => {
        const newValue = {
            id: Date.now(), 
            name: value.name,
            age: value.age,
            email: value.email,
        }
        postNewItem(newValue)
    }
    const onSubmit = event => {
        event.preventDefault()
        submitItem()
    }
    return (
        <div>
            <h3>Add Friend!!!</h3>
            <div>
                <form onSubmit={onSubmit}>
                Name:<input
                    type="text"
                    name="name"
                    value={value.name}
                    onChange={handleChange}
                />
                Age:<input
                    type="number"
                    name="age"
                    value={value.age}
                    onChange={handleChange}
                />
                Email:<input
                    type="email"
                    name="email"
                    value={value.email}
                    onChange={handleChange}
                />

          

                <button>Add User</button>
                </form>
            </div>
    </div>
    )
}
export default AddUser;