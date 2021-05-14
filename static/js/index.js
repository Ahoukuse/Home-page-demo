var nav_checked;
var line;
var sections = [];
var section_offsetTop = [];
var nav_li = [];
var manualScroll = false;
var lastTimer = -1;
function main() {
    nav_checked = document.querySelector('nav .nav-li-checked');
    line = document.getElementById('line');
    line.style.setProperty('--left','0px');
    line.style.setProperty('--width',nav_checked.offsetWidth+'px');

    document.querySelectorAll('h2').forEach((ele)=>{
        sections.push(ele);
        section_offsetTop.push(ele.offsetTop);
    });

    //监听点击事件
    document.querySelectorAll('.nav-li').forEach((ele)=>{
        nav_li.push(ele);
        ele.addEventListener('click',(e)=>{
            if (lastTimer != -1) {
                clearTimeout(lastTimer);
            }
            e.preventDefault();
            manualScroll = true;
            //
            let target = document.querySelector(e.target.getAttribute('href'));
            line.style.setProperty('--width',e.currentTarget.offsetWidth+'px');
            line.style.setProperty('--left',e.currentTarget.offsetLeft+'px');
            window.scroll({top:target.offsetTop,behavior:'smooth'});
            lastTimer = setTimeout(()=>{
                console.log('cancel manualScroll');
                manualScroll = false;
            },1000);
        });
    });
    if (window.innerWidth < 500) {
        alert('在大屏设备食用更佳!');
    }
}
var onScroll = false;
var lastScrollY = 0;

window.addEventListener('scroll',(e)=>{
    lastScrollY = window.scrollY;
    if (!onScroll && !manualScroll) {
        window.requestAnimationFrame(()=>{
            if (manualScroll) {
                onScroll = false;
                return;
            }
            let idx = 0;
            for (; idx < section_offsetTop.length; idx++) {
                if (lastScrollY >= section_offsetTop[idx]-25 && lastScrollY <= section_offsetTop[idx]+200) {
                    line.style.setProperty('--width',nav_li[idx].offsetWidth+'px');
                    line.style.setProperty('--left',nav_li[idx].offsetLeft+'px');
                }
            }
            onScroll = false;
        });
        onScroll = true;
    }
});

document.addEventListener('DOMContentLoaded',main);