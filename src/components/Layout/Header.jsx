import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <span className={styles.icon}>🔥</span>
        ONEFOCUS
      </h1>
      <p className={styles.tagline}>
        One mission. One project. Total focus.
      </p>
    </header>
  )
}
