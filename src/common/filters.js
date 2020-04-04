var toFixed_2 = function (value, symbol) {
  if (typeof value == 'string') return value
  if (value == null || value == undefined) return '--'
  var pow = Math.pow(10, 2)
  value = Math.floor(Math.round(value * pow)) / pow
  value = parseFloat(value + '')

  if (value > 0 && symbol) {
    return symbol + value.toFixed(2)
  } else
    return value = value.toFixed(2)
}
var toFixed = function (value, fixed, symbol, format, unit, zeroValue) {
  if (typeof value == 'string') return value
  if (value == null || value == undefined) return '--'
  if (fixed == null) fixed = 0
  var zeroFlag = false
  if (value == 0) zeroFlag = true
  if (value == 0 && zeroValue) return zeroValue
  var pow = Math.pow(10, fixed)
  value = Math.floor(Math.round(value * pow)) / pow
  value = parseFloat(value + '')
  value = value.toFixed(fixed)


  var valueArr = value.split('.')
  var value1 = valueArr[0]
  var fuFlag = false
  if (value1.indexOf('-') > -1) fuFlag = true
  value1 = value1.replace('-', '')
  var value2 = valueArr[1]
  if (format) value1 = toQfw(value1)
  if (value2) value = value1 + '.' + value2
  else value = value1
  if (!fuFlag && symbol && !zeroFlag) value = symbol + value
  if (fuFlag) value = '-' + value
  if (unit) return value + unit
  return value
}
var toQfw = function (str_n) {
  var result = "";
  while (str_n.length > 3) {
    result = "," + str_n.slice(-3) + result;
    str_n = str_n.slice(0, str_n.length - 3)
  }
  if (str_n) {
    str_n = (str_n + result)
  }
  return str_n
};

var getTextColor2 = function (amount) {
  if (amount > 0) {
    return 'color_DE4A00'
  } else if (amount < 0) {
    return 'green'
  } else {
    return ''
  }
}

var getTextColor = function (amount) {
  if (amount > 0) {
    return 'table_red'
  } else if (amount < 0) {
    return 'table_green'
  } else if (typeof amount === 'string') {
    return 'table_gray'
  } else {
    return 'table_gray'
  }
}


var formatStyle = function (styleStr) {
  if (!styleStr) return {}
  var styles = styleStr.split(';')
  var styleObj = {}
  for (var style of styles) {
    if (!style) continue
    var _style = style.split(':')
    var key = _style[0]
    var value = _style[1]
    var finnalKey = key
    var keys = key.split('-')
    var right_key = keys[1]
    if (right_key) {
      right_key = right_key.replace(right_key[0], right_key[0].toLocaleUpperCase())
      finnalKey = keys[0] + right_key
    }
    value = value.replace(/rpx/g, "px")
    var valueItems = value.split(' ')
    var finalValue = ""
    for (let item of valueItems) {
      if (item.indexOf('solid') > -1) { //边框
        item = item.replace('px', 'PX')
      } else if (item.indexOf('px') > -1) { //数值
        var item_number = parseInt(item)
        finalValue += (item_number / 75 + 'rem' + ' ')
      } else { //flex
        finalValue = item
      }
    }

    // value = value.replace('rpx', 'px')
    // if (value.indexOf('solid') > -1) {
    //   value = value.replace('px', 'PX')
    // } else if (value.indexOf('px') > -1) {
    //   var value_number = parseInt(value)
    //   value = value_number / 75 + 'rem'
    // }

    styleObj[finnalKey] = finalValue + ''
    // styleObj[finnalKey] = value + ''
  }
  return styleObj
}
var formatImage = function (url) {
  if (url[0] == '/') {
    return 'https://devoss.ddwenwen.com/dd_radar' + url
  } else {
    return url
  }
}
var formatSlot = function (slotKeys, page) {
  var slotObj = {}
  var children = page.props.children
  var childrenIsArray = Array.isArray(children)
  for (var key of slotKeys) {
    var slot = childrenIsArray ? children.find(c => {
      return c && c.ref == key
    }) : (children && children.ref == key ? children : null)
    slotObj[key] = slot
  }
  return slotObj
}
var formatE = function (objects) {
  var e = {
    currentTarget: {
      dataset: {
        ...objects
      }
    }
  }
  return e
}
const filters = {
  getTextColor2: getTextColor2,
  getTextColor: getTextColor,
  toFixed_2: toFixed_2,
  toFixed: toFixed,
  formatStyle,
  formatImage,
  formatSlot,
  formatE
}
export default filters