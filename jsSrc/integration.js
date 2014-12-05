var createGrid = require('./createGrid.js').createGrid;
var lib = require('./lib.js').lib;
var data = require('./data.js');
var allIds = data.allIds;
var initials = data.initials;

var othello = function() {
	this.grid = new createGrid(6,6,'button',{enabled: true, value: 'empty'});
	this.allIds = allIds;
	this.player = 'B';
};

othello.prototype = {
	start : function() {
		var grid = this.grid;
		initials.forEach(function(initial) {
			grid[initial.id].value = initial.value;
			grid[initial.id].enabled = false;
		});
	},
	findOutflank : function(id) {
		return lib.findOutflank(this.grid,id,this.player);
	},
	isValidMove : function(id,game) {
		var thiS = game || this;
		var enabled = thiS.grid[id].enabled;
		var outflanks = thiS.findOutflank(id);
		return enabled && outflanks.length;
	},
	changePlayer : function() {
		this.player = (this.player == 'B')? 'W' : 'B';
	},
	placer : function(id) {
		this.grid[id].enabled = false;			
	},
	flipper : function(fields_ids) {
		var grid = this.grid;
		fields_ids.forEach(function(id) {
			grid[id].value = (grid[id].value == 'B')? 'W' : 'B';
		});
	},
	attacker : function(id) {
		this.flipper(this.findOutflank(id));
	},
	update : function(id) {
		var enabled = this.grid[id].enabled;
		if(this.isValidMove(id) && enabled){
			this.placer(id);
			this.attacker(id);
			this.changePlayer();
		}
	},
	toBeContinued : function (){
		var game = this;
		var possibility = game.allIds.some(function(id){
			return game.isValidMove(id,game);
		});
		return possibility;
	}
};


exports.othello = othello;