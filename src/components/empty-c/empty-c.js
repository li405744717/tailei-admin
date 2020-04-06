// components/empty-c/empty-c.js
import * as React from 'react';
import renderView from './view'
import PropTypes from "prop-types";
import utils from '@/common/utils'
import './view.scss'

export default class EmptyC extends React.Component {
  static propTypes = {
    // image: PropTypes.object,
    text: PropTypes.string,
    imageStyle: PropTypes.string,
    containerStyleClass: PropTypes.string
  }


  static defaultProps = {
    image: require('@/img/comb_none.png'),
    text: '暂无数据',
    imageStyle: '',
  }
  state = {}

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(newVal) {
  }

  componentDidMount() {
  }

  render() {
    return renderView(this)
  }

}