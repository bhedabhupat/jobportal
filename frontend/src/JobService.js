import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class JobsService{

    constructor(){}


    getJobs() {
        const url = `${API_URL}/api/jobs/`;
        return axios.get(url).then(response => response.data);
    }
    getJob(pk) {
		const url = `${API_URL}/api/job/${pk}/`;
		return axios.get(url).then(response => response.data);
	}
    getCategory() {
        const url = `${API_URL}/api/category/`;
        return axios.get(url).then(response => response.data); 
    }
    getJobsByURL(link) {
        const url = `${link}`;
		return axios.get(url).then(response => response.data);
    }  
    getJobDetails(pk) {
        const url = `${API_URL}/api/jobdetails/${pk}`;
        return axios.get(url).then(response => response.data);
    }
}