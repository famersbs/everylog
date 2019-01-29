import React from 'react'

const Header = () => (
    <div className="page-topbar">
        <div className="icon-bg">
            <img className="icon" src="/favicon.ico" alt='logo'>
            </img>
        </div>
        <div className="title">
        Everylog
        </div>
        <div className="right-menu" >
            <div className="actions">
            <button className="circle-btn" > {/** refresh button*/}
                <i className="fas fa-sync-alt" ></i>
            </button>
            <div className="avatar"
                style={{backgroundImage: `url("https://s3.amazonaws.com/profile_photos/134145908735242.ceGXQ1D4PCHnigAagqYS_27x27.png")`}}>
            </div>
            </div>
        </div>
    </div>
  )

  export default Header
