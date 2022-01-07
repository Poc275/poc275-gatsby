class SpotifyAuth {
    constructor() {
        this._clientId = "acc0acb47a1d434fb113285a35a62f30";
        this._redirectUri = "https://poc275.me/death-of-the-song-intro/";
        this._scope = "streaming user-read-email user-read-private playlist-modify-private";
        this._state = sessionStorage.getItem('state') || this.generateRandomState();
        this._codeVerifier = sessionStorage.getItem('code_verifier') || this.generatePkceCodeVerifier();
        this._accessToken = null;
        this._accessTokenExpires = null;
        this._refreshToken = null;
    }

    // getters and setters
    get accessToken() {
        return this._accessToken;
    }
    set accessToken(val) {
        this._accessToken = val;
    }

    get accessTokenExpiry() {
        return this._accessTokenExpires;
    }
    set accessTokenExpiry(val) {
        this._accessTokenExpires = val;
    }

    get refreshToken() {
        return this._refreshToken;
    }
    set refreshToken(val) {
        this._refreshToken = val;
    }

    // methods
    generateRandomState() {
        let state = "";
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 16; i++ ) {
            state += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        sessionStorage.setItem('state', state);
        return state;
    }

    generatePkceCodeVerifier() {
        let codeVerifier = "";
        const length = Math.random() * (128 - 43) + 43;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-~';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            codeVerifier += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        sessionStorage.setItem('code_verifier', codeVerifier);
        return codeVerifier;
    }

    login() { 
        const params = new URLSearchParams();

        params.append("response_type", "code");
        params.append("client_id", this._clientId);
        params.append("scope", this._scope);
        params.append("redirect_uri", this._redirectUri);
        params.append("state", this._state);
        params.append("show_dialog", true);
        params.append("code_challenge_method", "S256");

        this.digestMessage(this._codeVerifier)
            .then(codeChallengeHash => {
                params.append("code_challenge", this.base64urlencode(codeChallengeHash));
                // redirect to Spotify login to get an authz code
                window.location.replace(`https://accounts.spotify.com/authorize?${params.toString()}`);
            });
    }

    getAccessToken() {
        const params = new URLSearchParams(window.location.search);

        if(params.get('state') === this._state) {
            return fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'grant_type': 'authorization_code',
                    'code': params.get('code'),
                    'redirect_uri': this._redirectUri,
                    'client_id': this._clientId,
                    'code_verifier': this._codeVerifier
                }),
            })
            .then(res => res.json())
            .then(token => {
                this.accessToken = token.access_token;
                // * 1000 as JS dates work in milliseconds
                this.accessTokenExpiry = Date.now() + token.expires_in * 1000;
                this.refreshToken = token.refresh_token;
            })
            .catch(err => console.error(err));

        } else {
            console.error('State mismatch');
        }
    }

    isAccessTokenStillValid() {
        return Date.now() < this.accessTokenExpiry;
    }

    refreshAccessToken() {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': this.refreshToken,
                'client_id': this._clientId
            }),
        })
        .then(res => res.json())
        .then(token => {
            this.accessToken = token.access_token;
            // * 1000 as JS dates work in milliseconds
            this.accessTokenExpiry = Date.now() + token.expires_in * 1000;
            this.refreshToken = token.refresh_token;
        })
        .catch(err => console.error(err));
    }

    async digestMessage(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hash = await crypto.subtle.digest('SHA-256', data);

        return hash;
    }

    base64urlencode(a) {
        // code challenge has to be base64 URL encoded, not just base64 encoded
        // this means change a '+' to a '-', a '/' to a '_' and remove the '=' padding
        return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    }
}