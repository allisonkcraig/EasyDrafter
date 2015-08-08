
var getSessionData = function(){
	console.log("running");

	$.get("/get-measurements", function(data_returned){
		console.log(data_returned);
	});
};

$(document).ready(getSessionData);

//possibility for server

  // session['measurements'] = {
  //       'nickname_input': request.args.get("nickname"),
  //       'bust_input' : request.args.get("bust"),
  //       'waist_input' : request.args.get("waist")
  //   }
