// jshint esversion: 6

(function(){
	angular
	.module('myApp')
	.controller('mainController', ['spAPISearch', 'spGetToken', mainController]);
	
	function mainController(spAPISearch, spGetToken){
		let vm = this;
		vm.getArtist = getArtist;
		vm.getRelated = getRelated;


		function getArtist(keyword){
			vm.isFinished = false;
			vm.isFetching = true;
			vm.noResults = false;
			spAPISearch().getArtist(keyword)
			.then((artist) => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.keyword = '';
				vm.artist = artist;
				console.log('artist',vm.artist);
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
			spAPISearch().getRelated(id, type)
			.then(artist => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.artist = artist;
			}, () => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.noResults = true;
			});
		}
	}

})();