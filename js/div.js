/**
 * Created by nghiepnds on 10/18/2016.
 */

(function(){
    //This using v3
    //drawDiv();
    drawSVG();
    //saveSVG();
    createSVG();
    //drawBarChart();
    //drawBarChartWithScale();

    //drawStandBar();
   // drawBubble();
    //drawBubble1();
    //drawTextSimpleLineChart();
    //drawTextMultiLineChart();

    //X-data is text
    function drawTextMultiLineChart(){
        //Chart dimension
        var frameWidth = 700, frameHeigh = 400;
        var margin = {top: 40, right: 80, bottom: 40, left: 40};
        var width =  frameWidth - margin.left - margin.right;    //900
        var height = frameHeigh - margin.top - margin.bottom;   //430
        var colors = ['#99CC00','#FFCC00','#FF9900','#FF6600','#666699','#969696','#003366','#339966','#003300','#333300','#993300','#333399','#7EBC89'];

        var chartData = [
            {
                orgName: "Washington Mutual Fund",
                scoreData: [
                    {name: "BM1", score: 58.13},
                    {name: "BM2", score: 53.98},
                    {name: "BM3", score: 67.00},
                    {name: "BM4", score: 89.70},
                    {name: "BM5", score: 99.00},
                    {name: "BM6", score: 130.28},
                    {name: "BM7", score: 166.70},
                    {name: "BM8", score: 234.98},
                    {name: "BM9", score: 345.44},
                    {name: "BM10", score: 443.34}
                ]
            },
            {
                orgName: "Vancouver University",
                scoreData: [
                    {name: "BM1", score: 59.13},
                    {name: "BM2", score: 83.98},
                    {name: "BM3", score: 97.00},
                    {name: "BM4", score: 49.70},
                    {name: "BM5", score: 69.00},
                    {name: "BM6", score: 80.28},
                    {name: "BM7", score: 205.70},
                    {name: "BM8", score: 234.98},
                    {name: "BM9", score: 245.44},
                    {name: "BM10", score: 343.34}
                ]
            }
        ];
        var xData = ["BM1", "BM2", "BM3","BM4", "BM5", "BM6","BM7", "BM8", "BM9", "BM10"];

        var maxScore = getMaxScore(chartData);
        var padding = 20;

        // Adds the svg canvas
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


        //Define scales
        var roundBand = 0.5;
        var xScale = d3.scale.ordinal()
            .domain(xData)
            .rangeRoundBands([margin.left, width-padding], roundBand);


        //var xScale = d3.time.scale().range([0, width]);
        var yScale = d3.scale.linear()
            //.domain([0, d3.max(scoreData, function(d) { return d.score; })])
            .domain([0, maxScore])
            .range([height- padding, 2*padding]);

        // Define the axes
        var xAxis = d3.svg.axis()
            .scale(xScale)
            //format x-tick data
            .tickFormat(function(d) {
                return d; })
            .ticks(xData.length)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
        //.ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { return xScale(d.name)+ 2*padding - 8; })
            .y(function(d) { return yScale(d.score); });

        //Draw lines
        for(var i = 0; i<chartData.length; i++){
            var orgColorIndex = i % colors.length;
            var orgName = chartData[i].orgName;
            var lineData = chartData[i].scoreData;
            // Add the value line path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(lineData))
                .attr("stroke", colors[orgColorIndex])
                .attr("stroke-width", 2)
                .attr("fill", "none");

            //Add vertical lines
            svg.selectAll("line")
                .data(lineData)
                .enter()
                .append("line")          // attach a line
                .style("stroke", "lightgrey")  // colour the line
                // x position of the first end of the line
                .attr("x1", function(d) {
                    return xScale(d.name)+ 2*padding - 8;
                })
                // y position of the first end of the line
                .attr("y1", function(d) {
                    return  yScale(d.score) })
                // x position of the second end of the line
                .attr("x2", function(d) {
                    return xScale(d.name)+ 2*padding - 8})
                .attr("y2", height - padding - 1);


            //Add label to the line
            svg.append("text")
                //.attr("transform", "translate(" + (width - 2*padding) + "," + yScale(d3.max(lineData, function(d) { return d.score; })) + ")")
                .attr("dy", ".35em")
                //.attr("dx", xScale(function(d) { return d.name; }) - padding)
                .attr("text-anchor", "start")
                .style("fill", "black")
                .attr("font-family", "sans-serif")
                .attr("font-size", 11)
                .text(orgName)
                .datum(function(d) {
                    //label go with the last item, need to find it
                    lastIndex = lineData.length - 1;
                    return lineData[lastIndex];
                })
                .attr("transform", function(d) {
                    //d is the last item
                    return "translate(" + (xScale(d.name) + 2*padding - 5) + "," + yScale(d.score) + ")";
                })

        }


        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + padding +"," + (height - padding) + ")")
            .call(xAxis);


        // Add the Y Axis
        var dy = "0.1em";
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left + padding) + ",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", dy)
            .attr("x", -40)
            .style("text-anchor", "end")
            .text("Score");
    }

    //X-data is text
    function drawTextSimpleLineChart(){
        //Chart dimension
        var frameWidth = 700, frameHeigh = 400;
        var margin = {top: 40, right: 40, bottom: 40, left: 50};
        var width =  frameWidth - margin.left - margin.right;    //900
        var height = frameHeigh - margin.top - margin.bottom;   //430


        var scoreData = [
            {name: "BM1", score: 58.13},
            {name: "BM2", score: 53.98},
            {name: "BM3", score: 67.00},
            {name: "BM4", score: 89.70},
            {name: "BM5", score: 99.00},
            {name: "BM6", score: 130.28},
            {name: "BM7", score: 166.70},
            {name: "BM8", score: 234.98},
            {name: "BM9", score: 345.44},
            {name: "BM10",score: 443.34}
        ];
        var xData = ["BM1", "BM2", "BM3","BM4", "BM5", "BM6","BM7", "BM8", "BM9", "BM10"];

        var padding = 20;

        // Adds the svg canvas
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // Set the ranges
        //Define scales
        var xScale = d3.scale.ordinal()
            .domain(xData)
            .rangeRoundBands([margin.left, width-padding], 0.5);


        //var xScale = d3.time.scale().range([0, width]);
        var yScale = d3.scale.linear()
            .domain([0, d3.max(scoreData, function(d) { return d.score; })])
            .range([height- padding, 2*padding]);

        // Define the axes
        var xAxis = d3.svg.axis()
            .scale(xScale)
            //format x-tick data
            .tickFormat(function(d) {
                return d; })
            .ticks(xData.length)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
            //.ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { return margin.left - padding + 3 + xScale(d.name); })
            .y(function(d) { return yScale(d.score); });


        // Add the value line path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(scoreData))
            .attr("stroke", "green")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        //Add vertical lines
        svg.selectAll("line")
            .data(scoreData)
            .enter()
            .append("line")          // attach a line
            .style("stroke", "lightgrey")  // colour the line
            // x position of the first end of the line
            .attr("x1", function(d) {
                return margin.left - padding + 3 + xScale(d.name)
            })
            // y position of the first end of the line
            .attr("y1", function(d) {
                return  yScale(d.score) })
            // x position of the second end of the line
            .attr("x2", function(d) {
                return margin.left - padding  + 3 + xScale(d.name)})
            .attr("y2", height - padding - 1);

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + padding +"," + (height - padding) + ")")
            .call(xAxis);


        // Add the Y Axis
        var dy = "0.1em";
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (margin.left + padding) + ",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", dy)
            .attr("x", -40)
            .style("text-anchor", "end")
            .text("Score");


    }

    //X-data is date
    function drawDateSimpleLineChart(){
        // Set the dimensions of the canvas / graph
        var margin = {top: 40, right: 40, bottom: 40, left: 50},
            width = 600 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // Adds the svg canvas
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        // Set the ranges
        //Define scales
        var xScale = d3.time.scale().range([0, width]);
        var yScale = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(xScale)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(yScale)
            .orient("left").ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.close); });

        // Get the data
        d3.csv("data/data.csv", function(error, data) {
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });

            // Scale the range of the data
            xScale.domain(d3.extent(data, function(d) { return d.date; }));
            yScale.domain([0, d3.max(data, function(d) { return d.close; })]);

            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

        });


    }

    function drawBubble() {
        var inputData = [
            {org: "HKHKHGJLKL",
            name: "Washington",
                data: [
                ["A", 20],
                ["B", 90],
                ["C", 50],
                ["D", 33],
                ["E", 95],
                ["F", 12],
                ["G", 44],
                ["H", 67],
                ["I", 21],
                ["J", 88]
            ]},
            {org: "HKHKHYTYRY",
             name: "Vancouver",
             data: [
                ["A", 25],
                ["B", 80],
                ["C", 70],
                ["D", 53],
                ["E", 65],
                ["F", 14],
                ["G", 64],
                ["H", 87],
                ["I", 60],
                ["J", 100]
            ]}
        ];


        var colors = [
            {fill: "yellow", stroke: "orange", text :"black"},
            {fill: "grey"  , stroke: "blue",   text :"white"},
            {fill: "black"  , stroke: "orange",   text :"white"},
            {fill: "magenta"  , stroke: "blue",   text :"yellow"},
            {fill: "green"  , stroke: "grey",   text :"black"},
            {fill: "blue"  , stroke: "yellow",   text :"white"},
            {fill: "orange"  , stroke: "black",   text :"blue"},
            {fill: "violet"  , stroke: "orange",   text :"white"},
            {fill: "pink"  , stroke: "blue",   text :"white"},
            {fill: "teal"  , stroke: "black",   text :"white"},
        ];

        //Need to get these data for input orgData, scoreData, xData
        var orgData = [
            {"id": "HKHKHGJLKL", "name:": "Washington"},
            {"id": "HKHKHYTYRY", "name:": "Vancouver"}
        ];
        var scoreData =[
            //x-value, y-value, orgIndex-->>color index
            ["A", 20, 0],
            ["B", 90, 0],
            ["C", 50, 0],
            ["D", 33, 0],
            ["A", 25, 1],
            ["B", 80, 1],
            ["C", 70, 1],
            ["D", 53, 1],
            ["A", 35, 2],
            ["B", 60, 2],
            ["C", 77, 2],
            ["D", 83, 2],
        ];
        var scoreData =[
            //x-value, y-value, orgIndex-->>color index
            ["A", 20, 0],
            ["B", 90, 0],
            ["C", 50, 0],
            ["D", 33, 0],
            ["E", 95, 0],
            ["F", 12, 0],
            ["G", 44, 0],
            ["H", 67, 0],
            ["I", 21, 0],
            ["J", 88, 0],
            ["A", 25, 1],
            ["B", 80, 1],
            ["C", 70, 1],
            ["D", 53, 1],
            ["E", 65, 1],
            ["F", 14, 1],
            ["G", 64, 1],
            ["H", 87, 1],
            ["I", 60, 1],
            ["J", 100, 1],
            ["A", 35, 2],
            ["B", 60, 2],
            ["C", 77, 2],
            ["D", 83, 2],
            ["E", 25, 2],
            ["F", 64, 2],
            ["G", 24, 2],
            ["H", 67, 2],
            ["I", 80, 2],
            ["J", 95, 2]
        ];

        var xData = ["A", "B"];
        var xData = ["A", "B", "C", "D"];
        var xData = ["A", "B", "C","D","E", "F", "G","H","I", "J"];

        //Chart dimension
        var frameWidth = 700, frameHeigh = 400;
        var margin = {top: 40, right: 40, bottom: 40, left: 40};
        var width =  frameWidth - margin.left - margin.right;    //900
        var height = frameHeigh - margin.top - margin.bottom;   //430

        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // add some padding, when padding = 0 some elements were cut off.
        // Using padding to define the area  of displaying chart

        var innerPad = 0.00;        //no inner padding
        var outerPad = 0.50;        //outer pad = 50% tick size
        var topPad = 30;            //top padding

        //Define scales
        var xScale = d3.scale.ordinal()
            .domain(xData)
            .rangeRoundBands([margin.left, width], innerPad, outerPad);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(scoreData, function(d) { return d[1]; })])
            .range([height - topPad, 2*topPad]);

        var rScale = d3.scale.linear()
            .domain([0, d3.max(scoreData, function(d) { return d[1]; })])
            .range([10, 25]); //radius values will always fall within this range

        //Define axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(function(d) {
                return d; })  //format x-tick data
            .ticks(xData.length)
            .tickPadding(3) //padding of tick label to the tick
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            //.ticks(5)
            .orient("left");

        var tickDistance =  xScale(scoreData[1][0])-xScale(scoreData[0][0]);
        var leftPadInPixel = tickDistance/2 + topPad;
        //Add vertical lines
        svg.selectAll("line")
            .data(scoreData)
            .enter()
            .append("line")          // attach a line
            .style("stroke", "lightgrey")  // colour the line
            .attr("x1", function(d) {
                console.log("xScale(d[0]):", xScale(d[0]));
                return  leftPadInPixel + xScale(d[0])})     // x position of the first end of the line
            .attr("y1", function(d) {
                return  yScale(d[1]) + rScale(d[1]) + 2 })      // y position of the first end of the line
            .attr("x2", function(d) {
                return  leftPadInPixel + xScale(d[0])})     // x position of the second end of the line
            .attr("y2", height - topPad);


        //Add bubbles, bubble is above the vertical lines
        svg.selectAll("circle")
            .data(scoreData)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return (leftPadInPixel + xScale(d[0]));
            })
            .attr("cy", function (d) {
                return yScale(d[1]);
            })
            .attr("r", function (d) {
                return rScale(d[1]);
            })
            //fill color
            .attr("fill", function (d, i) {
                var index = d[2]%colors.length;
                return colors[index].fill
            })
            //color of boundary
            .attr("stroke", function (d, i) {
                var index = d[2]% colors.length;
                return colors[index].stroke
            })
            //width of the boundary
            .attr("stroke-width", function (d) {
                return rScale(d[1]) / 4;
            });




        //Add texts
        svg.selectAll("text")
            .data(scoreData)
            .enter()
            .append("text")
            .text(function (d) {
                return d[1];
            })
            .attr("x", function (d) {
                var textWidth = this.getComputedTextLength();
                return leftPadInPixel - textWidth/2  + xScale(d[0]) ;
            })
            .attr("y", function (d) {
                return yScale(d[1]) + 5;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", function (d, i) {
                var index = d[2]% colors.length;
                return colors[index].text
            });

        //Adding X-Axis
        svg.append("g")
            .attr("class", "axis")
            //position of x-axis
            .attr("transform", "translate(" + topPad +"," + (height - topPad) + ")")
            .call(xAxis);

        //Add y-axis
        var dy = "0.1em";
        svg.append("g")
            .attr("class", "y axis")
            //position of y-axis
            .attr("transform", "translate(" + (margin.left + topPad) + ",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", dy)
            .attr("x", -40)
            .style("text-anchor", "end")
            .text("Score");

    }

    function drawBubble1() {
        //Input data
        var dataset = [
            ["A", 90],
            ["B", 90],
            ["C", 50],
            ["D", 33],
            ["E", 95],
            ["F", 12],
            ["G", 44],
            ["H", 67],
            ["I", 21],
            ["J", 88]
        ];

        var colors = [
            {fill: "yellow", stroke: "orange", text :"black"},
            {fill: "grey"  , stroke: "blue",   text :"white"}
        ];

        //var xData = ["A", "B", "C","D"];
        var xData = ["A", "B", "C","D", "E", "F","G", "H", "I", "J"];



        //Chart dimension
        var frameWidth = 700, frameHeigh = 400;
        var margin = {top: 40, right: 40, bottom: 40, left: 50};
        var width =  frameWidth - margin.left - margin.right;    //900
        var height = frameHeigh - margin.top - margin.bottom;   //430

        //Create SVG element
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // add some padding, when padding = 0 some elements were cut off.
        // Using padding to define the area  of displaying chart
        var innerPad = 0.00;        //no inner padding
        var outerPad = 0.50;        //outer pad = 50% tick size
        var topPad = 30;            //top padding

        //Define scales
        var xScale = d3.scale.ordinal()
            .domain(xData)
            .rangeRoundBands([margin.left, width], innerPad, outerPad);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d[1]; })])
            .range([height - topPad, 2*topPad]);

        var rScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) { return d[1]; })])
            .range([10, 20]); //radius values will always fall within this range



        //Define axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(function(d) {
                return d; })  //format x-tick data
            .ticks(xData.length)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(yScale)
            //.ticks(5)
            .orient("left");


        ////Making x-grid
        //svg.append("g")
        //    .attr("class", "grid")
        //    .attr("transform", "translate(" + padding + "," + height + ")")
        //    .call(make_x_axis(xScale)
        //        .tickSize(-height + padding, 0, 0)
        //        .tickFormat("")
        //);
        //Making y-grid
        //svg.append("g")
        //    .attr("class", "grid")
        //    .call(make_y_axis(yScale)
        //        .tickSize(-width, 0, 0)
        //        .tickFormat("")
        //);

        var tickDistance =  xScale(dataset[1][0])-xScale(dataset[0][0]);
        var leftPadInPixel = tickDistance/2 + topPad;
        //Add vertical lines
        svg.selectAll("line")
            .data(dataset)
            .enter()
            .append("line")          // attach a line
            .style("stroke", "lightgrey")  // colour the line
            .attr("x1", function(d) {
                return leftPadInPixel + xScale(d[0])})     // x position of the first end of the line
            .attr("y1", function(d) {
                return  yScale(d[1]) + rScale(d[1]) + 2 })      // y position of the first end of the line
            .attr("x2", function(d) {
                return leftPadInPixel + xScale(d[0])})     // x position of the second end of the line
            .attr("y2", height - topPad);


        //Add bubbles
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return (leftPadInPixel + xScale(d[0]));
            })
            .attr("cy", function (d) {
                return yScale(d[1]);
            })
            .attr("r", function (d) {
                return rScale(d[1]);
            })
            //fill color
            .attr("fill", function (d, i) {
                var index = i % 2;
                return colors[index].fill
            })
            //color of boundary
            .attr("stroke", function (d, i) {
                var index = i % 2;
                return colors[index].stroke
            })
            //width of the boundary
            .attr("stroke-width", function (d) {
                return rScale(d[1]) / 4;
            });


        //Add texts
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d[1];
            })
            .attr("x", function (d) {
                var textWidth = this.getComputedTextLength();
                return leftPadInPixel - textWidth/2  + xScale(d[0]) ;
            })
            .attr("y", function (d) {
                return yScale(d[1]) + 5;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", function (d, i) {
                var index = i % 2;
                return colors[index].text
            });


        //Adding X-Axis
        svg.append("g")
            .attr("class", "axis")
            //position of x-axis
            //.attr("transform", "translate(" + (margin.left - padding) +"," + (height - padding) + ")")
            .attr("transform", "translate(" + topPad +"," + (height - topPad) + ")")
            .call(xAxis);

        //Add y-axis
        var dy = "0.1em";
        svg.append("g")
            .attr("class", "y axis")
            //position of y-axis
            .attr("transform", "translate(" + (margin.left + topPad) + ",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", dy)
            .attr("x", -40)
            .style("text-anchor", "end")
            .text("Score");
    }

    //Bar chart with label, color range, scaling, axis
    function drawStandBar(){
        var ydata = [23, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
        var xdata =     ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"];
        var colors = ['#99CC00','#FFCC00','#FF9900','#FF6600','#666699','#969696','#003366','#339966','#003300','#333300','#993300','#333399','#7EBC89','#0283AF','#79BCBF','#99C19E'];
        //var ydata = [23, 10, 13, 19, 21];
        //var xdata = ["A", "B", "C", "D", "E"];

        //Configuration
        var expectBarwidth =  40;
        var barLeftPadding = 15;                //distance from y-axis to the first bar

        var frameWidth = 600, frameHeigh = 270;
        var margin = {top: 20, right: 20, bottom: 80, left: 60};
        frameWidth = expectBarwidth*xdata.length + barLeftPadding + margin.left + margin.right;
        var width =  frameWidth - margin.left - margin.right;    //900
        var height = frameHeigh - margin.top - margin.bottom;   //430

        var bWidth = width /xdata.length;       //bar width
        var bGap = 2;                           //distance among bars
        var bar2AxisGap = -2;                   //distance from x-axis to the bottom of bar
        var xAxisX = 0;                         //x-position of xAxis
        var xAxixTextAngle = "rotate(-30)";

        //Scaling
        //Because each bar get one extra pixel to make it seperate, we must scale
        //xvalues over a bigger range n(bar) * 1 = xdata.length
        var xScale = d3.scale.ordinal()
            .rangeRoundBands([xAxisX, width + xdata.length + bGap], 0.1);

        var yScale = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(function(d) { return d; })  //format x-tick data
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        xScale.domain(xdata.map(function(d) { return d;}));
        yScale.domain([0, d3.max(ydata, function(d) { return d; })]);

        //Add SVG object
        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Add bar
        svg.selectAll("rect")
            .data(ydata)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d, i) { return i*bWidth + barLeftPadding})
            .attr("width", xScale.rangeBand() + bGap)
            .attr("y", function(d) { return yScale(d) + bar2AxisGap; })
            .attr("height", function(d) { return height - yScale(d); })
            .attr("fill", function (d, i) {
                //var rand = Math.floor(Math.random() * 250) + 1;
                //return "rgb(5, 124, " + rand + ")";
                if(i > colors.length -1){
                    return (i % ydata.length);
                }else{
                    return colors[i]
                }
            });

        //Add text for bar, must after bar so that it can be on top
        svg.selectAll("text")
            .data(ydata)
            .enter()
            .append("text")
            .text(function(d) {return d;})
            .attr("x", function (d, i) {
                var textWidth = this.getComputedTextLength();       //get text box length
                var textLeftPad =  (bWidth - textWidth)/2;          //text padding
                return i * (bWidth) + textLeftPad + barLeftPadding; //x-position of text
            })
            .attr("y", function (d) {return (yScale(d) + 15);})
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");

        //Add x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height  + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", xAxixTextAngle)
            .style("text-anchor", "right");

        //Add y-axis
        var dy = "0.1em";
        //position of "Frequency" from the y-axis, small-left : big-right
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", dy)
            .style("text-anchor", "end")
            .text("Frequency");
    }

    function drawBarChartWithScale() {
        //var dataset = [ 5, 10, 15, 20, 25 ];
        var dataset = [23, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
        var data =     ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"];
        var outerW = 600;
        var outerH = 250;
        var barPadding = 1;

        var formatPercent = d3.format(".0%");

        //Margin definition
        var margin = {top: 20, right: 10, bottom: 20, left: 30};
        var width  = outerW   - margin.left - margin.right,    //600-10-30
            height = outerH - margin.top  - margin.bottom;   //250-20-20

        var barWidth = width / dataset.length - barPadding;
        var maxVal = d3.max(dataset, function(d) { return d; });
        var axisHeight = 17;

        //Scales
        var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1)
            .domain(data.map(function(d) {
                return d;
            }));

        var yScale = d3.scale.linear()
            .domain([0, maxVal])
            .range([height,0]);

        //The axis is created using the d3.svg.axis() function,
        var xAxis = d3.svg.axis()
            .scale(xScale)
            //tick text is below the line
            .orient("bottom");

        //Define Y axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        //Create SVG area
        var svg = d3.select("body")
            .append("svg")
            .attr("width", outerW)
            .attr("height",outerH)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var scaleCons = 4;
        //Add bars
        var rects = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d, i) {
                //return xScale(d);
                return i * (width / dataset.length);
            })
            .attr("width", (barWidth))
            .attr("y", function (d) {
                return (height - (4*d));
            })
            .attr("height", function (d) {
                //bar length d, equally extend it 3d: -->4d
                //axis is at the bottom so must reduce the bar length
                //reduce more 3 so that the axis is separated from the bar
                return ((4*d) -  3);
            })
            .attr("fill", function (d) {
                return "rgb(5, 134, " + (d * 10) + ")";
            });

        //Add text value to chart
        var textTopPad = 1;
        var texts = svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d;
            })
            .attr("x", function (d, i) {
                var textWidth = this.getComputedTextLength();       //get text box length
                var textLeftPad =  (barWidth - textWidth)/2;        //text padding
                return i * (width/dataset.length) + textLeftPad;      //x-position of text
            })
            .attr("y", function (d) {
                //h-d is the actual length of the bar, extend it 3d,  --> h-4d
                //increase y (15 pixels)so the text is inside the bar
                return (height - (4*d) + 15);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white");

        //Add x-axis to the chart
        svg.append("g")
            .attr("class", "x axis")
            //push axis from 0 to the bottom by increasing y: new position y = h- textTopPad - axisHeight
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        //Create Y axis
        svg.append("g")
            .attr("class", "y axis")
            //push y-axis to left
            .attr("transform", "translate(0, 0)")
            .call(yAxis);


        /*
         SVG transforms are quite powerful, and can accept several different kinds of
         transform definitions, including scales and rotations. But we are keeping it
         simple here with only a translation transform,
         which simply pushes the whole g group over and down by some amount.
        * */
    }

    function drawBarChart() {
        //var dataset = [ 5, 10, 15, 20, 25 ];
        var dataset = [23, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
        var w = 500;
        var h = 150;
        var barPadding = 1;
        var barWidth = w / dataset.length - barPadding;
        //Create SVG area
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        //Add bars
        var rects = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return i * (w / dataset.length);
            })
            .attr("y", function (d) {
                return (h - 4 * d);
            })
            .attr("width", barWidth)
            .attr("height", function (d) {
                return (4 * d);
            })
            .attr("fill", function (d) {
                return "rgb(5, 134, " + (d * 10) + ")";
            });

        //Add text to chart
        var textTopPad = 1;
        var texts = svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d;
            })
            .attr("x", function (d, i) {
                var textWidth = this.getComputedTextLength();       //get text box length
                var textLeftPad =  (barWidth - textWidth)/2;        //text padding
                return i * (w / dataset.length) + textLeftPad;      //x-position of text
            })
            .attr("y", function (d) {
                return h - (d * 4) + 15;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "white")
    }

    function drawDiv(){
        var dataset = []; //Initialize empty array
        for (var i = 0; i < 25; i++) { //Loop 25 times
            var newNumber = Math.random() * 30; //New random number (0-30)
            dataset.push(newNumber); //Add new number to array
        }

        //Draw DIV
        d3.select("body").selectAll("div")
            .data(dataset)
            .enter()
            .append("div")
            .attr("class", "bar")
            .style("height", function(d) {
                var barHeight = d * 5; //Scale up by factor of 5
                return barHeight + "px";
            });

    }

    function drawSVG(){
        //Draw SVG
        var w = 500;
        var h = 100;
        var data = [ 5, 10, 15, 20, 25 ];
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        //add circles to SVG
        var circles = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle");
        //set attr for circles
        circles.attr("cx", function(d, i) {
            return (i * 50) + 25;           //x-position of the center
        })
            .attr("cy", h/2)                //y-position of the center
            .attr("r", function(d) {
                return d;                   //radius of the circle
            })
            .attr("fill", "yellow")         //fill color
            .attr("stroke", "orange")       //color of boundary
            .attr("stroke-width", function(d) {
                return d/2;                 //width of the boundary
            });
    }

    function make_x_axis(x) {
        return d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(5)
    }

    function make_y_axis(y) {
        return d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
    }

    function type(d, _, columns) {
        d.date = parseTime(d.date);
        for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
        return d;
    }

    function getMaxScore(chartData){
        var max = 0;
        for(var i = 0; i<chartData.length; i++){
            var orgScoreData = chartData[i].scoreData;
            var orgMax = d3.max(orgScoreData, function(d) { return d.score; });
            max = d3.max([max, orgMax]);
        }
        console.log("Max Score: " + max);
        return max;
    }
}());
