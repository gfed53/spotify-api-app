(function(){
	angular
	.module('myApp')
	.factory('spAPI', ['$http', '$q', 'Spotify', spAPI]);

	function spAPI($http, $q, Spotify){
		//Idea: Search for artist, then get a randomly selected 
		//related artist. From there, like Pandora, you can sift
		//from related artist to related artist. Users can have
		//the option of getting 'popular' results or 'hipster' results. 
		return function(){
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
					if(!response.data.artists.items.length){
						deferred.reject();
					} else {
						let artist = response.data.artists.items[0];
						deferred.resolve(artist);
					}
					
				});

				return deferred.promise;

			}

			function getRelated(id, type){
				let deferred = $q.defer();
				Spotify.getRelatedArtists(id).then(response => {
					let artistsRough = response.data.artists;
					let artists;
					if (type){
						if(type === 'popular'){
							artists = getPopular(artistsRough);
						} else if(type === 'hipster'){
							artists = getHipster(artistsRough);
						}
					} else {
						artists = artistsRough;
					}

					if(!artists.length){
						deferred.reject();
					}
					let artist = artists.getRandom();
					deferred.resolve(artist);
				});

				return deferred.promise;
			}

			function getPopular(array){
				return array.filter(artist => artist.popularity >= 50);
			}

			function getHipster(array){
				return array.filter(artist => artist.popularity <= 50);
			}

			return services;
		}
	}

})();