//Width and height
var w = 800;
var h = 600;

//Define map projection


var projection = d3.geo.mercator() // the projection
    .center([25, 45]) // coordinates
    .translate([w / 2, h / 2]) // center the image obtained in the svg
    .scale([w / 0.5]); // zoom, smaller value bigger zoom

//Define path generator
var path = d3.geo.path()
    .projection(projection);


//Create SVG
var svg = d3.select("#container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Load in GeoJSON data
d3.json("data.json", function(json) {

    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "rgba(8, 81, 156, 1)")
        .attr("fill", "rgba(0, 176, 240, 1)");

});
