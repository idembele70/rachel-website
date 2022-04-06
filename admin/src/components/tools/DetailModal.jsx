import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core'

const DetailModal = props => {
  const { onSubmitSize } = props
  const handleSubmitSize = (e) => {
    e.preventDefault()
    onSubmitSize(e)
  }
  const [color, setColor] = useState({
    name: "",
    details:
    {
      size: "",
      quantity: 0,
    }
  });
  const handleColor = useCallback((e) => {
    if (e.target.name === "quantity")
      setColor(
        c => ({ ...c, details: { ...c.details, [e.target.name]: parseInt(e.target.value) } })
      )
    else
      setColor(
        c => ({ ...c, details: { ...c.details, [e.target.name]: e.target.value } })
      )
  }, [])
  return (
    <Box className="addColorModalBox">
      <Typography id="add-color-detail-title" component="h5">
        Ajout de details
      </Typography>
      <Box component="form" onSubmit={handleSubmitSize}>
        <Grid container spacing={1} alignItems="center" direction="column" justify="center">
          <Grid item>
            <FormControl variant="standard">
              <InputLabel >Size</InputLabel>
              <Input required className="modal-input" name="size" type="text" value={color.size} onChange={handleColor} />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="standard">
              <InputLabel>Quantity</InputLabel>
              <Input required className="modal-input" name="quantity" type="number" value={color.quantity} onChange={handleColor} />
            </FormControl>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

DetailModal.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default DetailModal