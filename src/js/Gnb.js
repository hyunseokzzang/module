import $ from "jquery";
import gsap from "gsap";

export class Gnb {
    constructor(el, info = {}) {

        this.el = $(el);
        this.type = info.type || 'each';
        this.responsive = info.responsive || false;
        this.custom = info.custom || false;
        if (info.custom) this.custom?.call(this);
        this.menu = this.el.find('a');

        this.topList = this.el.find('>ul>li');
        this.topList.addClass('item')
        this.topMenu = this.el.find('>ul>li>a');
        this.topMenu.addClass('item-link');

        this._setMenuType();
        this._setCheckDepth();
    }

    on(event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);

        this.el.on(event, () => {
            this.events[event].forEach((handler) => {
                handler();
            });
        });
    }

    _setBreakPoint(pc, mobile) {
        const responsive = this.responsive;

        const responsiveFunction = () => {

            if ($(window).width() >= responsive) {
                pc();
            } else {
                mobile();
            }
        }

        responsiveFunction();

        $(window).on('resize', function () {
            responsiveFunction();
        })
    }

    _classControl(target, type) {

        for (let i = 0; i < target.length; ++i) {

            switch (type) {
                case 'add':
                    $(target[i]).addClass('active')
                    break;
                case 'remove':
                    $(target[i]).removeClass('active');
                    break;
                case 'toggle':
                    $(target[i]).toggleClass('active');
                    break;
            }
        }
    }

    _setMenuType() {
        const header = $('header');
        const object = this;
        const type = this.type;
        const wrapper = this.el;
        const list = this.topList;
        const item = this.topMenu;

        list.each(function () {
            const $this = $(this);
            const $menu = $(this).find('>a');

            $this.find('a:last').on('focusout', function () {
                const elements = [$this, header, wrapper];
                object._classControl(elements, 'remove');
            })

            switch (type) {
                case 'full':

                    $menu.on('mouseover focus', function () {
                        const pc = () => {
                            const elements = [header, wrapper];
                            object._classControl(elements, 'add');
                        }

                        object._setBreakPoint(pc);
                    })

                    wrapper.on('mouseout', function () {
                        const pc = () => {
                            wrapper.removeClass('active')
                        }

                        object._setBreakPoint(pc);
                    })

                    break;

                case 'each':

                    $this.on('mouseover focusin', function () {
                        const $this = $(this);
                        const pc = () => {
                            header.addClass('active')
                            $this.addClass('active').siblings().removeClass('active')
                        }

                        object._setBreakPoint(pc);
                    })

                    $this.on('mouseleave', function () {
                        const $this = $(this);
                        const pc = () => {

                            const elements = [header, $this];

                            object._classControl(elements, 'remove');
                        }

                        object._setBreakPoint(pc);
                    })

                    break;
            }
        })
    }

    _setCheckDepth() {
        const object = this;
        const item = this.menu;

        item.each(function () {
            const $this = $(this);

            if ($this.next().length) {
                $this.on('click', function (e) {
                    const pc = () => {
                        return;
                    }

                    const mobile = () => {
                        e.preventDefault();

                        $this.parent().toggleClass('active').siblings().removeClass('active')
                    }

                    object._setBreakPoint(pc, mobile)
                })
            }
        })
    }
}