var showPage = (function() {
    var pageIndex = 0;
    var pages = $$(".page_container .page");
    var nextIndex = null;
    //
    function setStatic() {
        nextIndex = null;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (i === pageIndex) {
                page.style.zIndex = 1;
            } else {
                page.style.zIndex = 10;
            }
            page.style.top = (i - pageIndex) * height() + "px";
        }
    }
    setStatic();

    function moving(dis) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (i !== pageIndex) {
                page.style.top = (i - pageIndex) * height() + dis + "px";
            }
        }
        if (dis > 0 && pageIndex > 0) {
            nextIndex = pageIndex - 1;
        } else if (dis < 0 && pageIndex < pages.length) {
            nextIndex = pageIndex + 1;
        } else {
            nextIndex = null
        }
    }

    function finishMove() {
        if (nextIndex == null) {
            return
        } else {
            var nextpage = pages[nextIndex];
            nextpage.style.transition = ".5s"
            nextpage.style.top = 0;
        }
        setTimeout(() => {
            pageIndex = nextIndex;
            nextpage.style.transition = "";
            setStatic();
        }, 500);
    }
    var pageContainer = $(".page_container");
    pageContainer.ontouchstart = function(e) {
        var y = e.touches[0].clientY;
        pageContainer.ontouchmove = function(e) {
            var dis = e.touches[0].clientY - y;
            if (Math.abs(dis) < 20) {
                dis = 0;
            }
            moving(dis)
        };
        pageContainer.ontouchend = function() {
            finishMove();
            pageContainer.ontouchmove = null;
        }
    };

    function showPage(index) {
        var nextPage = pages[index]; //下一个页面元素
        if (index < pageIndex) {
            // 下一个页面在当前页面上面
            nextPage.style.top = -height() + "px";
        } else if (index > pageIndex) {
            // 下一个页面在当前页面下面
            nextPage.style.top = height() + "px";
        } else {
            // 下一个页面就是当前页面
            if (pageIndex === 0) {
                // 目前是第一个页面
                pageIndex++;
            } else {
                pageIndex--;
            }
            setStatic(); // 重新设置位置
        }
        // 强行让浏览器渲染
        nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
        nextIndex = index; // 设置下一个页面索引
        finishMove();
    }
    return showPage;
})();