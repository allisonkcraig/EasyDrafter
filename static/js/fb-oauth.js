//Facebook initialize.
//Created with help with permission from https://github.com/akvanhar/HB-FinalProject/blob/master/static/fblogin.js

function collectUserDetails(accessToken) {
  console.log('collectUserDetails');
	//make a FB api call and return an object of user details.
 	FB.api('/me', 
 			{fields: ['last_name', 'first_name', 'email', 'id']}, 
 			function (response) {
 		
	 		var userDetails = {
	 			fname: response.first_name,
	 			email: response.email,
	 			fbUserId: response.id
	 		}
 			});
 }


function submitInfoToServer(accessToken, userDetails, friendsList) {
    console.log('submitInfoToServer');
      //takes the access token, and a userdetails list as input, submits a form to the server.
      //userDetails is an object with fname, lname, email and fbUserId
      //friendsList is a list of friend facebook ids.

      //create form elements
      var form = document.createElement('form');
      var userIdElement = document.createElement('input');
      var userFnameElement = document.createElement('input');
      var userEmailElement = document.createElement('input');
      var currentAccessToken = document.createElement('input');

      //put everything all together

      var fbUserId = userDetails.fbUserId;
      var fname = userDetails.fname;
      var email = userDetails.email;
      var accessToken = accessToken;
      // var userFriends = friendsList;
      
      form.method = "POST";
      form.action = "/facebook_login_portal"; 

      
      //set element values
      userIdElement.value = fbUserId;
      userFnameElement.value = fname;
      userEmailElement.value = email;
      currentAccessToken.value = accessToken;

      //set element names
      userIdElement.name = 'fbUserId';
      userFnameElement.name = 'fbFname';
      userEmailElement.name = 'fbEmail';
      currentAccessToken.name = 'accessToken';

      //append elements to the form.
      form.appendChild(userIdElement);
      form.appendChild(userFnameElement);
      form.appendChild(userEmailElement);
      form.appendChild(currentAccessToken);

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
      // User is connected to FB, but not PP
      document.getElementById('status').innerHTML = 'Please log into Make Less Mush.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into Pattern Pro or not.
      document.getElementById('status').innerHTML = 'Please log into Facebook.';
    }
  }


// function checkLoginStatus() {
//    console.log('checkLoginState');

// 	   FB.getLoginStatus(function(response) {
// 	   statusChangeCallback(response);
// 	   });
// }

window.fbAsyncInit = function() {
    FB.init({
      appId      : '511805018989046',
      xfbml      : true,
      version    : 'v2.4'
    });

    function checkLoginStatus() {
    console.log('checkLoginState');

       FB.getLoginStatus(function(response) {
       statusChangeCallback(response);
       });
    }


  };


      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
