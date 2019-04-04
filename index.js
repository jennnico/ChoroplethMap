//https://bl.ocks.org/mbostock/4122298

document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json',true);
  req.send();
  req.onload=function(){
    //Education attainment data
    json=JSON.parse(req.responseText);

   
    var svg = d3.select("svg");
    var path = d3.geoPath();
    var ordered = []; //array to order topojson IDs
    

d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json", function(error, us) {
  if (error) throw error;  
 
  //Make the counties
 svg.append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
    .attr("d", path)
    .append("title")
     //Compare geo-location data (d) to county data (json)
    .text(d => {
        for(var k = 0; k < json.length; k++) {
          if (d.id === json[k].fips) {
            return json[k].area_name + ", " + json[k].state + ": " + json[k].bachelorsOrHigher + "%";
            
            //attempt to add color
            if(json[k].bachelorsOrHigher > 50){
              svg.style("fill", "yellow")
            }
            //end attempt to add color
          }
        }
        return;
      })
    
 //Make the county borders
 svg.append("path")
    .attr("class", "county-borders")
    .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b; })));

  //Make the state borders
  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
  
  //Legend data (percentages)
  const legend = [25, 50, 75, 100]
  
  //Add the legend canvas.
  const svgLegend=d3.select("#legend")
                      .append("svg")
                      .attr("width", 960)
                      .attr("height", 40)
  
  //Add the legend rectangles.
  svgLegend.selectAll("rect")
           .data(legend)
           .enter()
           .append("rect")
           .attr("width", 40)
           .attr("height", 10)
           .attr("x", (d, i) => {return 650 + i*40})
           .attr("y", 1)
           .style('fill', (d) => {
              if (d <= 25){ //2.8, navy
                return ("rgba(12, 81, 0, .3)")
              }else if (d <= 50){
                return("rgba(12, 81, 0, .5)")
              }else if (d <= 75){
                return("rgba(12, 81, 0, .7)")
              }else{
                return("rgba(12, 81, 0, 1)")
              }
           })
  
  //Add the legend text
  svgLegend.selectAll("text")
           .data(legend)
           .enter()
           .append("text")
           .attr("x", (d, i) => 680 + i*40 )
           .attr("y", (d, i) => 30)
           .text(d=>d + "%")
  
   });  
}})
