var gameListViewModel;

// use as register student views view model
function Game(id, Name, Genre, Rating, Description, Completed, PPI) {
    var self = this;

    // observable are update elements upon changes, also update on element data changes [two way binding]
    self.Id = ko.observable(id);
    self.Name = ko.observable(Name);
    

    // create computed field by combining first name and last name
    //self.FullName = ko.computed(function () {
    //    return self.FirstName() + " " + self.LastName();
    //}, self);

    self.Rating = ko.observable(Rating);
    self.Description = ko.observable(Description);
    self.PPI = ko.observable(PPI);
    self.Completed = ko.observable(Completed);

    // Non-editable catalog data - should come from the server
    //self.genders = [
    //    "Male",
    //    "Female",
    //    "Other"
    //];

    self.addGame = function () {
        var dataObject = ko.toJSON(this);

        // remove computed field from JSON data which server is not expecting
        delete dataObject.Name;

        $.ajax({
            url: '/api/game',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                studentRegisterViewModel.studentListViewModel.students.push(new Student(data.Id, data.FirstName, data.LastName, data.Age, data.Description, data.Gender));

                self.Id(null);
                self.FirstName('');
                self.LastName('');
                self.Age('');
                self.Description('');
            }
        });
    };
}

// use as student list view's view model
function StudentList() {

    var self = this;

    // observable arrays are update binding elements upon array changes
    self.students = ko.observableArray([]);

    self.getStudents = function () {
        self.students.removeAll();

        // retrieve students list from server side and push each object to model's students list
        $.getJSON('/api/student', function (data) {
            $.each(data, function (key, value) {
                self.students.push(new Student(value.Id, value.FirstName, value.LastName, value.Age, value.Description, value.Gender));
            });
        });
    };


    // remove student. current data context object is passed to function automatically.
    self.removeStudent = function (student) {
        $.ajax({
            url: '/api/student/' + student.Id(),
            type: 'delete',
            contentType: 'application/json',
            success: function () {
                self.students.remove(student);
            }
        });
    };
}


// create index view view model which contain two models for partial views
studentRegisterViewModel = { addStudentViewModel: new Student(), studentListViewModel: new StudentList() };


// on document ready
$(document).ready(function () {

    // bind view model to referring view
    ko.applyBindings(studentRegisterViewModel);

    // load student data
    studentRegisterViewModel.studentListViewModel.getStudents();
});