import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory, Redirect, Route } from "react-router-dom"

const SignRoute = ({ component: Component, path, ...rest }) => {
  const { currentUser } = useSelector((state) => state.user)
  const isDisconnected = Object.keys(currentUser).length === 0
  const history = useHistory()
  useEffect(
    () => () => {
      history.go(0)
    },
    [history]
  )

  const pathHandler = () =>
    history.location.state?.redirectTo === "cart" ? "/cart" : "/"
  return (
    <Route
      {...rest}
      render={(props) =>
        (path === "/register" || path === "/login") && isDisconnected ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: pathHandler() }} />
        )
      }
    />
  )
}

SignRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  path: PropTypes.string.isRequired
}

export default SignRoute
