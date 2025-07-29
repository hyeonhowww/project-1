document.querySelector('.close').addEventListener('click', function () {
    console.log("vcv");

    document.querySelector('.popup').style.display = 'none';
})

const lis = document.querySelectorAll('.gnb>li');
lis.forEach((i) => {
    i.addEventListener('mouseenter', function () {
        document.querySelector('.w100').classList.add('on');
    })
    i.addEventListener('mouseleave', function () {
        document.querySelector('.w100').classList.remove('on');
    })
})

/**
 *
 * layout
 *
 */

function fullpage() {
    let vSwiper;   // 세로(Vertical) 슬라이더
    let hSwiper;   // 가로(Horizontal) 슬ader
    /**
     * 가로슬라이더
     * **/
    hSwiper = new Swiper('.horizontals', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            reachEnd: function () {
                console.log('가로 마지막 슬라이드!');
                hSwiper.canNext = true;
                console.log('✅ canNext 속성 설정됨:', hSwiper.canNext);
            },
            transitionEnd: function () {
                console.log('슬라이드 이동 끝');
                // 마지막에서 오른쪽 이동 시
                if (hSwiper.canNext && hSwiper.isEnd) {
                    console.log('세로 이동');
                    vSwiper.allowTouchMove = true;
                    vSwiper.mousewheel.enable();
                    setTimeout(function () {
                        vSwiper.slideNext();
                        console.log('vSwiper.slideNext() 호출');
                    }, 300);
                    hSwiper.canNext = false;
                }
                // 첫 번째에서 왼쪽 이동 시 (이전 섹션으로)
                // This condition handles moving from hSwiper's beginning to the previous vertical section (hero)
                if (hSwiper.canPrev && hSwiper.isBeginning) {
                    console.log('이전섹션으로 이동');
                    vSwiper.allowTouchMove = true;
                    vSwiper.mousewheel.enable();
                    setTimeout(function () {
                        vSwiper.slideTo(0); // Go to the first vertical slide (hero section)
                        console.log('vSwiper.slideTo(0) 호출');
                    }, 300);
                    hSwiper.canPrev = false;
                }
            },
            reachBeginning: function () {
                console.log('reachBeginning');
                hSwiper.canPrev = true;
            }
        }
    });

    /**
     * 세로슬라이더
     * **/

    vSwiper = new Swiper('.verticals', {
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: true,
        on: {
            slideChange: function () {
                console.log('현재 섹션:', this.activeIndex + 1);
                console.log('이전 섹션:', this.previousIndex + 1);

                // When entering the horizontal section (index 1)
                if (this.activeIndex === 1) {
                    vSwiper.allowTouchMove = false;
                    vSwiper.mousewheel.disable();

                    // If coming from the hero section (index 0) to horizontal (index 1)
                    if (this.previousIndex === 0) {
                        setTimeout(function () {
                            hSwiper.slideTo(0, 0); // Reset horizontal to first slide
                            console.log('hSwiper.slideTo(0) 호출 (from hero)');
                        }, 50);
                    }
                    // If coming from the search section (index 2) to horizontal (index 1)
                    else if (this.previousIndex === 2) {
                        setTimeout(function () {
                            // Go to the last horizontal slide (index 5 for 6 slides, 0-indexed)
                            hSwiper.slideTo(hSwiper.slides.length - 1, 0);
                            console.log('hSwiper.slideTo(last slide) 호출 (from search)');
                        }, 50);
                    }
                }
                // When leaving the horizontal section (index 1)
                else {
                    vSwiper.allowTouchMove = true;
                    vSwiper.mousewheel.enable();
                }
            },
            slideChangeTransitionStart: function () {
                console.log('세로 이동 시작:', this.previousIndex + 1, '→', this.activeIndex + 1);
                // No specific horizontal slide manipulation needed here,
                // as `slideChange` handles the initial horizontal slide positioning.
            },
            slideChangeTransitionEnd: function () {
                if (this.activeIndex === 1) {
                    setTimeout(function () {
                        hSwiper.update(); // Ensure hSwiper is correctly updated after vertical transition
                        console.log('hSwiper.update()');
                    }, 100);
                }
            }
        }
    });

}

fullpage();
