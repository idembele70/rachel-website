import React from 'react'
import PropTypes from 'prop-types'
const Main = ({children}) => {
  return (
    <div className="main">
      {children}
    </div>
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main