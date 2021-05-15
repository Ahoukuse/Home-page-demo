console.log('modal');
class Modal {
    constructor(id) {
        this.id = id;
        this._ele = document.getElementById(id);
        this._ele.querySelector('#modal-close').addEventListener('click',(e)=>{
            this._ele.classList.remove('open');
        });
    }
    toggle() {
       this._ele.classList.toggle('open'); 
    }
}
