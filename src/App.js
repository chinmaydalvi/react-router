import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'

import Blog from './containers/Blog/Blog';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptor to Handles the Request before sending
axios.interceptors.request.use(request => {
  console.log(request)
  // Here you set configuration to modify the request (Eg: Edit/ADD/Remove headers)
  console.log('Global Axios Interceptor for request',request);
  return request; // Need to Return request otherwise request will be block
}, error =>{
  console.log(error);
  // Here you will get an error before sending the request example error due to internet conectivity.
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response)
  // Here you can modify the response
  console.log('Global Axios Interceptor for response',response)
  return response; // Need to Return request otherwise request will be block 
}, error => {
  console.log(error);
  // Here you will get an error after getting response example error 404 NOT FOUND
  return Promise.reject(error);
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
