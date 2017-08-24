// Array of topics.
var topics = ["Jon Snow", "Jamie Lannister", "Daenerys Targaryen", "White Walker", "Sansa Stark", "Tyrion Lannister", "Samwell Tarly", "Brienne of Tarth", "Arya Stark", "Tormund Giantsbane"];
// Make the buttons.
for (var i = 0; i < topics.length; i++) {
	var $btn = $("<btn>").text(topics[i]).addClass("btn btn-primary characterButton");
	$btn.attr("character", topics[i]);
	$('#buttonDiv').append($btn);
}

function addButton() {
	var $btn = $("<btn>").text(topics[i]).addClass("btn btn-primary newCharacterButton");
	$btn.attr("character", topics[i]);
	$('#buttonDiv').append($btn);
	i++;
}
// function for putting gifs in html.
function inputImg(item) {
	// grab the url for the still image, create rating and place.
	var imgDiv = $('<div class = "imageDiv">');
	var rating = $('<p>').text('Rating: ' + item.rating);
	imgDiv.prepend(rating);

	var stillImgSrc = item.images.fixed_height_still.url;
	var animatedImgSrc = item.images.fixed_height.url;
	var stillImg = $('<img>').attr('src',stillImgSrc).attr('state','still');
	stillImg.attr('stillImgURL',stillImgSrc).attr('animatedImgURL',animatedImgSrc);
	imgDiv.append(stillImg);
	$('#displayGifsHere').append(imgDiv);
}

function ajax(URL) {
	$.ajax({
			url: URL,
			method: 'GET'

		})
		.done(function(response) {
			for(var j=0; j<10; j++) {
				// Call function 10 times that inputs the gifs.
				inputImg(response.data[j]);
				console.log(response);
			}
		})
}

$(document).ready(function(){
	$(document).on('click','img', function() {
		var state = $(this).attr('state');
		if(state === 'still') {
			$(this).attr('src', $(this).attr('animatedImgURL'));
			$(this).attr('state','animated');
		} else if (state === 'animated') {
			$(this).attr('src', $(this).attr('stillImgURL'));
			$(this).attr('state','still');
		}
	});
	$(document).on('click','#addCharacter',function() {
		var input = $('#character-input').val().trim();
		topics.push(input);
		// Add a button for whatever is entered in form.
		addButton();
		$(document).on('click','.newCharacterButton',function() {
			var character = $(this).attr('character');
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=dc6zaTOxFJmzC&limit=10";
			$('#displayGifsHere').empty();
			ajax(queryURL);
		});
		// avoids refresh of page.
		return false;
	});
	$(document).on('click','.characterButton', function() {
		$('#displayGifsHere').empty();
		var character = $(this).attr('character');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
			url: queryURL,
			method: 'GET'

		})
		.done(function(response) {
		// console.log(response);
			for(var j=0; j<10; j++) {
				inputImg(response.data[j]);
			}
		})
	});
});