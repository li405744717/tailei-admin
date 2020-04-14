import * as React from "react";
import filters from '@/common/filters'
import {Upload, Button} from 'antd';


const {Dragger} = Upload;

export default function renderView(page) {
  const {} = page.props
  const {uploaded} = page.state
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: true,
    accept: '.xlsx,.xls,.csv'
  };

  return (<div className="upload_c">
      <Dragger {...props}
               beforeUpload={function () {
                 return false;
               }} onChange={page.uploadFilesChange.bind(this)}>
        <div className="upload_container flex_column center">
          <img src={require('@/img/icon_upload.png')} className="icon_upload_image margin_bottom_40"/>
          <p className="text_32 gray">点击或将文件拖拽到这里上传</p>
        </div>
      </Dragger>
      <div className='flex_row width_100 align_center margin_top_20'>
        <Button className="empty_button" type={'link'} onClick={() => page.downloadExample()}>
          <img src={require('@/img/icon_download.png')} className='icon_download margin_right_16'/>
          <span className="text_28 primary">下载模板</span>
        </Button>
        <span className='text_28 black_65 margin_left_32'>请按照模版中的说明整理信息（每次最多导入50条）</span>
      </div>

    </div>
  )
}

