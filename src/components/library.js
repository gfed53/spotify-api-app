(function(){
	angular
	.module('myApp')
	.factory('spAPI', [spAPI]);

	function spAPI(){
		return function(){
			console.log('the factory');
		}
	}

})();