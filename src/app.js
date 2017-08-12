// jshint esversion: 6

(function(){
	angular
	.module('myApp', ['ngAnimate', 'ngMaterial', 'spotify'])

	.run(['spAPIKeys', (spAPIKeys)=>{
	spAPIKeys.init()
		.then(()=>{
			//Do nothing
		});		
	}]);

})();

