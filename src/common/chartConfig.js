import G2 from "@antv/g2";
import _ from 'lodash';
import utils from "./utils";


var COLORS = ['#1f55a5', "#b8355d", "#f5c403", "#749d55", "#f07622", "#582b96", "#66cf8c", "#ffb4b2", "#90aad2", "#ccc7d6", "#98b580", "#bacdab", "#dde6f1", "#faddc8"]
COLORS = COLORS.concat(COLORS)
export var EXPORT_COLORS = COLORS
G2.Global.setTheme({
  shape: {
    line: {
      lineWidth: 1
    }
  },
  tooltip: {
    triggerOff: [""]
  }
});
console.log('F2', G2.Global)
G2.Global.pixelRatio = window.devicePixelRatio
var cliWidth = document.documentElement.clientWidth;
if (cliWidth > 750) {
  cliWidth = cliWidth / 2
}
var fontSize = 50 //75 * (cliWidth / 750) / 2 //37.5 1rem


export var colorList = ["#549BF3", "#EC754F", "#FFB243", "#F68FC1", "#98CE78", "#FAA960", "#A270F7", "#E1B97F", "#81B6FF", "#549BF3", "#EC754F", "#FFB243", "#F68FC1", "#549BF3", "#EC754F", "#FFB243", "#F68FC1", "#98CE78", "#FAA960", "#A270F7", "#E1B97F", "#81B6FF", "#549BF3", "#EC754F", "#FFB243", "#F68FC1"]

export function lineChart(id, options, oldChartId) {
  var {legend, data, format, colors, colors2, reverse, area, animation, rect, text, axis, padding, scale, style, tooltip, adjust, source, shape} = options
  colors = colors2 || ['#1f55a5', '#f07622', '#B8355D', '#00AF42']
  if (oldChartId) {
    var canvas = document.getElementById(oldChartId).getElementsByTagName('canvas')
    canvas[0].remove()
  }
  const chart = new G2.Chart({
    container: id,
    height: 250,//(style && style.height || 5) * fontSize,
    forceFit: true,
    padding: ['auto', 50, 'auto', 'auto']
  });

  chart.source(data);

  //刻度 数量
  var tickCount = {
    date: scale && scale.date && scale.date.tickCount || 5,
    value: scale && scale.value && scale.value.tickCount || 5
  }


  chart.axis('value', {
    line: {
      lineWidth: 1,
      stroke: '#aaa'
    },
    grid: {
      type: 'line',
      lineStyle: {
        stroke: '#dfdfdf',
        lineWidth: 1, // 网格线的粗细
        lineDash: [0, 0, 0]
      },
    }
  })

  chart.axis('date', {
    grid: {
      type: 'line',
      lineStyle: {
        stroke: '#dfdfdf',
        lineWidth: 1, // 网格线的粗细
        lineDash: [0, 0, 0]
      },
    }
  });
  var scaleValue = {
    min: scale && scale.value && scale.value.min != null ? scale.value.min : null,
    max: scale && scale.value && scale.value.max != null ? scale.value.max : null,
  }
  chart.scale('date', {
    type: 'timeCat',
    tickCount: tickCount.date,
    range: [0, 1],

  });
  chart.scale('value', {
    tickCount: tickCount.value,
    //刻度 最大值,最小值
    min: scaleValue.min,
    max: scaleValue.max,
    //刻度 格式化
    formatter: function formatter(text) {
      const textCfg = {};
      if (format && format.fixed) {
        if (format && format.unit && format.unit == '%') {
          // text *= 100
        }
        text = utils.toFixed(text, format.fixed)
      }
      if (format && format.positive) {
        text = Math.abs(text)
      }
      if (format && format.unit) {
        text += format.unit
      }

      if (format && format.symbol) {
        if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
          text = '+' + text
        }
      }
      return text
    }
  });

  chart.legend(false)

  var {enable} = legend
  if (enable) {
    var selectedTypes = legend.items.filter(item => {
      return !item.hide
    })
    chart.filter('type', function (type) {
      return selectedTypes.findIndex(item => {
        return item.name === type
      }) > -1
    });

  }
  chart.on('tooltip:change', function (obj) {
    for (var item of obj.items) {
      var index = obj.items.findIndex(item => {
        return item.point.color.indexOf('(') > -1
      })
      if (index > -1) obj.items.splice(index, 1)
      if (item.point && item.point._origin && item.point._origin.name_text) {
        item.name = item.point._origin.name_text
      }
      if (item.point && item.point._origin && item.point._origin.value_text) {
        item.value = item.point._origin.value_text
      }
    }

  })
  if (area && area.show) {
    chart.area()
      .position('date*value')
      // area.colors ||
      //   ['#1f55a5', '#f07622', '#B8355D', '#00AF42'] ||
      .color('type', ['l(100) 0:#1f55a5 1:#ffffff', 'l(100) 0:#f07622 1:#ffffff', 'l(100) 0:#B8355D 1:#ffffff', 'l(100) 0:#00AF42 1:#ffffff'])
      .adjust(adjust)
  }
  chart.line().position('date*value')
    .color('type', colors)
    .shape(shape || 'line')
    .adjust(adjust)


  if (rect) {
    for (var key in rect) {
      chart.guide().region({
        start: rect[key].start,
        end: rect[key].end,
        style: {
          fill: '#' + key
        }
      });
    }
  }

  if (text) {
    for (var item of text) {
      chart.guide().text({
        position: item.position,
        content: item.content,
        offsetY: item.offsetY,
        offsetX: item.offsetX
      });
    }
  }

  chart.render();
  return chart
}

