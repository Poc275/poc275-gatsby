class SongData {
    constructor() {
        this._data = [];
    }

    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
    }

    init() {
        return d3.csv('data/11_final_top2000_with_artwork.csv', this.schema).then(res => {
            this.data = res;
        });
    }

    getYearlyStats(property) {
        return d3.rollup(this._data, v => {
            return {
                'max': d3.max(v, d => d[property]),
                'min': d3.min(v, d => d[property]),
                'mean': d3.mean(v, d => d[property]),
                // for quartile range first group by the property, then convert to an array and pass to quantile()
                'iqr1': d3.quantile(Array.from(d3.group(v, d => d[property]), ([k, v]) => k), 0.25),
                'iqr3': d3.quantile(Array.from(d3.group(v, d => d[property]), ([k, v]) => k), 0.75)
            };
        }, d => d.year);
    }

    getMostPopularArtists(numHits) {
        // filters the data for artists who have had hits above a certain threshold
        const artists = this._data.map(song => song.artist);
        const uniqueArtists = [];
        artists.forEach((artist, idx, arr) => {
            // get unique artists only
            if(arr.indexOf(artist) === idx) {
                uniqueArtists.push(artist);
            }
        });
        
        return uniqueArtists.map(artist => {
            return {
                'artist': artist,
                'count': artists.filter(x => x === artist).length
            };
        }).filter(x => x.count >= numHits).map(x => x.artist);
    }

    schema(d) {
        // years are abbreviated so need to add full year as the songs 
        // cross the 20th/21st centuries
        const enteredDateWithFullYear = d.entered.slice(0, 7) + d.year;
        const peakReachedWithFullYear = d.peak_reached.slice(0, 7) + d.year;

        return {
            entered: d3.timeParse('%d-%b-%Y')(enteredDateWithFullYear),
            weeks_in_top_10: +d.weeks_in_top_10,
            title: d.title,
            artist: d.artist,
            peak: +d.peak,
            peak_reached: d3.timeParse('%d-%b-%Y')(peakReachedWithFullYear),
            weeks_at_peak: +d.weeks_at_peak,
            id: d.id,
            duration: +d.duration_ms / 1000,
            explicit: d.explicit === "TRUE" ? true : false,
            popularity: +d.popularity,
            tempo: +d.tempo,
            title_words: +d.title_words,
            vocals_start: +d.vocals_start / 1000,
            year: +d.year,
            album: d.album,
            preview_url: d.preview_url,
            acousticness: +d.acousticness,
            danceability: +d.danceability,
            energy: +d.energy,
            instrumentalness: +d.instrumentalness,
            key: +d.key,
            liveness: +d.liveness,
            loudness: +d.loudness,
            mode: +d.mode,
            speechiness: +d.speechiness,
            time_signature: +d.time_signature,
            valence: +d.valence,
            artwork: d.artwork
        };
    }
}