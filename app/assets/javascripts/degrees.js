function highlightPrereq(element, index, array)
{
		$("[pre~='"+array[index]+"']").css("background-color", "#FFFFC6");
}

function highlightPostreq(element, index, array)
{
		$("[post~='"+array[index]+"']").css("background-color", "#7DDB95");
}

$("#courseTable div").mouseover(function() {
	var prereq = $(this).attr("pre");
	var postreq = $(this).attr("post");
	var prearr = prereq.split(' ');
	var postarr = postreq.split(' ');
	prearr.forEach(highlightPrereq);
	postarr.forEach(highlightPostreq);
});
