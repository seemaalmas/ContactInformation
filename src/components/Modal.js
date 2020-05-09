import React from 'react'

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal modal-block' : 'modal modal-none'

  return (
    <div className={showHideClassName}>
      <div className='modal-container'>
        {children}
        <button className='modal-button' onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Modal
