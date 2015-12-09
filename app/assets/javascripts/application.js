// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function clearTable() {
	$(".pre").removeClass("pre");
	$(".coreq").removeClass("coreq");
	$(".postreq").removeClass("postreq");
	$(".postcoreq").removeClass("postcoreq");
	$(".immediate").removeClass("immediate");
	$("#techelec").removeClass('active');
}

function determinePostreqs(course)
{
	$("#"+course).attr("post","");
	$("[pre~='"+course+"']").each(function(i,e) {
		var current = $("#"+course).attr("post");
		var newpost = current + " " + $(this).attr("id");
		$("#"+course).attr("post",newpost)
	});
	$("#"+course).attr("postco","");
	$("[co~='"+course+"']").each(function(i,e) {
		var current = $("#"+course).attr("postco");
		var newpost = current + " " + $(this).attr("id");
		$("#"+course).attr("postco",newpost)
	});
}

function traverseReqs(course,direction,highlight,otherclass)
{
//				alert("Traversing "+course+" for "+highlight);
	var reqstr = $("#"+course).attr(direction);
	if(reqstr == null) return;
	
	var reqarr = reqstr.split(" ");
	for(var x=0;x<reqarr.length;x++){
		var crs = reqarr[x];
		if(crs.length<=4) continue;
		//	alert("x="+x+" Found "+highlight+"req for "+course+", traversing onward. crs = "+crs);
		if(otherclass !== undefined) $("#"+crs).addClass(otherclass);

		// corequisite beats prerequisite
		if (highlight == "pre" && $("#"+crs).hasClass("coreq")) continue;
		// postcorequisite beats postrequisite
		if (highlight == "post" && $("#"+crs).hasClass("postcoreq")) continue;
		if($("#"+crs).hasClass(highlight+"req")) continue;
		$("#"+crs).addClass(highlight+"req");
		if(highlight == "co") {
			// a prerequisite of a corequisite is a prerequisite
			traverseReqs(crs,"pre","pre");
			// a corequisite of a corequisite is a corequisite
			traverseReqs(crs,"co","co");
		}
		else if (highlight == "pre") {
			// a prerequisite of a prerequisite is a prerequisite
			traverseReqs(crs,"pre","pre");
			// a corequisite of a prerequisite is a prerequisite
			traverseReqs(crs,"co","pre");
		}
		else if (highlight == "postco") {
			// a postrequisite of a postcorequisite is a postrequisite
			traverseReqs(crs,"post","post");
			// a postcorequisite of a postcorequisite is a postcorequisite
			traverseReqs(crs,"postco","postco");
		}
		else if (highlight == "post") {
			// a postrequisite of a postrequisite is a postrequisite
			traverseReqs(crs,"post","post");
			// a post-corequisite of a postrequisite is a postrequisite
			traverseReqs(crs,"postco","post");
		}
	}
}

function addCourseTitle(course) {
	var title = $("#"+course).attr('title');
	var html = $("#"+course).html();
	// ONLY ADD A TITLE IF ONE HASN'T BEEN DEFINED
	if (html !== undefined && html.indexOf('<') == -1 && title != undefined) $("#"+course).html(html+"<br /><span class='crs_title'> "+title+"</span>");
	if(course.substr(0,2) == "I-") $("#"+course).attr('id',course.substr(2)).addClass("ITU");
}

$(document).ready(function() { 

	addCourseAttributes();
	
	$("#courseTable div[id]").each(function(){course = $(this).attr("id"); if(course.length>4) determinePostreqs(course); addCourseTitle(course);});
	
	$("#courseTable div").mouseover(function(e) {
		var course = $(this).attr("id");
		traverseReqs(course,"pre","pre");
		traverseReqs(course,"post","post");
		if(($(this).attr("title") !== undefined && $(this).attr("title").length<1) && (!$(this).hasClass("ITU")) && (course != 'GenEd')) $("#techelec").addClass('active');
	}).mouseout(clearTable).click(function(e) {
		var id = $(this).attr("id");
		var title = $(this).attr("title");
		var len = id.length;
		var dept = id.substr(0,len-3);
		var crs = id.substr(len-3,3);
		
		if(title!==undefined && title.length>1) window.location="http://undergrad-catalog.buffalo.edu/coursedescriptions/index.php?abbr="+dept+"&num="+crs;
		else if (id == 'GenEd') window.location="http://undergrad-catalog.buffalo.edu/policies/degree/gened.shtml";
	});
	
	
});
	
	$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('a#trigger').hover(function(e) {
    $('div#popup').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
  }, function() {
    $('div#popup').hide();
  });

  $('a#trigger').mousemove(function(e) {
    $("div#popup").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
  });

});