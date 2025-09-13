import styles from '../styles/ErrorState.module.scss'

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className={styles['error-state']}>
      <img src='/images/icons/icon-error.svg' alt='Error Icon' />
      <h2 className='text-preset-2'>Something went wrong</h2>
      <p className='text-preset-5-medium'>{message}</p>
      <button className='error-button' onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  )
}

export default ErrorState
