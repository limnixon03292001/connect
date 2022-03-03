import axios from 'axios';

export const api = axios.create({baseURL: 'https://connect-beta-app.herokuapp.com/'});