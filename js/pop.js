var showPop = (function() {
    //弹出窗口
    function showPop(id) {
        $("#" + id).style.display = "";
    }
    //关闭窗口
    var closes = $$(".pop_close");
    for (var i = 0; i < closes.length; i++) {
        closes[i].onclick = function() {
            var container = this.parentElement.parentElement;
            container.style.display = "none";
        };
    }

    var popwx = $(".pop_wx");
    var popqq = $(".pop_qq");
    popwx.onclick = function() {
        popwx.classList.add("selected");
        popqq.classList.remove("selected");

    }
    popqq.onclick = function() {
        popqq.classList.add("selected")
        popwx.classList.remove("selected");
    }
    var closeBtn = $("#popVideo .pop_close");
    closeBtn.addEventListener("click", function() {
        $("#popVideo video").pause();
    });
    return showPop;
})();