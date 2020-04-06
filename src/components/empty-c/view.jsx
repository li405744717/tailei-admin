import * as React from "react";
import filter from '@/common/filters'


export default function renderView(page) {
  var {image, imageStyle, text, containerStyle, containerStyleClass} = page.props
  return (<div>
      <div id="emptyV" className={`flex_column center ${containerStyleClass || 'padding_TB_60'}`}
           style={{background: 'transparent', ...filter.formatStyle(containerStyle)}}>
        <img src={image} className="img_none" style={filter.formatStyle(imageStyle)}/>
        <span className="text_28 light light_gray margin_top_30">{text}</span>
      </div>
    </div>
  )
}





