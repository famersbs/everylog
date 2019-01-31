import React from 'react'

const Header = (props) => (
  <div className="page-topbar">
    <div className="icon-bg">
      <img className="icon" src="/favicon.ico" alt='logo' />
    </div>
    <div className="title">
      Everylog
    </div>
    <div className="right-menu" >
      <div className="actions">
        {/**
        <button className="circle-btn" >
          <i className="fas fa-sync-alt" ></i>
        </button>
        */}
        <div className="avatar"
          style={{backgroundImage: `url("${props.photoURL}")`}}>
        </div>
      </div>
    </div>
  </div>
)

export default Header




