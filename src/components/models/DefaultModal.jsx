import React, { memo } from "react";

import { Box, Modal, Button, Typography, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./modals.style";
import Fade from "@mui/material/Fade";
const DefaultModal = ({
  open,
  setOpen,
  children,
  modalHeaderTitle,
  customStyles,
}) => {
  return (
    <Modal
      sx={{
        ...styles.modalContainer,
        ...customStyles,
      }}
      open={open}
      BackdropProps={{
        timeout: 300,
      }}
      closeAfterTransition
      onClose={() => setOpen(false)}
      aria-labelledby={`${modalHeaderTitle} modal`}
      aria-describedby={`${modalHeaderTitle} modals`}
    >
      <Fade in={open}>
        <Box sx={{ ...styles.modalBox }}>
          <Box>
            {/* modal header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: "0rem 1rem",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {modalHeaderTitle}
              </Typography>
              <Button
                onClick={() => setOpen(false)}
                variant="text"
                sx={{
                  p: 0,
                  width: 40,
                  minWidth: 0,
                  height: 40,
                  borderRadius: "50%",
                }}
              >
                <CloseIcon sx={{ p: 0, width: 25, height: 25 }} />
              </Button>
            </Box>

            {children}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DefaultModal;
