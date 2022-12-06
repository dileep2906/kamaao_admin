/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');


const { default: axios } = require('axios');


// axios.defaults.baseURL="http://localhost:8000/";
axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.defaults.headers.post['Content-Type']="application/json";
axios.defaults.headers.post['ACCEPT']="application/json";
axios.defaults.withCredentials=true;
axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization =token ? `Bearer ${token}` : '';
    return config;

});
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
 require('./components/Login');

require('./layout/admin/MasterLayout');
