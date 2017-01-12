(function(){
	angular
	.module('myApp')
	.controller('mainController', ['spAPI', mainController]);
	
	function mainController(spAPI){
		console.log('controller');
		spAPI();
	}

})();