import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import UnAuthorized from './UnAuthorized';


const userUnAuthorized = () => {
    if (localStorage.getItem('access_token') == null) {
        return true
    }

    if (localStorage.getItem('expire_time') <= Date.now()) {
        return true
    }

    if (localStorage.getItem('access_token') == null) {
        return true
    }

    return false
}

const App = () => {
    if (userUnAuthorized()) {
        return <UnAuthorized/>
    }

    return (
        <Home/>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <App/>
  </div>
);


