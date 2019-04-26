// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#magic-chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// read data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_for_density2d.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([5, 20])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([5, 22])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // compute the density data
  var densityData = d3.contourDensity()
    .x(function(d) { return x(d.x); })   // x and y = column name in .csv input data
    .y(function(d) { return y(d.y); })
    .size([width, height])
    .bandwidth(20)    // smaller = more precision in lines = more lines
    (data)

  // Add the contour: several "path"
  svg
    .selectAll("path")
    .data(densityData)
    .enter()
    .append("path")
      .attr("d", d3.geoPath())
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-linejoin", "round")

  svg
    .append("g")
    .attr("stroke", "white")
    .selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 2);

})

