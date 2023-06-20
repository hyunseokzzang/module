import $ from 'jquery';
import gsap from 'gsap';

export default class Message {
    constructor(el, info = {}) {
        this.el = $(el);
        this.title = info.title || undefined;
        this.desc = info.desc || undefined;
        this.name = this.name;
        this.type = this.type;
        this.event = this.event;
        this.position = this.position;
    }

    _appendBox() {
        const { el, title, desc, name, type, event, position } = this;
        let defaultMessage;

        switch (type) {
            case 'success':
                defaultMessage = '저장되었습니다.';
                break;
            case 'information':
                defaultMessage = '현재 이용가능한 서비스입니다.';
                break;
            case 'warning':
                defaultMessage = '비밀번호 확인 후 입력해 주시길 바랍니다.';
                break;
            case 'error':
                defaultMessage = '이용에 불편을 드려서 죄송합니다.';
                break;
            case 'cancel':
                defaultMessage = '취소되었습니다.';
                break;
            default:
                defaultMessage = '기본형';
                break;
        }

        let message = $(`.message[data-id=${name}]`);
        let box, count, text;
        let tagName = name;

        const appendBoxFunction = () => {
            const appendBoxWrap = () => {
                if ($(`.message[data-id=${name}]`).length === 0) {
                    $('body').append(`<div class="message" data-id="${name}"></div>`);
                    message = $('body').find(`.message[data-id=${name}]`);

                    this._setPosition();
                } else {
                    message = $(`.message[data-id=${name}]`);
                    message.css({ top: '', left: '', right: '', bottom: ''});
                    if (name == 'tooltip') message.find('>*').remove();

                    this._setPosition();
                }
            };

            appendBoxWrap();

            const appendBoxInfo = () => {
                count = $(`.${name}-item`).length;

                if (name == 'toast') tagName = 'alert';

                if (title !== undefined && desc !== undefined) {
                    text = `
                    <strong class="${tagName}-message-title">${title}</strong>
                    <span class="${tagName}-message-desc">${desc}</span>
                    `;
                } else if (title == undefined && desc !== undefined) {
                    text = `
                    <span class="${tagName}-message-desc">${desc}</span>
                    `;
                } else if (title !== undefined && desc == undefined) {
                    text = `
                    <strong class="${tagName}-message-title">${title}</strong>
                    `;
                } else {
                    text = `
                    <strong class="${tagName}-message-title">${defaultMessage}</strong>
                    `;
                }

                box = `
                <div class="${name}-item" data-count="${count}">
                    <div class="${tagName}" data-state="${type}">
                        <div class="${tagName}-message"> ${text}</div>
                        <a href="#" class="${tagName}-close"><i class="icon-cancel"></i></a>
                    </div>
                </div>
                `;

                message.append(box);

                $(`.${name}-item`).css({
                    'margin-bottom': '10px',
                    'box-shadow': '0 .5rem 1rem rgba(0,0,0,0.16)'
                });
            };

            appendBoxInfo();

            const appendBoxAnimation = () => {
                const tl = gsap.timeline();
                const messageBox = $(`.${name}-item[data-count="${count}"]`);

                switch (name) {
                    case 'toast':
                        if (position == 'center left') {
                            tl.from(messageBox, {
                                translateX: '-100%',
                                duration: 0.3,
                                opacity: 0,
                            });
                        } else if (position == 'center right') {
                            tl.from(messageBox, {
                                translateX: '100%',
                                duration: 0.3,
                                opacity: 0,
                            });
                        } else {
                            tl.from(messageBox, {
                                translateY: 20,
                                duration: 0.15,
                                opacity: 0,
                            });
                        }

                        tl.to(messageBox, {
                                opacity: 0,
                                height: 0,
                                margin: 0,
                                duration: 0.25,
                                translateY: -20,
                            }, '+=5')
                            .to(messageBox, {
                                delay: 0.1,
                                onComplete: () => {
                                    messageBox.remove();

                                    if ($('.message').children().length === 0) {
                                        setTimeout(() => {
                                            $('.message').remove();
                                        }, 100);
                                    }
                                }
                            });

                        message.on('mouseover', function () {
                            tl.pause();
                        }).on('mouseleave', function () {
                            tl.play();
                        });

                        break;

                    case 'tooltip':
                        tl.from(messageBox, {
                            duration: 0.15,
                            opacity: 0,
                        });

                        break;
                }
            };

            appendBoxAnimation();

            const appendBoxRemove = () => {
                const removeArea = $(`.${name}-item[data-count="${count}"]`);

                removeArea.each(function () {
                    const $this = $(this);
                    const removeButton = $this.find(`.${tagName}-close`);

                    removeButton.on('click', function (e) {
                        e.preventDefault();

                        gsap.to(
                            $this, {
                                opacity: 0,
                                height: 0,
                                margin: 0,
                                duration: 0.25,
                                translateY: -20,
                            }
                        );
                    });
                });
            };

            appendBoxRemove();
        };

        const appendEvent = () => {
            let check = false;

            switch (event) {
                case 'click':
                    el.on('click', (e) => {
                        e.preventDefault();

                        appendBoxFunction();

                        check = true;
                    });
                    break;

                case 'mouseover':
                    el.on('mouseenter', () => {
                        appendBoxFunction();
                    });

                    el.on('mouseleave', () => {
                        message.remove();
                    });
                    break;
            }
        };

        appendEvent();
    }

