var method = Game.prototype;

function Game(name, players, giftValueRange, date, place, avoidInGroupMatching) {
	this._name = name;
	this._players = players;
	this._giftValueRange = giftValueRange;
	this._date = date;
	this._place = place;
	this._avoidInGroupMatching = avoidInGroupMatching;
};

method.getName = function() {
	return this._name;
};

method.getPlayers = function() {
	return this._players.slice();
};

method.getMaxGiftValue = function() {
	return this._giftValueRange.maxValue;
};

method.getMinGiftValue = function() {
	return this._giftValueRange.minValue;
};

method.getDate = function() {
	return this._date;
};

method.getPlace = function() {
	return this._place;
};

method.getAvoidInGroupMatching = function() {
	return this._avoidInGroupMatching;
};

method.getFirst = function() {
	return this._players.find(player => player.first);
};

method.play = function() {
	let first = this.getFirst();

	let players = shuffle(this.getPlayers().filter(player => !player.first));

	let i = 0;
	let result = [];
	result[i] = createStep(first, players[i]);

	for (; i+1 < players.length; i++) {
		result[i+1] = createStep(players[i], players[i+1]);
	}

	result[i+1] = createStep(players[i], first);

	return result;
};

function createStep(player, target) {
	return {
		player: player,
		target: target
	};
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = Game;