export function intervalChart(id, options, oldChartId) {
  var {legend, data, format, colors, area, animation, rect, text, axis, padding, scale, style, tooltip, adjust, source, shape, line, height} = options
  colors = ['#1f55a5', '#f07622']
  if (oldChartId) {
    var canvas = document.getElementById(oldChartId).getElementsByTagName('canvas')
    canvas[0].remove()
  }
  let len = data.filter(item => {
    return item.type === data[0].type
  }).length

  let _padding = (len > 7) ? ['auto', 'auto', 60, 'auto'] : 'auto'
  const chart = new G2.Chart({
    container: id,
    height: height || 260,//(style && style.height || 5.33) * fontSize,
    forceFit: true,
    padding: _padding
  });

  chart.source(data, {
    date: {
      type: 'cat'
    }
  });

  //刻度 数量
  var tickCount = {
    date: scale && scale.date && scale.date.tickCount || null,
    value: scale && scale.value && scale.value.tickCount || 5
  }


  var axisLine = {
    value: {
      lineWidth: 1,
      stroke: '#D6D6D6',
    },
    date: {}
  }
  if (axis && axis.date && axis.date.line && axis.date.line.hide) {
    axisLine.date = null
  }
  if (axis && axis.value && axis.value.line && axis.value.line.hide) {
    axisLine.value = null
  }

  var label = {
    data: {},
    value: null
  }
  if (axis && axis.value && axis.value.label && axis.value.label.show) {
    label.value = {}
  }
  chart.axis('value', {
    // label: label.value
  });

  if (len > 7) {
    label.data = {
      autoRotate:false,
      rotate: -1 * Math.PI / 4,
      offsetY: 16,
      offsetX: -10,
    }
  }
  // label.date
  chart.axis('date', {
    // line: axisLine.date,
    label: label.data
  });


  chart.scale('value', {
    tickCount: tickCount.value,
    //刻度 最大值,最小值
    min: scale && scale.value && scale.value.min != null ? scale.value.min : null,
    max: scale && scale.value && scale.value.max != null ? scale.value.max : null,
    //刻度 格式化
    formatter: function formatter(text) {
      const textCfg = {};
      if (format && format.fixed) {
        if (format && format.unit && format.unit == '%') {
          // text *= 100
        }
        text = utils.toFixed(text, format.fixed)
      }
      if (format && format.unit) {
        text += format.unit
      }

      if (format && format.symbol) {
        if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
          text = '+' + text
        }
      }
      return text
    }
  });

  chart.legend(false)

  chart.interval().position('date*value').color('type', colors).size(10)
    .adjust([{
      type: 'dodge',
      marginRatio: 0
    }]);

  if (rect && false) {
    for (var key in rect) {
      chart.guide().region({
        start: rect[key].start,
        end: rect[key].end,
        // style: {
        //   fill: '#' + key
        // }
      });
    }
  }

  if (text) {
    for (var item of text) {
      chart.guide().text({
        position: item.position,
        content: item.content,
        offsetY: item.offsetY,
        offsetX: item.offsetX
      });
    }
  }

  if (line) {
    for (var item of line) {
      chart.guide().line({
        start: item.start,
        end: item.end,
        style: item.style
      });
    }
  }

  chart.render();
  return chart
}