    _setPosition() {
        const { el, title, name, position} = this;
        const message = $('body').find(`.message[data-id=${name}]`);

        message.css({
            position: 'fixed',
            'z-index': 14,
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'flex-start',
            'justify-content': 'flex-start',
        });

        if (name == 'tooltip') {
            const elWidth = el.outerWidth();
            const elHeight = el.outerHeight();
            const elPositionTop = el.offset().top;
            const elPositionLeft = el.offset().left;

            message.css({  position: 'absolute'});

            switch (position) {
                case 'top left':
                    message.css({
                        top: elPositionTop,
                        left: elPositionLeft + elWidth,
                        transform: 'translateY(-100%) translateX(-100%)'
                    });
                    break;

                case 'top center':
                    message.css({
                        top: elPositionTop,
                        left: elPositionLeft + elWidth / 2,
                        transform: 'translateY(-100%) translateX(-50%)'
                    });
                    break;

                case 'top right':
                    message.css({
                        top: elPositionTop,
                        left: elPositionLeft,
                        transform: 'translateY(-100%)'
                    });
                    break;

                case 'center left':
                    message.css({
                        top: elPositionTop + elHeight / 2 + 5,
                        left: elPositionLeft - 10,
                        transform: 'translateY(-50%) translateX(-100%)'
                    });
                    break;

                case 'center right':
                    message.css({
                        top: elPositionTop + elHeight / 2 + 5,
                        left: elPositionLeft + elWidth + 10,
                        transform: 'translateY(-50%)'
                    });
                    break;

                case 'bottom left':
                    message.css({
                        top: elPositionTop + elHeight + 10,
                        left: elPositionLeft,
                    });
                    break;

                case 'bottom center':
                    message.css({
                        top: elPositionTop + elHeight + 10,
                        left: elPositionLeft + elWidth / 2,
                        transform: 'translateX(-50%)'
                    });
                    break;

                case 'bottom right':
                    message.css({
                        top: elPositionTop + elHeight + 10,
                        left: elPositionLeft + elWidth,
                        transform: 'translateX(-100%)'
                    });
                    break;
            }
        } else {
            switch (position) {
                case 'top left':
                    message.css({
                        top: '5%',
                        left: '5%',
                        'align-items': 'flex-start'
                    });
                    break;

                case 'top center':
                    message.css({
                        top: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        'align-items': 'center'
                    });
                    break;

                case 'top right':
                    message.css({
                        top: '5%',
                        right: '5%',
                        'align-items': 'flex-end'
                    });
                    break;

                case 'center left':
                    message.css({
                        top: 'calc(50% + 5px)',
                        left: '5%',
                        transform: 'translateY(-50%)',
                        'align-items': 'flex-start'
                    });
                    break;

                case 'center center':
                    message.css({
                        top: 'calc(50% + 5px)',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        'align-items': 'center'
                    });
                    break;

                case 'center right':
                    message.css({
                        top: 'calc(50% + 5px)',
                        right: '5%',
                        transform: 'translateY(-50%)',
                        'align-items': 'flex-end'
                    });
                    break;

                case 'bottom left':
                    message.css({
                        bottom: '5%',
                        left: '5%',
                        'align-items': 'flex-start'
                    });
                    break;

                case 'bottom center':
                    message.css({
                        bottom: '5%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        'align-items': 'center'
                    });
                    break;

                case 'bottom right':
                    message.css({
                        bottom: '5%',
                        right: '5%',
                        'align-items': 'flex-end'
                    });
                    break;
            }
        }
    }

    _removeBox() {
        gsap.to();
    }
}