import axios from '../axios';
const getAllBooks = (inputId) => {
    return axios.get('/Books' ,{id : inputId});
}

export {getAllBooks}