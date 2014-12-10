var express = require('express');
var router = express.Router();
var othello = require('../../jsSrc/integration.js').othello;
var game = new othello(8);
console.log(game.grid['[3,3]']);
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { game: game});
});

module.exports = router;
