import React from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const AddRegulatoryrisk = () => {
  return (
    <div>
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Typography variant="h4" align="left" mb={2}>
          Regulatory Risk
        </Typography>
        <Box
          component={Paper}
          sx={{ p: 0, borderRadius: 7, boxShadow: 3, overflow: "hidden" }}
        >
          <Box
            sx={{
              backgroundColor: "#1C509D",
              color: "white",
              py: 2,
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">
              Fill the Regulatory Risk Details
            </Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <TextField fullWidth margin="normal" label="Name" />
          </Box>
        </Box>
      </Container>
      <Box
      sx={{
        display: "flex",
        ml:70,
        mt: 0,
        '& > *': {
          mr: 1, 
        },
      }}
    >
      <Button variant="contained" color="primary">
        Save
      </Button>
      <Button variant="contained" color="primary">
        Save and Add Another
      </Button>
      <Button variant="contained" color="primary">
        Save and Continue Editing
      </Button>
      <Button variant="outlined" color="secondary">
        Cancel
      </Button>
    </Box>
    </div>
  );
};

export default AddRegulatoryrisk;
