import Message from './Message';

export default class Toast extends Message {
    constructor(el, info = {}) {
        super(el, info);

        this.name = 'toast';
        this.event = info.event || 'click';
        this.type = info.type || 'default';
        this.position = info.position || 'bottom right';
        this._appendBox();
    }
}