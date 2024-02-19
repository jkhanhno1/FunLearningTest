app.controller('updatepassCtrl', function ($scope, $rootScope, $firebaseArray) {
    // Lấy tham chiếu đến "students" trong Realtime Database
    var studentsRef = firebase.database().ref('students');
    // Tạo một $firebaseArray để theo dõi và cập nhật dữ liệu
    $rootScope.students = $firebaseArray(studentsRef);
    $scope.updatepass = function () {
        if ($rootScope.student.password !== $scope.studentR.passwordold) {
            Swal.fire({
                icon: 'error',
                title: 'sai Mật khẩu cũ',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            });
            
        }
        else{
            var studentToUpdate = $rootScope.students.$getRecord($rootScope.student.$id);
            studentToUpdate.password =$scope.studentR.password
            $rootScope.students.$save(studentToUpdate).then(function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công',  
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                });
                
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cập Nhật Thất Bại!',
                   
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                });
               
            });

          
        }
    }

});
