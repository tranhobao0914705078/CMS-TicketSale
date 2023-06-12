import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faCommentAlt, faHouse, faTicket} from '@fortawesome/free-solid-svg-icons';
import styles from './Dashboard.module.css'
import logo from '../image/logo.svg'
import icon from '../image/icon.svg'
import { Header } from '../DefaultLayout/Header';
import { Statistical } from './Statistical';

export const Dashboard = () => {
  const [activeItem, setActiveItem] = useState<string>('/');
  const [visible, setVisible] = useState(false);
  const [click, setClick] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if(path === '/'){
      setActiveItem('/')
    }else if(path === '/listTicket'){
      setActiveItem('ticket')
    }else if(path === '/check-ticket'){
      setActiveItem('check-ticket')
    }else if(path === '/pack-service'){
      setActiveItem('pack-service')
    }
  }, [location]) 

  const handleClickSetting = () => {
    setClick(click + 1);
    if(click === 0){
      setVisible(true);
    }else if(click === 1){
      setVisible(false);
      setClick(0);
    }
  }

  return (
    <Fragment>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <ul className={`navbar-nav sidebar sidebar-dark accordion`} id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
              <img width={100} src={logo} alt="logo" className={styles.logoPage}/>
            </Link>
            <hr className="sidebar-divider my-0"/>
            <li className={`nav-item ${activeItem === '/' ? styles.active : ''} ${styles.Category}`}>
              <Link className={`nav-link`} to="/" onClick={() => setActiveItem('dashboard')}>
                <FontAwesomeIcon icon={faHouse} className={styles.dashboardIcon}/>
                <span className={styles.title}>Trang chủ</span>
              </Link>
            </li>
            <li className={`nav-item ${activeItem === 'ticket' ? styles.active : ''} ${styles.Category}`}>
              <Link className={`nav-link`} to="/listTicket" onClick={() => setActiveItem('dashboard')}>
                <FontAwesomeIcon icon={faTicket} className={styles.dashboardIcon}/>
                <span className={styles.title}>Quản lý vé</span>
              </Link>
            </li>
            <li className={`nav-item ${activeItem === 'check-ticket' ? styles.active : ''} ${styles.Category}`}>
              <Link className="nav-link" to="/check-ticket">
              <FontAwesomeIcon icon={faCommentAlt} className={styles.dashboardIcon}/>
                <span className={styles.title}>Đối soát vé</span></Link>
            </li>
            <li className={`nav-item ${activeItem === 'pack-service' ? styles.active : ''} ${styles.Category}`}>
              <Link className="nav-link" to="#" onClick={handleClickSetting}>
              <FontAwesomeIcon icon={faGear} className={styles.dashboardIcon}/>
                <span className={styles.title}>Cài đặt</span></Link>
                {visible && <Link to="/pack-service" className={styles.packService}>Gói dịch vụ</Link>}
            </li>
            <div  className={styles.footer}>
              <p>Copyright</p>
              <img src={icon} alt="asd" />
              <p>Alta Software</p>
            </div>
          </ul>
          <div className={styles.content}>
              <Statistical />
          </div>
        </div>
        
      </div>
    </Fragment>
  )
}
