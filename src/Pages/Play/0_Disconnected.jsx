/**
 * src/Pages/Disconnected.jsx
 */


import React, { useState, useEffect } from 'react'


const DELAY = 1000


export const Disconnected = ({ error }) => {
  const [ showReason, setShowReason ] = useState(false)
  

  useEffect(() => {
    setTimeout(
      () => setShowReason(true),
      DELAY
    )
  }, [])


  const reloadPage = () => {
    location.reload()
  }


  return (
    <div id="disconnected">
      <h1>No Connection</h1>
      { showReason && (<>
        { error && <p>{error}</p>}
          <button
            onClick={reloadPage}
          >
            Try Again
          </button>
        </>
      )}
    </div>
  )
}