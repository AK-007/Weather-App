var lat,lon,link,tempunit="C";
var temperature,original;
$(document).ready(function() {
    if(navigator.geolocation)
    {
    	navigator.geolocation.getCurrentPosition(function(position)
    	{
    		lat="lat="+position.coords.latitude;
    		lon="lon="+position.coords.longitude;
    		apicall(lat,lon);
    	});

    }

    $("#unit").click(function()
    {
    	var current=$("#unit").text();
    	if(current=="C")tempunit="F";
    	else tempunit="C";
    	$("#unit").text(tempunit);
    	if(tempunit=="F")
    		{
    			temperature=original*9/5+32;
    			$("#temp").text(temperature + " " + String.fromCharCode(176));		
    		}
    	else
    		{
    			$("#temp").text(original + " " + String.fromCharCode(176));	
    		}
    });
});

function apicall(lat,lon)
{
	link="https://fcc-weather-api.glitch.me/api/current?"+lon+"&"+lat;
	$.ajax({
	url:link , success:function(result){
		$("#city").text(result.name+", "+result.sys.country);
		$("#temp").text(result.main.temp + " " + String.fromCharCode(176));
		$("#weather").text(result.weather[0].main);
		$("#unit").text(tempunit);
		$("#icon").append("<img src=\""+result.weather[0].icon+"\"></img>");
		original=parseFloat($("#temp").text());
	}
	});
}