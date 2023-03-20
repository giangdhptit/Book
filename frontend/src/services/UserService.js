import axios from '../axios';
//  const handleLogin = (username,password) => {
//     return axios.post('/login', {username,password})
// }

// export {handleLogin}
const getAllBooks = (id) => {
        const res = fetch("http://localhost:8080/login",{
        method : "GET",
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },


    }).then((response) => response.json())
    .then((responseJson) => {

        console.log(responseJson);
        if (responseJson.status=='ok'){
            this.props.userLoginSuccess(responseJson.data)
        }
        return responseJson.user;
        });
    return res;

}