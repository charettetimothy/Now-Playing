$(document).ready(function () {


	$("#pullDown").click(function () {
		$("#panel").fadeToggle(1000);
		$("#movie-list").fadeToggle(1000);


	});

	$("#datepicker").val(moment().format('YYYY-MM-DD'));


});



$(document).foundation();
var imageBaseUrl = 'https://image.tmdb.org/t/p/';
$(document).ready(function () {

	var apiBaseURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
	var apiTmdbkey = 'cf9588340d8a721412af021d7fc6ba6a';
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';



	var settings = {
		"url": apiBaseURL + apiTmdbkey,
		"method": "GET",
	}

	$.ajax(settings).done(function (response) {

		for (i = 0; i < response.results.length; i++) {

			document.getElementById('movie-grid').innerHTML += '<a data-toggle="exampleModal9"><img src="' + imageBaseUrl + 'w300' + response.results[i].poster_path + '" id = "' + response.results[i].id + '" onclick = "reveal(this.id)">';
		}
	});


});

var clickedId;

function reveal(clickedId) {

	var settings = {
		"url": "https://api.themoviedb.org/3/movie/" + clickedId + "?api_key=cf9588340d8a721412af021d7fc6ba6a",
		"method": "GET",
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
		var overview = response.overview;
		var title = response.title;
		var vote_average = response.vote_average;
		document.getElementById('exampleModal9').innerHTML = '<div class="row"> <div class="cell small-4 large-4 columns"><img src="' + imageBaseUrl + 'w300' + response.poster_path + '" alt="#"><div class="cell small-4 large-4 columns overview"><b>Title:</b>' + title + '</div><div class="cell small-4 large-4 columns overview"><b>Overview:</b>' + overview + '</div><div class="cell small-4 large-4 columns overview"><b>Vote Score:</b>' + vote_average + '</div></div><button id =' + clickedId + ' class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true">&times</span></button><a href="#" data-reveal-id="videoModal" id =' + clickedId + ' class="radius button youtubeOpen" onclick = "youTubeReveal(this.id)">Watch Trailer&hellip;</a><script>$(document).foundation();</script>';

	});
}
//Playing the trailer
function youTubeReveal(clickedId) {

	var settings = {
		"url": "https://api.themoviedb.org/3/movie/" + clickedId + "/videos?api_key=cf9588340d8a721412af021d7fc6ba6a",
		"method": "GET",
	}
	var exampleModal8 = document.getElementById(clickedId).value;
	$.ajax(settings).done(function (response) {
		document.getElementById('exampleModal9').innerHTML = '<iframe width="553" height="280" src="https://www.youtube.com/embed/' + response.results[0].key + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><button id =' + clickedId + ' class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true">&times</span></button>';



	});
}

//Display the searched Movie

$("#movieSearchBtn").on('click', function (event) {

	var query = $("#searchMovie").val().trim();
	event.preventDefault();
	$("#movie-grid").empty();
	var settings = {
		"url": "https://api.themoviedb.org/3/search/movie?api_key=cf9588340d8a721412af021d7fc6ba6a&language=en-US&page=1&include_adult=false&query=" + query + '"',
		"method": "GET"
	}

	$.ajax(settings).done(function (response) {
		//console.log(response);
		for (i = 0; i < response.results.length; i++) {

			$("#movie-grid").append('<a data-toggle="exampleModal9"><img src="' + imageBaseUrl + 'w300' + response.results[i].poster_path + '" id = "' + response.results[i].id + '" onclick = "reveal(this.id)">');

		}

	});
});

//Genre
$(".genre").on('click', function (event) {
	event.preventDefault();
	var genre = this.id;
	$("#movie-grid").empty();
	var settings = {

		"url": "https://api.themoviedb.org/3/discover/movie?api_key=cf9588340d8a721412af021d7fc6ba6a&with_genres=" + genre,
		"method": "GET"
	}

	$.ajax(settings).done(function (response) {
		for (i = 0; i < response.results.length; i++) {

			$("#movie-grid").append('<a data-toggle="exampleModal9"><img src="' + imageBaseUrl + 'w300' + response.results[i].poster_path + '" id = "' + response.results[i].id + '" onclick = "reveal(this.id)">');

		}
	});
})


//Search by Zip Code
$("#zipCode").on('click', function (event) {

	event.preventDefault();
	$("#select").empty();

	var zipCode = $("#zipSearch").val().trim();
	var today = $("#datepicker").val().trim();
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + today + "&zip=" + zipCode + "&api_key=gvfz63zjy3q4pk92hdhxeekg",
		"method": "GET"
	}

	$.ajax(settings).done(function (response) {


		var options = '';
		var options2 = '';
		var options3;
		var options4;
		var tr = '<tr>';
		var tr2 = '</tr>';
		var td = '<td>';
		var td2 = '</td>';
		var datetime;
		for (i = 0; i < response.length; i++) {
			options = '<td>' + response[i].title + '</td>';

			for (j = 0; j < response[i].showtimes.length; j++) {
				datetime = response[i].showtimes[j].dateTime.substring(11)


				options2 += '<p>' + response[i].showtimes[j].theatre.name + '</p>';
				options4 += '<p>' + datetime + '</p>';
			}

			options3 = tr + options + td + options2 + td2 + td + options4 + td2 + tr2;
			$("#movie-list").prepend(options3);

			options2 = '';
			options4 = '';


		}

	});


})

//Form Validation
function myFunction() {
	var inpObj = document.getElementById("zipSearch");
	if (!inpObj.checkValidity()) {
		document.getElementById("demo").innerHTML = '';
	}
}




$(document).foundation();


window.onload = function () {
	stickyFooter();
};

//check for changes to the DOM
function checkForDOMChange() {
	stickyFooter();
}

//check for resize event if not IE 9 or greater
window.onresize = function () {
	stickyFooter();
}

//lets get the marginTop for the <footer>
function getCSS(element, property) {

	var elem = document.getElementsByTagName(element)[0];
	var css = null;

	if (elem.currentStyle) {
		css = elem.currentStyle[property];

	} else if (window.getComputedStyle) {
		css = document.defaultView.getComputedStyle(elem, null).
			getPropertyValue(property);
	}

	return css;

}

function stickyFooter() {

	if (document.getElementsByTagName("footer")[0].getAttribute("style") != null) {
		document.getElementsByTagName("footer")[0].removeAttribute("style");
	}

	if (window.innerHeight != document.body.offsetHeight) {
		var offset = window.innerHeight - document.body.offsetHeight;
		var current = getCSS("footer", "margin-top");

		if (isNaN(current) == true) {
			document.getElementsByTagName("footer")[0].setAttribute("style", "margin-top:0px;");
			current = 0;
		} else {
			current = parseInt(current);
		}

		if (current + offset > parseInt(getCSS("footer", "margin-top"))) {
			document.getElementsByTagName("footer")[0].setAttribute("style", "margin-top:" + (current + offset) + "px;");
		}
	}
}

/*
! end sticky footer 	
*/
