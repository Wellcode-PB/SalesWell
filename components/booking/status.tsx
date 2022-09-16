import * as React from 'react'
import Button from '@mui/material/Button'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useState } from 'react'

function BookingStatusDropdown({bookingId, bookingStatus, statusesTypes}) {
  const [listMenu, setListMenu] = useState(null)
  const [bookingStatusId, setBookingStatusId] = useState(bookingStatus)
  const open = Boolean(listMenu)

  function openStatusMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setListMenu(event.currentTarget)
  }

  function handleClose(statusId) {
    if (typeof statusId === 'string') {
      const bookingDetails = {
        bookingId: bookingId,
        bookingStatus: statusId
      }
      setBookingStatusId(statusId)
      fetch('/api/booking/set_status_id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      })
    }
    setListMenu(null)
  }

  return (
    <>
      <Button
        sx={{
          whiteSpace: "normal",
          wordBreak: "break-all",
          textTransform: 'none'
        }}
        id={"status-" + bookingId}
        color="inherit"
        onClick={openStatusMenu}
      >
        STATUS: {bookingStatusId ? bookingStatusId : "No status"}
        <DescriptionOutlinedIcon />
      </Button>
      <Menu
        anchorEl={listMenu}
        open={open}
        onClose={handleClose}
      >
        {statusesTypes &&
          statusesTypes.map((status) => (
            <MenuItem
              id={status.id}
              key={status.id}
              sx={{whiteSpace: "normal", wordBreak: "break-all"}} 
              onClick={() => handleClose(status.id)}>
                {status.id}
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}

export default BookingStatusDropdown