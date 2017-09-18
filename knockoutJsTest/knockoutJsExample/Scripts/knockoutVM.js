
//storing the vm as a variable could also just have "function ViewModel(){...}" then just new it up when needed
var ViewModel = function (first, last) {

    var vm = this;

    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
    this.serverMessage = ko.observable();

    this.fullName = ko.computed(function ()
    {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.        
        return this.firstName() + " " + this.lastName();
    }, this);

    this.postData = function () {
        var dataObject = ko.toJSON(this);        
        $.ajax({
            url: '/api/Ajax',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {

                window.alert("server says: " + data);
                vm.serverMessage(data);
            }
        });
    };
};

var vm = new ViewModel("Planet", "Earth");
ko.applyBindings(vm); // This makes Knockout get to work

