import React from 'react'
import styles from './UI.module.css'

export default function Button({ 
  children, 
  variant = 'default', 
  onClick, 
  className = '',
  ...props 
}) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
