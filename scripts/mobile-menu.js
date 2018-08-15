var mobileMenu = (function () {

    var module = {};
    module.toggleMenu = function() {
        var hamburger = document.querySelector('.hamburger');
        var mobileNav = document.querySelector('.mobile-header-nav');

        console.log(mobileNav);
        if(!hamburger.classList.contains('is-active')){
            hamburger.classList.add('is-active');
            mobileNav.classList.add('show');

        } else{
            mobileNav.classList.remove('show');
            hamburger.classList.remove('is-active');
        }   
    }
    return module;
}());