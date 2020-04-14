import * as React from 'react';
import renderView from './view'
import utils from '@/common/utils'
import './view.scss'
import PropTypes from "prop-types";
import wx from '@/common/wx'
import * as XLSX from 'xlsx'

export default class UploadC extends React.Component {
  static defaultProps = {}
  static propTypes = {}

  state = {
    uploaded: false
  }
  fundList = {}

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(newVal, newContext) {
    this.onLoad(newVal)
  }

  componentDidMount() {
    this.onLoad(this.props)
  }

  render() {
    return renderView(this)
  }

  onLoad(props) {

  }

  onChange(info) {

  }

  uploadFilesChange = (file) => {
    console.log(file)
    this.setState({
      uploaded: true
    })
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const {result} = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, {type: 'binary'});
        // 存储获取到的数据
        let data = {};
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {

          let tempData = [];
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            console.log(sheet);
            data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        const excelData = data.Sheet1;
        let fundList = excelData.map((item, index) => {
          return {
            // title: item.title,
            name: item.姓名,
            phone: item.电话,
            city: item.城市,
            apartment: item.小区,
            house: item.房屋,
            area: item.面积
          }
        })
        // 最终获取到并且格式化后的 json 数据
        this.fundList[file.file.uid] = fundList
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log(e);
      }

    }
    // 以二进制方式打开文件
    try {
      fileReader.readAsBinaryString(file.file);
    } catch (e) {
      console.log(e)
    }

    //删除不存在的
    for (let key in this.fundList) {
      let _file = file.fileList.findIndex(item => {
        return item.uid === key
      })
      if (_file === -1) {
        delete this.fundList[key]
      }
    }
  }

  downloadExample() {
    console.log('do download Example')
    var link = document.createElement('a');
    link.setAttribute("download", "");
    link.href = 'https://devoss.ddwenwen.com/agent_pc/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E5%9F%BA%E9%87%91%E6%A8%A1%E6%9D%BF.xlsx';
    link.click();
  }

}
