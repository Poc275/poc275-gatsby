class IntrosPlot {
    constructor() {
        this._margin = {
            top: 40,
            right: 20,
            bottom: 40,
            left: 60
        };
        this._width = 1800 - this._margin.right - this._margin.left;
        this._height = 850 - this._margin.top - this._margin.bottom;
        this._svg = null;
        this._xScale = null;
        this._yScale = null;
        this._colourScale = null;
        this._songOpacity = 0.6;
        this._songColours = ["#fb7c5c", "#f5553d", "#e23028", "#c2181c", "#9b0d14", "#67000d", "#120002"];

        this._nightingale = new Nightingale();
        this._nightingale.init();

        this._audio = new Audio();
        this._previewPlaying = false;
        this._selectedSong = null;
    }

    drawAxes(svg, xScale, yScale) {
        const xAxis = d3.axisBottom(xScale)
            .ticks(d3.timeYear)
            .tickFormat(x => `'${x.getFullYear().toString().slice(2, 4)}`);
            // .ticks(30);
    
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${this._height})`)
            .call(xAxis);
    
        const yAxis = d3.axisLeft(yScale)
            .tickValues([0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 90, 120, 180, 240, 300, 360, 420, 480, 550])
            .tickSize(-this._width)
            .tickSizeOuter(0);
    
        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
    }

    updatePlayButtonContent(isPlaying) {
        const content = isPlaying ? "<i class='fa fa-pause' aria-hidden='true'></i> Pause" : 
            "<i class='fa fa-play' aria-hidden='true'></i> Play";
        document.getElementById("info-slider-play-btn").innerHTML = content;
    }

    play(player, song) {
        if(player.instance) {
            // we have a Spotify player so can play the full track
            if(song.id === this._selectedSong) {
                // same song, toggle playback
                player.togglePlay().then(isPlaying => this.updatePlayButtonContent(isPlaying));

            } else {
                // new song selected
                this._selectedSong = song.id;
                player.getTrack(song.id)
                    .then(() => {
                        player.togglePlay().then(isPlaying => this.updatePlayButtonContent(isPlaying));
                    });
            }

        } else {
            // can only play a 30s preview
            if(song.id === this._selectedSong) {
                // same song, pause if playing
                if(this._previewPlaying) {
                    // pause
                    this._audio.pause();
                    this._previewPlaying = !this._previewPlaying;
                    this.updatePlayButtonContent(this._previewPlaying);
                } else {
                    // resume
                    this._audio.play();
                    this._previewPlaying = !this._previewPlaying;
                    this.updatePlayButtonContent(this._previewPlaying);
                }
            } else {
                // new song selected
                this._selectedSong = song.id;

                // check if preview is available
                if(song.preview_url === "") {
                    this._audio.src = null;

                } else {
                    this._audio.src = song.preview_url;
                    this._audio.play().then(() => {
                        this._previewPlaying = !this._previewPlaying;
                        this.updatePlayButtonContent(this._previewPlaying);
                    });
                }
            }
        }
    }

    addLegend() {
        const legend = this._svg
            .append("g")
            .attr("class", "legend")
            .attr('transform', `translate(${this._width - this._margin.right - 110}, ${this._margin.top + 50})`);

        // min/max/iqr bars
        legend.append("rect")
            .attr("width", 20)
            .attr("height", 100)
            .style("fill", "#cbc4ab")
            .style("fill-opacity", 0.3);

        legend.append("rect")
            .attr("y", 25)
            .attr("width", 20)
            .attr("height", 50)
            .style("fill", "#99907f")
            .style("fill-opacity", 0.3);

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", -35)
            .attr("y", 0)
            .text("Max");

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", -35)
            .attr("y", 100)
            .text("Min");

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", 30)
            .attr("y", 25)
            .text("Q3");

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", 30)
            .attr("y", 75)
            .text("Q1");

        // colour
        legend.append("g")
            .selectAll(".colour-scale-rect")
            .data(this._songColours)
            .enter()
                .append("rect")
                .attr("class", "colour-scale-rect")
                .attr("x", 70)
                .attr("y", (d, i) => i * (100 / this._songColours.length))
                .attr("width", 20)
                .attr("height", 100 / this._songColours.length)
                .style("fill", d => d)
                .style("fill-opacity", this._songOpacity);

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", 45)
            .attr("y", -20)
            .text("Weeks in Top 10");

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", 100)
            .attr("y", 0)
            .text("1");

        legend.append("text")
            .attr("class", "legend-text")
            .attr("x", 100)
            .attr("y", 100)
            .text("35");
    }

    plot(songs, yearlyStats, player) {
        // svg container
        this._svg = d3.select('#intros-plot')
            .append('svg')
            .attr('width', this._width + this._margin.right + this._margin.left)
            .attr('height', this._height + this._margin.top + this._margin.bottom)
            // .attr('id', 'intros-plot-svg')
            .append('g')
            .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`);

        // scales
        const timeExtents = d3.extent(songs, d => d.entered);
        this._xScale = d3.scaleTime()
            .domain([new Date(1952, 0, 1), new Date(2021, 11, 31)])
            .range([0, this._width]);

        const vocalStartExtents = d3.extent(songs, d => d.vocals_start);

        // const yScale = d3.scaleLog()
        //     .domain([0.05, vocalStartExtents[1]])
        //     .range([height, 0]);
            // .nice();

        // symlog scale which spreads out the extreme ends more
        this._yScale = d3.scaleSymlog()
            .domain([0, vocalStartExtents[1]])
            .constant(1)
            .range([this._height, 0]);

        // peak for colour?
        // this._colourScale = d3.scaleLinear()
        //     .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        //     // .domain([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
        //     .range(["#0d0887","#46039f","#7201a8","#9c179e","#bd3786","#d8576b","#ed7953","#fb9f3a","#fdca26","#f0f921"]);

        // try weeks in top 10 for colour but quantize as interpolated colours are hard to quantify
        this._colourScale = d3.scaleQuantize()
            .domain(d3.extent(songs, d => d.weeks_in_top_10))
            .range(this._songColours);

        // draw yearly min/max bars
        this._svg.append('g')
            .attr('class', 'song-bars')
            .selectAll('.song-min-max-bar')
            .data(yearlyStats)
            .enter()
                .append('rect')
                .attr('class', 'song-min-max-bar')
                .attr('x', (d, i) => this._xScale(new Date(d[0], 0, 1)))
                .attr('y', (d, i) => this._yScale(d[1].max))
                .attr('width', (this._width - this._margin.left - this._margin.right) / 70)
                .attr('height', (d, i) => this._yScale(d[1].min) - this._yScale(d[1].max))
                .attr('fill', '#cbc4ab')
                .attr('fill-opacity', 0.3);

        // yearly iqr bars
        this._svg.select('.song-bars')
            .selectAll('.song-iqr-bar')
            .data(yearlyStats)
            .enter()
                .append('rect')
                .attr('class', 'song-iqr-bar')
                .attr('x', (d, i) => this._xScale(new Date(d[0], 0, 1)))
                .attr('y', (d, i) => this._yScale(d[1].iqr3))
                .attr('width', (this._width - this._margin.left - this._margin.right) / 70)
                .attr('height', (d, i) => this._yScale(d[1].iqr1) - this._yScale(d[1].iqr3))
                .attr('fill', '#99907f')
                .attr('fill-opacity', 0.3);

        // tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .attr("opacity", 0);

        // draw axes before circles so axis grid lines only appear on top of min/max bars for easier reading
        this.drawAxes(this._svg, this._xScale, this._yScale);

        // draw scatter
        this._svg.append('g')
            .attr('class', 'song-points')
            .selectAll('.song')
            .data(songs)
            .enter()
                .append('circle')
                .attr('class', (d, i) => `song id-${d.id}`)
                .attr('cx', d => this._xScale(d.entered))
                .attr('cy', d => this._yScale(d.vocals_start))
                // .attr('r', (d, i) => radiusScale(d.peak))
                // .attr('r', (d, i) => getBubbleSize(d.peak))
                .attr('r', 4)
                // .style('fill', 'dodgerblue')
                // .style('fill', d => this._colourScale(d.peak))
                .style('fill', d => this._colourScale(d.weeks_in_top_10))
                .style('fill-opacity', this._songOpacity);
                // .style('stroke', '#111')
                // .style('stroke-width', 1);

        // voronoi grid using the faster delaunay triangulation
        const delaunay = d3.Delaunay.from(songs, d => this._xScale(d.entered), d => this._yScale(d.vocals_start));

        // mousemove event handler, uses delaunay triangles to find closest song
        let selectedSongId = 0;
        this._svg.on("mousemove", event => {
            const [mouseX, mouseY] = d3.pointer(event);
            const nearestSong = delaunay.find(mouseX, mouseY, selectedSongId);
            const song = songs[nearestSong];

            // limit search radius to a certain threshold
            // taken from https://observablehq.com/@d3/delaunay-find
            // const radius = 30;
            // const d = Math.hypot(mouseX - this._xScale(song.entered), mouseY - this._yScale(song.vocals_start));
            // console.log(d);

            selectedSongId = nearestSong;
            const vocalsStartText = song.vocals_start === song.duration ? `Instrumental` : `${song.vocals_start} secs until vocals`;
            const tipText = `<strong>${song.title}</strong> by ${song.artist}<br />${song.entered.toLocaleDateString()}, 
                peaked at #${song.peak}<br />${vocalsStartText}`;

            tooltip.html(tipText)
                .style("left", `${event.pageX + 28}px`)
                .style("top", `${event.pageY - 28}px`);

            tooltip.transition()
                .duration(500)
                .style("opacity", 0.9);

            d3.selectAll('.song').transition()
                .duration(200)
                .style('fill-opacity', d => d.id === song.id ? this._songOpacity : 0.2);
        });

        this._svg.on("mouseleave", event => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);

            d3.selectAll('.song').transition()
                .duration(200)
                .style('fill-opacity', this._songOpacity);
        });

        this._svg.on("click", event => {
            const d = songs[selectedSongId];
            // highlight circle
            clickedSong
                .attr('cx', this._xScale(d.entered))
                .attr('cy', this._yScale(d.vocals_start))
                .transition().duration(300)
                .style('opacity', 1);
            
            document.getElementById("info-slider-track").textContent = d.title;
            document.getElementById("info-slider-artist").textContent = d.artist;
            document.getElementById("info-slider-date").textContent = d.entered.toLocaleDateString();
            document.getElementById("info-slider-peak").textContent = d.peak;
            document.getElementById("info-slider-duration-mins").textContent = Math.floor(d.duration / 60);
            document.getElementById("info-slider-duration-secs").textContent = Math.round(d.duration % 60);

            // stop any previously playing track in full or preview mode
            if(player._isPlaying) {
                player.togglePlay().then(isPlaying => {
                    this.updatePlayButtonContent(isPlaying);
                });
            }
            
            if(this._previewPlaying) {
                this._audio.pause();
                this._previewPlaying = !this._previewPlaying;
                this.updatePlayButtonContent(this._previewPlaying);
            }
            
            // if playing a preview (i.e. player is not instantiated) check preview is available
            if(!player.instance && !d.preview_url) {
                document.getElementById("info-slider-play-btn").disabled = true;
                document.getElementById("no-preview").style.visibility = "visible";
            } else {
                document.getElementById("info-slider-play-btn").disabled = false;
                document.getElementById("no-preview").style.visibility = "hidden";
                document.getElementById("info-slider-play-btn").onclick = () => this.play(player, d);
            }

            // document.getElementById("info-slider-play-btn").onclick = () => this.play(player, d);

            document.getElementById("info-slider").style.width = "550px";

            this._nightingale.data = d;
            this._nightingale.render();
        });

        // draw regression line
        const loessRegression = d3.regressionLoess()
            .x(d => d.entered)
            .y(d => d.vocals_start)
            .bandwidth(0.15);

        const loessRegressionLine = loessRegression(songs);
        // console.log(loessRegressionLine);

        const regressionLineGen = d3.line()
            .x(d => this._xScale(d[0]))
            .y(d => this._yScale(d[1]));

        this._svg.select('.song-points')
            .append('path')
                .attr('class', 'regression-line')
                .attr('id', 'regression-line')
                .attr('d', regressionLineGen(loessRegressionLine))
                .style('stroke', 'purple')
                .style('stroke-width', 3)
                .style('fill', 'none')
                // set to hidden initially
                .style('opacity', 0);

        // clicked highlighter
        const clickedSong = this._svg.append('circle')
            .attr('class', 'song-clicked')
            .attr('r', 5)
            .style('opacity', 0);

        // add annotations
        this.addAnnotations();

        // add legend
        this.addLegend();

        // axis labels
        this._svg.append('text')
            .attr('transform', `translate(${this._width / 2}, ${this._height + 40})`)
            .style("text-anchor", "middle")
            .text("Year");

        this._svg.append('text')
            .attr('class', 'y-axis-label')
            .attr('transform', "rotate(-90)")
            .attr("x", 0 - (this._height / 2))
            .attr("y", 0 - this._margin.left)
            .attr("dy", "1.5rem")
            .style("text-anchor", "middle")
            .text("Time before the vocal starts (s)");
    }
    
    initTimerBar() {
        this._svg.selectAll('.timer-bar').empty() ? 
            this._svg.select('.song-points')
                .selectAll('.timer-bar')
                .data([0])
                .enter()
                    .append('line')
                    .attr('class', 'timer-bar')
                    .attr('x1', this._xScale(new Date(1952, 0, 1)))
                    .attr('y1', (d, i) => this._yScale(d))
                    .attr('x2', this._xScale(new Date(2021, 11, 31)))
                    .attr('y2', (d, i) => this._yScale(d))
                    .style('stroke', 'green')
        : null;
    }

    moveTimer(pos) {
        this._svg.selectAll('.timer-bar')
            .attr('y1', this._yScale(pos))
            .attr('y2', this._yScale(pos));

        this._svg.selectAll('.song')
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
                .style('fill-opacity', (d, i) => pos > d.vocals_start ? this._songOpacity : 0);
    }

    addAnnotations() {
        const type = d3.annotationCustomType(d3.annotationXYThreshold, {
            "note": {
                "lineType": "none",
                "orientation": "top",
                "align": "middle"
            }
        });

        const annotations = [
            {
                note: {
                    label: "Final US-made 78/10\" produced. 45/7\" is now the dominant format increasing length from 3 mins per side to 5 mins.",
                    title: "1959"
                },
                data: {
                    date: new Date(1959, 0, 1)
                },
                y: this._margin.top,
                dx: 30,
                dy: 50,
                subject: {
                    y1: this._margin.top + 50,
                    y2: this._height,
                }
            },
            {
                note: {
                    label: "MTV Launches",
                    title: "1981"
                },
                data: {
                    date: new Date(1981, 7, 1)
                },
                y: this._margin.top,
                dx: -40,
                dy: 0,
                subject: {
                    y1: this._margin.top,
                    y2: this._height,
                }
            },
            {
                note: {
                    label: "Cassettes outsell vinyl for the first time",
                    title: "1984",
                    wrap: 120
                },
                data: {
                    date: new Date(1984, 7, 1)
                },
                y: this._margin.top,
                dx: 30,
                dy: 20,
                subject: {
                    y1: this._margin.top + 20,
                    y2: this._height,
                }
            },
            {
                note: {
                    label: "CD sales surpass cassettes for the first time",
                    title: "1989",
                    wrap: 120
                },
                data: {
                    date: new Date(1989, 7, 1)
                },
                y: this._margin.top,
                dx: 40,
                dy: 20,
                subject: {
                    y1: this._margin.top + 20,
                    y2: this._height,
                }
            },
            {
                note: {
                    label: "Initial release of Napster",
                    title: "1999"
                },
                data: {
                    date: new Date(1999, 5, 1)
                },
                y: this._margin.top,
                dx: 30,
                dy: 0,
                subject: {
                    y1: this._margin.top,
                    y2: this._height,
                }
            },
            {
                note: {
                    label: "CD sales outnumbered by downloads for the first time. Downloads of singles outnumber albums by a margin of 19 to 1.",
                    title: "2006"
                },
                data: {
                    date: new Date(2006, 5, 23)
                },
                y: this._margin.top,
                dx: 0,
                dy: 120,
                subject: {
                    y1: this._margin.top + 120,
                    y2: this._height,
                }
            },
            {
                note: {
                    label: "Spotify launches",
                    title: "2008"
                },
                data: {
                    date: new Date(2008, 9, 7)
                },
                y: this._margin.top,
                dx: 30,
                dy: 180,
                subject: {
                    y1: this._margin.top + 180,
                    y2: this._height,
                }
            }
        ];

        const makeAnnotations = d3.annotation()
            .textWrap(220)
            .notePadding(15)
            .disable(["connector"])
            .type(type)
            .accessors({
                x: d => this._xScale(d.date)
            })
            .annotations(annotations);

        this._svg
            .append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);
    }

    selectArtist(artist) {
        this._svg.selectAll('.song')
            .transition("select-artist").duration(1000)
            .attr('r', d => d.artist.includes(artist) ? 8 : 4)
            .style('fill', d => d.artist.includes(artist) ? 'dodgerblue' : this._colourScale(d.weeks_in_top_10))
            .style('fill-opacity', this._songOpacity);
    }

    selectInstrumentals() {
        this._svg.selectAll('.song')
            .transition("select-instrumentals").duration(1000)
            .attr('r', d => d.vocals_start === d.duration ? 8 : 4)
            .style('fill', d => d.vocals_start === d.duration ? 'dodgerblue' : this._colourScale(d.weeks_in_top_10));
    }

    resetView() {
        this._svg.selectAll('.song')
            .transition().duration(1000)
            .attr('r', d => 4)
            .style('fill', d => this._colourScale(d.weeks_in_top_10));
    }
}