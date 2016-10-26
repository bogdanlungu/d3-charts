$(document).ready(function() {
    //Width and height
    var w = 800;
    var h = 600;

    //Define map projection


    var projection = d3.geo.mercator() // the projection
        .center([25, 45]) // coordinates
        .translate([w / 2, h / 2]) // center the image obtained in the svg
        .scale([w / 0.3]); // zoom, smaller value bigger zoom

    //Define path generator
    var path = d3.geo.path()
        .projection(projection);


    //Create SVG
    var svg = d3.select("#container")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "someSvg");

    //Load in GeoJSON data
    d3.json("data.json", function(json) {

        //Translate in Romanian
        var neighbours = {
            "Hungary": "Ungaria",
            "Ukraine": "Ucraina",
            "Slovakia": "Slovacia"
        }

        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("stroke", "rgba(8, 81, 156, 1)")
            .attr("fill", "rgba(0, 176, 240, 1)")
            .attr("id", function(d) {
                return d.properties.name_long
            })
            .on("click", function(d) {
                console.log(d.properties.name_long);
            });

        svg.selectAll("text")
            .data(json.features)
            .enter()
            .append("svg:text")
            .text(function(d) {
                if (neighbours.hasOwnProperty(d.properties.name)) {
                    return neighbours[d.properties.name];
                }
                return d.properties.name;
            })
            .attr("x", function(d) {
                if (path.centroid(d)[0])
                    return path.centroid(d)[0];
            })
            .attr("y", function(d) {
                if (path.centroid(d)[1])
                    return path.centroid(d)[1];
            })
            .attr("text-anchor", "middle")
            .attr("fill", "#FFFFFF")
            .attr('font-size', '10pt');

    });

});
