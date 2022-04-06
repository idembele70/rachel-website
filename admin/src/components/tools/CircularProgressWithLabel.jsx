import { Box, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
const CircularProgressWithLabel = (props) => (
  <Box position="relative" display="inline-flex">
    <CircularProgress variant="determinate" {...props} />
    <Box top={0} left={0} bottom={0} right={0}
      position="absolute" display="flex" alignItems="center" justifyContent="center"
    >
      <Typography variant="caption" component="div" color="textSecondary">
        {props.value}
      </Typography>
    </Box>
  </Box>
)

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired
}

export default CircularProgressWithLabel