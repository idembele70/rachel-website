import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, useHistory } from "react-router-dom"

const SignRoute = ({ component: Component, path, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user)
  const isDisconnected = Object.keys(currentUser).length === 0
  const history = useHistory()
  useEffect(
    () => () => {
      if (isDisconnected) history.go(0)
    },
    [history]
  )
  const pathHandler = () => history.location.state?.pathname || "/"
  return (
    <Route
      {...rest}
      render={(props) => {
        if ((path === "/register" || path === "/login") && isDisconnected) {
          return <Component {...props} />
        }
        return <Redirect to={{ pathname: pathHandler() }} />
      }}
    />
  )
}

SignRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  path: PropTypes.string.isRequired
}

export default SignRoute
