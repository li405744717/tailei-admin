import * as React from "react";
import filter from '@/common/filters'
import Config from "@/common/config";

const fontSize = Config.fontSize()
export default function renderView(page) {
  const {explain, containerStyle, explainTop,explainLeft} = page.state
  const slotKeys = ['before', 'title_before', 'middle', 'after', "title_after"]
  var slotObj = filter.formatSlot(slotKeys, page)
  return (<div className="width_100" onClick={() => page.closeExplain()}>
      {
        explainTop > 0 ?
          <div className="toast_container" style={filter.formatStyle("opacity:0;z-index:0")}/> : null
      }
      {
        explainTop > 0 ?
          <div className="explain" style={filter.formatStyle("top:" + explainTop + "PX;" + containerStyle)}>
            <div className="explain_arrow" style={{marginLeft: explainLeft}}></div>
            <div className="explain_text text_20 white" style={{marginLeft: explainLeft/3*2}}>{explain}</div>
          </div> : null
      }
    </div>
  )
}

