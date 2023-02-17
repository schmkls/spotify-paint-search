import React from 'react';
import ReactDOM from 'react-dom/client';
import queryString from 'query-string';

const authorize = () => {
    const scope = 'user-read-private';
    const client_id = '24dcca9ea4c5412098172221557f9e84'
    const state = '123'

    let auth_url = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: 'http://localhost:3000/',
        state: state
    })

    window.location.href = auth_url
}

const App = () => {
    return (
        <div>    
            <button onClick={() => authorize()}>Paint search</button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <App/>
  </div>
);


