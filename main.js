/*
done by Woonyung Choi
woonyungchoi@gmail.com
*/

// create empty array for each years
var yearArray_2002 = [];
	yearArray_2004 = [];
	yearArray_2005 = [];
	yearArray_2006 = [];
	yearArray_2007 = [];
	yearArray_2008 = [];
	yearArray_2009 = [];
	yearArray_2010 = [];
	yearArray_2011 = [];
	yearArray_2012 = [];
	yearArray_2013 = [];
	yearArray_2014 = [];

///////////////////////////////////////////////////////////////////
/////////////////////////// LOAD THE MAP //////////////////////////
// draw basic map
var zoom = 5;

L.mapbox.accessToken = 'pk.eyJ1Ijoid29vbnl1bmcxIiwiYSI6IkhWWXBoTEUifQ.gesE-OgOhGoY1OxjDGW7TA';
// Create a map in the div #map
var map = L.mapbox.map('map', 'woonyung1.ke8klj75',{ 
	minZoom:2,
	maxZoom:8
})
.setView([25, 55], zoom); // default view 

///////////////////////////////////////////////////////////////////
/////////////////////////// GETTING DRONE API //////////////////////////
function getDroneAPI(){
	var droneURL = 'http://api.dronestre.am/data';
	$.ajax({
		url: droneURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("there is something wrong");
		},
		// sucess
		success: function(data){
			console.log(data);
			for ( var i = 0; i < data.strike.length; i++){
				// console.log(data.strike[i].deaths_max);
				// console.log(data.strike[i].date);
				
				// if date is contains cetain year, put those into the array
				if(data.strike[i].date.indexOf("2002")> -1 ) yearArray_2002.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2004")> -1 ) yearArray_2004.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2005")> -1 ) yearArray_2005.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2006")> -1 ) yearArray_2006.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2007")> -1 ) yearArray_2007.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2008")> -1 ) yearArray_2008.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2009")> -1 ) yearArray_2009.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2010")> -1 ) yearArray_2010.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2011")> -1 ) yearArray_2011.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2012")> -1 ) yearArray_2012.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2013")> -1 ) yearArray_2013.push(data.strike[i]);
				if(data.strike[i].date.indexOf("2014")> -1 ) yearArray_2014.push(data.strike[i]);
			}
		}
	});
}


function putDots(lat,lng, size, contents) {
	// map.setView([lat, lng], zoom); // set view
	var currentCircle = L.circle([lat,lng], size,{
	    stroke: false,
	    fillColor: 'RGBA(218, 0, 0, 0.8)',
	    fillOpacity: 1
	}).addTo(map)
	.bindPopup(contents);

	// when button is pressed, clear the map
	// it should be inside of function scope..
	$("#clear").on("click", function(){
		$('#rightBox').html('');
		map.removeLayer(currentCircle);
	});

	$('#button_2002, #button_2004, #button_2005,#button_2006,#button_2007,#button_2008,#button_2009,#button_2010,#button_2011,#button_2012,#button_2013,#button_2014').click(function(){
		map.removeLayer(currentCircle);
	});



}

// pass year array and exectue putDots function
function drawOnMap(yearArray){
	// looping through all the contents inside of year
	for ( var i = 0; i < yearArray.length; i++ ){
		// accidents date
		
		var year = yearArray[0].date.substring(0,4);

		var date = yearArray[i].date.substring(0, 10);
		var location = yearArray[i].location;
		var death = yearArray[i].deaths;
		var injuries = yearArray[i].injuries;
		var links = yearArray[i].bij_link;

		var contents = 	'<a href="'+ links + '" target="_blank">' +
						'<div class="info"><b>'+date + '</b><br>' +
						'location: ' + location + '<br>' + 
						'death: ' + death + '<br>' + 
						'injuries: ' + injuries + 
						'</div><br>';

		// putDots(yearArray[i].lat, yearArray[i].lon, yearArray[i].deaths_max * 2000);
		putDots(yearArray[i].lat, yearArray[i].lon, 15000, yearArray[i].bij_summary_short);
		$('#rightBox').append(contents);
	}

	// $(".info").hover(function() {
	// 	console.log("hovering");
	// });
}

$(document).ready(function(){
	getDroneAPI();

 	

	$('#animate_button').click(function(){
		// clear out first
		$('#rightBox').html('');

		// animate it in an order
		setTimeout(function() { drawOnMap(yearArray_2002); }, 1000);
		setTimeout(function() { drawOnMap(yearArray_2004); }, 2000);
		setTimeout(function() { drawOnMap(yearArray_2005); }, 3000);
		setTimeout(function() { drawOnMap(yearArray_2006); }, 4000);
		setTimeout(function() { drawOnMap(yearArray_2007); }, 5000);
		setTimeout(function() { drawOnMap(yearArray_2008); }, 6000);
		setTimeout(function() { drawOnMap(yearArray_2009); }, 7000);
		setTimeout(function() { drawOnMap(yearArray_2010); }, 8000);
		setTimeout(function() { drawOnMap(yearArray_2011); }, 9000);
		setTimeout(function() { drawOnMap(yearArray_2012); }, 10000);
		setTimeout(function() { drawOnMap(yearArray_2013); }, 11000);
		setTimeout(function() { drawOnMap(yearArray_2014); }, 12000);
	});


	$('#button_2002').click(function(){

		console.log("clicked 2002");
		console.log(yearArray_2002);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2002);

	});

	$('#button_2004').click(function(){
		console.log("clicked 2004");
		console.log(yearArray_2004);
		
		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2004);
	});

	$('#button_2005').click(function(){
		console.log("clicked 2005");
		console.log(yearArray_2005);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2005);
	});	

	$('#button_2006').click(function(){
		console.log("clicked 2006");
		console.log(yearArray_2006);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2006);
	});

	$('#button_2007').click(function(){
		console.log(yearArray_2007);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2007);
	});

	$('#button_2008').click(function(){
		console.log(yearArray_2008);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2008);
	});

	$('#button_2009').click(function(){
		console.log(yearArray_2009);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2009);
	});

	$('#button_2010').click(function(){
		console.log(yearArray_2010);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2010);
	});

	$('#button_2011').click(function(){
		console.log(yearArray_2011);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2011);
	});	

	$('#button_2012').click(function(){
		console.log(yearArray_2012);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2012);

	});	

	$('#button_2013').click(function(){
		console.log(yearArray_2013);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2013);
	});	

	$('#button_2014').click(function(){
		console.log(yearArray_2014);

		// clear out first
		$('#rightBox').html('');
		// draw dots
		drawOnMap(yearArray_2014);
	});	
});