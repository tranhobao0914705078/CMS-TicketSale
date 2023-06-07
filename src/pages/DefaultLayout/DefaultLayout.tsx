import React from 'react'
import { Header } from './Header'
import { Dashboard } from '../Dashboard/Dashboard'
import styles from './DefaultLayout.module.css'
import { SlideBar } from './SlideBar/SlideBar';

interface Props {
    children: React.ReactNode;
}
export const DefaultLayout = ({ children }: Props) => {
    return (
        <div className={styles.wrapper}>
            <Header />
          <div className={styles.container}>
              <SlideBar />
              <div className={styles.content}>
                  {children}
              </div>
          </div>
        </div>
    )
}
