/**
 * Created by dp-k on 2019/12/5.
 */
import React from 'react'
import "./view.scss"
import {Button, Icon, Checkbox, Input, Radio, Select, Upload, Modal} from "antd";
import PropTypes from 'prop-types'
import CusPCTable from "../../../components/table-pc-c/c";

const {Option} = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export class FormInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    setInputValue: PropTypes.func
  }

  static defaultProps = {}

  setInputValue(e) {
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(e.target.value)
  }

  render() {
    const {placeholder} = this.props
    return <div className='cus_form'>
      <Input className='cus_form_input_view' onChange={e => this.setInputValue(e)} placeholder={placeholder}/>
    </div>
  }
}

export class FormRadio extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    setInputValue: PropTypes.func
  }

  static defaultProps = {}

  setInputValue(e) {
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(e.target.value)
  }

  render() {
    const {options} = this.props
    return <div className='cus_form'>
      <Radio.Group onChange={e => this.setInputValue(e)}>
        {
          options.map((item, index) => {
            return <Radio key={`option_${index}`} value={item.key}>{item.title}</Radio>
          })
        }
      </Radio.Group>
    </div>
  }
}

export class FormSelect extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    setInputValue: PropTypes.func
  }

  static defaultProps = {}

  onChange = value => {
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(value)
  }

  onSearch = (val) => {
    console.log('search:', val);
  }

  render() {
    const {options} = this.props
    return <div className='cus_form'>
      <Select
        showSearch
        style={{width: 200}}
        placeholder="请选择"
        optionFilterProp="children"
        onChange={this.onChange}
        onSearch={this.onSearch}
        filterOption={(input, option) => {
          return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
      >
        {
          options.map((item, index) => {
            return <Option key={`option_${index}`} value={item.key}>{item.title}</Option>
          })
        }
      </Select>
    </div>
  }
}

export class FormImage extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    setInputValue: PropTypes.func
  }

  setInputValue(value) {
    const {setInputValue} = this.props
    if (setInputValue) setInputValue(value)
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ],
  };

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => {
    this.setInputValue(fileList)
    this.setState({fileList})
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <img src={require('@/img/icon_add_2.png')} className='icon_add_2'/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return <div>
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
      <div>
        <span className='gray'>支持.jpg、.jpeg、.png等格式<br/>建议尺寸：740*450</span>
      </div>
    </div>
  }
}

export default function renderView(page) {

  const {} = page.props
  const {form} = page.state

  return <div className="page sale_list_info_page padding_LR_48 padding_T_32 flex_column" id="rankPage">
    <div className='flex_column align_center width_100 bg_white padding_TB_64'>
      <div>
        {
          form.map((item, index) => {
            return item.hide ? null :
              <div className='width_child flex_row margin_bottom_64' key={`form_${index}`}>
                <span className='cus_form_title_text text_28 margin_top_8'>{item.title}：</span>
                {
                  item.type === 'input' ?
                    <FormInput placeholder={item.placeholder || `请输入${item.title}`}
                               setInputValue={value => page.setFormValue(item.key, value)}/> :
                    item.type === 'radio' ?
                      <FormRadio options={item.options}
                                 setInputValue={value => page.setFormValue(item.key, value)}/> :
                      item.type === 'select' ?
                        <FormSelect options={item.options}
                                    setInputValue={value => page.setFormValue(item.key, value)}/> :
                        item.type === 'images' ?
                          <FormImage setInputValue={value => page.setFormValue(item.key, value)}/> : null
                }
              </div>

          })
        }
        <div className='flex_row align_center'>
          <div className='cus_form_title_text'></div>
          <Button type='primary' onClick={() => page.submit()}>
            <span className='white'>提交</span>
          </Button>
          <Button className='margin_left_16'>取消</Button>
        </div>
      </div>
    </div>
  </div>

}

