import React from 'react'
// import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './Header'
import Layout from './board_layout'

import {selectRow} from '../../modules/settings'

import './css.scss'

// Pinterest ui에 flexbox order를 이용하여 왼쪽에서 오른 쪽으로 순서 정렬 하기
// https://hackernoon.com/masonry-layout-technique-react-demo-of-100-css-control-of-the-view-e4190fa4296
class List extends React.Component {
  render() {
    return (
      <div className="main_bg">
        <Header
          photoURL={this.props.photoURL}
          selected_row={this.props.selected_row}
          onSelectRow={this.props.selectRow}
        />
        <div className="body">
          <Layout cards={this.props.card} selected_row={this.props.selected_row} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({settings, list, auth}) => ({
  card: list.card,
  photoURL: auth.photoURL,
  selected_row: settings.selected_row,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectRow,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
