var s = new Object();
s.a = 100;
s.prototype.find = function(){ return this.a};
console.log(s.find());