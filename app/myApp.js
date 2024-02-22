var app = angular.module('myApp', ['ngRoute', 'firebase']);




app.run(function ($rootScope, $http, $firebaseArray,$location) {

    const firebaseConfig = {
        apiKey: "AIzaSyCYfz2GejeuEbB5nUZtl57MmwCwBliZ9ec",
        authDomain: "jkhanhno1-3c996.firebaseapp.com",
        databaseURL: "https://jkhanhno1-3c996-default-rtdb.firebaseio.com",
        projectId: "jkhanhno1-3c996",
        storageBucket: "jkhanhno1-3c996.appspot.com",
        messagingSenderId: "502632115706",
        appId: "1:502632115706:web:17b485334f1c4735dc0843",
        measurementId: "G-WQ0WQKQP4Z"
    };
    firebase.initializeApp(firebaseConfig);

    // Lấy tham chiếu đến "students" trong Realtime Database
    var studentsRef = firebase.database().ref('students');
    // Tạo một $firebaseArray để theo dõi và cập nhật dữ liệu
    $rootScope.students = $firebaseArray(studentsRef);
 


    $http.get("./db/Subject.js").then(function (response) {
        $rootScope.subjects = response.data; //dùng cho các chỗ cần thay đổi
        console.log("lấy subjects")
    });




    $rootScope.student = null;
   
    $rootScope.students.$loaded().then(function () {
      
        var rememberedUserID = sessionStorage.getItem('rememberedUserID');
        if (rememberedUserID !== null) {
            $rootScope.students.forEach(function (st) {
                if (String(st.$id) === String(rememberedUserID)) {
                    console.log('UserId đã lưu:', st.$id);
                    $rootScope.student = st;
                    
                }
            });
        } else {
            console.log('Không chọn option nhớ mật khẩu nên tài khoản nhớ không tồn tại');
            $rootScope.student = null;
        }
    }).catch(function (error) {
        console.error("lỗi loading students:", error);
    });
 


    $rootScope.logoff = function () {
        $rootScope.student = null;
        $rootScope.indexStudent = -1;
        sessionStorage.removeItem('rememberedUserID');
        Swal.fire({
            icon: 'success',
            title: 'Đăng Xuất thành công!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1600
        });

        window.location.href = "#!index";
    }


    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!$rootScope.student) {
          console.log("chưa đăng nhập");
          if ($location.path() === '/inforaccoutn' || $location.path() === '/updatepass' || $location.path().startsWith('/exam/')  ) {
            // Nếu chưa đăng nhập thì về index 
            $location.path('/index');
          }
        } else {
          if ($location.path() === '/login' || $location.path() === '/register' || $location.path() === '/forgotpass') {
            // Nếu  đăng nhập thì về index
            $location.path('/index');
          }
        }
      });

});


app.config(function ($routeProvider) {
    $routeProvider
        .when('/index', {
            templateUrl: 'layout/index.html',

        })
        .when('/about', {
            templateUrl: 'layout/about.html',

        })
        .when('/contact', {
            templateUrl: 'layout/contact.html',

        })
        .when('/faq', {
            templateUrl: 'layout/faq.html',

        })
        .when('/category', {
            templateUrl: 'layout/category.html',
            controller: 'categoryCtrl'

        })
        .when('/register', {
            templateUrl: 'layout/register.html',
            controller: 'registerCtrl'

        })
        .when('/login', {
            templateUrl: 'layout/login.html',
            controller: 'loginCtrl'

        })
        .when('/forgotpass', {
            templateUrl: 'layout/forgotpass.html',
            controller: 'forgotpassCtrl'
        })
        .when('/inforaccoutn', {
            templateUrl: 'layout/inforaccoutn.html',
            controller: 'accountCtrl'

        })
        .when('/updatepass', {
            templateUrl: 'layout/updatepass.html',
            controller: 'updatepassCtrl'

        })
        .when('/exam/:id', {
            templateUrl: 'layout/exam.html',
            controller: 'examCtrl'

        })
        .when('/startexam/:id', {
            templateUrl: 'layout/startexam.html',
            controller: 'startexamCtrl'

        })



        .otherwise({ redirectTo: '/index' });

});




app.directive('rePass', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function rePas(value) {
                var pass = scope.studentR.password;
                if (pass == value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(rePas);
        }
    }
});


// git init
// git add .  /1
// git commit -m "first commit"//2
// git branch -M main
// git remote add origin https://github.com/thansex000/web207.git
// git push -u origin main //3