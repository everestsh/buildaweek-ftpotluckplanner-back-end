import React, { useEffect } from "react";
import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';
import { connect } from 'react-redux';
import {fetchStart} from '../actions'

const Logout = (props)=> {

    const {fetchStart} = props
    useEffect(()=> {
        const token = localStorage.getItem("token");
        // axios.post('http://localhost:9000/api/auth/logout', {}, {
        //     headers:{
        //         authorization: localStorage.getItem('token')
        //     }
        // })
        axiosWithAuth()
        .post(`/auth/logout`)
        .then(resp => {
                localStorage.removeItem('token');
                fetchStart()
                props.history.push('/login');
            });
    }, []);
    return(<div></div>);
}

// export default Logout;
export default connect(null,{fetchStart})(Logout);