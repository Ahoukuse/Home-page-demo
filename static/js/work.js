function work_main() {
    document.querySelectorAll('.card').forEach((ele)=>{
        let timer = -1;

        ele.addEventListener('mouseenter',(e)=>{
            if (timer != -1) {
                clearTimeout(timer);
                ele.classList.remove('card-hover');
                ele.classList.remove('card-leave-hover');
            }
            ele.classList.add('card-hover');
        });
        ele.addEventListener('mouseleave',(e)=>{
            ele.classList.add('card-leave-hover');
            
            timer = setTimeout(()=>{
                ele.classList.remove('card-hover');
                ele.classList.remove('card-leave-hover');
                timer = -1;
            },700);
        });
    });
    document.querySelectorAll('button.learn-more').forEach((ele)=>{
        ele.addEventListener('click',(e) => {
           let url = ele.getAttribute('href');
           if (url.startsWith('http'))
                window.open(url);
        });
    });
}

window.addEventListener('DOMContentLoaded',work_main);