export function lineIntervalChart(id, options) {
  var {
    legend, data, format, colors, lineColors, area, animation, rect, text, axis, padding, scale, style, tooltip,
    adjust, lineAdjust, source, shape
  } = options
  const chart = new G2.Chart({
    container: id,
    height: 250,
    padding: padding || 'auto',
    forceFit: true,
  });

  chart.source(data, {});

  // //不显示刻度线 ,不显示轴线,不显示刻度
  // var grid = {
  //   value: null
  // }
  // var line = {
  //   value: {
  //     lineWidth: 1,
  //     stroke: '#D6D6D6',
  //   },
  //   date: {}
  // }
  // var label = {
  //   value: (text, index, total) => {
  //     const textCfg = {};
  //     //刻度轴不显示+号
  //     text = text.replace('+', '')
  //     textCfg.text = text
  //     return textCfg
  //   }
  // }
  // if (axis && axis.value && axis.value.grid && axis.value.grid.zero) {
  //   grid.value = (text, index, total) => {
  //     if (text === '0.00%') {
  //       // 0％ 处的栅格线着重显示
  //       return {
  //         stroke: '#D6D6D6',
  //         lineWidth: 1,
  //         lineDash: null
  //       };
  //     }
  //     return {
  //       lineDash: null,
  //       stroke: '#ffffff',
  //     };
  //   }
  // }
  // if (axis && axis.date && axis.date.line && axis.date.line.hide) {
  //   line.date = null
  // }
  // if (axis && axis.value && axis.value.line && axis.value.line.hide) {
  //   line.value = null
  // }
  // if (axis && axis.value && axis.value.label && axis.value.label.hide) {
  //   label.value = null
  // }
  // chart.axis('value', {
  //   // line: null,
  //   // label: null,
  //   line: line.value,
  //   grid: grid.value,
  //   label: label.value
  // });
  //
  // chart.axis('date', {
  //   line: line.date,
  //   label: function label(text, index, total) {
  //     const textCfg = {};
  //     if (index === 0) {
  //       textCfg.textAlign = 'left';
  //     } else if (index === total - 1) {
  //       textCfg.textAlign = 'right';
  //     } else {
  //     }
  //     //刻度 文本旋转
  //     if (axis && axis.date && axis.date.label) {
  //       for (var key in axis.date.label) {
  //         textCfg[key] = axis.date.label[key]
  //       }
  //     }
  //     return textCfg;
  //   }
  // });
  //
  //
  // //刻度 数量
  // var tickCount = {
  //   date: scale && scale.date && scale.date.tickCount || null,
  //   value: scale && scale.value && scale.value.tickCount || 5
  // }
  // chart.scale('date', {
  //   tickCount: tickCount.date
  // });
  //
  // chart.scale('value', {
  //   tickCount: tickCount.value,
  //   //刻度 最大值,最小值
  //   min: scale && scale.value && scale.value.min != null ? scale.value.min : null,
  //   max: scale && scale.value && scale.value.max != null ? scale.value.max : null,
  //   //刻度 格式化
  //   formatter: function formatter(text) {
  //     const textCfg = {};
  //     if (format && format.fixed) {
  //       if (format && format.unit && format.unit == '%') {
  //         // text *= 100
  //       }
  //       text = utils.toFixed(text, format.fixed)
  //     }
  //     if (format && format.unit) {
  //       text += format.unit
  //     }
  //
  //     if (format && format.symbol) {
  //       if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
  //         text = '+' + text
  //       }
  //     }
  //     return text
  //   }
  // });

  chart.axis('lineValue', {
    grid: null
  })
  //设置图例
  chart.legend(false)


  //设置提示框
  chart.tooltip({
    showCrosshairs: true,
    showTitle: true, // 是否展示标题，默认不展示
  });

  var _adjust = adjust || {
    type: 'dodge',
    marginRatio: 0.05 // 设置分组间柱子的间距
  }

  lineColors = ['#1f55a5', '#f07622', '#F5C403']

  colors = ['#F5C403', '#f07622']


  chart.interval()
    .position('date*value').size(20)
    .color('type', colors)
    .adjust(_adjust);
  chart.line().position('date*lineValue')
    .color('type', lineColors)
    .shape(shape || 'smooth')
    .adjust(lineAdjust)


  if (text) {
    for (var item of text) {
      chart.guide().text({
        position: item.position,
        content: item.content,
        offsetY: item.offsetY,
        offsetX: item.offsetX
      });
    }
  }

  chart.render();
  return chart
}

