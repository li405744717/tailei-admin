/**
 * Created by dp-k on 2019/9/5.
 */
import * as React from 'react';
import App from "@/app";

export default class Page extends React.Component {
  constructor(props, state) {
    super(props, state);
    if (App.APP && props.match) {
      App.APP.setParams(props.match.path, props.match.params, props.location.search)
    }
  }

  UNSAFE_componentWillReceiveProps(newProps, newContext) {
    if (App.APP && newProps.match) {
      App.APP.setParams(newProps.match.path, newProps.match.params, newProps.location.search)
    }
  }
}