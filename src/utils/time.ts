// 获取 当前时间是 早上|上午|下午|晚上

export const getTime = () => {
    let message = ""
    let hours = new Date().getHours()
    if (hours <= 9) {
        message = "早上"
    } else if (hours <= 12) {
        message = "上午"
    } else if (hours <= 18) {
        message = "下午"
    } else {
        message = "晚上"
    }
    console.log(hours);
    console.log(message);
    return message
}