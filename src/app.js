(function(){
	angular
	.module('myApp', ['ngAnimate', 'ngMaterial', 'spotify'])
	
	.config(["$httpProvider", "SpotifyProvider", ($httpProvider, SpotifyProvider) => {
		SpotifyProvider.setClientId("42a54f0910e3426f81c2c184e67b9294");
	}])

})();