export function circleChart(id, options, oldChartId) {
  var {legend, data, format, colors, area, animation, rect, text, axis, padding, scale, style, tooltip, adjust, source, shape, html_title} = options
  colors = COLORS
  if (oldChartId) {
    var canvas = document.getElementById(oldChartId).getElementsByTagName('canvas')
    canvas[0].remove()
  }
  const chart = new G2.Chart({
    container: id,
    width: 250,
    height: 250,//(style && style.height || 5.33) * fontSize,
    padding: 'auto',
  });

  chart.source(data, {
    percent: {
      formatter: val => {
        val = val + '%';
        return val;
      }
    }
  });
  chart.coord('theta', {
    radius: 0.75,
    innerRadius: 0.65
  });
  chart.legend(false)
  chart.tooltip({
    showTitle: false,
    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
  });
  chart.intervalStack()
    .position('percent')
    .color('type', colors)
    .tooltip('type*percent', (item, percent) => {
      percent = percent + '%';
      return {
        name: item,
        value: percent
      };
    })
    .style({
      lineWidth: 1,
      stroke: '#fff'
    });

  if (text) {
    chart.guide().text({
      position: ['50%', '50%'],
      content: text,
      style: {
        fontSize: '14',
        fill: '#808080',
        textAlign: 'center',
      },
    });
  }


  chart.render();
  return chart
}

export function radarChart(id, options, _chart) {
  var {legend, data, format, colors, area, animation, rect, text, axis, padding, scale, style, tooltip, adjust, source, shape, height, width} = options
  colors = ['#1f55a5', '#f07622', '#B8355D', '#F5C403', '#00AF42']
  const chart = new G2.Chart({
    container: id,
    height: height || 300,//(style && style.height || 5.33) * fontSize,
    // width: width || 350,
    padding: padding || 'auto',
    forceFit: true
  });

  chart.coord('polar', {
    radius: 0.8
  });
  data.reverse()
  for (let item of data) {
    item.type += 'abc'
  }
  chart.source(data);

//设置图例
  chart.legend(false)

  //设置提示框
  chart.tooltip({
    showCrosshairs: false,
    showTitle: true, // 是否展示标题，默认不展示
  });

  chart.on('tooltip:change', function (obj) {
    for (var item of obj.items) {
      item.name = item.point._origin.type
      item.value = item.point._origin.value
      item.value = utils.toFixed(item.value, 0)
      item.name = item.name.replace('abc', '')
    }
  })

  chart.scale('value', {
    tickCount: 5,
    formatter: function formatter(text) {
      const textCfg = {};
      text = parseFloat(text.toFixed(3))
      if (format && format.fixed) {
        if (format && format.unit && format.unit == '%') {
          // text *= 100
        }
        text = utils.toFixed(text, format.fixed)
      }
      if (format && format.unit) {
        text += format.unit
      }

      if (format && format.symbol) {
        if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
          text = '+' + text
        }
      }
      return text
    }
  })
  chart.axis('item', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  });

  chart.axis('value', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'line',
        style: {
          lineDash: null,
        },
      },
    },
  });

  chart.line().position('item*value').color('type', colors || colorList);

  chart.render();
  return chart
}

