import PropTypes from "prop-types"
import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, useLocation } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user)
  const isConnected = Object.keys(currentUser).length
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isConnected) {
          return <Component {...props} />
        }
        // @ts-ignore
        return (
          <Redirect to={{ pathname: "/login", state: { ...props.location } }} /> // eslint-disable-line react/prop-types
        )
      }}
    />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Object)
}
PrivateRoute.defaultProps = {
  component: {}
}

export default PrivateRoute
