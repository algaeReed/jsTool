/**
 * 数字千分位展示并显示n位小数
 * @param {(number | string)} 需要格式化的值
 * @param {number} [precision] 保留几位小数，不传小数不处理，不够会填充0
 * @return {(number | string)} 返回0或者格式化的值
 */
declare const formatNumber: (num: number | string, precision?: number) => number | string;
export default formatNumber;
