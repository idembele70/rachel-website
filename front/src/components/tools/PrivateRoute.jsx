import PropTypes from "prop-types"
import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  // @ts-ignore
  const { currentUser } = useSelector((state) => state.user)
  const isConnected = Object.keys(currentUser).length
  return isConnected ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  )
}
PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Object)
}
PrivateRoute.defaultProps = {
  component: {}
}

export default PrivateRoute
