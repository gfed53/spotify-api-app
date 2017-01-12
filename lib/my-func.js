// Returns a random item from an array
Array.prototype.getRandom = function(){
	console.log(this);
	var randItem = this[Math.floor(Math.random()*this.length)];
	return randItem;
}