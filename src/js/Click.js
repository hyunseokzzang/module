import $ from "jquery";
import gsap from "gsap";

export class Click {
    constructor(el, info = {}) {

        this.el = $(el);
        this.type = info.type || 'add';
        this.fixed = info.fixed || false;
        this.preventDefault = info.preventDefault || false;
        this.onClick = info.onClick || undefined;

        if (info.target) {
            this.target = $(info.target)
        } else {
            this.target = this.el;
        }

        this._preventDefault();
        this._fixedViewport();
        this._setType();
        this._onClick();
    }

    _preventDefault() {
        switch (this.preventDefault) {
            case true:
                this.el.on('click', function (e) {
                    e.preventDefault();
                })

                break;

            case false:
                this.el.unbind('click')

                break;
        }
    }

    _fixedViewport() {
        const type = this.type;

        switch (this.fixed) {
            case true:

                this.el.on('click', function (e) {
                    e.preventDefault();

                    switch (type) {

                        case 'toggle':

                            $('html').toggleClass('active')

                            break;

                        case 'add':

                            $('html').addClass('active')

                            break;

                        case 'remove':

                            $('html').removeClass('active');

                            break;
                    }
                })

                break;

            case false:
                this.el.on('click', function () {

                    if ($('html').hasClass('active')) {
                        $('html').removeClass('active')
                    }
                })

                break;
        }
    }

    _setType() {
        const type = this.type;
        const from = this.el;
        const to = this.target;
        const froms = [];

        for (let i = 0; i <= from.length; ++i) {
            froms.push(from[i]);
        }

        console.log(froms)

        for (let i = 0; i <= froms.length; ++i) {
            $(froms[i]).on('click', function () {
                switch (type) {
                    case 'toggle':

                        console.log(to)
                        to.toggleClass('active')

                        break;

                    case 'add':

                        to.addClass('active');

                        break;

                    case 'remove':

                        to.removeClass('active');

                        break;
                }
            })
        }
    }

    _onClick() {

        if (this.onClick) {
            this.el.on("click", () => {
                this.onClick();
            });
        }
    }
}