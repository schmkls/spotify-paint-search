import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import UnAuthorized from './UnAuthorized';


const userUnAuthorized = () => {
    if (localStorage.getItem('access_token') == null) {
        return true
    }
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


