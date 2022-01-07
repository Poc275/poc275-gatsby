class Nightingale {
    constructor() {
        this._margin = {
            top: 20,
            right: 0,
            bottom: 20,
            left: 20
        };
        this._width = 500 - this._margin.right - this._margin.left;
        this._height = 500 - this._margin.top - this._margin.bottom;
        this._numOfWedges = 8;
        this._wedgeRads = (360 / this._numOfWedges) * Math.PI / 180;
        this._labelSize = 60;
        this._centreX = (this._width - this._margin.right - this._margin.left) / 2;
        this._centreY = (this._height - this._margin.top - this._margin.bottom) / 2;

        this._svg = null;
        this._song = {};
        this._data = [];
        this._allTimeAverages = [
            215595.6628 / 1000,
            0.604791847,
            0.631571127,
            0.046725719,
            12309.08969 / 1000,
            -8.340757314,
            0.061091463,
            0.616195779
        ];
    }

    get data() {
        return this._data;
    }

    set data(song) {
        this._song = song;
        this._data = this.orderData([
            song.duration,
            song.danceability,
            song.energy,
            song.instrumentalness,
            song.vocals_start,
            song.loudness,
            song.speechiness,
            song.valence
        ]);

        // max limits for testing...
        // this._data = this.orderData([
        //     841440 / 1000,
        //     1,
        //     1,
        //     1,
        //     552200 / 1000,
        //     -1.19,
        //     1,
        //     1
        // ]);
    }

    orderData(data) {
        // sort song stats and all time averages so wedges are drawn correctly
        const orderedData = [];

        for(let i = 0; i < this._numOfWedges; i++) {
            if(data[i] >= this._allTimeAverages[i]) {
                // add larger of values first to prevent z-order "hiding"
                orderedData.push({
                    'wedge': i + 1,
                    'value': data[i],
                    'stat': 'song',
                    'id': `song_${i + 1}`
                });

                orderedData.push({
                    'wedge': i + 1,
                    'value': this._allTimeAverages[i],
                    'stat': 'all_time_avg',
                    'id': `all_time_avg_${i + 1}`
                });
            } else {
                orderedData.push({
                    'wedge': i + 1,
                    'value': this._allTimeAverages[i],
                    'stat': 'all_time_avg',
                    'id': `all_time_avg_${i + 1}`
                });

                orderedData.push({
                    'wedge': i + 1,
                    'value': data[i],
                    'stat': 'song',
                    'id': `song_${i + 1}`
                });
            }
        }

        return orderedData;
    }

    render() {
        // tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "nightingale-tooltip")
            .attr("opacity", 0);

        // scales
        const durationScale = d3.scaleLinear()
            // / 1000 to convert from ms to s
            .domain([0, (841440 / 1000)])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const danceabilityScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const energyScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const instrumentalnessScale = d3.scaleLog()
            .domain([0.0000001, 1])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const vocalsStartScale = d3.scaleLog()
            .domain([0.05, (552200 / 1000)])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const loudnessScale = d3.scaleLinear()
            .domain([-26.493, -1.19])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const speechinessScale = d3.scaleLog()
            .domain([0.005, 1])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const valenceScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, d3.min([this._centreX, this._centreY]) - this._labelSize]);

        const scales = [
            durationScale,
            danceabilityScale,
            energyScale,
            instrumentalnessScale,
            vocalsStartScale,
            loudnessScale,
            speechinessScale,
            valenceScale
        ];

        const arc = d3.arc()
            .innerRadius(this._labelSize)
            .outerRadius((d, i) => scales[d.wedge - 1](d.value) + this._labelSize)
            .startAngle((d, i) => {
                return (d.wedge - 1) * this._wedgeRads;
            })
            .endAngle((d, i) => {
                return d.wedge * this._wedgeRads;
            });

        this._svg.select('.nightingale-plot')
            .selectAll('.wedge')
            .data(this.data, d => d.id)
            .join(
                enter => enter.append('path')
                    .attr('class', 'wedge')
                    .attr('d', arc)
                    .style('fill', (d, i) => d.stat === 'song' ? '#1e1e1e' : '#787878')
                    .style('stroke', '#111')
                    .style('stroke-width', 0.2)
                    .style('fill-opacity', 1),
                update => update
                    .style('fill', (d, i) => d.stat === 'song' ? '#1e1e1e' : '#787878')
                    .call(update => update.transition().duration(2000).attr('d', arc)),
                exit => exit.remove()
            )
            .on('mouseover', (event, d) => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0.9);

                d3.select(event.target).transition()
                    .duration(200)
                    .style('fill', (d, i) => d.stat === 'song' ? '#484848' : '#a2a2a2')

                const categories = ['Duration', 'Danceability', 'Energy', 'Instrumentalness', 'Vocals Start', 'Loudness', 'Speechiness', 'Valence'];
                const categoryExplanations = [
                    'Length of song in seconds',
                    'How suitable a track is for dancing. A value of 0.0 is least danceable and 1.0 is most danceable.',
                    'Energy is a measure of intensity and activity, ranging from 1.0 (very energetic) to 0.0 (not energetic).',
                    'A measure of vocal content where values closer to 1.0 are more likely to contain no vocals (uses a log scale)',
                    'Time in seconds before the vocal starts. Equals the duration if instrumental (uses a log scale).',
                    'The overall loudness of a track in decibels (dB). Typical range is between -60 and 0 dB.',
                    'Presence of spoken words in a track. The closer to 1.0 the more likely the track contains speech only (uses a log scale).',
                    'A measure from 0.0 (negative) to 1.0 (positive) describing the musical positiveness conveyed by a track.'
                ];
                
                const cssSuffix = d.stat === 'song' ? 'song' : 'all-time-avg';

                // get the "corresponding" wedge to show both the song's value and the all time average value together
                const correspondingWedge = this._data.filter(x => x.wedge === d.wedge && x.stat !== d.stat);
                const correspondingWedgeText = correspondingWedge[0].stat === 'song' ? 
                    `<div class='nightingale-key-song'></div> ` : 
                    `<div class='nightingale-key-all-time-avg'></div>`;

                const tipText = `<strong>${categories[d.wedge - 1]}</strong><br />
                    <div class='nightingale-key-${cssSuffix}'></div> ${d.value.toFixed(4)}
                    ${correspondingWedgeText} ${correspondingWedge[0].value.toFixed(4)}`;

                tooltip.html(tipText)
                    .style("left", `${event.pageX - 28}px`)
                    .style("top", `${event.pageY + 28}px`);

                // show explainer text for the category
                const explanation = `<em>${categories[d.wedge - 1]}</em>: ${categoryExplanations[d.wedge - 1]}`;
                document.getElementById("nightingale-explainer-text").innerHTML = explanation;
            })
            .on('mouseout', (event, d) => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);

                d3.select(event.target).transition()
                    .duration(200)
                    .style('fill', (d, i) => d.stat === 'song' ? '#1e1e1e' : '#787878');

                // clear explainer text
                document.getElementById("nightingale-explainer-text").innerHTML = "";
            });

        // update record label
        this._svg.select('.label')
            .attr('href', this._song.artwork);        
    }

    init() {
        // svg
        this._svg = d3.select('.nightingale')
            .append('svg')
            .attr('width', this._width + this._margin.right + this._margin.left)
            .attr('height', this._height + this._margin.top + this._margin.bottom);

        // initialise container
        this._svg.append('g')
            .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`)
            .append('g')
                .attr('class', 'nightingale-plot')
                .attr('transform', `translate(${this._centreX}, ${this._centreY})`)

        const labelArc = d3.arc()
            .innerRadius(5)
            .outerRadius(this._labelSize)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        // append clipping path for the record label
        this._svg.append('defs')
            .append('clipPath')
                .attr('id', 'record-label-path')
                .append('path')
                    .attr('d', labelArc)
                    .attr('fill', 'none');

        // image label
        this._svg.select('.nightingale-plot')
            .append('image')
                .attr('class', 'label')
                .attr('x', -this._labelSize)
                .attr('y', -this._labelSize)
                .attr('width', this._labelSize * 2)
                .attr('height', this._labelSize * 2)
                .attr('clip-path', 'url(#record-label-path)');

        // add record "grooves"
        // for(let i = this._labelSize; i < 250; i += 5) {
        //     this._svg.select('.nightingale-plot').append('path')
        //         .attr('d', d3.arc().innerRadius(0).outerRadius(i).startAngle(0).endAngle(2 * Math.PI))
        //         .attr('fill', 'none')
        //         .attr('stroke', 'antiquewhite')
        //         .attr('stroke-thickness', 0.1)
        //         .attr('opacity', 0.1);
        // }

        // add headers
        const headerArc = d3.arc()
            .innerRadius(0)
            .outerRadius(d3.min([this._centreX, this._centreY]) + 5)
            .startAngle((d, i) => {
                return (d - 1) * this._wedgeRads;
            })
            .endAngle((d, i) => {
                return d * this._wedgeRads;
            });

        this._svg.select('.nightingale-plot')
            .selectAll('.header-arc')
            .data(new Array(this._numOfWedges).fill(0).map((x, i) => i + 1))
            .enter()
                .append('path')
                    .attr('class', 'header-arc')
                    .attr('id', d => `header-arc-${d}`)
                    .attr('d', headerArc)
                    .style('fill', 'none')
                    .each((d, i) => {
                        // extract the outer arc for label placement using regex to extract from the path
                        // could just use the arc but centering is a lot tricker as the arc has inner/outer paths
                        // thanks to https://www.visualcinnamon.com/2015/09/placing-text-on-arcs/
                        // L is the start of a new segment
                        const firstArcSection = /(^.+?)L/;
                        let newArc = firstArcSection.exec(d3.select(`#header-arc-${d}`).attr('d'))[1];

                        // flip the bottom quadrant's labels so they are not upside down
                        // if the end angle lies between 90 and 270 degrees then flip
                        const endAngle = headerArc.endAngle()(d);
                        if(endAngle > 90 * Math.PI / 180 && endAngle <= 270 * Math.PI / 180) {
                            const startLoc = /M(.*?)A/;
                            const middleLoc = /A(.*?)0,0,1/;
                            const endLoc = /0,0,1(.*?).*/;

                            // flip the direction of the arc by switching the start and end points
                            // can't find a regex to match everything in-between so just use replace for now :|
                            const newStart = endLoc.exec(newArc)[0].replace("0,0,1", "").replace(',', '');
                            const newEnd = startLoc.exec(newArc)[0].replace('M', '').replace('A', '');
                            const newMiddle = middleLoc.exec(newArc)[0].replace('A', '').replace("0,0,1", "");

                            // build the new arc using a 0 instead of 1 for the sweep flag
                            newArc = `M${newStart}A${newMiddle}0,0,0,${newEnd}`;
                        }

                        // now we can create a new invisible arc for the labels
                        this._svg.select('.nightingale-plot')
                            .append('path')
                            .attr('class', 'hidden-header-arc')
                            .attr('id', `hidden-header-arc-${i}`)
                            .attr('d', newArc)
                            .style('fill', 'none');
                    });

        this._svg.select('.nightingale-plot')
            .selectAll('.header-label')
            .data(['Duration (s)', 'Danceability', 'Energy', 'Instumentalness', 'Vocals Start (s)', 'Loudness', 'Speechiness', 'Valence'])
            .enter()
                .append('text')
                    .attr('class', 'header-label')
                    // .attr('x', 5)
                    .attr('dy', (d, i) => {
                        // pad out according to quadrant to align correctly
                        const endAngle = headerArc.endAngle()(i + 1);
                        if(endAngle > 270 * Math.PI / 180 && endAngle <= 360 * Math.PI) {
                            return -8;
                        } else if (endAngle > 90 * Math.PI / 180) {
                            return 10;
                        } else {
                            return -3;
                        }
                    })
                    .append('textPath')
                        .attr('xlink:href', (d, i) => `#hidden-header-arc-${i}`)
                        // now we've extracted the hidden outer arcs, we can 
                        // use offset and anchor to centre labels correctly
                        .attr('startOffset', '50%')
                        .style('text-anchor', 'middle')
                        .text(d => d);
    }
}
