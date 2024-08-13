import axios from 'axios';

const baseUrl = axios.create({
    baseURL: 'http://auctionapp.ap-southeast-1.elasticbeanstalk.com'
})

export default baseUrl;