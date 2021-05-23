var navChecked;
var line;
var sections = [];
var section_offsetTop = [];
var navItems = [];
var manualScroll = false;
var lastTimer = -1;



function main() {
    navChecked = document.querySelector('nav .nav-li-checked');
    line = document.getElementById('line');
    line.style.setProperty('--left',navChecked.offsetLeft+'px');
    line.style.setProperty('--width',navChecked.offsetWidth+'px');

    document.querySelectorAll('.box').forEach((ele)=>{
        sections.push(ele);
        section_offsetTop.push(ele.offsetTop);
    });
    //监听点击事件
    document.querySelectorAll('.nav-li').forEach((ele)=>{
        navItems.push(ele);
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
    let m = new Modal('warning');
    setTimeout(()=>{
        m.toggle();
    },1);
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
                    line.style.setProperty('--width',navItems[idx].offsetWidth+'px');
                    line.style.setProperty('--left',navItems[idx].offsetLeft+'px');
                }
            }
            onScroll = false;
        });
        onScroll = true;
    }
});

document.addEventListener('DOMContentLoaded',main);