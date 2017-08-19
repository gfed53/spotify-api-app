// jshint esversion: 6

(function(){
	angular
	.module('myApp', ['ngAnimate', 'ngMaterial'])

	.run(['spAPIKeys', 'spGetToken', (spAPIKeys, spGetToken)=>{
	spAPIKeys.init()
		.then((obj)=>{
			//Use client ID to fetch auth token if needed
			spGetToken.token = spGetToken.get();
		});		
	}]);

})();

