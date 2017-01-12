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
			vm.isFinished = false;
			vm.isFetching = true;
			spAPI().getArtist(keyword)
			.then((artist) => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.keyword = '';
				console.log(artist);
				vm.artist = artist;
			});
		}

		function getRelated(id){
			vm.isFinished = false;
			vm.isFetching = true;
			spAPI().getRelated(id)
			.then(artist => {
				vm.isFetching = false;
				vm.isFinished = true;
				console.log(artist);
				vm.artist = artist;
			})
		}
	}

})();