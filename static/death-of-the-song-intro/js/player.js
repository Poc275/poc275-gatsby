class Player {
    constructor() {
        this._instance = null;
        this._deviceId = null;
        this._accessToken = null;
        this._isPlaying = false;
    }

    get instance() {
        return this._instance;
    }

    init(accessToken) {
        this._accessToken = accessToken;
        this._instance = new Spotify.Player({
            name: 'Song Intros Player',
            getOAuthToken: cb => {
                cb(accessToken);
            },
            volume: 1
        });

        this._instance.addListener('ready', ({ device_id }) => {
            this._deviceId = device_id;
        });

        // Not Ready
        this._instance.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        this._instance.addListener('initialization_error', ({ message }) => { 
            console.error(message);
        });

        this._instance.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        this._instance.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        this._instance.connect();
    }

    getTrack(id) {
        return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this._deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [`spotify:track:${id}`] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this._accessToken}`
            }
        });
    }

    togglePlay() {
        return this._instance.togglePlay().then(() => {
            return this._isPlaying = !this._isPlaying;
        });
    }
}