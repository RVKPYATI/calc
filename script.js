document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.calculate__item');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('.modal__close');
    const calculateBlock = document.querySelector('.calculate__block');
    const modalWindow = modal.querySelector('.modal__window');
    const askAge = document.querySelector('.ask__age');
    const askThanks = document.querySelector('.ask__thanks');
    const inputAge = document.querySelector('#ageInput');
    const askAll = document.querySelector('.ask__all');
    const btn = document.querySelector('.btn');

    const age = document.querySelector('#age');
    const respon = document.querySelector('#respon');
    const auto = document.querySelector('#auto');
    const farm = document.querySelector('#farm');
    const crash = document.querySelector('#crash');
    const build = document.querySelector('#build');
    const teeth = document.querySelector('#teeth');
    let img = age.querySelector('.item__icon img');
    let img2 = auto.querySelector('.item__icon img');
    let img3 = respon.querySelector('.item__icon img');
    let img4 = farm.querySelector('.item__icon img');
    let img5 = crash.querySelector('.item__icon img');
    let img6 = build.querySelector('.item__icon img');
    let img7 = teeth.querySelector('.item__icon img');
    const calcResultSpan = document.querySelector('.calculate__result span');


    let summ = 0;
    let ageRes = 0;
    let priceRes = 0;
    let allResult = 0;
    let pricesData = {};
    const user = {};
    const questions = [
        {
            question1: 'Есть ли у вас автомобильная страховка?',
            question2: 'Застрахован ли ты меньше чем 6 месяцев в страховке и была ли у тебя авария в ближайшее 2 года',
            question3: 'Сколько ты платишь за страховку?',

        },
        {
            question1: 'Есть ли у вас страховка личной ответственности?',
            question2: 'Застрахован ли ты меньше чем 6 месяцев в страховке и была ли у тебя страховой случай в ближайшее 2 года',
            question3: 'Сколько ты платишь за страховку',

        },
        {
            question1: 'Есть ли у вас страховка домашних хозйств?',
            question2: 'Застрахован ли ты меньше чем 6 месяцев в страховке и была ли у тебя страховой случай в ближайшее 2 года',
            question3: 'Сколько ты платишь за страховку',

        },
        {
            question1: 'Есть ли у вас страховка от аварий?',
            question2: 'Застрахован ли ты меньше чем 6 месяцев в страховке и была ли у тебя страховой случай в ближайшее 2 года',
            question3: 'Сколько ты платишь за страховку',

        },
        {
            question1: 'Есть ли у вас страховка зданий?',
            question2: 'Застрахован ли ты меньше чем 6 месяцев в страховке и была ли у тебя страховой случай в ближайшее 2 года',
            question3: 'Сколько ты платишь за страховку',

        },
        {
            question1: 'Ходишь ли ты на регулярную чистку зубов?',
            question2: 'Застрахован ли ты меньше чем 6 месяцев в страховке и была ли у тебя страховой случай в ближайшее 2 года',
            question3: 'Сколько ты платишь за страховку',

        },
    ];
    let yes = '';
    let no = '';
    let yes2 = '';
    let no2 = '';
    let askTwo = '';
    let askThree = '';
    let btnAnswer = '';
    let payPeriod = '';
    let period = '';
    let c = 0;

    if (localStorage.summ) {
        c = +localStorage.getItem('summ');
    } else {
        c = 0;
    }
    //Функция открытия/закрытия окна
    const getModal = function (object, sense) {
        object.style.display = sense;
    };

    const thanks = function (object, message) {
        object.textContent = message;
    };
    //Вывод вопросов
    const renderQuestions = function (obj, i) {
        askAll.innerHTML = `
    <div class="ask__item" id="askOne">
        <div class="ask" id="ask">${obj[i].question1}</div>
            <div class="answer1">
                <div>
                    <input type="radio" id="yes${i}" name="ask${i}" value="1">
                    <label for="yes${i}">Да</label>
                </div>
                <div>
                    <input type="radio" id="no${i}" name="ask${i}" value="0">
                    <label for="no${i}">Нет</label>
                </div>
            </div>
    </div>
    <div class="ask__item" id="askTwo">
        <div class="ask" id="ask">${obj[i].question2}</div>
            <div class="answer2">
                <div>
                    <input type="radio" id="yes${i + 1}" name="drone${i}" value="1">
                    <label for="yes${i + 1}">Да</label>
                </div>              
                <div>
                    <input type="radio" id="no${i + 1}" name="drone${i}" value="0">
                    <label for="no${i + 1}">Нет</label>
                </div>
            </div>
    </div>
    <div class="ask__item" id="askThree">
        <div class="ask" id="ask">${obj[i].question3}</div>
        <div class="answer3">
            <div>
                <select name="selectPeriod" id="period">
                    <option value=12>Ежемесячно</option>
                    <option value=4>Ежеквартально</option>
                    <option value=1>Ежегодно</option>
                </select>
            </div>
            <div>
                <input type="number" id="payPeriod">
            </div>
            <button class="btn-answer" id="btnAnswer${i}">OK</button>
        </div>
    </div>
    `;
        yes = document.querySelector(`#yes${i}`);
        no = document.querySelector(`#no${i}`);
        yes2 = document.querySelector(`#yes${i + 1}`);
        no2 = document.querySelector(`#no${i + 1}`);
        askTwo = document.querySelector('#askTwo');
        askThree = document.querySelector('#askThree');
        btnAnswer = document.querySelector(`#btnAnswer${i}`);
        payPeriod = document.querySelector('#payPeriod');
        period = document.querySelector('#period');
    };

    const checkedYes = function (id) {
        let a = +payPeriod.value;
        let b = +period.options[period.options.selectedIndex].value;
        c = ((a * b) / 100) * 5;
        localStorage.setItem(`summ${id}`, c);
        user.summ = c;
        thanks(askThanks, 'Спасибо');
        setTimeout(getModal, 500, modal, 'none');
        getModal(askThanks, 'flex');
        getModal(askAge, 'none');
        getModal(askAll, 'none');
    };

    const checkedNo = function (id) {
        thanks(askThanks, 'Спасибо');
        getModal(askThanks, 'flex');
        getModal(askAge, 'none');
        getModal(askAll, 'none');
        localStorage.setItem(`summ${id}`, 0);
    };

    const startBlock = function () {
        getModal(askThanks, 'none');
        getModal(askAll, 'block');
        getModal(modal, 'block');
        getModal(askAge, 'none');
    };


    const allSummLocalStore = function () {
        let summ = parseInt(localStorage.summcrash) +
            parseInt(localStorage.summbuild) +
            parseInt(localStorage.summfarm) +
            parseInt(localStorage.summauto) +
            parseInt(localStorage.summrespon);
        return summ;
    };

    const maxEuro = function () {
        let result = localStorage.summteeth * 20;
        if (result > 100) {
            result -= 100;
        } else if (result < 100) {
            result -= result;
        }
        return result;
    };

    const finalResult = function () {
        ageRes = +localStorage.userAge;

        if (ageRes >= 18 && ageRes <= 20) {
            priceRes = pricesData.price[0].price;
        }
        if (ageRes >= 21 && ageRes <= 25) {
            priceRes = pricesData.price[1].price;
        }
        if (ageRes >= 26 && ageRes <= 30) {
            priceRes = pricesData.price[2].price;
        }
        if (ageRes >= 31 && ageRes <= 35) {
            priceRes = pricesData.price[34].price;
        }
        if (ageRes >= 36 && ageRes <= 40) {
            priceRes = pricesData.price[4].price;
        }
        if (ageRes >= 41 && ageRes <= 45) {
            priceRes = pricesData.price[5].price;
        }
        if (ageRes >= 46 && ageRes <= 50) {
            priceRes = pricesData.price[6].price;
        }
        if (ageRes >= 51 && ageRes <= 55) {
            priceRes = pricesData.price[7].price;
        }
        if (ageRes >= 56 && ageRes <= 60) {
            priceRes = pricesData.price[8].price;
        }
        if (ageRes >= 61 && ageRes <= 65) {
            priceRes = pricesData.price[9].price;
        }
        if (ageRes >= 66 && ageRes <= 70) {
            priceRes = pricesData.price[10].price;
        }
        if (ageRes >= 71 && ageRes <= 75) {
            priceRes = pricesData.price[11].price;
        }
        if (ageRes >= 76 && ageRes <= 80) {
            priceRes = pricesData.price[12].price;
        }
        let diff = maxEuro();
        let localSumm = allSummLocalStore();
        allResult = (priceRes * 12) - 144 - (+localStorage.summteeth * 20) - diff - localSumm;
        return allResult;
    };

    const yesNo = function (event, block1, block2) {
        yes.addEventListener('click', () => {
            getModal(askTwo, block1);
            getModal(askThree, block2);
            btnAnswer.addEventListener('click', () => {
                if (payPeriod.value === '') {
                    alert('Вы не ввели сумму страховки');
                } else {
                    if (no2.checked) {
                        checkedYes(event.id);
                        let img = event.querySelector('.item__icon img');
                        localStorage.setItem(`${event.id}`, '/img/check.svg');
                        img.src = localStorage.getItem(`${event.id}`);
                        let all = finalResult();
                        localStorage.setItem('allresult', Math.abs(all));
                        if (all < 0) {
                            calcResultSpan.textContent = Math.abs(all);
                        } else {
                            calcResultSpan.textContent = 0;
                        }
                    } else if (yes2.checked) {
                        checkedNo(event.id);
                        let img = event.querySelector('.item__icon img');
                        img.src = '/img/alert.svg';
                    }
                }
            });
        });
        no.addEventListener('click', () => {
            getModal(askTwo, 'none');
            getModal(askThree, 'none');
            setTimeout(getModal, 1000, modal, 'none');
        });
    };

    const teatchFunc = function (event, block1, block2) {
        yes.addEventListener('click', () => {
            getModal(askTwo, block1);
            getModal(askThree, block2);
            btnAnswer.addEventListener('click', () => {
                if (payPeriod.value === '') {
                    alert('Вы не ввели сумму страховки');
                } else {
                    let a = +payPeriod.value;
                    let b = +period.options[period.options.selectedIndex].value;
                    c = ((a * b) / 100) * 5;
                    localStorage.setItem(`summteeth`, c);
                    user.summ = c;
                    thanks(askThanks, 'Спасибо');
                    setTimeout(getModal, 500, modal, 'none');
                    getModal(askThanks, 'flex');
                    getModal(askAge, 'none');
                    getModal(askAll, 'none');
                    let img = event.querySelector('.item__icon img');
                    localStorage.setItem(`${event.id}`, '/img/check.svg');
                    img.src = localStorage.getItem(`${event.id}`);
                    let all = finalResult();
                    localStorage.setItem('allresult', Math.abs(all));
                    if (all < 0) {
                        calcResultSpan.textContent = Math.abs(all);
                    } else {
                        calcResultSpan.textContent = 0;
                    }

                }
            });
        });
        no.addEventListener('click', () => {
            getModal(askTwo, 'none');
            getModal(askThree, 'none');
            setTimeout(getModal, 1000, modal, 'none');
        });
    };

    const repeatInfo = function (block, index) {
        getModal(askAll, 'none');
        getModal(modal, 'block');
        getModal(askAge, 'flex');
        askAge.innerHTML = '<div class="thanksInfo"><p>Вы уже внесли информацию</p><button id="btnConfig">Изменить</button></div>';
        let btnConfig = document.querySelector('#btnConfig');
        btnConfig.addEventListener('click', () => {
            getModal(askAge, 'none');
            startBlock();
            renderQuestions(questions, index);
            yesNo(block, 'block', 'block');
        });
    };
    const repeatInfoTeeth = function (block, index) {
        getModal(askAll, 'none');
        getModal(modal, 'block');
        getModal(askAge, 'flex');
        askAge.innerHTML = '<div class="thanksInfo"><p>Вы уже внесли информацию</p><button id="btnConfig">Изменить</button></div>';
        let btnConfig = document.querySelector('#btnConfig');
        btnConfig.addEventListener('click', () => {
            getModal(askAge, 'none');
            startBlock();
            renderQuestions(questions, index);
            teatchFunc(block, 'none', 'block');
        });
    };

    //Закрытие модального окна
    modalCloseBtn.addEventListener('click', () => {
        getModal(modal, 'none');
    });

    async function getData() {

        return fetch('https://script.googleusercontent.com/macros/echo?user_content_key=l2SDajhIWWRG8e5DaU8rJ_Qp6ijv5Wp6hg7WiXBnveA9lF58AQsH1TAYQFGeaagcRxYmXJjHjDlrEJvslHf2dd8pJkLgC6yOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLK9awj0pRrUQBpsP3Zw_bXmeijT75JfrOhcbKsVGSkVtkvK3lNzb22QOIifo_9mHOuLw_i6ItwzmPIUYkzLRT27_qf2L6JviA&lib=MqsDb6-9URpLwpdD8Kb1Bs7zvWIPdA_fX')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                pricesData = Object.assign({}, data);
            });
    };

    getData();

    if (localStorage.icon) {
        img.src = localStorage.getItem('icon');
    } else {
        img.src = '/img/alert.svg';
    }
    if (localStorage.auto) {
        img2.src = localStorage.getItem('auto');
    } else {
        img2.src = '/img/alert.svg';
    }
    if (localStorage.respon) {
        img3.src = localStorage.getItem('respon');
    } else {
        img3.src = '/img/alert.svg';
    }
    if (localStorage.farm) {
        img4.src = localStorage.getItem('farm');
    } else {
        img4.src = '/img/alert.svg';
    }
    if (localStorage.crash) {
        img5.src = localStorage.getItem('crash');
    } else {
        img5.src = '/img/alert.svg';
    }
    if (localStorage.build) {
        img6.src = localStorage.getItem('build');
    } else {
        img6.src = '/img/alert.svg';
    }
    if (localStorage.teeth) {
        img7.src = localStorage.getItem('teeth');
    } else {
        img7.src = '/img/alert.svg';
    }
    if (localStorage.allresult) {
        calcResultSpan.textContent = localStorage.getItem('allresult');
    } else {
        calcResultSpan.textContent = 0;
    }

    calculateBlock.addEventListener('click', (event) => {

        if (event.target.id === 'age') {
            getModal(askThanks, 'none');
            getModal(askAll, 'none');
            getModal(modal, 'block');
            getModal(askAge, 'flex');
            btn.addEventListener('click', () => {

                user.age = inputAge.value;
                localStorage.setItem('userAge', user.age);
                getModal(askAge, 'none');
                getModal(askThanks, 'flex');
                thanks(askThanks, 'Спасибо');
                setTimeout(getModal, 500, modal, 'none');
                let img = age.querySelector('.item__icon img');
                localStorage.setItem('icon', '/img/check.svg');
                img.src = localStorage.getItem('icon');

            });

        }
        if (event.target.id === 'auto') {
            if (localStorage.auto) {
                repeatInfo(auto, 0);
            } else {
                startBlock();
                renderQuestions(questions, 0);
                yesNo(auto, 'block', 'block');
            }
        }

        if (event.target.id === 'respon') {
            if (localStorage.respon) {
                repeatInfo(respon, 1);
            } else {
                startBlock();
                renderQuestions(questions, 1);
                yesNo(respon, 'block', 'block');
            }

        }
        if (event.target.id === 'farm') {
            if (localStorage.farm) {
                repeatInfo(farm, 2);
            } else {
                startBlock();
                renderQuestions(questions, 2);
                yesNo(farm, 'block', 'block');
            }
        }
        if (event.target.id === 'crash') {
            if (localStorage.crash) {
                repeatInfo(crash, 3);
            } else {
                startBlock();
                renderQuestions(questions, 3);
                yesNo(crash, 'block', 'block');
            }
        }
        if (event.target.id === 'build') {
            if (localStorage.build) {
                repeatInfo(build, 4);
            } else {
                startBlock();
                renderQuestions(questions, 4);
                yesNo(build, 'block', 'block');
            }
        }
        if (event.target.id === 'teeth') {
            if (localStorage.teeth) {
                repeatInfoTeeth(teeth, 5);
            } else {
                startBlock();
                renderQuestions(questions, 5);
                getModal(askTwo, 'none');
                teatchFunc(teeth, 'none', 'block');

            }

        }


    });
});