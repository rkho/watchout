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


var randomLocation = function() {
  var location = {};
  location.x = Math.random()*gameOptions.boardWidth;
  location.y = Math.random()*gameOptions.boardHeight;
  return location;
};

var getNewLocations = function(circles) {
  for (var i = 0; i < circles.length; i++) {
    var location = randomLocation();
    circles[i].x = location.x;
    circles[i].y = location.y;
  }
};

var makeEnemies = function (){
  var enemies = [];

  for (var i = 0; i < gameOptions.numEnemies; i++) {
    var enemy = { radius: 9, id: i };
    var location = randomLocation();
    enemy.x = location.x;
    enemy.y = location.y;
    enemies.push(enemy);
  }

  return enemies;
};

var myEnemies = makeEnemies();

var thePlayer = { radius: 20, id: 1001 };
getNewLocations([thePlayer]);

var moveEnemies = function () {
  d3.select('svg').selectAll('circle')
    .data( myEnemies, function(enemy) { return enemy.id; } )
    .transition()
    .duration(1000)
    .attr('cx', function (enemy) {return enemy.x;} )
    .attr('cy', function (enemy) {return enemy.y;} );
};

var addEnemies = d3.select('svg').selectAll('circle')
    .data( myEnemies, function(enemy) { return enemy.id; } )
    .enter()
    .append('circle')
    .attr('class', 'enemy')
    .attr('cx', function (enemy) {return enemy.x;} )
    .attr('cy', function (enemy) {return enemy.y;} )
    .attr('r', function (enemy) {return enemy.radius;} );

var dragmove = function(d){
  var x = d3.event.x;
  var y = d3.event.y;
  console.log(x);
  d3.select(this).attr('cx', x).attr('cy', y);
};

var drag = d3.behavior.drag().on('drag', dragmove);


var addPlayer = d3.select('svg').selectAll('circle')
    .data( [thePlayer], function(player) { return player.id; } )
    .enter()
    .append('circle')
    .attr('fill', '#6576BF' )
    .attr('class', 'player')
    .attr('cx', function (player) {return player.x;} )
    .attr('cy', function (player) {return player.y;} )
    .attr('r', function (player) {return player.radius;})
    .call(drag);

var repeatTimeout = function () {
  getNewLocations(myEnemies);
  moveEnemies();
  console.log('koz');
  setTimeout (repeatTimeout, 1200);
};


repeatTimeout();


