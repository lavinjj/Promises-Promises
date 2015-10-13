function PeopleListController($scope, people) {
    $scope.peopleList = [];

    $scope.init = function() {
        people.requestPeople().then(function() {
            $scope.peopleList = people.peopleStore;
        });
    };
}

describe('People List Controller', function() {
    var scope;
    var peopleService;
    var controller;
    var q;
    var deferred;

    // define the mock people service
    beforeEach(function() {
        peopleService = {
            peopleStore: [{
                FirstName: "Jim",
                LastName: "Lavin",
                Email: "jlavin@jimlavin.net",
                Bio: "Creator and Host of Coding Smackdown TV"}],

            requestPeople: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });

    // inject the required services and instantiate the controller
    beforeEach( inject(function($rootScope, $controller, $q) {
        scope = $rootScope.$new();
        q = $q;
        controller = $controller(PeopleListController, {
            $scope: scope,
            people: peopleService
        });
    }));

    it('should call requestPeople on the people service when init is called',

        function() {
            spyOn(peopleService, 'requestPeople').and.callThrough();

            scope.init();

            deferred.resolve();

            scope.$root.$digest();

            expect(peopleService.requestPeople).toHaveBeenCalled();
        });

    it('should populate the peopleList when init is called',

        function() {
            scope.init();

            deferred.resolve();

            scope.$root.$digest();

            expect(scope.peopleList).not.toBe([]);
        });
});
