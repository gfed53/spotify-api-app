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
			vm.noResults = false;
			spAPI().getArtist(keyword)
			.then((artist) => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.keyword = '';
				console.log(artist);
				vm.artist = artist;
			}, () => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.noResults = true;
				console.log('error');
			});
		}

		function getRelated(id, type){
			vm.isFinished = false;
			vm.isFetching = true;
			vm.noResults = false;
			spAPI().getRelated(id, type)
			.then(artist => {
				vm.isFetching = false;
				vm.isFinished = true;
				console.log(artist);
				vm.artist = artist;
			}, () => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.noResults = true;
				console.log('error');
			})
		}
	}

})();