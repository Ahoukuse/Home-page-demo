var nav_checked;
var line;
var sections = [];
var section_offsetTop = [];
var nav_li = [];
var manualScroll = false;
var lastTimer = -1;
var interes;
var interes_before;
var placehold;
function Seq(){
    this.background_imgs_seq = ['/static/img/BOW.jpg','/static/img/p2.jpg','/static/img/code.jpg'];
    this.cat_seq = ['玩游戏','看漫画','写代码'];

    this.ptr = -1;
    this.do = function(dir){
        if (this.ptr >= this.background_imgs_seq.length-1 && dir === 'down')
            return false;
        else if (this.ptr <= 0 && dir === 'up') {
            return false;
        } else if (dir === 'down') {
            this.ptr++;
        } else if (dir === 'up') {
            this.ptr--;
        } else {
            return true;
        }
        interes_before.style.setProperty('background-image',`url(${this.background_imgs_seq[this.ptr]})`);
        placehold.innerHTML = this.cat_seq[this.ptr];
        return true;
    }
}

var seq = new Seq();

function interse_onWheel(e) {
    if (window.scrollY < section_offsetTop[2]) {
        return;
    }
    let dir = e.deltaY > 0 ? 'down':'up';
    if (seq.do(dir)) {
        window.scroll({top:section_offsetTop[2],behavior:"auto"});
        e.preventDefault();
    }
    console.log('on wheel');
}

function main() {
    nav_checked = document.querySelector('nav .nav-li-checked');
    line = document.getElementById('line');
    interes = document.getElementById('interes');
    interes_before = document.querySelector('#interes > #img-box');
    placehold = document.querySelector('#placehold');
    line.style.setProperty('--left',nav_checked.offsetLeft+'px');
    line.style.setProperty('--width',nav_checked.offsetWidth+'px');

    document.querySelectorAll('.box').forEach((ele)=>{
        sections.push(ele);
        section_offsetTop.push(ele.offsetTop);
    });
    interes.addEventListener('wheel',(e)=>{
        interse_onWheel(e);
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