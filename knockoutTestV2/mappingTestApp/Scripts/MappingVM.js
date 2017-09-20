var data = { Name: 'matt', Age: 35 };

var viewModel = ko.mapping.fromJS(data);

function Update() {

    //This part gets data from text boxes with jquery, then creates a new javascript object (data)
    //In reality this would probably be coming from a server via AJAX
    var newName = $('#newName').val();
    var newAge = $('#newAge').val();
    var data = { Name: newName, Age: newAge };

    ko.mapping.fromJS(data, viewModel);
    
}


//Activate!
ko.applyBindings(viewModel);