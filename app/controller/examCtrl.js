app.controller('examCtrl', function ($scope, $rootScope, $firebaseArray,$routeParams) {
console.log("view môn thi"+ $routeParams.id)

 if($rootScope.student){
    $rootScope.subjects.forEach(ar => {
        if (ar.Id == $routeParams.id) {
            $scope.subject = angular.copy(ar);
            return;
        }
    });
 }else{
    window.location.href = "#!login";
 }

});
