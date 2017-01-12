(function(){
	angular
	.module('myApp')
	.factory('spAPI', ['$http', '$q', 'Spotify', spAPI]);

	function spAPI($http, $q, Spotify){
		//idea: get recommendations from other users. Search playlists based on popularity, genre, 
		return function(){
			console.log('the factory');
			let services = {
				getArtist: getArtist,
				getRelated: getRelated
			};

			function getArtist(){
				let options = {
					limit: 50,
					offset: 0
				}
				return Spotify.search('nirvana', 'artist', options).then(function (response) {
					// console.log(data);
					return $q.when(response);
				});

			}

			function getRelated(id){
				return Spotify.getRelatedArtists(id).then(response => $q.when(response));
			}

			return services;
		}
	}

})();