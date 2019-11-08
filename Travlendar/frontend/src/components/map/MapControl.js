/*
    Author: Namratha Olety Venkatesh
    Date: 11-06-2019
    Description: Map Control for Travlendar event view
    References: https://gist.github.com/jgimbel/6a36d60e28aaf453d0093ddc47f36533
*/
import { Component } from 'react'
import { createPortal } from 'react-dom'
import { MAP } from 'react-google-maps/lib/constants'
import PropTypes from 'prop-types'
export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  componentWillMount() {
    this.map = this.context[MAP]
    this.controlDiv = document.createElement('div')
    this.map.controls[this.props.position].push(this.controlDiv)
  }
  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex)
  }
  render() {
    return createPortal(this.props.children, this.controlDiv)
  }
}