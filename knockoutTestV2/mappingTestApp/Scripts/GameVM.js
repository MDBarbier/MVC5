function GameViewModel() {

    //get self reference
    var vm = this;

    this.Name = ko.observable();
    this.Genre = ko.observable();
    this.Rating = ko.observable();
    this.Id = ko.observable();
    this.Games = ko.observableArray();

    this.GetGames = function () {
        $.ajax({
            url: '/api/Ajax',
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                vm.Games(data);
            }
        });
    };

    this.removeGame = function () {
        //vm.Games.remove(this); //this removes the item from the observable at the VM side
        vm.DeleteGame(this.Id);
    }

    this.SubmitGame = function () {
        var dataObject = ko.toJSON(this);
        $.ajax({
            url: '/api/Ajax',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                                
                vm.Id(data.Id);
                vm.GetGames();
            }
        });
    };

    this.DeleteGame = function (id) {
        $.ajax({
            url: '/api/Ajax/' + id,
            type: 'delete',            
            contentType: 'application/json',
            success: function (data) {
                console.log("Server reports " + id + " deleted.");
                vm.GetGames();
            }
        });
    }
};

var gvm = new GameViewModel()

//Activate!
ko.applyBindings(gvm);

//Call GetGames to obtain data from server on load
gvm.GetGames();