/*

    jPopup.js
    https://github.com/robiveli/jpopup

    Copyright (c) 2020 Robert Velickovski

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

 */
 
{

    let $html;

    /**
     * @param {Object}
	*/
    function jPopup(params = {}) {
        this.options = Object.assign({
            transition: 'fade'
        }, params);

        this._init();
    }

    jPopup.prototype = {

        _init() {
            this._render(this.options.content)
                ._setupEvents();
        },

        _render() {
            $html = document.querySelector('html');

            document.body.insertAdjacentHTML('beforeend',
                `<div class="jPopup jPopup--${this.options.transition}"><button type="button" class="jPopup-closeBtn"></button><div class="jPopup-content">${this.options.content}</div></div>`
            );

            this.$el = $html.querySelector('.jPopup');
            this.$closeBtn = $html.querySelector('.jPopup-closeBtn');

            return this;
        },

        _setupEvents() {
            this.$closeBtn.addEventListener('click', () => this.close());
            window.addEventListener('keydown', (e) => this._onEscPress(e));
        },

        /**
         * @param {Object}
        */
        _onEscPress(event) {

            if (event.keyCode == 27) {
                this.close();
            }
        },

        close() {
            $html.classList.remove('jPopup--isOpen');

            if (this.options.onClose && typeof this.options.onClose == 'function') {
                this.options.onClose(this.$el);
            }
        },

        open() {

            if (this.options.onOpen && typeof this.options.onOpen == 'function') {
                this.options.onOpen(this.$el);
            }

            $html.classList.add('jPopup--isOpen');
        },

        /**
         * @param {String}
        */
        setContent(content) {
            this.options.content = content;

            this.$el.querySelector('.jPopup-content').innerHTML = this.options.content;
        },

        /**
         * @return {String}
        */
        getContent() {
            return this.options.content;
        },

        destroy() {
            window.removeEventListener('keydown', this._onEscPress);
            this.$el.parentNode.removeChild(this.$el);
        }
    };
}