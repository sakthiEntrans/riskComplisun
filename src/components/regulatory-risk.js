import React from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material";
import { Search, FilterList, Add } from "@mui/icons-material";
import { Link } from "react-router-dom"; 

const createData = (
  sno,
  name
) => {
  return { sno, name };
};

const rows = [
  createData(
    1,
    "Segregation of Duties",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    2,
    "Physical Controls",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    3,
    "Reconciliations",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    4,
    "Policies and Procedures",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    5,
    "Transaction and Activity Reviews",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    6,
    "Information Processing Controls",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    7,
    "Segregation of Duties",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    8,
    "Transaction and Activity Reviews",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    9,
    "Policies and Procedures",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
  createData(
    10,
    "Policies and Procedures - II",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet...",
    "Lorem ipsum dolor sit amet..."
  ),
];

const RegulatoryRisk = () => {
  return (
    <Box bgcolor="#f5f5f5" py={2}>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          border={1}
          borderColor="grey.300"
          borderRadius={4}
          p={2}
          bgcolor="white"
          mt={-2} 
        >
          <Typography variant="h4" align="left" mb={4}>
          Regulatory Risk
          </Typography>

          <TableContainer component={Paper}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              bgcolor="#f5f5f5"
              borderBottom={1}
              borderColor="grey.300"
              borderTopLeftRadius={4}
              borderTopRightRadius={4}
            >
              <Box display="flex" alignItems="center" flexGrow={1} mr={2}>
                <IconButton
                  size="medium"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid lightgrey",
                    borderRadius: "4px",
                    marginLeft: "10px",
                  }}
                >
                  <FilterList />
                </IconButton>
                <Box
                  display="flex"
                  alignItems="center"
                  border={1}
                  borderColor="grey.400"
                  borderRadius={1}
                  p={0.5}
                  bgcolor="white"
                  ml={2} 
                >
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                      sx: {
                        height: "34.5px", 
                        padding: 0,
                        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      },
                    }}
                    sx={{
                      height: "34.5px", 
                      "& .MuiOutlinedInput-root": {
                        paddingRight: 10,
                        paddingLeft: 0,
                        border: "none",
                        height: "36.5px",
                        marginLeft: "10px",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "8.5px 14px",
                      },
                    }}
                  />
                </Box>
              </Box>
             
              <Button
                style={{ marginRight: "50px" }}
                variant="contained"
                color="primary"
                startIcon={<Add />}
                component={Link}
                to="/add-regulatoryRisk" 
              >
                Add Regulatory Risk
              </Button>
            </Box>
            <Table>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>S.NO</TableCell>
                  <TableCell>NAME</TableCell>
              
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.sno}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>{row.sno}</TableCell>
                    <TableCell>{row.name}</TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default RegulatoryRisk;
