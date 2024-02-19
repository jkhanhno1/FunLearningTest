app.controller('registerCtrl', function ($scope, $rootScope, $firebaseArray) {
    // Lấy tham chiếu đến "students" trong Realtime Database
    var studentsRef = firebase.database().ref('students');
    // Tạo một $firebaseArray để theo dõi và cập nhật dữ liệu
    $rootScope.students = $firebaseArray(studentsRef);

    $scope.register = function() {
        // Kiểm tra xem studentR.username đã tồn tại trong cơ sở dữ liệu hay không
        studentsRef.orderByChild("username").equalTo($scope.studentR.username).once("value")
            .then(function(snapshot) {
                if (snapshot.exists()) {
                    // Nếu username đã tồn tại, hiển thị cảnh báo
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng ký thất bại!',
                        text: 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác!',
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 1600
                    });
                } else {
                    // Nếu username chưa tồn tại, thêm đối tượng mới vào cơ sở dữ liệu
                    $rootScope.students.$add($scope.studentR)
                        .then(function(ref) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Đăng ký thành công!',
                                text: 'Quay lại trang chủ!',
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 1600
                            });

                            window.location.href = "#!login";
                        })
                        .catch(function(error) {
                            console.error("Lỗi khi thêm sinh viên mới:", error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Đăng ký thất bại!',
                                text: 'Quay lại trang chủ!',
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 1600
                            });
                        });
                }
            })
            .catch(function(error) {
                console.error("Lỗi khi kiểm tra username:", error);
            });
    }


});
