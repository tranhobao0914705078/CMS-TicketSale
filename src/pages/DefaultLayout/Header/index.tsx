import React from 'react'
import styles from './header.module.css'
import iconSearch from '../icon/search.svg'
import iconLetter from '../icon/letter.svg'
import iconNotify from '../icon/notify.svg'
import avatar from '../icon/avatar.svg'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.Search}>
        <input type="text" placeholder='Search'/>
        <button className={styles.search_btn}>
          <img src={iconSearch} alt="" />
        </button>
      </div>
      <div className={styles.actions}>
        <img src={iconLetter} alt="" className={styles.letter}/>
        <img src={iconNotify} alt="" className={styles.notify}/>
        <img src={avatar} alt="" className={styles.avatar}/>
      </div>
    </div>
  )
}
