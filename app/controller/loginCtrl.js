app.controller('loginCtrl', function ($scope, $rootScope, $firebaseArray, $window) {
    // Lấy tham chiếu đến "students" trong Realtime Database
    var studentsRef = firebase.database().ref('students');
    // Tạo một $firebaseArray để theo dõi và cập nhật dữ liệu
    $rootScope.students = $firebaseArray(studentsRef);

    $scope.login = function () {

        // Lặp qua danh sách sinh viên trong $rootScope.students để tìm kiếm thông tin đăng nhập
        for (var i = 0; i < $rootScope.students.length; i++) {
            var student = $rootScope.students[i];
            // Kiểm tra thông tin đăng nhập
            if (student.username === $scope.username && student.password === $scope.password) {
                // Nếu tìm thấy, hiển thị thông báo đăng nhập thành công và thoát khỏi hàm
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng Nhập thành công!',
                    text: '',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                });
                $window.sessionStorage.setItem('rememberedUserID', student.$id);
                $rootScope.student = student
                console.log($rootScope.student)
                window.location.href = "#!index";
                return;
            }
        }
        // Nếu không tìm thấy thông tin đăng nhập, hiển thị thông báo lỗi
        Swal.fire({
            icon: 'error',
            title: 'Đăng Nhập Không Thành Công!',
            text: 'Tài khoản hoặc mật khẩu không đúng',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
    }
});
