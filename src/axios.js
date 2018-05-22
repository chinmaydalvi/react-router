import axios from 'axios';

const instance1 = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {'Authorization': 'AUTH_TOKEN_INSTANCE1' }
});
// instance1.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_INSTANCE1';
instance1.defaults.headers['Content-Type'] = 'application/json';


// Interceptor to Handles the Request before sending
instance1.interceptors.request.use(request => {
    console.log(request)
    // Here you set configuration to modify the request (Eg: Edit/ADD/Remove headers)
    console.log('Instance1 Interceptor for request',request);
    return request; // Need to Return request otherwise request will be block
  }, error =>{
    console.log(error);
    // Here you will get an error before sending the request example error due to internet conectivity.
    return Promise.reject(error);
  });
  
  instance1.interceptors.response.use(response => {
    console.log(response)
    // Here you can modify the response
    console.log('Instance1 Interceptor for response',response)
    return response; // Need to Return request otherwise request will be block 
  }, error => {
    console.log(error);
    // Here you will get an error after getting response example error 404 NOT FOUND
    return Promise.reject(error);
  });

export default instance1;