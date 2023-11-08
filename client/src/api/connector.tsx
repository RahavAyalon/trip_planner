import axios from "axios";


axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios.create({
	baseURL: process.env.REACT_APP_BASE_URL
});