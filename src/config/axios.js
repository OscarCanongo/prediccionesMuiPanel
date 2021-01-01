import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : "https://murmuring-wave-91481.herokuapp.com"
    //baseURL : "http://localhost:4000"
});

export default clienteAxios;