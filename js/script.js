'use strict';
let number = document.querySelectorAll('.column-parallax-number');

window.onscroll = function () {
    myFunction();
};
function myFunction() {
    var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    document.getElementById('myBar').style.width = scrolled + '%';

    if (scrolled > 99.99) {
        document.getElementById('myBar').style.background =
            'linear-gradient(90deg, #3be1fb 0%, #13ab3b 0.01%)';
    } else {
        document.getElementById(
            'myBar'
        ).style.background = `linear-gradient(90deg, #3be1fb ${
            Math.floor(scrolled) + '%'
        }, #13ab3b 100%)`;
    }
}

number.forEach((elem) => {
    const formater = new Intl.NumberFormat('ru-RU');
    let numberTop = elem.getBoundingClientRect().top;
    let start = +elem.innerHTML,
        end = +elem.dataset.max;
    window.addEventListener('scroll', function onScroll() {
        if (window.pageYOffset > numberTop - window.innerHeight / 1) {
            this.removeEventListener('scroll', onScroll);
            let interval = setInterval(function () {
                elem.innerHTML = formater.format(++start);

                if (start == end) {
                    clearInterval(interval);
                }
            }, 10);
        }
    });
});

const questionsItem = document.querySelectorAll('.questions__item');
questionsItem.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if (
            e.currentTarget
                .querySelector('.questions__item-content')
                .classList.contains('_is-active')
        ) {
            questionsItem.forEach((elem) => {
                elem.querySelector('.questions__item-content').classList.add(
                    '_is-active'
                );
                elem.querySelector('p').style.cssText =
                    'color: rgb(87, 87, 87); font-size: inherit';
                elem.querySelector('.cposs').style.transform = 'rotate(0deg)';
            });

            e.currentTarget
                .querySelector('.questions__item-content')
                .classList.remove('_is-active');
            e.currentTarget.querySelector('p').style.cssText =
                'color: rgb(0, 175, 240); font-size: calc(100% - 2px)';
            e.currentTarget.querySelector('.cposs').style.transform =
                'rotate(45deg)';
        } else {
            elem.querySelector('.questions__item-content').classList.add(
                '_is-active'
            );
            elem.querySelector('p').style.cssText = 'color: rgb(87, 87, 87)';
            elem.querySelector('.cposs').style.transform = 'rotate(0deg)';
        }
    });
});

const modalsBtn = document.querySelectorAll('._modal-open');
const modals = document.querySelectorAll('._modal');

function openModal(elem) {
    elem.classList.add('_modal-active');
    document.body.classList.add('no-scroll');
}

function closeModal(e) {
    if (
        e.target.classList.contains('modal__close-wrapper') ||
        e.target.classList.contains('modal-os__close-wrapper') ||
        e.target.classList.contains('modal__close') ||
        e.target.classList.contains('modal-os__close')
    ) {
        e.target.closest('._modal').classList.remove('_modal-active');
        document.body.classList.remove('no-scroll');
    }
}

modalsBtn.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        let data = e.target.dataset.modalOpen;
        modals.forEach((modal) => {
            if (modal.dataset.modal == data) {
                openModal(modal);
            }
        });
    });
});
modals.forEach((modal) => {
    modal.addEventListener('click', (e) => closeModal(e));
});

const offset = 500;
let times;
let YOffsets = 0;
let timeOut;
const scrollTop = document.querySelector('.scrollTop');
const getTop = () => window.pageXOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
    if (getTop() > offset) {
        scrollTop.classList.add('--active');
    } else {
        scrollTop.classList.remove('--active');
    }

    topOpas();
});

function topOpas() {
    if (times) {
        window.clearTimeout(times);
    }
    YOffsets = window.pageYOffset;
    times = window.setTimeout(function () {
        if (window.pageYOffset === YOffsets) {
            scrollTop.classList.remove('--active');
        }
    }, 3000);
}

scrollTop.onclick = () => {
    goUp();
};
function goUp() {
    let top = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
    );

    if (top > 0) {
        window.scrollBy(0, -150);
        timeOut = setTimeout('goUp()', 20);
    } else clearInterval(timeOut);
}

const options = {
    threshold: 0.4,
};
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                document
                    .querySelectorAll('.header__bottom-link')
                    .forEach((link) => {
                        let id = link.getAttribute('href').replace('#', '');
                        if (
                            id === entry.target.id &&
                            entry.isIntersecting != false
                        ) {
                            link.classList.add('_header-active');
                        } else {
                            link.classList.remove('_header-active');
                        }
                    });
            }
        });
    },

    options
);

document.querySelectorAll('.section').forEach((elem) => {
    observer.observe(elem);
});

$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body')
            .stop()
            .animate(
                {
                    scrollTop: $target.offset().top,
                },
                1200,
                'swing',
                function () {
                    window.location.hash = target;
                }
            );
    });
});

window.addEventListener('scroll', fixsedHeader);

function fixsedHeader() {
    if (
        window.pageYOffset > 186 &&
        window.matchMedia('(min-width: 900px)').matches
    ) {
        document.querySelector('.header__bottom').classList.add('--fixed');
        document.querySelector('.header__bottom-menu').style.padding = '0 10px';
        document.querySelector('.header__bottom-list').style.borderTop = 'none';
        document.querySelector('.header__bottom-list').style.borderBottom =
            'none';
        document
            .querySelector('.header__bottom-menu')
            .classList.add('_container');
        document.querySelector('.header__bottom').style.background =
            'rgba(15,31,73, 1)';
    } else {
        document.querySelector('.header__bottom-list').style.borderTop =
            '1px solid rgb(255, 255, 255, .4)';
        document.querySelector('.header__bottom-list').style.borderBottom =
            '1px solid rgb(255, 255, 255, .4)';
        document.querySelector('.header__bottom').classList.remove('--fixed');
        document.querySelector('.header__bottom-menu').style.padding = '0';
        document.querySelector('.header__bottom').style.background = 'inherit';
        document
            .querySelector('.header__bottom-menu')
            .classList.remove('_container');
    }
}

document.querySelector('.menu-icon-wrapper').addEventListener('click', () => {
    document.querySelector('.header').classList.toggle('_header-mobile');

    if (
        document.querySelector('.header').classList.contains('_header-mobile')
    ) {
        document.querySelector('.menu-icon').classList.add('_menu-icon-active');
        document.body.classList.add('no-scroll');
    } else {
        document
            .querySelector('.menu-icon')
            .classList.remove('_menu-icon-active');
        document.body.classList.remove('no-scroll');
    }
});
document.querySelectorAll('.header__bottom-link').forEach((elem) => {
    elem.addEventListener('click', () => {
        if (
            document
                .querySelector('.header')
                .classList.contains('_header-mobile')
        ) {
            document
                .querySelector('.header')
                .classList.remove('_header-mobile');
            document
                .querySelector('.menu-icon')
                .classList.remove('_menu-icon-active');
            document.body.classList.remove('no-scroll');
        }
    });
});
