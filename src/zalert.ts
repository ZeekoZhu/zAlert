

/**
* 消息类型枚举
* 
* @enum {number}
*/
enum MsgType {
    OK, ERROR
}
/**
 * ZAlert
 */
class Zalert {
    private timeout;
    constructor(
        public id: string = "zMessage" + Math.random() * 10000,
        public msgClass = "zMessage",
        public parent: string = "body",
        public animate: boolean = true,
        public animateClass: string = "z-msg-animate",
        public okClass: string = "z-msg-ok",
        public errClass: string = "z-msg-error",
        public delay: number = 3000
    ) {

    }

    /**
     * 弹出消息
     * 
     * @param {string} message 消息内容
     * @param {MsgType} [type] 消息类型
     */
    alert(message: string, type?: MsgType) {
        clearTimeout(this.timeout);
        let selector = document.getElementById(this.id);
        if (selector === null) {
            selector = document.createElement("div");
            selector.classList.add(this.msgClass);
            selector.setAttribute("id", this.id);
            $(this.parent).append(selector);

            // 点击消息后隐藏消息
            $(selector).one("click", () => {
                $(selector).slideUp("fast", () => {
                    document.getElementsByTagName(obj.parent)[0].removeChild(selector);
                });
                clearTimeout(this.timeout);
            });
        }
        if (this.animate) {
            selector.classList.add(this.animateClass);
        }
        else {
            selector.classList.remove(this.animateClass);
        }

        selector.innerHTML = message;
        if (type === undefined || type === MsgType.ERROR) {
            selector.classList.remove(this.okClass);
            selector.classList.add(this.errClass);
        }
        else if (type === MsgType.OK) {
            selector.classList.remove(this.errClass);
            selector.classList.add(this.okClass);
        }
        let obj = this;
        $(selector).slideDown("fast", function () {

            obj.timeout = setTimeout(function () {
                $(selector).slideUp("fast", () => {
                    document.getElementsByTagName(obj.parent)[0].removeChild(selector);
                });

            }, obj.delay);
        });
    }

};

/**
 * 添加为jquery的拓展方法
 */
(function ($) {
    $.zAlert = (message, type) => { new Zalert().alert(message, type); };
})(jQuery);