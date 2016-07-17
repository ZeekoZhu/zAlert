/**
* 消息类型枚举
*
* @enum {number}
*/
declare enum MsgType {
    OK = 0,
    ERROR = 1,
}
/**
 * ZAlert
 */
declare class Zalert {
    id: string;
    msgClass: string;
    parent: string;
    animate: boolean;
    animateClass: string;
    okClass: string;
    errClass: string;
    delay: number;
    private timeout;
    constructor(id?: string, msgClass?: string, parent?: string, animate?: boolean, animateClass?: string, okClass?: string, errClass?: string, delay?: number);
    /**
     * 弹出消息
     *
     * @param {string} message 消息内容
     * @param {MsgType} [type] 消息类型
     */
    alert(message: string, type?: MsgType): void;
}
