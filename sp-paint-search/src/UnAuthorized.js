import queryString from 'query-string';

const authorize = () => {
    const scope = 'user-read-private';
    const client_id = '24dcca9ea4c5412098172221557f9e84'
    const state = '123'
    const redirect_uri = window.location.href + '/callback/'
    console.log('redirect_uri: ' + redirect_uri);

    let auth_url = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: 'http://localhost:3000/callback/',
        state: state
    })

    window.location.href = auth_url;
}

const UnAuthorized = () => {

    const parameters = new URLSearchParams(window.location.search)
    if (parameters.has('code')) {
        localStorage.setItem('access_token', '123')
    }
    
    return (
        <button onClick={() => authorize()}>Auth</button>
    )
}

export default UnAuthorized