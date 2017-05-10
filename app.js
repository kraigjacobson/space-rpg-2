var app = angular.module('spaceApp', [
]);

app.controller('MainController', function(
    $scope,
    $rootScope
){


});

app.controller('ViewscreenController', function(
    $scope,
    UtilService
){
    if(!$scope.image) {
        $scope.image = UtilService.getImage('space');
    }
    $scope.$on('getView', function (event, args) {
        $scope.image = args.image;
    });

});

app.controller('StatsController', function(
    $scope,
    $rootScope,
    PlayerService
){

    $scope.stats = PlayerService.stats;

});

app.controller('ActionsController', function(
    $scope,
    $rootScope,
    PlayerService
){


    $scope.travel = PlayerService.travel;

    $scope.merchant = function () {
        alert('merchant clicked');
    };

    $scope.investigate = function () {
        alert('investigating');
    };

});

app.controller('ConsoleController', function(
    $scope,
    $rootScope
){

    $scope.journal = [];

    $scope.$on('getState', function (event, args) {
        $rootScope.state = args.state;
    });

    $scope.$on('getLog', function (event, args) {
        $scope.journal.unshift(args.log);
    });


});

app.service('PlayerService', function($rootScope, ShipService, UniverseService){

    var self = this;

    this.stats = {
        name: "Guy",
        level: 1,
        credits: 100,
        totalDistance: 5000,
        distanceLeft: 5000,
        distanceTraveled: 0
    };


    this.travel = function () {

        var distance = ShipService.getDistance();
        self.stats.distanceLeft -= distance;
        self.stats.distanceTraveled += distance;
        $rootScope.$broadcast('getLog', { log: "You have traveled " + distance + " light years." });
        event = UniverseService.event();

    };

    this.updateStat = function (stat, amt) {

        stat[stat] += amt;

    };

});

app.service('ShipService', function(UtilService){

    var self = this;

    this.minDistance = 1;
    this.maxDistance = 5;
    this.speed = 1;

    this.getSpeed = function () {
        return speed;
    };

    this.getDistance = function () {

        var distance = UtilService.random(self.minDistance*self.speed,self.maxDistance*self.speed);
        return distance;

    };

});

app.service('UniverseService', function($rootScope, UtilService, DataService){

    var self = this;

    this.currentState = "station";

    this.event = function () {

        var roll = UtilService.random(1,20);

        if (roll <= 3) {
            self.currentState = "weird";
            self.weird();
        } else if (roll <= 6) {
            self.currentState = "opportunity";
            self.opportunity();
        } else if (roll <= 9) {
            self.currentState = "merchant";
            self.merchant();
        } else if (roll <= 12) {
            self.currentState = "ship issue";
        } else if (roll <= 15) {
            self.currentState = "combat";
        } else {
            self.currentState = "nothing";
        }

        self.updateState();
        return self.currentState;

    };

    this.weird = function() {

        $rootScope.$broadcast('getLog', { log: UtilService.randomFromArray(DataService.text.weird) });
        $rootScope.$broadcast('getView', { image: UtilService.getImage('space') });

    };

    this.merchant = function() {

        $rootScope.$broadcast('getLog', { log: "You come across a merchant named " + UtilService.fullName() + "." });

    };

    this.opportunity = function() {
        $rootScope.$broadcast('getLog', { log: "You come across a wrecked ship floating in space." });
    };

    this.shipIssue = function() {

    };

    this.combat = function() {

    };

    this.updateState = function () {

        $rootScope.$broadcast('getState', { state: self.currentState });

    };

    self.updateState();

});

app.service('UtilService', function (DataService){

    var self = this;

    this.random = function (min,max) {

        return Math.floor(Math.random()*(max-min+1)+min);

    };

    this.randomFromArray = function (array) {

        return array[Math.floor(Math.random()*array.length)];

    };

    this.getImage = function (arrayWithinImages) {

        return self.randomFromArray(DataService.images[arrayWithinImages]);

    };

    this.fullName = function() {

        return self.randomFromArray(DataService.text.names.first) + " " + self.randomFromArray(DataService.text.names.last);

    }

});

app.service('DataService', function($http) {

    var self = this;

    this.text = {

        weird: [
            'A nearby supernova causes the instruments to go haywire for an hour.',
            'A crew member has smuggled an unknown life-form on the ship. You jettison it out the airlock.'
        ],
        names: {
            first: ['Lou', 'James', 'Meeson'],
            last: ['Reed', 'Smith', 'Toogao']
        }

    };

    this.images = {

        space: [
            "assets/img/space1.jpg",
            "assets/img/space2.jpg",
            "assets/img/space3.jpg"
        ],
        stations: [

        ],
        ships: [

        ],
        characters: [

        ]

    };

   this.getShips = function() {
       $http.get('data/ships.json').then(successCallback, errorCallback);

       function successCallback(response){
           //success code
           // console.log(response.data);
           return response;
       }
       function errorCallback(error){
           //error code
           console.log(error);
       }
   };

   this.test = function() {
       return $http.get("data/ships.json").then(function(res) {
           return res.data;
       });
   };

});

app.filter('title', function()
{
    return function(word)
    {
        return word.substring(0,1).toUpperCase() + word.slice(1);
    }
});

app.filter('camelCaseToHuman', function() {
    return function(input) {
        return input.charAt(0).toUpperCase() + input.substr(1).replace(/[A-Z]/g, ' $&');
    }
});