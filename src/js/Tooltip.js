import Message from './Message';

export default class Tooltip extends Message {
    constructor(el, info = {}) {
        super(el, info);

        this.name = 'tooltip';
        this.event = info.event || 'mouseover';
        this.type = info.type || 'default';
        this.position = info.position || 'bottom left';

        this._appendBox();
    }
}