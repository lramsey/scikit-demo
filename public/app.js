var app = angular.module('app', []);

app.controller('trees', function($scope, $http){
    var get = function(param){
        $http.get('/sklearn/' + param ).success(function(data){
            console.log(data);
        });
    };

    $scope.getForest = function(){
        console.log('traversing the trees');
        get('RandomForestClassifier');
    };

    $scope.getGradient = function(){
        console.log('gradient boosting');
        get('GradientBoostingClassifier');
    };
    
});