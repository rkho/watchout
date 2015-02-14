// start slingin' some d3 here.

// Options for the game
var gameOptions = {
  boardWidth: 750,
  boardHeight: 500,
  numEnemies: 20,
  // I don't see a use for padding so far
};

var gameScore = {
  currentScore: 0,
  highestScore: 0,
  numCollisions: 0
};

var generateBoard = d3.select('.gameboard').append('svg:svg').attr('width', gameOptions.boardWidth).attr('height', gameOptions.boardHeight);

var enemyProps = {
  x: 55,
  y: 66,
  radius: 9
};

var makeEnemies = function (){
  var enemies = [];

  var randomLocation = function() {
    var location = {};
    location.x = Math.random()*gameOptions.boardWidth;
    location.y = Math.random()*gameOptions.boardHeight;
    return location;
  };

  for (var i = 0; i < gameOptions.numEnemies; i++) {
    var enemy = { radius: 9};
    var location = randomLocation();
    enemy.x = location.x;
    enemy.y = location.y;
    enemies.push(enemy);
  }

  return enemies;
};



var addCircle = d3.select('svg').selectAll('circle')
    //.selectAll('.enemyCircle')
    .data( makeEnemies() )
    .enter()
    .append('circle')
    .attr('cx', function (enemy) {return enemy.x;} )
    .attr('cy', function (enemy) {return enemy.y;} )
    .attr('r', function (enemy) {return enemy.radius;} );


/*
d3.select('svg').selectAll(enemyCircles)
  .data(enemies).enter();
*/


