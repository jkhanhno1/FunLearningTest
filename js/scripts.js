/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// Lấy tất cả các li trong thẻ ul có class là "nav"
const navItems = document.querySelectorAll('.navssss');

// Lặp qua từng li và thêm sự kiện 'click' vào mỗi li
navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Xóa lớp active từ tất cả các li
        navItems.forEach(navItem => {
            navItem.querySelector('a').classList.remove('active');
        });
        // Thêm lớp active vào li được click
        this.querySelector('a').classList.add('active');
    });
});
