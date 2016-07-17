/**
* 消息类型枚举
*
* @enum {number}
*/
var MsgType;
(function (MsgType) {
    MsgType[MsgType["OK"] = 0] = "OK";
    MsgType[MsgType["ERROR"] = 1] = "ERROR";
})(MsgType || (MsgType = {}));
/**
 * ZAlert
 */
var Zalert = (function () {
    function Zalert(id, msgClass, parent, animate, animateClass, okClass, errClass, delay) {
        if (id === void 0) { id = "zMessage" + Math.random() * 10000; }
        if (msgClass === void 0) { msgClass = "zMessage"; }
        if (parent === void 0) { parent = "body"; }
        if (animate === void 0) { animate = true; }
        if (animateClass === void 0) { animateClass = "z-msg-animate"; }
        if (okClass === void 0) { okClass = "z-msg-ok"; }
        if (errClass === void 0) { errClass = "z-msg-error"; }
        if (delay === void 0) { delay = 3000; }
        this.id = id;
        this.msgClass = msgClass;
        this.parent = parent;
        this.animate = animate;
        this.animateClass = animateClass;
        this.okClass = okClass;
        this.errClass = errClass;
        this.delay = delay;
    }
    /**
     * 弹出消息
     *
     * @param {string} message 消息内容
     * @param {MsgType} [type] 消息类型
     */
    Zalert.prototype.alert = function (message, type) {
        var _this = this;
        clearTimeout(this.timeout);
        var selector = document.getElementById(this.id);
        if (selector === null) {
            selector = document.createElement("div");
            selector.classList.add(this.msgClass);
            selector.setAttribute("id", this.id);
            $(this.parent).append(selector);
            // 点击消息后隐藏消息
            $(selector).one("click", function () {
                $(selector).slideUp("fast", function () {
                    document.getElementsByTagName(obj.parent)[0].removeChild(selector);
                });
                clearTimeout(_this.timeout);
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
        var obj = this;
        $(selector).slideDown("fast", function () {
            obj.timeout = setTimeout(function () {
                $(selector).slideUp("fast", function () {
                    document.getElementsByTagName(obj.parent)[0].removeChild(selector);
                });
            }, obj.delay);
        });
    };
    return Zalert;
}());
;
/**
 * 添加为jquery的拓展方法
 */
(function ($) {
    $.zAlert = function (message, type) { new Zalert().alert(message, type); };
})(jQuery);