export function pointChart(id, options, _chart) {
  var {legend, data, format, colors, colors2, area, animation, rect, text, line, axis, padding, scale, style, tooltip, adjust, source, shape} = options
  const chart = new G2.Chart({
    container: id,
    height: 250,//(style && style.height || 5.33) * fontSize,
    forceFit: true,
    padding: 'auto'
  });
  colors = colors2 || ['#1f55a5', '#f07622', '#B8355D']
  chart.source(data);
  //刻度 数量
  var tickCount = {
    date: scale && scale.date && scale.date.tickCount || 3,
    value: scale && scale.value && scale.value.tickCount || 5
  }
  chart.scale('date', {
    tickCount: tickCount.date,
    //刻度 最大值,最小值
    min: scale && scale.date && scale.date.min != null ? scale.date.min : null,
    max: scale && scale.date && scale.date.max != null ? scale.date.max : null,
  });
  chart.scale('value', {
    tickCount: tickCount.value,
    //刻度 最大值,最小值
    min: scale && scale.value && scale.value.min != null ? scale.value.min : null,
    max: scale && scale.value && scale.value.max != null ? scale.value.max : null,
    //刻度 格式化
    formatter: function formatter(text) {
      const textCfg = {};
      if (format && format.fixed) {
        if (format && format.unit && format.unit == '%') {
          // text *= 100
        }
        text = utils.toFixed(text, format.fixed)
      }
      if (format && format.unit) {
        text += format.unit
      }

      if (format && format.symbol) {
        if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
          text = '+' + text
        }
      }
      return text
    }
  });
  var _grid = {
    value: axis && axis.value && axis.value.grid && axis.value.grid.show ? {
      stroke: '#EBEBEB',
      lineDash: [3, 3]
    } : null,
    date: axis && axis.date && axis.date.grid && axis.date.grid.show ? {
      stroke: '#EBEBEB',
      lineDash: [3, 3]
    } : null
  }
  var _label = {
    value: axis && axis.value && axis.value.label && axis.value.label.hide ? null : (text, index, total) => {
      const textCfg = {};
      //刻度轴不显示+号
      text = text.replace('+', '')
      textCfg.text = text
      return textCfg
    },
    date: axis && axis.date && axis.date.label && axis.date.label.hide ? null : (text, index, total) => {
      const textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      } else {
      }
      //刻度 文本旋转
      if (axis && axis.date && axis.date.label) {
        for (var key in axis.date.label) {
          textCfg[key] = axis.date.label[key]
        }
      }
      return textCfg;
    }
  }
  chart.axis('value', {
    line: {
      lineWidth: 1,
      stroke: '#EBEBEB',
    },
    grid: null,
    label: _label.value
  });
  chart.axis('date', {
    // position: (axis && axis.date && axis.date.position) || 'bottom',
    grid: null,
    label: _label.date
  });

  //设置图例
  chart.legend(false)


  chart.on('tooltip:change', function (obj) {
    //移除 area的tip
    var index = obj.items.findIndex(item => {
      return item.color.indexOf('(') > -1
    })
    if (index > -1) obj.items.splice(index, 1)

    obj.items.push(
      {
        ...obj.items[0],
        name: '上行捕获率',
        value: obj.items[0].point._origin.value + '%',
        title: null,
        marker: null
      })
    obj.items.push({
      ...obj.items[0],
      name: '下行捕获率',
      value: obj.items[0].point._origin.date + '%',
      title: null,
      marker: null
    })
    obj.items.push({
      ...obj.items[0],
      name: '上下行捕获比',
      value: utils.toFixed(obj.items[0].point._origin.value / obj.items[0].point._origin.date, 2),
      title: null,
      marker: null
    })
    obj.items[0].value = ''
    return obj
  })

  //设置提示框
  chart.tooltip({
    showTitle: false, // 是否展示标题，默认不展示
  });

  chart.point().position('date*value')
    .color('type', colors)
    .shape('circle')
    .adjust(adjust)
    .size('type', [0.2 * fontSize])

  if (area && area.show) {
    chart.area()
      .position('date*value')
      .color('type', area.colors)
      .shape(shape || 'smooth')
      .adjust(adjust)
  }

  if (text) {
    for (var item of text) {
      chart.guide().text({
        position: item.position,
        content: item.content,
        offsetY: item.offsetY,
        offsetX: item.offsetX
      });
    }
  }
  if (line) {
    for (var item of line) {
      chart.guide().line({
        start: item.start,
        end: item.end,
        lineStyle: item.lineStyle
      });
    }
  }

  if (!_chart) chart.render();
  return chart
}

