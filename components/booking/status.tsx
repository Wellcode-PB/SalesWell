import * as React from "react"
import Button from "@mui/material/Button"
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

function BookingStatusDropdown(data) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [bookingStatusId, setBookingStatusId] = React.useState(data.children[1])
  
  const open = Boolean(anchorEl)
  const bookingId = data.children[0]
  const statuses = data.children[2]

  function openStatusMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
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
    setAnchorEl(null)
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
        <DescriptionOutlinedIcon/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {statuses && 
          statuses.map((status) => (
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