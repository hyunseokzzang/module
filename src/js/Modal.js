import $ from 'jquery';
import gsap from 'gsap';

import Overlay from './Overlay';

export default class Modal {
    constructor(el, info={}) {
        this.el = $(el);
        this.info = info.info;
        this.size = info.size;
        this.target = info.target;

        this._createOverlay();
        this._showModal();
        this._closeModal();
    }   

    _createOverlay() {
        new Overlay(this.el)       
    }

    _showModal() {
        gsap.fromTo(
            this.target, 
            {
                scale : 0,
                autoAlpha : 0,
            },
            {
                scale : 1,
                autoAlpha : 1,
                duration : .25,
                ease : 'Power2.easInOut'
            }
        )
    }

    _closeModal() {

        const targetEl = this.target

        function closeFunction() {
            gsap.to(
                targetEl,
                {
                    autoAlpha : 0,
                    duration : 0.25,
                    scale : 0,
                    ease : 'Power2.easInOut'
                }
            )

            gsap.to(
                $('.overlay'), {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => {
                        setTimeout(() => {
                            $('.overlay').remove();
                        }, 100)
                    }
                }
            )

            document.querySelector('html').classList.remove('active');
        }

        document.querySelectorAll('.modal-close').forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();

                closeFunction();
            })
        })
    }
}