
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsContainer  = document.querySelector('.tabheader__items');

    function hideTabs (){
        tabsContent.forEach(item =>{
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');        
        });
    }
    function showTabs (i=0){
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');      
    }
    hideTabs ();
    showTabs ();

    tabsContainer.addEventListener('click', (e) =>{
        const target = e.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabs ();
                    showTabs (i);  
                }
            });        
        }
    });

    // Timer
    const endTime = '2021-01-01';
    function GetTimeRemaining () {
        const t =  Date.parse(endTime) - new Date();
        const days = Math.floor(t/(1000*60*60*24));
        const hours = Math.floor(t/(1000*60*60)%24);
        const minutes = Math.floor(t/(1000*60)%60);
        const seconds = Math.floor(t/(1000)%60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZero(num){
        if(num >=0 && num <10){
           return `0${num}`;
        } else {return num;
        }
    }

    function setClock (selector, endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock ();

        function updateClock (){
            const t = GetTimeRemaining (endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <=0){
                clearInterval(timeInterval);
            }
        }

    }

    setClock ('.timer', endTime);
// Modal

const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const closemodalBtn = document.querySelector('[data-close]');

function showModal (){   
    modal.classList.add('show', 'fade');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout (openModalTimer);
}

function closeModal (){
    modal.classList.remove('show', 'fade');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

modalTrigger.forEach(btn =>{
    btn.addEventListener('click', ( showModal));
});

closemodalBtn.addEventListener('click', (closeModal));

modal.addEventListener('click', (e) => {
    if(e.target === modal){
        closeModal();
    }
});
 
document.addEventListener('keydown', (e) =>{
    if(e.code === 'Escape'&& modal.classList.contains('show')){
        closeModal();
    }
});

function openModalByScroll (){    
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        showModal();
       window.removeEventListener('scroll', openModalByScroll);        
    }
}
window.addEventListener('scroll', openModalByScroll);

const openModalTimer = setTimeout(showModal, 5000);

// cards (classes)

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }

    render() {
        const element = document.createElement('div');
        if (this.classes.length === 0){
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
            <img src=${this.src} alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }   
}
new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    15,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    12,
    '.menu .container'
).render();