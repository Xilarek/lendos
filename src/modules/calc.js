const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSqare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            animated;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSqare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }
        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 5 < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * (typeValue * squareValue * countValue * dayValue));
        }
        
        // функция - оболочка анимации
        cancelAnimationFrame(animated);
        const animate = ({timing, draw, duration }) => {
            let start = performance.now();
            const animateBlock = (time) => {
                requestAnimationFrame(animateBlock);
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                // вычисление текущего состояния анимации
                let progress = timing(timeFraction);

                draw(progress); // отрисовать её

                if (timeFraction >= 1) {
                    cancelAnimationFrame(animated);
                }
            };
            requestAnimationFrame(animateBlock);
        };

        animate({
            // скорость анимации
            duration: 1000,
            // функции расчёта времени
            timing(timeFraction) {
                return timeFraction;
            },
            // действие, которое повторяем каждую итерацию
            draw(progress) {
                totalValue.textContent = Math.floor(progress * total);
            }
        });
        totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        //Создаем проверку, если событие прошло в одном из инпутов 
        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

export default calc;