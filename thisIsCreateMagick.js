


class Animation {
    constructor (elem, left, top) { // некоторые аргументы определим на будущее
    	this.data = {
    		radius  :     150, // радиус окружности 
    		speed   :     20 // скорость/задержка ( в js это мс, например 10 мс = 100 кадров в секунду)
        }
        this.elem = elem;
        this.left = left;
        this.top = top;
    	this.f = 0;
        this.s = 2 * Math.PI / 180; //Вычислим угол
        
        this.variasnleVar = this.variables.bind(this);//привязка контекста
        this.stAnim = this.startAnimation.bind(this);//привязка контекста
        this.pauseAnim = this.pauseAnimation.bind(this);//привязка контекста
        this.interes = this.interva.bind(this); //привязка контекста
        this.scrollPosition = 0;
        
        setInterval(this.variasnleVar, this.data.speed);

        this.stAnim();
        this.interes();

        elem.addEventListener('mouseover', this.jumpOver.bind(this));//обработчик
        $(document).scroll(()=>{
            this.data.radius = 150 + $(document).scrollTop();
            console.log('object :', $(document).scrollTop());
        });

        TweenMax.to(this.elem, 5, {backgroundColor:`rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`, repeat:-1, yoyo: true});
    }

    interva(){ //запускаем интервал запуска анимаций(сделано так, что бы он обновлял переменные в анимации)ж
        this.inter = setInterval(this.stAnim, this.data.speed);
    }

    variables(){//перерасчет переменных(в отдельной функции для реализации возврата на прежнее место после отлета)
        this.f += this.s; // приращение аргумента
        this.leftVar = this.left + this.data.radius * Math.sin(this.f);
        this.topVar = this.data.radius * Math.cos(this.f);
    }

    startAnimation () {// функция движения 
        TweenMax.to(this.elem, 1, {left: this.leftVar  + 'px', top: this.top + this.topVar + 'px'}); // меняем координаты элемента, подобно тому как мы это делали в школе в декартовой системе координат. Правда, в данном случае используется полярная система координат, изменяя угол 
    }

    pauseAnimation(time) {//постановка на паузу, что бы основная анимация не перебила отлёт
        clearInterval(this.inter);
        setTimeout(this.interes, time);
    }

    jumpOver() {//отлёт от мышки
        const w = $(document).width();
        const h = $(document).height();
        this.pauseAnim(1000);
        TweenMax.to(this.elem, 1, {left: w * Math.random()  + 'px', top: h * Math.random() + 'px'});
    }

}

function startMagic(arr){
    let i=0;
    jQuery.map(arr, (elem)=>{//проходимся по псевдомассиву
        const lefto = $(elem).position().left; //сохраняем координаты старта
        const topo = $(elem).position().top;

        setTimeout(()=>{//таймер, что бы все по очереди стартовали
            const amin = new Animation(elem, lefto, topo);  //запускаем анимацию
        }, i*300)
        i++;
    })
}


//проверяем, активна ли страница
$(document).bind('visibilitychange', ()=> {
    if(document.visibilityState == 'visible'){
        startMagic($('.square'));//запуск
        $(document).unbind();//снимаем слушатель, что бы при изменение не запускал заного
    };
});
//в случае, если сразу страница активна
if(document.visibilityState == 'visible'){
    startMagic($('.square'));
    $(document).unbind();
};


















// function animation(elem, left, top) { // некоторые аргументы определим на будущее
// 	var $ = {
// 		radius  :     250, // радиус окружности 
// 		speed   :     20 // скорость/задержка ( в js это мс, например 10 мс = 100 кадров в секунду)
// 	}
// 	var f = 0;
//     var s = 2 * Math.PI / 180; //Вычислим угол

// 	setInterval(function() { // функция движения 
// 		f += s; // приращение аргумента
//         TweenMax.to(elem, 1, {left: left + 250 * Math.sin(f)  + 'px', top: top + 250 * Math.cos(f) + 'px'});
//         TweenMax.to(elem, 10, {backgroundColor:`rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`});; // меняем координаты элемента, подобно тому как мы это делали в школе в декартовой системе координат. Правда, в данном случае используется полярная система координат, изменяя угол
// 		//   elem.style.top =   235 + $.radius * Math.cos(f) + 'px';
// 	}, $.speed)
// }



// let data = {
//     radius  :     250, // радиус окружности 
//     speed   :     20 // скорость/задержка ( в js это мс, например 10 мс = 100 кадров в секунду)
// }

// let f = 0;
// let s = 2 * Math.PI / 180; //Вычислим угол

// function upperF(){
//     f += s; // приращение аргумента
//     console.log('f :', f);
// }


// TweenMax.to($('.square1'), 1, {left: lefto + 250 * Math.sin(f)  + 'px', top: topo + 250 * Math.cos(f) + 'px', repeat: -1, repeatDelay: 0.02, onRepeat:upperF});
// TweenMax.to(elem, 10, {backgroundColor:`rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`});; // меняем координаты элемента, подобно тому как мы это делали в школе в декартовой системе координат. Правда, в данном случае используется полярная система координат, изменяя угол
    		







// animation($('.square1'));
// for(let i=0; i<=15; i++){
//     $('.square'+i).css('background-color', `rgb(${255*Math.random()}, ${255*Math.random()}, ${255*Math.random()})`)
//     setTimeout(animation, i*1000, $('.square'+i), lefto, topo)
    
//     $('.square'+i).mouseenter(()=>{
//         elem = $('.square'+i);
//         TweenMax.to(elem, 1, {left: 500 * Math.random()  + 'px', top: 500 * Math.random() + 'px'});
//         console.log('object :');
//     })

//     $('.square'+i).mouseleave(()=>{
//         setTimeout(animation, 3000, $('.square'+i), lefto, topo)
//     })
//     TweenMax.to($('.square'+i), 1, {left:"+=10px", top:"+=50px", reverse:true, delay:1});
//     TweenMax.to($('.square'+i), 1, {left:"+=0px", top:"+=50px", reverse:true, delay:2});
//     TweenMax.to($('.square'+i), 1, {left:"-=50px", top:"+=0px", reverse:true, delay:3});
//     TweenMax.to($('.square'+i), 1, {left:"-=50px", top:"-=50px", reverse:true, delay:4});
//     TweenMax.to($('.square'+i), 1, {left:"-=50px", top:"-=50px", reverse:true, delay:5});
// }


