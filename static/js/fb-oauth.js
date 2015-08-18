//Facebook initialize.
//Created with help with permission from https://github.com/akvanhar/HB-FinalProject/blob/master/static/fblogin.js

function collectUserDetails(accessToken) {
	//make a FB api call and return an object of user details.
 	FB.api('/me', 
 			{fields: ['last_name', 'first_name', 'email', 'id']}, 
 			function (response) {
 		
	 		var userDetails = {
	 			fname: response.first_name,
	 			// lname: response.last_name,
	 			email: response.email,
	 			fbUserId: response.id
	 		}
	 		// collectUserFriends(accessToken, userDetails);
 			});
 }

// function collectUserFriends(accessToken, userDetails) {
//     FB.api('/me/friends',
//       function (response) {
//         if (response && !response.error) {
//           var friends = response.data; //data is a list of objects.
//           var friendsList = []
//           for (var i = 0; i < friends.length; i++ ) {
//             friendsList.push(friends[i].id);
//           }//endfor
//         }//endif
//         friendsList = JSON.stringify(friendsList);
//         console.log('Friends list: ');
//         console.log(friendsList);
//         submitInfoToServer(accessToken, userDetails, friendsList);
//       }
//       );
//   }

function submitInfoToServer(accessToken, userDetails, friendsList) {
      //takes the access token, and a userdetails list as input, submits a form to the server.
      //userDetails is an object with fname, lname, email and fbUserId
      //friendsList is a list of friend facebook ids.

      //create form elements
      var form = document.createElement('form');
      var userIdElement = document.createElement('input');
      var userFnameElement = document.createElement('input');
      var userLnameElement = document.createElement('input');
      var userEmailElement = document.createElement('input');
      // var userFriendsElement = document.createElement('input');
      var currentAccessToken = document.createElement('input');

      //put everything all together

      var fbUserId = userDetails.fbUserId;
      var fname = userDetails.fname;
      var lname = userDetails.lname;
      var email = userDetails.email;
      var accessToken = accessToken;
      // var userFriends = friendsList;
      
      form.method = "POST";
      form.action = "/facebook_login_portal"; 

      
      //set element values
      userIdElement.value = fbUserId;
      userFnameElement.value = fname;
      userLnameElement.value = lname;
      userEmailElement.value = email;
      currentAccessToken.value = accessToken;
      // userFriendsElement.value = userFriends;

      //set element names
      userIdElement.name = 'fbUserId';
      userFnameElement.name = 'fbFname';
      userLnameElement.name = 'fbLname';
      userEmailElement.name = 'fbEmail';
      currentAccessToken.name = 'accessToken';
      // userFriendsElement.name = 'fbFriends';

      //append elements to the form.
      form.appendChild(userIdElement);
      form.appendChild(userFnameElement);
      form.appendChild(userLnameElement);
      form.appendChild(userEmailElement);
      form.appendChild(currentAccessToken);
      // form.appendChild(userFriendsElement);

      document.body.appendChild(form);
      debugger;
      form.submit();
  }

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    if (response.status === 'connected') {
    	//User is connected to both PP and FB. 
    	//Collect the access token.
    	var accessToken = response.authResponse.accessToken;

    	collectUserDetails(accessToken);

    } else if (response.status === 'not_authorized') {
      // User is connected to FB, but not MLM
      document.getElementById('status').innerHTML = 'Please log into Make Less Mush.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into Pattern Pro or not.
      document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }

function checkLoginState() {
	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});
}


window.fbAsyncInit = function() {
  FB.init({
    appId      : '511805018989046', //Pattern Pro appId
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  //Now check to see which of the three login statuses is present for the user
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

// Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

$(document).ready(function() {

  $("#logout").on("click",
      FB.logout(function(response) {
        // user is now logged out
      }); )
})

