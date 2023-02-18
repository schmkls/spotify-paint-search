import queryString from 'query-string';
import { Buffer } from 'buffer';

const scope = 'user-read-private';
const client_id = '24dcca9ea4c5412098172221557f9e84'
const client_secret = 'e2bee5c5d34e4090beb5cf330a7d0284'
const state = '123'
const redirect_uri = 'http://localhost:3000/callback/'

const authorize = () => {
    let auth_url = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: 'http://localhost:3000/callback/',
        state: state
    })

    window.location.href = auth_url;
}

const getAccessTokenThenGoBack = (code) => {
    const query_string = 'https://accounts.spotify.com/api/token?' + queryString.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret
    })

    fetch(query_string, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')), 
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(response => response.json())
    .then(json => {
        localStorage.setItem('access_token', json.access_token)
        const expireTime = Date.now() + 60 * 60 * 1000
        localStorage.setItem('expire_time', expireTime)
        window.history.back()
    })
}

const UnAuthorized = () => {
    const parameters = new URLSearchParams(window.location.search)
    if (parameters.has('code')) {
        getAccessTokenThenGoBack(parameters.get('code'))
    }
    
    return (
        <button onClick={() => authorize()}>Auth</button>
    )
}

export default UnAuthorized