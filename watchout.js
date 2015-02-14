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

var updateScore = function(){
  d3.select('.current').text('Current Score: ' + gameScore.currentScore.toString());
  d3.select('.collisions').text('Collisions: ' + gameScore.numCollisions.toString());
  d3.select('.high').text('High Score: ' + gameScore.highestScore.toString());
};

var updateHighScore = function(){
  if (gameScore.currentScore > gameScore.highestScore){
    gameScore.highestScore = gameScore.currentScore;
  }
  return gameScore.highestScore;
};

var increaseScore = function(){
  gameScore.currentScore+=1;
  updateScore();
};

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

var thePlayer = { radius: 9, id: 1001 };
getNewLocations([thePlayer]);


var onCollision = function(){
  // debugger;
  // updateHighScore();
  // gameScore.currentScore = 0;
  console.log('hello');
  updateHighScore();
  gameScore.currentScore = 0;
  gameScore.numCollisions+=1;
  // updateScore();
};

var checkForCollisions = function(){

  var enemy, enemyX, enemyY, radiusSum, xDiff, yDiff, separation;
  var enemyXarr = [];
  var enemyYarr = [];
  var collisionFlag = false;

/*
  addEnemies.forEach(
    function(c) {
      enemyXarr.push(c.attr('cx'));
    }
  );

  addEnemies.forEach(
    function(c) {
      enemyYarr.push(c.attr('cy'));
    }
  );
*/

  for (var i = 0; i < myEnemies.length; i++) {
    enemy = myEnemies[i];
    radiusSum = enemy.radius + thePlayer.radius;

    enemyX = d3.select('svg').selectAll('circle')
      .data( [enemy], function(enemy) { return enemy.id; } )
      .attr('cx');

    enemyY = d3.select('svg').selectAll('circle')
      .data( [enemy], function(enemy) { return enemy.id; } )
      .attr('cy');

    xDiff = enemyX - thePlayer.x;
    yDiff = enemyY - thePlayer.y;

    separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );

    if (separation < radiusSum){
      collisionFlag = true;
    }
  }

  if (collisionFlag)
    onCollision();
};


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
    .attr('r', function (enemy) {return enemy.radius;});

var dragmove = function(d){
  var x = d3.event.x;
  var y = d3.event.y;
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
  setTimeout (repeatTimeout, 1200);
  setInterval (increaseScore, 50);
};

var startCollisionTimer = function () {
  checkForCollisions();
  setTimeout (startCollisionTimer, 10);
};

repeatTimeout();
startCollisionTimer();


