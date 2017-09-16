// jshint esversion: 6

(function(){
	angular
	.module('myApp')
	.controller('mainController', ['$location', '$timeout', 'spAPISearch', 'spGetToken', 'spScrollTo', mainController]);
	
	function mainController($location, $timeout, spAPISearch, spGetToken, spScrollTo){
		let vm = this;
		vm.getArtist = getArtist;
		vm.getRelated = getRelated;
		vm.status = spGetToken.status;
		vm.auth = spGetToken.auth;

		// Clear anchor scroll url params
		$location.url('/');


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
				scrollTo('anchor');
			}, () => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.noResults = true;
				scrollTo('anchor-error');
			}).finally(()=> {
				
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
				scrollTo('anchor');
			}, () => {
				vm.isFetching = false;
				vm.isFinished = true;
				vm.noResults = true;
				scrollTo('anchor-error');
			}).finally(()=> {
				
			});
		}

		function scrollTo(element){
			$timeout(() => {
				spScrollTo().scrollToElement(element);
			}, 0);
		}
	}

})();