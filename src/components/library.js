(function(){
	angular
	.module('myApp')
	.factory('spAPI', ['$http', '$q', 'Spotify', spAPI]);

	function spAPI($http, $q, Spotify){
		//idea: search for artist, then get a randomly selected related artist. From there, like Pandora, you can sift from related artist to related artist. Users can have the option of getting 'popular' results or 'hipster' results. 
		return function(){
			console.log('the factory');
			let services = {
				getArtist: getArtist,
				getRelated: getRelated
			};

			function getArtist(keyword){
				let deferred = $q.defer();
				let options = {
					limit: 50,
					offset: 0
				}
				Spotify.search(keyword, 'artist', options).then((response) => {
					console.log(response);
					let artist = response.data.artists.items[0];
					deferred.resolve(artist);
				});

				return deferred.promise;

			}

			function getRelated(id){
				let deferred = $q.defer();
				Spotify.getRelatedArtists(id).then(response => {
					let artists = response.data.artists;
					let artist = artists.getRandom();
					deferred.resolve(artist);
				});

				return deferred.promise;
			}

			return services;
		}
	}

})();