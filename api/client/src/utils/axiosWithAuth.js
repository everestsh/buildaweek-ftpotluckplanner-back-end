import axios from 'axios'

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: "http://localhost:9000/api"
        // baseURL: "https://ft-anywhere-fitness-09.herokuapp.com/api"
    })
}

export default axiosWithAuth;