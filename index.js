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

d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json", function(error, us) {
  if (error) throw error;  
  
  //Make the counties
 svg.append("g")
    .attr("class", "county")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
    .attr("d", path)
    .style('fill', (d) => {
        for(var l = 0; l < json.length; l++) {
            if (d.id === json[l].fips) {
              if (json[l].bachelorsOrHigher <= 10){
                 return ("rgba(12, 81, 0, .1)")
               }else if (json[l].bachelorsOrHigher <= 20){
                 return("rgba(12, 81, 0, .2)")
               }else if (json[l].bachelorsOrHigher <= 30){
                 return("rgba(12, 81, 0, .3)")
               }else if (json[l].bachelorsOrHigher <= 40){
                 return("rgba(12, 81, 0, .4)")
               }else if (json[l].bachelorsOrHigher <= 50){
                 return("rgba(12, 81, 0, .5)")
               }else if (json[l].bachelorsOrHigher <= 60){
                 return("rgba(12, 81, 0, .6)")
               }else if (json[l].bachelorsOrHigher <= 70){
                 return("rgba(12, 81, 0, .7)")
               }else if (json[l].bachelorsOrHigher <= 80){
                 return("rgba(12, 81, 0, .8)")
               }else if (json[l].bachelorsOrHigher <= 00){
                 return("rgba(12, 81, 0, .9)")
               }else{
                 return("rgba(12, 81, 0, 1)")
               }
          }//end for loop that checks for matching county IDs
        }//end of loop through ALL json data
     })//end style - fill
    .append("title")
    .text(d => {
        for(var k = 0; k < json.length; k++) {
          if (d.id === json[k].fips) {
            return json[k].area_name + ", " + json[k].state + ": " + json[k].bachelorsOrHigher + "%";
          }
        } //end of loop through ALL json data
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
 const legend= [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  
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
          .attr("width", 30)
          .attr("height", 10)
          .attr("x", (d, i) => {return 550 + i*30})
          .attr("y", 1)
          .style('fill', (d) => {
             if (d <= 10){
               return ("rgba(12, 81, 0, .1)")
              }else if (d <= 20){
               return("rgba(12, 81, 0, .2)")
             }else if (d <= 30){
               return("rgba(12, 81, 0, .3)")
             }else if (d <= 40){
               return("rgba(12, 81, 0, .4)")
             }else if (d <= 50){
               return("rgba(12, 81, 0, .5)")
             }else if (d <= 60){
               return("rgba(12, 81, 0, .6)")
             }else if (d <= 70){
               return("rgba(12, 81, 0, .7)")
             }else if (d <= 80){
               return("rgba(12, 81, 0, .8)")
             }else if (d <= 90){
               return("rgba(12, 81, 0, .9)")
             }else{
               return("rgba(12, 81, 0, 1)")
             }
          })
  
 //Add the legend text
 svgLegend.selectAll("text")
          .data(legend)
          .enter()
          .append("text")
          .attr("class", "percentage")
          .attr("x", (d, i) => 560 + i*30 )
          .attr("y", (d, i) => 30)
          .text(d=>d + "%") 
}); //end d3.json from line 14
    
}})
