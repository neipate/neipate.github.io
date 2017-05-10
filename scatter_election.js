

var margin = {top: 20, right: 20, bottom: 30, left: 140},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// setup x 
var xValue = function(d) { return d[x_plotvar]*100;}, // data -> value
    xScale = d3.scale.linear().range([0, width]).domain(xpercent_range), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d[y_plotvar]*100;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]).domain(ypercent_range ), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var create_xaxis = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

var xaxis_label = create_xaxis.append("text")
    .attr("class", "label_x")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text(xlabel_0);




svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("class", "label_y")
    .attr("transform", "rotate(-90)")
    .attr("y", -45)
	.attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
	.text(ylabel_0);;


/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup fill color
var cValue = function(d) { return d.k_means_pca;},
    color = d3.scale.ordinal()
	  .domain([1,2,3,4,5,6,7,8])
	  .range([d3.rgb(255,0,0), d3.rgb(252,249,0) , d3.rgb(63,0,255),d3.rgb(0,204,0),d3.rgb(248,58,203),d3.rgb(0,207,255),d3.rgb(187,96,0),d3.rgb(255,161,0)]);

// add the graph canvas to the body of the webpage


// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
	.attr("font-size", "44px")
	.style("fill","red");

// load data

d3.csv("election_table.csv", function(error, data) {
 

  // draw dots
  
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.0)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
  
  });

function change_data(pres_xaxis,ballot_measure) {


    if (ballot_measure.length > 1)  {
    	y_plotvar = ballot_measure;
    }
    if (pres_xaxis.length > 1)  {
    	x_plotvar = pres_xaxis;
    }	

	if (x_plotvar == "rep_2012pres") {
	    x_label = "% Voting Republican in 2012 Presidential Election";
	} 
	if (x_plotvar == "rep_2016pres") { 
	    x_label = "% Voting Republican in 2016 Presidential Election";
	}
	if (x_plotvar == "White_Education") { 
	    x_label = "% of White Residents with at least a Bachelor's Degree";
	}	
	
d3.selectAll("circle").transition(24000).attr("cx", function(d){return d3.scale.linear().domain(xpercent_range).range([0, width])(d[x_plotvar]*100)+"px"}).attr("cy", function(d){return d3.scale.linear().domain(ypercent_range).range([height, 0])(d[y_plotvar]*100)+"px"})
	
  
d3.selectAll("circle")
    .on("mouseover", function(d) {
        tooltip.transition()
             .duration(200)
             .style("opacity", 1.0)
		     .attr("font-size", "24px")
			 .style("fill","red");
        tooltip.html(d.Town + "<br/> (" + Math.round(d[x_plotvar]*100) 
        + "," + Math.round(d[y_plotvar]*100) + ")")
             .style("left", (d3.event.pageX + 5) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.transition()
             .duration(500)
             .style("opacity", 0);
})
if (ballot_measure == "legalweed") {
	d3.selectAll("text.label_y").text("% Yes for Marijuana Legalization 2016");
} else if(ballot_measure == "charterschools")  {
	d3.selectAll("text.label_y").text("% Yes to more Charter Schools");
} else if(ballot_measure == "q2_2012_yes")  {	
	d3.selectAll("text.label_y").text("% Yes to Physician Assissted Suicide");
} else if(ballot_measure == "rep2016_trump") {
	d3.selectAll("text.label_y").text("% Voting for Trump in Republican Primary");
} else if(ballot_measure == "dem2016_bernie") {
	d3.selectAll("text.label_y").text("% Voting for Sanders in Democratic Primary");
} else if(ballot_measure == "dem2013_lynch") {
	d3.selectAll("text.label_y").text("% Voting for Steve Lynch in 2013 Democratic Primary");
} else if(ballot_measure == "q4_2014_yes") {
	d3.selectAll("text.label_y").text("% Yes for Sick Pay");
} else if(ballot_measure == "q1_2014_yes") {
	d3.selectAll("text.label_y").text("% Yes for Lower Gas Tax");
} else if(ballot_measure == "q3_2012_yes") {
	d3.selectAll("text.label_y").text("% Yes for Medical Marijuana 2012");
} else if(ballot_measure == "rep_2012pres") {
	d3.selectAll("text.label_y").text("% Voting Republican in 2012 Presidential Election");
} else if(ballot_measure == "rep_2016pres") {
	d3.selectAll("text.label_y").text("% Voting Republican in 2016 Presidential Election");
}
	
if (pres_xaxis.length > 1)  {
d3.selectAll("text.label_x").text(x_label)
}

}


