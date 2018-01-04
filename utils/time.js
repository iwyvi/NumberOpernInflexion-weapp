const time = {

  /**
   * 获取时间日期字符串
   * 
   * @param {string|number} value 
   * @param {string} [option=default] default,all,date,datewithoutyear,time,timewithsecond
   * @returns 
   */
  getDateTime(value, option = 'default') {
    if (!value) {
      return "";
    }
    let date;
    if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value);
    }
    let result = '';
    let c, t = '';
    switch (option) {
      case 'all':
        c = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        t = [date.getHours(), ('0' + date.getMinutes()).slice(-2), ('0' + date.getSeconds()).slice(-2)];
        result = c.join("-") + " " + t.join(":");
        break;
      case 'date':
        result = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
        break;
      case 'datewithoutyear':
        result = (date.getMonth() + 1) + '月' + date.getDate() + '日';
        break;
      case 'time':
        result = [date.getHours(), ('0' + date.getMinutes()).slice(-2)].join(":");
        break;
      case 'time':
        result = [date.getHours(), ('0' + date.getMinutes()).slice(-2), ('0' + date.getSeconds()).slice(-2)].join(":");
        break;
      default:
        c = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        t = [date.getHours(), ('0' + date.getMinutes()).slice(-2)];
        result = c.join("-") + " " + t.join(":");
    }
    return result;
  },
  /**
   * 以当前时间为基准来获得时间
   * 
   * @param {any} value 
   * @returns 
   */
  getCurrentTime(value) {
    if (!value) {
      return "";
    }
    var date;
    if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value);
    }
    var nowDate = new Date();
    var intervalDate = nowDate.getTime() - date.getTime();
    var day = Math.floor(intervalDate / (24 * 3600 * 1000));
    if (day > 0) {
      return (date.getMonth() + 1) + "月" + date.getDate() + "日";
    } else {
      var hour = Math.floor((intervalDate % (24 * 3600 * 1000)) / (3600 * 1000));
      if (hour > 0) {
        return hour + "小时前";
      } else {
        var minutes = Math.floor(((intervalDate % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000));
        if (minutes < 1) {
          return "刚刚";
        } else {
          return minutes + "分钟前";
        }
      }
    }
  },
  /**
   * 两个时间获取字符串，若两个时间相同则返回一个时间，若不同则返回时间段
   * 
   * @param {any} date1 
   * @param {any} date2 
   * @param {any} option
   */
  getDateFromTwoDate(date1, date2, option = 'default') {
    if (date1) {
      if (date2 && date2 != date1) {
        return this.getDateTime(date1, option) + ' - ' + this.getDateTime(date2, option);
      }
      return this.getDateTime(date1, option);
    }
    return '';
  }
}

module.exports = time