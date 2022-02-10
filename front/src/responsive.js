import { css } from "styled-components"
import PropTypes from "prop-types"

export const mobile = (props) => css`
  @media only screen and (max-width: 640px) {
    ${props}
  }
`
mobile.propTypes = {
  props: PropTypes.instanceOf(Object).isRequired
}
export const tablet = (props) => css`
  @media only screen and (max-width: 1024px) {
    ${props}
  }
`
tablet.propTypes = {
  props: PropTypes.instanceOf(Object).isRequired
}

export const smallMobile = (props) => css`
@media only screen and (max-width: 360px) {
  ${props}
}
`
smallMobile.propTypes = {
  props: PropTypes.instanceOf(Object).isRequired
}
