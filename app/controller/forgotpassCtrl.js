app.controller('forgotpassCtrl', function ($scope, $rootScope) {
    console.log("Trang lấy lại mật khẩu")
    
     $scope.getPass=function() {
     var ck = true;
     $rootScope.students.forEach(st => {
         if (st.email == $scope.email && st.username == $scope.username) {
             Swal.fire({
                 icon: 'success',
                 title: 'Lấy lại tài khoản thành công!',
                 text: 'Mật khẩu: ' + st.password,
             });
             ck = false;
             return;
         }
     });
     if (ck) {
         Swal.fire({
             icon: 'error',
             title: 'Lấy lại tài khoản thất bại!',
             text: 'thông tin không tồn tại',
         });
     }
    }});
    