import * as React from "react";
import filter from '@/common/filters'
import CusTitle from '@/components/title-c/c'
import ExplainC from "../explain/explain";
import EmptyC from "../empty-c/empty-c";
import {Table} from 'antd'

export default function renderView(page) {
  const {hideFg, explain, explainTop, left, showAll} = page.state
  var {chart, columnRenderObj, emptyText} = page.props
  var {showHeader} = page.props
  const slotKeys = ['before', 'title_before', 'middle', 'after', "title_after", "tag"]
  var slotObj = filter.formatSlot(slotKeys, page)
  var limit = false
  if (chart) {
    limit = chart.limit
    if (chart.contents && chart.contents.length < limit) limit = false
  }
  var columns = [], dataSource = []
  for (var contentIndex in chart.contents) {
    var content = chart.contents[contentIndex]
    var item = {key: contentIndex}
    if (content) {
      for (var index in content) {
        content[index].last = parseInt(index) === content.length - 1
        content[index].first = parseInt(index) === 0
        item[chart.sections[index].title] = content[index]
      }
      dataSource.push(item)
    }
  }
  var renderMap = {
    'portfolio_fund_risk': (content, record, rowIndex) => {
      var promptText = content.status === 'success' ? '暂未发现风险点' : content.prompt.join(',')
      return <div className="flex_row align_center" key={`row_${rowIndex}`}>
        <img className="comb_scan_card_status_prompt_c margin_right_10"
             src={require(`@/img/comb_scan_${content.status}.png`)} alt=""/>
        <span className={`comb_scan_card_text_prompt_c_${content.status} text_28`}>{promptText}</span>
      </div>
    },
    'fundName': (content, record, rowIndex) => {
      return <div className="flex_column" key={`row_${rowIndex}`}>
        <span className="text_28">{content.short_name}</span>
        <div className="flex_row align_center justify_start">
          <span className={`text_24 table_gray light fund_code_text`}>{content.transaction_code}</span>
          <span className="text_20 table_fund_type margin_left_20">{content.fund_type}</span>
        </div>
      </div>
    },
    'select': (content, record, rowIndex) => {
      return <div className="flex_column" onClick={(e) => page.click({rowIndex, content}, e)} key={`row_${rowIndex}`}>
        {
          content.select
            ? <img src={require('@/img/pc_selected_icon.png')} className={`${content.selectClass} margin_left_8`}/>
            : <img src={require('@/img/pc_unselected_icon.png')} className={`${content.selectClass} margin_left_8`}/>
        }
      </div>
    }
  }

  for (var index in chart.sections) {
    index = parseInt(index + '')
    let section = chart.sections[index]
    var sortDirections = section.sort === 'desc' ? ['descend', 'ascend'] : ['ascend', 'descend']
    var sorter = section.sort === 'desc' ?
      section.sortType === 'time' ?
        (a, b) => (new Date(a[section.title].data[0].text)).getTime() - (new Date(b[section.title].data[0].text)).getTime() :
        (a, b) => {
          if (isNaN(parseFloat(a[section.title].data[0].text)) && !isNaN(parseFloat(b[section.title].data[0].text))) {
            return -1
          } else if (!isNaN(parseFloat(a[section.title].data[0].text)) && isNaN(parseFloat(b[section.title].data[0].text))) {
            return 1
          } else {
            return parseFloat(a[section.title].data[0].text) * (a[section.title].data[0].negative ? -1 : 1) - parseFloat(b[section.title].data[0].text) * (b[section.title].data[0].negative ? -1 : 1)
          }
        }
      :
      section.sort === 'asc' ?
        section.sortType === 'time' ?
          (a, b) => (new Date(b[section.title].data[0].text)).getTime() - (new Date(a[section.title].data[0].text)).getTime() :
          (a, b) => {
            if (isNaN(parseFloat(b[section.title].data[0].text)) && !isNaN(parseFloat(a[section.title].data[0].text))) {
              return 1
            } else if (!isNaN(parseFloat(b[section.title].data[0].text)) && isNaN(parseFloat(a[section.title].data[0].text))) {
              return -1
            } else {
              return parseFloat(b[section.title].data[0].text) * (b[section.title].data[0].negative ? -1 : 1) - parseFloat(a[section.title].data[0].text) * (a[section.title].data[0].negative ? -1 : 1)
            }
          }
        : null


    var render = columnRenderObj[section.renderId] ? columnRenderObj[section.renderId] :
      renderMap[section.renderId] ? renderMap[section.renderId] :
        (content, record, rowIndex) => {
          return <div onClick={(e) => page.click({rowIndex}, e)} key={`row_${rowIndex}`}
                      className={`${section.styleClass || 'flex_1'} table_item ${content.direction == 'row' ? `flex_row align_center ${content.last ? 'justify_end' : content.first ? 'justify_start' : 'justify_center'}` : `flex_column justify_center ${content.last ? 'align_end' : content.first ? 'align_start' : 'align_center'}`}`}>
            {
              content.data.map((data, itemIndex) => {
                var len = content.data.length
                return <div className={`flex_row align_center`}
                            key={"item" + itemIndex}>
                  {
                    data.preImageUrl ?
                      <img src={data.preImageUrl}
                           className={`${data.preImageClass} margin_right_8`}/> : null
                  }
                  <span
                    className={`text_28 black ${data.styleClass}`}>{data.text}</span>
                  {
                    data.nextImageUrl ?
                      <img src={data.nexteImageUrl}
                           className={`${data.nextImageClass} margin_left_8`}/> : null
                  }
                </div>
              })
            }
          </div>
        }
    columns.push({
      title: section.subTitle ? <div className="flex_column">
        <span className="text_28 black mid">{section.title}</span>
        <span className="text_24 light black">{section.subTitle}</span>
      </div> : <span className="text_28 black mid">{section.title}</span>,
      dataIndex: section.title,
      width: section.width,
      key: section.title,
      sorter,
      sortDirections: section.sortDirections || sortDirections,
      defaultSortOrder: section.defaultSortOrder,
      // className: `bg_white `,
      render: render
    })
  }
  var locale = {
    emptyText: <div className="flex_column center padding_TB_100">
      <img src={require('@/img/comb_none.png')} className="img_none"/>
      <span className="text_32 gray margin_top_20">{emptyText}</span>
    </div>
  }
  return (<div className="diagnose_table">
    {slotObj.before}
    {
      chart ?
        <div
          className={`flex_column ${chart.top_border ? 'border_top' : ''} border_bottom ${!chart.bottom_border ? '' : ''}`}>

          {
            chart.header ?
              <CusTitle title={chart.header.title} subTitle={chart.header.subTitle}>
                <div ref="before">
                  {slotObj.title_before}
                </div>
                z
                <div ref="after">
                  {slotObj.title_after}
                </div>
              </CusTitle> : null
          }

          {slotObj.middle}

          {
            columns.length > 0 ?
              <Table columns={columns} dataSource={dataSource} pagination={false} size="small" locale={locale}
                     onRow={record => {  // record和index都可以拿到
                       return {  // event为事件obj
                         onClick: event => page.onRow("onClick", record),
                         onMouseEnter: event => page.onRow("onMouseEnter", {}),
                         onMouseLeave: event => page.onRow("onMouseLeave", {})
                       };
                     }}
                     showHeader={showHeader}/> : null
          }

          {
            limit ?
              <div className="width_100 flex_column center padding_TB_30" onClick={() => page.showAll()}>
                <img src={require('@/img/icon_bottom_7.png')}
                     className={`icon_bottom_7_image ${showAll ? 'rotate_180' : ''}`}/>
              </div> : null
          }
        </div> : null
    }

    {slotObj.after}

    <ExplainC explain={explain} explainTop={explainTop} explainLeft={left - 20}/>
  </div>)
}

