var width = 960,
    height = 1160;
 
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
    

// load and display UK
d3.json("uk.json", function(error, uk) {
  if (error) return console.error(error);
  
  var subunits = topojson.feature(uk, uk.objects.subunits);
  
  var projection = d3.geo.albers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(6000)
    .translate([width / 2, height / 2]);
    
  var path = d3.geo.path()
    .projection(projection);

  svg.append("path")
    .datum(subunits)
    .attr("d", path);
    
  var projection = d3.geo.albers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(6000)
    .translate([width / 2, height / 2]);
    
    svg.selectAll(".subunit")
    .data(topojson.feature(uk, uk.objects.subunits).features)
  .enter().append("path")
    .attr("class", function(d) { return "subunit " + d.id; })
    .attr("d", path);
    
    
//define the tooltip variable
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Frequency:</strong> <span style='color:red'>" + d.Population + "</span>";
  })
  
  svg.call(tip);
    
//load and display UK towns
    d3.json("http://ac32007.cloudapp.net:8080/Circles/Towns/" + document.getElementById("noc").value, function(error, places) { console.log(places);
    
    svg.selectAll(".pin")
    .data(places)
  .enter().append("circle", ".pin")
    .attr("r", function(d){
    return (d.Population/20000)
    })
    .attr("transform", function(d) {
      return "translate(" + projection([
        d.lng,
        d.lat
      ]) + ")"
    })
    .on( "click", function(){
    d3.select(this).remove();
  })
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);
  
    
//display Town names
    svg.selectAll(".place-label")
    .data(places)
    .enter().append("text")
    .attr("class", "place-label")
    .attr("transform", function(d) { return "translate(" + projection([
        d.lng,
        d.lat
      ]) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.Town; })
    .on( "click", function(){
    d3.select(this).remove();
  });
  
    })
    
//display country names
    svg.selectAll(".subunit-label")
    .data(topojson.feature(uk, uk.objects.subunits).features)
  .enter().append("text")
    .attr("class", function(d) { return "subunit-label " + d.id; })
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.properties.name; });

});

//function to refresh the map to display the new number of cities
function refreshMap() {
    //document.getElementById("noc").value = "Johnny Bravo";
    
}
