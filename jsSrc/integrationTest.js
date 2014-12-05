//	1,1	1,2	1,3	1,4	1,5	1,6
//	2,1	2,2	2,3	2,4	2,5	2,6
//	3,1	3,2	WW	BB	3,5	3,6 == 3,3
//	4,1	4,2	BB	WW	4,5	4,6
//	5,1	5,2	5,3	5,4	5,5	5,6
//	6,1	6,2	6,3	6,4	6,5	6,6

var assert = require('chai').assert;
var othello = require('./integration.js').othello;
var game;
var allFieldIds = require('./data.js').allIds;

describe('Othello', function() {
	beforeEach(function() {
		game = new othello();
		game.start();
	});
	describe('start', function() {
		it("should initialize the game with 3,3 = w 3,4 = b 4,3 = b 4,4 = w", function() {
			game = new othello();
			game.start();
			assert.equal(game.grid['[3,3]'].value, 'W');
			assert.equal(game.grid['[3,4]'].value, 'B');
			assert.equal(game.grid['[4,3]'].value, 'B');
			assert.equal(game.grid['[4,4]'].value, 'W');
			assert.notOk(game.grid['[3,3]'].enabled);
			assert.notOk(game.grid['[3,4]'].enabled);
			assert.notOk(game.grid['[4,3]'].enabled);
			assert.notOk(game.grid['[4,4]'].enabled);
		});
	});
	describe('isValidMove',function() {
		it("should return false when disc is placed on a 'filled' field", function() {
			assert.notOk(game.isValidMove('[4,3]'));
		});
		it("should return true when outflanks are available", function() {
			assert.ok(game.isValidMove('[2,3]'));
		});
		it("should return false when outflank is not available", function() {
			assert.notOk(game.isValidMove('[2,4]'));
		});
	});
	describe('update',function() {
		it("should flip the 3,3 disc when a Black disc is placed on 3,2 -initially", function() {
			game.update('[3,2]');
			assert.equal(game.grid['[3,3]'].value, 'B');
			assert.notOk(game.grid['[3,2]'].enabled);
			assert.equal(game.player, 'W');
			game.update('[3,2]');
			assert.equal(game.grid['[3,3]'].value, 'B');
		});
	});
	describe("toBeContinued",function() {
		it("should return true when there are valid moves", function() {
			assert.ok(game.toBeContinued());
		})
		it("should return false when there is no valid move", function() {
			allFieldIds.forEach(function(field){game.grid[field].enabled = false });
			assert.notOk(game.toBeContinued());
		})
	})
	
});