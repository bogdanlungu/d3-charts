function draw(data) {
    var width = 520,
        barHeight = 30;

    var x = d3.scale.linear()
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width);

    x.domain([0, d3.max(data, function(d) {
        return d.turnover;
    })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * barHeight + ")";
        });

    bar.append("rect")
        .attr("width", function(d) {
            return x(parseInt(d.turnover));
        })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) {
            return x(d.turnover) - 3;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) {
            return d.turnover;
        });

    bar.append("text")
        .attr("x", function(d) {
            return 50;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) {
            return d.month;
        })
        .attr("class", "month");
}


function type(d) {
    d.turnover = +d.turnover;
    return d;
}

d3.tsv("data.tsv", type, draw);
