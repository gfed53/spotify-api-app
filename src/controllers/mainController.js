(function(){
	angular
	.module('myApp')
	.controller('mainController', ['spAPI', mainController]);
	
	function mainController(spAPI){
		// console.log('controller');
		var vm = this;
		vm.getArtist = getArtist;
		vm.getRelated = getRelated;

		function getArtist(keyword){
			spAPI().getArtist()
			.then((response) => {
				console.log(response);
				console.log(response.data.artists.items[0].id);
				vm.artistID = response.data.artists.items[0].id;
			});
		}

		function getRelated(id){
			spAPI().getRelated(id)
			.then(response => {
				console.log(response);
			})
		}
		
	}

})();