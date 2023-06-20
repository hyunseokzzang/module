import $ from 'jquery';
import gsap from 'gsap';

export default class Overlay {
    constructor(el, info = {}) {
        this.el = el;

        this._overlayShowAndHide();

    }

    _overlayShowAndHide() {
        const el = this.el;
        let overlay;

        $('body').append('<div class="overlay" style="width:100%; height:100%; position:fixed; background:rgba(0,0,0,0.4); top:0; left:0; z-index:20; opacity: 0;"></div>')

        overlay = $('.overlay');

        gsap.to(
            overlay, {
                opacity: 1,
                duration: 0.25
            }
        )

        overlay.on('click', function () {
            const $this = $(this);

            gsap.to(
                $this, {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => {
                        setTimeout(() => {
                            $this.remove()
                        }, 100)
                    }
                }
            )

            gsap.to(
                $('.modal'),
                {
                    autoAlpha : 0,
                    duration : 0.25,
                    scale : 0,
                }
            )
        });
    }
}