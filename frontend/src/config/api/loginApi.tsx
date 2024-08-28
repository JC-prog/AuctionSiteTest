import axios from 'axios';

const api = axios.create({
    baseURL: 'http://auctionapp.ap-southeast-1.elasticbeanstalk.com'
})

export default api;