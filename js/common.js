function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector)
}

function width() {
    return document.documentElement.clientWidth;
}

function height() {
    return document.documentElement.clientHeight;
}
var carouselId = "newsCarousel";
var datas = [{
        link: "https://lolm.qq.com/m/news_detail.html?docid=8584324486918752329&amp;e_code=492513&amp;idataid=279688",
        image: "https://ossweb-img.qq.com/upload/adw/image/20191015/80cbdbaff4a1aa009f61f9240a910933.jpeg",
    },
    {
        link: "https://lolm.qq.com/m/news_detail.html?docid=13355407427466544705&amp;e_code=492506&amp;idataid=279689",
        image: "https://ossweb-img.qq.com/upload/adw/image/20191015/696545e262f2cbe66a70f17bf49f81e0.jpeg",
    },
    {
        link: "https://lolm.qq.com/m/news_detail.html?docid=15384999930905072890&amp;e_code=492507&amp;idataid=279690",
        image: "https://ossweb-img.qq.com/upload/adw/image/20191018/3c910d44898d7221344718ef3b7c0a7e.jpeg",
    },
];

function createCarousel(carouselId, datas) {
    var container = document.getElementById(carouselId);
    var carouselList = container.querySelector(".g_carousel-list");
    var indicator = container.querySelector(".g_carousel-indicator");
    var prev = container.querySelector(".g_carousel-prev");
    var next = container.querySelector(".g_carousel-next");
    var currindex = 0;

    function createCarouselElements() {
        var listHtml = "";
        var indHTML = "";
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.link) {
                listHtml += `<li>
          <a href="${data.link}" target="_blank">
            <img src="${data.image}">
          </a>
          </li>`;
            } else {
                listHtml += `<li>
            <img src="${data.image}">
          </li>`;
            }
            indHTML += "<li></li>";
        }
        carouselList.style.width = `${datas.length}00%`;
        carouselList.innerHTML = listHtml;
        indicator.innerHTML = indHTML;
    }

    createCarouselElements();

    function setStatus() {
        carouselList.style.marginLeft = -currindex * width() + "px";
        var beforeSelected = indicator.querySelector(".selected");
        if (beforeSelected) {
            beforeSelected.classList.remove("selected");
        }
        indicator.children[currindex].classList.add("selected");
        if (prev) {
            if (currindex === 0) {
                prev.classList.add("disabled");
            } else {
                prev.classList.remove("disabled")
            }
        }
        if (next) {
            if (currindex === datas.length - 1) {
                next.classList.add("disabled");
            } else {
                next.classList.remove("disabled");
            }
        }
    }
    setStatus();

    function toRinght() {
        if (currindex === 0) {
            return;
        }
        currindex--;
        setStatus();
    }

    function toLeft() {
        if (currindex === datas.length - 1) {
            return;
        }
        currindex++;
        setStatus();
    }
    var timer = null;

    function start() {
        if (timer) {
            return;
        }
        timer = setInterval(function() {
            currindex++;
            if (currindex === datas.length) {
                currindex = 0;
            }
            setStatus();
        }, 2000);

    }


    function stop() {
        clearInterval(timer);
        timer = null;
    }
    start();
    if (prev) {
        prev.onclick = toRinght;
    }
    if (next) {
        next.onclick = toLeft;
    }
    container.ontouchstart = function(e) {
        e.stopPropagation();
        var x = e.touches[0].clientX;
        stop();
        carouselList.style.transition = "none";
        var pressTime = Date.now();
        container.ontouchmove = function(e) {
            var dis = e.touches[0].clientX - x;
            carouselList.style.marginLeft = -currindex * width() + dis + "px";
        };
        container.ontouchend = function(e) {
            var dis = e.changedTouches[0].clientX - x;
            start();
            carouselList.style.transition = "";
            container.ontouchmove = null;
            var duration = Date.now() - pressTime;
            if (duration < 300) {
                if (dis > 20 && currindex > 0) {
                    toRinght();
                } else if (dis < -20 && currindex < datas.length - 1) {
                    toLeft();
                } else {
                    setStatus();
                }
            } else {
                if (dis < -width() / 2 && currindex < datas.length - 1) {
                    toLeft();
                } else if (dis > width() / 2 && currindex > 0) {
                    toRinght();
                } else {
                    setStatus();
                }
            }
        };
    };
}
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
        throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
        headers: {
            target,
        },
    }).then((r) => r.json());
}