export function effectiveFrontier(id, options, _chart) {
  var {legend, data, format, colors, area, animation, rect, text, line, axis, padding, scale, style, tooltip, adjust, source, shape, noLine} = options
  const chart = new G2.Chart({
    container: id,
    height: 250,//(style && style.height || 5.33) * fontSize,
    forceFit: true,
    padding: 'auto'
  });

  chart.source(data);
  //刻度 数量
  var tickCount = {
    wave: scale ? scale.wave.tickCount : 4,
    income: scale ? scale.income.tickCount : 3
  }
  var _scale = {
    wave: {
      nice: false,
      tickCount: tickCount.wave,
      //刻度 最大值,最小值
      min: scale && scale.wave && scale.wave.min != null ? scale.wave.min : null,
      max: scale && scale.wave && scale.wave.max != null ? scale.wave.max : null,
      // nice: false,
      formatter: function formatter(text) {
        const textCfg = {};
        if (format && format.unit && format.unit == '%') {
          text *= 100
        }
        if (format && format.fixed) {
          text = utils.toFixed(text, format.fixed)
        }
        if (format && format.unit) {
          text += format.unit
        }
        if (format && format.symbol) {
          if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
            text = '+' + text
          }
        }
        return text
      },
      // range: [0, 1]
    },
    income: {
      nice: false,
      tickCount: tickCount.income,
      //刻度 最大值,最小值
      min: scale && scale.income && scale.income.min != null ? scale.income.min : null,
      max: scale && scale.income && scale.income.max != null ? scale.income.max : null,
      //刻度 格式化
      formatter: function formatter(text) {
        const textCfg = {};
        if (format && format.unit && format.unit == '%') {
          text *= 100
        }
        if (format && format.fixed) {
          text = utils.toFixed(text, format.fixed)
        }
        if (format && format.unit) {
          text += format.unit
        }
        if (format && format.symbol) {
          if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
            text = '+' + text
          }
        }
        return text
      }
    }
  }
  chart.scale('wave', _scale.wave);
  chart.scale('date', _scale.wave);
  chart.scale('income', _scale.income);
  chart.scale('value', _scale.income);
  var _grid = {
    income: axis && axis.income && axis.income.grid && axis.income.grid.show ? {
      stroke: '#EBEBEB',
      lineDash: [3, 3]
    } : null,
    wave: axis && axis.wave && axis.wave.grid && axis.wave.grid.show ? {
      stroke: '#EBEBEB',
      lineDash: [3, 3]
    } : null
  }
  var _label = {
    income: axis && axis.income && axis.income.label && axis.income.label.hide ? null : (text, index, total) => {
      const textCfg = {};
      //刻度轴不显示+号
      text = text.replace('+', '')
      textCfg.text = text
      return textCfg
    },
    wave: axis && axis.wave && axis.wave.label && axis.wave.label.hide ? null : (text, index, total) => {
      const textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      } else {
      }
      //刻度 文本旋转
      if (axis && axis.wave && axis.wave.label) {
        for (var key in axis.wave.label) {
          textCfg[key] = axis.wave.label[key]
        }
      }
      return textCfg;
    }
  }
  chart.axis('income', {
    line: {
      lineWidth: 1,
      stroke: '#aaa',
    }
  });
  // chart.axis('wave', {
  //   grid: _grid.wave,
  //   label: _label.wave
  // });
  //
  chart.axis('date', {
    grid: _grid.wave,
    label: null
  });
  chart.axis('value', {
    grid: _grid.income,
    label: null
  });
  chart.legend(false)

  //设置提示框
  chart.tooltip({
    showTitle: false,
  })
  chart.on('tooltip:change', function (ev) {
    if (ev.items && ev.items[0] && ev.items[0].name === '持有基金') {
      ev.items[0].name = ev.items[0].point._origin.title
    }
    if (ev.items && ev.items[0]) {
      ev.items[0].value = ''
    }
    ev.items.push(
      {
        ...ev.items[0],
        name: text[0].content,
        value: ((ev.items[0].point._origin.income || ev.items[0].point._origin.value || 0) * 100).toFixed(2) + "%",
        title: null,
        marker: null
      })
    ev.items.push({
      ...ev.items[0],
      name: text[1].content,
      value: ((ev.items[0].point._origin.wave || ev.items[0].point._origin.date || 0) * 100).toFixed(2) + "%",
      title: null,
      marker: null
    })
    if (ev.items[0].name === "推荐比例") {
      ev.items.splice(1, 1)
    }
  })

  chart.point()
    .position('wave*income')
    .color('type', colors)
    .shape('circle')
    .adjust(adjust)
    .size('type', [7])

  chart.line().position('date*value')
    .color('type', colors)
    .shape('smooth')
    .style({
      lineDash: [2, 2]
    })


  if (rect && false) {
    for (var key in rect) {
      chart.guide().region({
        start: rect[key].start,
        end: rect[key].end,
        style: {
          fill: '#' + key
        }
      });
    }
  }
  if (text) {
    const persent2int = str => parseInt(str.slice(0, str.length - 1))
    for (var item of text) {
      if (persent2int(item.position[0]) > 100) continue
      chart.guide().text({
        position: item.position,
        content: item.content,
        offsetY: item.offsetY,
        offsetX: item.offsetX
      });
    }
  }
  if (line) {
    const persent2int = str => parseInt(str.slice(0, str.length - 1))
    for (var item of line) {
      if (persent2int(item.start) > 100 || persent2int(item.end) > 100) continue
      chart.guide().line({
        start: item.start,
        end: item.end,
        style: item.style
      });
    }
  }

  if (!_chart) chart.render();
  return chart
}

