// jshint esversion: 6

(function(){
	angular
	.module('myApp')
	.factory('spAPISearch', ['$http', '$q', 'spGetToken', spAPISearch])
	.service('spAPIKeys', ['$http', '$q', spAPIKeys])
	.service('spGetToken', ['spAPIKeys', spGetToken]);


	function spAPISearch($http, $q, spGetToken){
		//Idea: Search for artist, then get a randomly selected 
		//related artist. From there, like Pandora, you can sift
		//from related artist to related artist. Users can have
		//the option of getting 'popular' results or 'hipster' results. 
		return function(){
			let services = {
				getArtist: getArtist,
				getRelated: getRelated
			};

			let token = spGetToken.token;



			function getArtist(keyword){
				let deferred = $q.defer();
				// let options = {
				// 	limit: 50,
				// 	offset: 0
				// };

				let url = 'https://api.spotify.com/v1/search';
				let params = {
					q: keyword,
					type: 'artist'
				};

				let headers = {
					"Authorization": `Bearer ${token}`
				};
				// Spotify.search(keyword, 'artist', options)
				$http.get(url,{
					headers,
					params
				})
				.then((response) => {
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
		};
	}

	function spAPIKeys($http, $q){
		this.get = get;
		// this.update = update;
		this.init = init;
		this.initKeys = initKeys;

		

		function init(){
			let deferred = $q.defer();
			initKeys()
			.then((data)=> {
				this.apisObj = data;
				deferred.resolve();
			});

			return deferred.promise;
		}

		function initKeys(){
			return $http.get('/access')
					.then((res) => {
						return res.data;
					});
		}

		function get(){
			return this.apisObj;
		}

		// function update(obj){
		// 	localStorage.setItem('ah-log-info', JSON.stringify(obj));
		// 	this.apisObj = obj;
		// 	$state.reload();
		// }
	}

	function spGetToken(spAPIKeys){
		let obj = JSON.parse(localStorage.getItem('spotOAuth'));

		this.token = get();

		this.get = get;
		this.auth = auth;

		function auth(){
			let url = 'https://accounts.spotify.com/authorize';
			let obj = spAPIKeys.get();
			let client_id = spAPIKeys.get().spotID;
			let redirect_uri = 'http://localhost:8080/oauth-callback.html';

			window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + client_id + '&response_type=token&redirect_uri='+redirect_uri;
		}

		function get(){	
			if(obj !== null && obj !== undefined){
				return obj.oauth.access_token;
			} else {
				ahModals().create(spotAuthTemp)
				.then(()=>{
					auth();
				}, ()=>{
					return null;
				});
			}
		}
	}

})();