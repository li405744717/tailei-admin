import * as React from 'react';
import "./view.scss"
import renderView from './view'
import utils from "../../common/utils";

export default class ExplainC extends React.Component {
  static defaultProps = {}
  state = {
    explainTop: 0,
    explainLeft: 0,
    // 解释的内容
    explain: "",
    containerStyle: "",
  }

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(newVal) {
    utils.reSetPropsState(this, newVal)
  }

  componentDidMount() {
    utils.setPropsState(this)
  }

  render() {
    return renderView(this)
  }

  closeExplain() {
    this.setState({
      explainTop: 0,
    })
    if (this.props.onClose) this.props.onClose()
  }
}

