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

				let url = 'https://api.spotify.com/v1/search';
				let params = {
					q: keyword,
					type: 'artist'
				};

				let headers = {
					"Authorization": `Bearer ${token}`
				};
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
					
				}, (err) => {
					if(err.status === 401 && spGetToken.token){
						spGetToken.auth();
					}
				});

				return deferred.promise;

			}

			function getRelated(id, type){
				let deferred = $q.defer();

				let url = `https://api.spotify.com/v1/artists/${id}/related-artists`;

				let headers = {
					"Authorization": `Bearer ${token}`
				};


				$http.get(url, {headers}).then(response => {
					let allArtists = response.data.artists;
					if (type){
						if(type === 'popular'){
							selectedGrp = getPopular(allArtists);
						} else if(type === 'hipster'){
							selectedGrp = getHipster(allArtists);
						}
					} else {
						selectedGrp = allArtists;
					}

					if(!selectedGrp.length){
						deferred.reject();
					}
					let artist = selectedGrp.getRandom();
					deferred.resolve(artist);
				}, err => {
					console.log('err',err);
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
		this.init = init;
		this.initKeys = initKeys;

		

		function init(){
			let deferred = $q.defer();
			initKeys()
			.then((data)=> {
				this.apisObj = data;
				deferred.resolve(data);
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
	}

	function spGetToken(spAPIKeys){

		//Test for APIs obj

		console.log('Apis obj',spAPIKeys.get());

		let obj = JSON.parse(localStorage.getItem('spotOAuth'));

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
				console.log('no saved token');
				auth();
				
			}
		}
	}

})();