app.controller('categoryCtrl', function ($scope, $rootScope, $firebaseArray) {
    $scope.cout = 0;//
    $scope.pageCount = Math.ceil($rootScope.subjects.length / 6);//4

    $scope.prev = function() {
        if ($scope.cout > 0) {
            $scope.cout -= 6;
        }
    }
    $scope.next = function() {
        if ($scope.cout < ($scope.pageCount - 1) * 6) {//0<18 
            $scope.cout += 6;
        }
    }
  
    
});
