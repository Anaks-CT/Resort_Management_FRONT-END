import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from './Button';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'black',
  border: '',
  boxShadow: 24,
  p: 5,
};

type props = {
    buttonMessage: string
    modalForm: () => JSX.Element
    openModal: () => void
    closeModal: ()=> void
    open: boolean
}

export default function TransitionsModal({buttonMessage, modalForm, openModal, closeModal, open}: props) {
  const handleOpen = () => {openModal()};
  // const handleClose = () => {closeModal()};

  return (
    <div>
      <Button onClick={handleOpen} rounded color='black' class='px-5 py-3 mb-10'>{buttonMessage}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          {modalForm()}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}