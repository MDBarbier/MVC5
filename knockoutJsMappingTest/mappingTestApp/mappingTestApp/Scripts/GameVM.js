function GameViewModel() {
    this.gameName = ko.observable("game name");
};

//Activate!
ko.applyBindings(new GameViewModel());