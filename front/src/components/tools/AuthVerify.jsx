import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import { logout } from "redux/apiCalls"
import PropTypes from "prop-types"

const AuthVerify = ({ history }) => {
  // @ts-ignore
  const {
    currentUser: { accessToken, exp }
  } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  history.listen(() => {
    if (accessToken && exp * 1000 < Date.now()) {
      logout(dispatch)
    }
  })
  return <></>
}

AuthVerify.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired
  }).isRequired
}

// @ts-ignore
export default withRouter(AuthVerify)