export function rowIntervalChart(id, options, oldChartId) {
  var {legend, data, format, colors, area, animation, rect, text, axis, padding, scale, style, tooltip, adjust, source, shape, line, hideText, profit} = options
  colors = COLORS
  if (oldChartId) {
    var canvas = document.getElementById(oldChartId).getElementsByTagName('canvas')
    canvas[0].remove()
  }
  var chart
  if (!profit) {
    chart = new G2.Chart({
      container: id,
      height: (style && style.height || 5.33) * 40 + 20,//fontSize,
      padding: ['auto', 80, 'auto', 'auto'],
      forceFit: true
    });
  } else {
    chart = new G2.Chart({
      container: id,
      height: (style && style.height || 5.33) * 40 + 20,//fontSize,
      padding: ['auto', 'auto', 'auto', 'auto'],
      forceFit: true
    });
  }


  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });

  var grid = {
    value: {
      stroke: '#D6D6D6',
      lineDash: [2, 4]
    },
    date: null
  }
  var axisLine = {
    value: {
      lineWidth: 1,
      stroke: '#D6D6D6',
    },
    date: {
      lineWidth: 1,
      stroke: "#D6D6D6"
    }
  }
  var label = {
    value: axis.value,
    date: {
      formatter: (val) => {
        var maxLen = 100
        if (val.length > maxLen - 1) val = val.slice(0, 100) + '...'
        return val
      }
    }
  }
  if (axis && axis.value && axis.value.grid && axis.value.grid.zero) {
    grid.value = (text, index, total) => {
      if (text === '0.00%') {
        // 0％ 处的栅格线着重显示
        return {
          stroke: '#D6D6D6',
          lineWidth: 1,
          lineDash: null
        };
      }
      return {
        lineDash: null,
        stroke: '#ffffff',
      };
    }
  }
  if (axis && axis.date && axis.date.line && axis.date.line.hide) {
    axisLine.date = null
  }
  if (axis && axis.value && axis.value.line && axis.value.line.hide) {
    axisLine.value = null
  }
  if (axis && axis.value && axis.value.label && axis.value.label.hide) {
    label.value = null
  }
  if (axis && axis.date && axis.date.label && axis.date.label.hide) {
    label.date = null
  }

  chart.axis('date', {
    label: label.date
  });
  chart.axis('value', {
    label: label.value
  });

  //刻度 数量
  var tickCount = {
    date: scale && scale.date && scale.date.tickCount || null,
    value: scale && scale.value && scale.value.tickCount || 5
  }
  chart.scale('date', {
    tickCount: tickCount.date
  });

  chart.scale('value', {
    tickCount: tickCount.value,
    //刻度 最大值,最小值
    min: scale && scale.value && scale.value.min != null ? scale.value.min : null,
    max: scale && scale.value && scale.value.max != null ? scale.value.max : null,
    //刻度 格式化
    formatter: function formatter(text) {
      const textCfg = {};
      if (format && format.fixed) {
        if (format && format.unit && format.unit == '%') {
          // text *= 100
        }
        text = utils.toFixed(text, format.fixed)
      }
      if (format && format.unit) {
        text += format.unit
      }

      if (format && format.symbol) {
        if (parseFloat(text) != 0 && text.indexOf('-') == -1) {
          text = '+' + text
        }
      }
      return text
    }
  });


  chart.legend(false)


  //设置提示框
  chart.tooltip({
    showCrosshairs: false,
    showTitle: false, // 是否展示标题，默认不展示
  });

  chart.on('tooltip:change', function (ev) {
    if (profit) {
      if (ev.items && ev.items[0]) {
        ev.items[0].name = ev.items[0].title
      }
    }
  })


  chart.coord().transpose();

  if (!profit) {
    colors = COLORS.slice(0, data.length).reverse()
    chart.interval()
      .position('date*value').size(20)
      .color('date', ['#1F55A5 '])
      .label('value', function (val) {
        val = val + '%'
        let offset = parseFloat(val) >= 0 ? 50 : 10;
        let textAlign = 'end';
        return {
          // position: 'middle',
          offset,
          textStyle: {
            fill: '#666666',
            textAlign
          }
        };
      });
  } else {
    if (label.date) {
      chart.interval()
        .position('date*value').size(20)
        .color('value', (value) => {
          if (value > 0) {
            return '#DD635F'
          } else {
            return '#66AA49'
          }
        })
        .label('value', function (val) {
          if (parseFloat(val) === 0) {
            val = ''
            return {}
          }
          val = val + '%'
          let offset = parseFloat(val) >= 0 ? -10 : -50;
          let textAlign = 'end';
          return {
            // position: 'middle',
            offset,
            textStyle: {
              fill: 'white',
              textAlign
            }
          };
        });
    } else {
      chart.interval()
        .position('date*value').size(20)
        .color('value', (value) => {
          if (value > 0) {
            return '#DD635F'
          } else {
            return '#66AA49'
          }
        })
    }

  }


  if (rect) {
    for (var key in rect) {
      chart.guide().region({
        start: rect[key].start,
        end: rect[key].end,
        style: {
          fill: '#' + key
        }
      });
    }
  }

  if (text) {
    for (var item of text) {
      chart.guide().text({
        position: item.position,
        content: item.content,
        offsetY: item.offsetY,
        offsetX: item.offsetX
      });
    }
  }

  if (line) {
    for (var item of line) {
      chart.guide().line({
        start: item.start,
        end: item.end,
        style: item.style
      });
    }
  }

  chart.render();

  return chart
}