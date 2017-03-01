$(document).ready(function() {
	$('input.typeahead').typeahead({
		name: 'typeahead',
		remote: 'http://localhost:3000/search?key=%QUERY',
		limit: 10
	});

	// $('.user-container').hide();

	$('input.typeahead').keyup(function(e) {
    $('.seat').mouseout();
		if (event.keyCode == 13) {
			$.ajax({
				url: '/person',
				type: 'GET',
				data: {
					name: $('input.typeahead.tt-query').val()
				},
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				async: false,
				success: function(data) {
					document.getElementById(data[0].seat_id).onmouseover();
				}
			});
		}
	});

	$('.seat').mouseover(function(e) {
		$.get("/person/" + e.currentTarget.alt)
			.done(function(data) {
				$('.user-container').html("Name: " + data[0].name + "&nbsp&nbsp&nbsp Department: " + data[0].department + "&nbsp&nbsp&nbsp Seat: " + data[0].seat_id);
			});
	});

	$('.seat').mouseout(function() {
		$('.user-container').html("&nbsp");
	});
});
