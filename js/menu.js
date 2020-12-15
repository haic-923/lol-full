(function() {
    var divSwitch = $(".menu_switch");
    var ulNav = $(".menu_nav");


    function toggle() {
        divSwitch.classList.toggle("menu_switch--expand");
        ulNav.classList.toggle("menu_nav--expand");
    }
    divSwitch.onclick = toggle;
    ulNav.addEventListener("click", function() {
        toggle();
    })
})();