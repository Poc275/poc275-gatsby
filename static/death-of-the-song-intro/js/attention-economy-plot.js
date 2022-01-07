class AttentionEconomyPlot {
    constructor() {
        this._margin = {
            top: 20,
            right: 20,
            bottom: 40,
            left: 50
        };
        this._width = 800 - this._margin.right - this._margin.left;
        this._height = 500 - this._margin.top - this._margin.bottom;
        this._svg = null;
        this._xScale = null;
        this._yScale = null;
    }

    drawAxes(yAxisTitle) {
        const xAxis = d3.axisBottom(this._xScale)
            .ticks(d3.timeYear.every(5))
            .tickFormat(x => `'${x.getFullYear().toString().slice(2, 4)}`);

        this._svg.select('.x.axis')
            .call(xAxis);
    
        const yAxis = d3.axisLeft(this._yScale)
            .ticks(10);
    
        this._svg.select('.y.axis')
            .transition().duration(1000)
            .call(yAxis);

        // update axis label
        this._svg.select('.y-axis-label')
            .text(yAxisTitle);
    }

    plotRegressionLine(data) {
        const loessRegression = d3.regressionLoess()
            .x(d => d[0])
            .y(d => d[1].mean)
            .bandwidth(0.8);
    
        const loessRegressionLine = loessRegression(Array.from(data));
    
        const regressionLineGen = d3.line()
            .x(d => this._xScale(new Date(d[0], 0, 1)))
            .y(d => this._yScale(d[1]));
    
        this._svg.selectAll('.regression-line')
            .data([0])
            .join(
                enter => enter.append('path')
                    .attr('class', 'regression-line')
                    .attr('d', regressionLineGen(loessRegressionLine))
                    .style('stroke', 'purple')
                    .style('stroke-width', 3)
                    .style('fill', 'none'),

                update => update
                    .call(update => update.transition().duration(2300)
                        .attr('d', regressionLineGen(loessRegressionLine))),

                exit => exit.remove()
            );
    }

    init() {
        this._svg = d3.select("#attention-economy-plot")
            .append('svg')
            .attr('width', this._width + this._margin.right + this._margin.left)
            .attr('height', this._height + this._margin.top + this._margin.bottom)
                .append('g')
                .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`);

        this._xScale = d3.scaleTime()
            .domain([new Date(1952, 0, 1), new Date(2021, 11, 31)])
            .range([0, this._width]);

        this._yScale = d3.scaleLinear()
            .range([this._height, 0]);
        
        this._svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${this._height})`);

        this._svg.append('g')
            .attr('class', 'y axis');

        // axis labels
        this._svg.append('text')
            .attr('transform', `translate(${this._width / 2}, ${this._height + this._margin.top + 20})`)
            .style("text-anchor", "middle")
            .text("Year");

        this._svg.append('text')
            .attr('class', 'y-axis-label')
            .attr('transform', "rotate(-90)")
            .attr("x", 0 - (this._height / 2))
            .attr("y", 0 - this._margin.left)
            .attr("dy", "0.75rem")
            .style("text-anchor", "middle")
            .text("Number of words in the song title");
    }

    plot(data, prop) {   
        // update y scale
        const minVal = d3.extent(data, d => d[1].iqr1);
        const maxVal = d3.extent(data, d => d[1].iqr3);
        this._yScale.domain([minVal[0], maxVal[1]]).nice();
    
        let yAxisLabel = "";
        switch(prop) {
            case "title_words":
                yAxisLabel = "Number of words in the song title";
                break;
            case "tempo":
                yAxisLabel = "Tempo (bpm)";
                break;
            case "vocals_start":
                yAxisLabel = "Time before the vocal starts (s)";
                break;
            case "energy":
                yAxisLabel = "Energy";
                break;
            case "loudness":
                yAxisLabel = "Loudness (dB)";
                break;
            case "acousticness":
                yAxisLabel = "Acousticness";
                break;
            case "danceability":
                yAxisLabel = "Danceability";
                break;
            case "speechiness":
                yAxisLabel = "Speechiness";
                break;
            case "valence":
                yAxisLabel = "Valence";
                break;
            case "duration":
                yAxisLabel = "Song duration (s)";
                break;
            case "weeks_in_top_10":
                yAxisLabel = "Weeks spent in the Top 10";
                break;
        }

        // tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "attention-tooltip")
            .attr("opacity", 0);

        // draw yearly yearly iqr bars
        this._svg.selectAll('.yearly-iqr-bar')
            .data(data)
            .join(
                enter => enter.append('rect')
                    .attr('class', 'yearly-iqr-bar')
                    .attr('x', (d, i) => this._xScale(new Date(d[0], 0, 1)))
                    .attr('y', (d, i) => this._yScale(d[1].iqr3))
                    .attr('width', (this._width - this._margin.left - this._margin.right) / 70)
                    .attr('height', (d, i) => this._yScale(d[1].iqr1) - this._yScale(d[1].iqr3))
                    .attr('fill', '#99907f')
                    .attr('fill-opacity', 0.3),

                update => update
                    .call(update => update.transition().duration(2000)
                        .attr('y', (d, i) => this._yScale(d[1].iqr3))
                        .attr('height', (d, i) => this._yScale(d[1].iqr1) - this._yScale(d[1].iqr3))),

                exit => exit.remove()
            );
    
        // draw scatter
        this._svg.selectAll(`.year`)
            .data(data, d => d[0])
            .join(
                enter => enter.append('circle')
                    .attr('class', `year`)
                    .attr('cx', d => this._xScale(new Date(d[0], 6, 2)))
                    .attr('cy', d => this._yScale(d[1].mean))
                    .attr('r', 5)
                    .style('fill', 'dodgerblue')
                    .style('fill-opacity', 0.5),
                
                update => update
                    .call(update => update.transition("attention-economy-years-update").duration(2000)
                        .attr('cy', d => this._yScale(d[1].mean))),

                exit => exit.remove()
            ).on("mouseover", (event, year) => {
                const tipText = `<strong>${year[0]}</strong>
                    <br />Mean: ${year[1].mean.toFixed(2)}
                    <br />Max: ${year[1].max.toFixed(2)}
                    <br />Min: ${year[1].min.toFixed(2)}
                    <br />Q1: ${year[1].iqr1.toFixed(2)}
                    <br />Q3: ${year[1].iqr3.toFixed(2)}`;

                tooltip.html(tipText)
                    .style("left", `${event.pageX + 28}px`)
                    .style("top", `${event.pageY - 28}px`);

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0.9);

                d3.selectAll('.year').transition()
                    .duration(200)
                    .style('fill-opacity', d => d[0] === year[0] ? 1 : 0.2);
            }).on("mouseout", (event, year) => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);

                d3.selectAll('.year').transition()
                    .duration(200)
                    .style('fill-opacity', 1);
            });

        this.drawAxes(yAxisLabel);    
        this.plotRegressionLine(data);
        this.updateExplanation(prop);
    }

    updateExplanation(prop) {
        const explanations = {
            "title_words": [
                "Average number of words in the song title",
                "There has been a recent tendency for popular songs to have short titles with Billboard Magazine giving them the moniker of “<a href=\"https://www.billboard.com/pro/roar-royals-radioactive-why-hit-songs-now-have-one-word-titles/\" target=\"_blank\" rel=\"noopener noreferrer\">One-Word Wonders</a>” <i class=\"fa fa-external-link\" aria-hidden=\"true\"></i>. Today, it is <a href=\"https://priceonomics.com/say-hello-to-the-era-of-one-word-song-title/\" target=\"_blank\" rel=\"noopener noreferrer\">two and a half times more likely that a hit has a one-word title than back in the 60s</a> <i class=\"fa fa-external-link\" aria-hidden=\"true\"></i>. We see a steep decline in the average number of words from the turn of the millennium, possible coinciding with the rising importance of single sales over albums. Why? The theory is that memory span is inversely related to word length, consequently shorter titles should be more memorable and better commercially as a result."
            ],
            "tempo": [
                "Main Tempo",
                "Exposure to audio with a faster tempo has been linked with increases in listeners’ levels of stimulation. This has been shown to enhance memory by modifying the attention during listening, and that increased level of stimulation also supports slower forgetting. It is therefore expected that the tempo may have increased over the years to grab attention more effectively. Interestingly, that doesn’t seem to be the case. There is an ever so slight increase over time until the 90s, then a slight decrease, although 2021 suggests an up-turn. Note that the tempo was retrieved via the Spotify API which may not be 100% accurate."
            ],
            "vocals_start": [
                "Time before the voice enters",
                "The voice is probably the most attention-grabbing instrument there is. Lift “Muzak” omitted vocals for this very reason, whereas studies have shown that songs with vocals are more effective in adverts on both attention and memory. Personally, if I want to listen to music whilst working, I need songs without vocals to avoid distractions. As a result, if vocal music does grab listeners’ attention, it is expected that the average time before the voice enters will decrease over time. We have already seen this in the main intros plot above but the yearly averages really hit home the point."
            ],
            "energy": [
                "Timbre",
                "The music evolution study concluded that the timbre of music has dropped drastically in recent years. Timbre is the texture and tone quality of the sounds within the track and is associated with the types of instruments being used and recording techniques employed. So, a song with less richness and depth of sound will have a lower timbre. Timbre is hard to measure, the closest measure from the Spotify API is energy, a measure from 0.0 to 1.0 representing the measure of intensity and activity. It is measured via the dynamic range, perceived loudness and timbre. The study showed that more and more, producers are intentionally making songs louder by using compression effects to boost the quietest parts of a song so that they match the loudest parts. This reduces the dynamic range or “distance” between the loudest and quietest parts. The end effect being that the song sounds louder making it stand out amongst other songs. This reduces the timbral quality of the song and it is therefore expected that this measure has increased over time."
            ],
            "loudness": [
                "Loudness",
                "As mentioned when looking at timbre, songs have been getting louder by producers intentionally reducing the dynamic range between the loudest and quietest parts of a song. The effect being that the entire song sounds louder, no matter how loudly the listener sets the volume. This makes the song stand out amongst other songs to grab listeners’ attention. The music evolution study noticed that this has been happening for the past 20 years and indeed we see a general increase in loudness until some point in the 90s, after which it increases even more drastically."
            ],
            "acousticness": [
                "Acousticness",
                "Acousticness is a confidence measure from 0.0 to 1.0 of whether the track is acoustic with 1.0 representing a high confidence that the track is acoustic. This measure didn’t form part of any study but it is interesting how this has declined drastically over time. This perhaps could be related to changes in music technology and recording techniques."
            ],
            "danceability": [
                "Danceability",
                "Danceability is how suitable a track is for dancing based on a combination of tempo, rhythm stability, beat strength and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. We see an overall upward trend which slowed during the 90s. Danceability didn’t form part of any study but due to the way it is measured, the increase shouldn’t come as a surprise as these are all factors which have been shown to improve listeners’ attention."
            ],
            "speechiness": [
                "Speechiness",
                "Speechiness is a measure of spoken words in a track. The more exclusively speech-like the recording, the closer it is to 1.0. Values above 0.66 indicate that tracks are probably made up entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, whereas values below 0.33 most likely represent instrumentals. All the studies have shown that speech, being the most attention-grabbing instrument, is one of the most important factors in the attention economy. Therefore, we should expect to see an increase in the amount of speech over time."
            ],
            "valence": [
                "Valence",
                "Valence is a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric) while tracks with low valence sound more negative (e.g. sad, depressed, angry). High valence examples include Hippy Hippy Shake by The Swinging Blue Jeans (0.98), In the Summertime by Mungo Jerry (0.97) and Pharrell’s Happy (0.96). Low valence examples include Nothing Compares 2 U by Sinéad O’Connor (0.02) and Everybody Hurts by R.E.M (0.16). Whereas this is a measure of the music, Gauvin’s study did look into the self-focused lyrical content of songs. It was hypothesised that the lyrical content of popular music changes to reflect societal changes. It is therefore expected that due to an increase in individualism, there should be a rise in self-focused lyrics (more use of first-person pronouns, I, we, us) and negatively valenced words, paired with a decrease of positively valenced words. Although the study didn’t find a correlation between self-focused lyrics and time, musically at least we can see a decrease after the early 80s."
            ],
            "duration": [
                "Duration",
                "Duration is an interesting one. We see a steep rise until the turn of the millennium which was probably driven by <a href=\"https://www.vox.com/2014/8/18/6003271/why-are-songs-3-minutes-long\" target=\"_blank\" rel=\"noopener noreferrer\">technological changes</a> <i class=\"fa fa-external-link\" aria-hidden=\"true\"></i> (switch from 78s to 45s in the late 50s/early 60s, invention of the cassette and CD) but then after we see a decrease, which coincides with the release of Napster in 1999 and the rise of streaming thereafter. Musicians have always had to adapt to consumer practices, the so-called “3-minute rule” being an obvious example. This stated that in order to be commercially successful, a single had to have a maximum duration of 3 minutes which was based on radio airplay where DJs had to fit songs around commercials and news. We see that this holds true only up until the late 60s where songs broke this limit, probably due to the onset of the AOR era and prog-rock. Interestingly, although streaming doesn’t seem to be bound by any such rules regarding its length, songs are getting shorter since streaming was invented. Perhaps this is linked to attention economy where a quicker hook means a longer duration probably isn’t necessary."
            ],
            "weeks_in_top_10": [
                "Weeks in the Top 10",
                "Although not forming part of any study, I was interested to see if streaming had any obvious effect on the charts. The data seems to suggest that since the mid noughties, when iPods and streaming was coming to the fore, there has been an increase in the length of time a song stays in the Top 10. This could be due to the fact that there is no longer a physical medium to produce. Digital songs available on streaming platforms can exist in perpetuity whereas in the past they would have a limited shelf life depending on sales, affecting how long it could stay in the charts."
            ],
        };

        document.getElementById("attention-economy-title").textContent = explanations[prop][0];
        document.getElementById("attention-economy-explanation").innerHTML = explanations[prop][1];
    }
}