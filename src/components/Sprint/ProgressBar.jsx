import React from 'react'
import styles from './Sprint.module.css'

export default function ProgressBar({ percentage }) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={styles.progressText}>{percentage}%</span>
    </div>
  )
}
