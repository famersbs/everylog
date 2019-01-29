import React from 'react'
// import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './Header'
import Row from './Row'

import './css.scss'

// Pinterest ui에 flexbox order를 이용하여 왼쪽에서 오른 쪽으로 순서 정렬 하기
// https://hackernoon.com/masonry-layout-technique-react-demo-of-100-css-control-of-the-view-e4190fa4296
class List extends React.Component {

  renderRows(){
    return this.props.rows.map((r, k) => (
      <Row key={k} id={r.id} title={r.title} cards={r.cards} type={r.type} />
    ))
  }

  render() {
    return (
      <div className="main_bg">
        <Header />
        <div className="body">
          <div className="board">
            {this.renderRows()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({list}) => ({
  rows: list.rows
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
