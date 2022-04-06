import React from 'react'
import PropTypes from 'prop-types'
const AppContainer = ({children}) => {
  return (
    <div className="appContainer">
      {children}
    </div>
  )
}

AppContainer.propTypes = {
  children: PropTypes.node
}

export default AppContainer