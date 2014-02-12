'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('.project a').click(addProjectDetails);

  $('#colorBtn').click(randomizeColors);
  $('#feelingBtn').click(Feelings);
  
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
  // Prevent following the link
  e.preventDefault();

  // Get the div ID, e.g., "project3"
  var projectID = $(this).closest('.project').attr('id');
  // get rid of 'project' from the front of the id 'project3'
  var idNumber = projectID.substr('project'.length);



  $.get('/project/'+idNumber, function addProject(result) {
    console.log(result)
    var projectHTML = '<a href="#" class="thumbnail">' +
      '<img src="' + result['image'] + '" class="detailsImage">' +'</a>'+
      '<p><strong>' + result['date'] + '</strong></p>' +
      '<p><small>' + result['summary'] + '</small></p>' ;
      

    $('#project'+idNumber).find('.details').html(projectHTML);

    // var img = $('#project'+idNumber).find('img');
    // img.addClass('detailsImage');
  })

  console.log("User clicked on project " + idNumber);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
  console.log("User clicked on color button");
  $.get('/palette', function (result) {
    var colors = result.colors.hex
    console.log(colors)
    $('body').css('background-color', colors[0]);
    $('.thumbnail').css('background-color', colors[1]);
    $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
    $('p').css('color', colors[3]);
    $('.project img').css('opacity', .75);
  })
}


function Feelings(e) {
console.log("User clicked on Feeling button");
  $.get(
  	// 'http://api.wefeelfine.org:8080/ShowFeelings?feeling=happy&limit=1', 
  	'http://ws.spotify.com/search/1/track.json?q=Barack+Obama',
  	function (result) {
  		console.log(result)
  	var appendHTML = '<div class="thumbnail"><h4>Spotify Query: '+result.info.query+'</h4><p>'+result.tracks[0].album.name+'</p></div>'
  	$('#feeling').html(appendHTML)
    
  })

}