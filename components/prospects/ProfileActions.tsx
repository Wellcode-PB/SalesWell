import ConfirmModal from '../helper/ConfirmModal';
import { grey } from '@mui/material/colors';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';

function ProfileActions({ id, name, options }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleOptionClick(option) {
    setSelectedOption(option);
    setModalOpen(true);
    setAnchorEl(null);
  }

  function handleDialogClose() {
    setModalOpen(false);
  }

  function onConfirmModel() {
    selectedOption.action(id);
  }

  return (
    <>
      <IconButton
        id='profile-action'
        sx={{ backgroundColor: grey[200] }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="actions"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{ width: '17ch' }}
            id={option.label.toLowerCase() + '-button'}
            key={option.id}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </MenuItem>))}
      </Menu>
      <ConfirmModal
        open={modalOpen}
        onClose={handleDialogClose}
        message={`Are you sure you want to ${selectedOption ?
          selectedOption.label.toLowerCase() : ''} ${name}?`}
        confirmButtonName={`${selectedOption ?
          selectedOption.label : ''} prospect`}
        onConfirm={onConfirmModel}
        onCancel={handleDialogClose}
      />
    </>
  );
}

export default ProfileActions