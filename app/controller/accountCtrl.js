app.controller('accountCtrl', function ($scope, $rootScope, $firebaseArray) {
    // Lấy tham chiếu đến "students" trong Realtime Database
    var studentsRef = firebase.database().ref('students');
    // Tạo một $firebaseArray để theo dõi và cập nhật dữ liệu
    $rootScope.students = $firebaseArray(studentsRef);
    $scope.account = function () {  
        // Lấy dữ liệu từ các biến initial
        var updatedStudent = {
            $id: $rootScope.student.$id,
            username: $scope.initialUsername,
            fullname: $scope.initialFullname,
            email: $scope.initialEmail,
            schoolfee: $scope.initialSchoolfee,
            gender: $scope.initialGender,
            marks : $scope.initialmarks,
            birthday: $scope.initialBirthday
        };

        // Tìm sinh viên trong mảng Firebase dựa trên ID
        var studentToUpdate = $rootScope.students.$getRecord(updatedStudent.$id);

        // Cập nhật dữ liệu sinh viên
        studentToUpdate.username = updatedStudent.username;
        studentToUpdate.fullname = updatedStudent.fullname;
        studentToUpdate.email = updatedStudent.email;
        studentToUpdate.schoolfee = updatedStudent.schoolfee;
        studentToUpdate.gender = updatedStudent.gender;
        studentToUpdate.marks = updatedStudent.marks;
        studentToUpdate.birthday = updatedStudent.birthday;

        // Lưu thay đổi lên Firebase
        $rootScope.students.$save(studentToUpdate).then(function () {
            Swal.fire({
                icon: 'success',
                title: 'Cập Nhật thành công!',
              
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
        console.log($rootScope.student);
       
    };
    
});
