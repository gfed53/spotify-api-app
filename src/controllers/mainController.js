(function(){
	angular
	.module('myApp')
	.controller('mainController', ['spAPI', mainController]);
	
	function mainController(spAPI){
		let vm = this;
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
				vm.artist = artist;
			}, () => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.noResults = true;
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
				vm.artist = artist;
			}, () => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.noResults = true;
			})
		}
	}

})();