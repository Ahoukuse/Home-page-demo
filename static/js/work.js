function work_main() {
    document.querySelectorAll('.cart').forEach((ele)=>{
        let timer = -1;

        ele.addEventListener('mouseenter',(e)=>{
            if (timer != -1) {
                clearTimeout(timer);
                ele.classList.remove('cart-hover');
                ele.classList.remove('cart-leave-hover');
            }
            ele.classList.add('cart-hover');
        });
        ele.addEventListener('mouseleave',(e)=>{
            ele.classList.add('cart-leave-hover');
            
            timer = setTimeout(()=>{
                ele.classList.remove('cart-hover');
                ele.classList.remove('cart-leave-hover');
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