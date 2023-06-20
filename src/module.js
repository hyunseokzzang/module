import Toast from './js/Toast';
import Tooltip from './js/Tooltip';
import Overlay from './js/Overlay';
import Modal from './js/Modal';

export default function example() {
    
    /**
     * Toast
     */

    document.querySelectorAll('[toast]').forEach(item => {
        let options = item.getAttribute('toast');
    
        if (options) {
    
            const [type, title, position, desc] = options.split('-');
    
            new Toast(
                item, {
                    type: type,
                    title: title,
                    position: position || undefined,
                    desc: desc || undefined
                }
            )
        } else {
            options = '{}';
            new Toast(
                item, JSON.parse(options)
            )
        }
    })

    /**
     * Tooltip
     */
    document.querySelectorAll('[tooltip]').forEach(item => {
        let options = item.getAttribute('tooltip');
    
        if (options) {
            const [title, type, position, desc] = options.split('-');
    
            new Tooltip(
                item, {
                    title : title,
                    type : type,
                    position : position,
                    desc : desc || undefined
                }
            )
        } else {
            options = '{}';
            new Tooltip(
                item, JSON.parse(options)
            )
        }
    })
    
     /**
     * Overlay
     */
    document.querySelectorAll('[overlay]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
    
            new Overlay(item)
        })
    })
    
    /**
     * Modal
     */
    document.querySelectorAll('[modal]').forEach(item => {
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
    
            let target = item.getAttribute('modal');
            let targetEl = document.querySelector(target);
            
    
            new Modal(item, {
                target : targetEl
            })
        })
    })
}
