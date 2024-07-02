import React, { useState } from 'react';
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Paper,
  LinearProgress,
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

function Onboarding() {
  const [frameworks, setFrameworks] = useState({
    HIPAA: true,
    ISO27001: false,
    SOC2: false,
    GDPR: false,
  });

  const [uploads, setUploads] = useState({
    HIPAA: { uploading: false, uploadProgress: 0, uploadedFiles: [] },
    ISO27001: { uploading: false, uploadProgress: 0, uploadedFiles: [] },
    SOC2: { uploading: false, uploadProgress: 0, uploadedFiles: [] },
    GDPR: { uploading: false, uploadProgress: 0, uploadedFiles: [] },
  });

  const handleFrameworkChange = (event) => {
    const name = event.target.name;
    setFrameworks({
      ...frameworks,
      [name]: event.target.checked,
    });
  };

  const handleFileUpload = (event, framework) => {
    const files = Array.from(event.target.files);
    setUploads((prevUploads) => ({
      ...prevUploads,
      [framework]: { ...prevUploads[framework], uploading: true },
    }));

   
    files.forEach((file, index) => {
      setTimeout(() => {
        setUploads((prevUploads) => {
          const newProgress = ((index + 1) / files.length) * 100;
          const isUploading = index !== files.length - 1;
          return {
            ...prevUploads,
            [framework]: {
              uploading: isUploading,
              uploadProgress: newProgress,
              uploadedFiles: [...prevUploads[framework].uploadedFiles, file.name],
            },
          };
        });
      }, (index + 1) * 1000); 
    });
  };

  const handleDeleteFile = (framework, fileName) => {
    setUploads((prevUploads) => ({
      ...prevUploads,
      [framework]: {
        ...prevUploads[framework],
        uploadedFiles: prevUploads[framework].uploadedFiles.filter(file => file !== fileName),
      },
    }));
  };

  const renderUploadSection = (framework) => {
    const { uploading, uploadProgress, uploadedFiles } = uploads[framework];

    return (
      <Box component={Paper} sx={{ p: 4, mt: 4, borderRadius: 2, boxShadow: 3 }} key={framework}>
        <Typography variant="h6" gutterBottom>
          {framework} Framework
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px dashed #ccc',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ mb: 2 }}
              >
                Drag & drop files or Browse
                <input type="file" hidden multiple onChange={(event) => handleFileUpload(event, framework)} />
              </Button>
              {uploading && (
                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography variant="body2">Uploading {uploadProgress}%</Typography>
                  <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 1, mb: 1 }} />
                  <Typography variant="body2">your-file-name.PDF</Typography>
                </Box>
              )}
              <Button variant="contained">UPLOAD FILES</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 1,
                p: 2,
                height: '100%',
                overflowY: 'auto',
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Uploaded Files
              </Typography>
              <List>
                {uploadedFiles.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFile(framework, file)}>
                        <Delete />
                      </IconButton>
                    }
                    sx={{
                      mb: 1,
                      p: 1,
                      border: '1px solid #ccc',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText primary={file} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ pb: 4 }}>
      <Box component={Paper} sx={{ p: 0, borderRadius: 7, boxShadow: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            backgroundColor: '#1C509D',
            color: 'white',
            py: 2,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography variant="h6" >
            Fill the Company Details
          </Typography>
        </Box>
        <Box sx={{ p: 4 ,}}>
          <TextField fullWidth margin="normal" label="Company Name" />
          <TextField fullWidth margin="normal" label="Company Website" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Company Category</InputLabel>
            <Select>
              <MenuItem value=""><em>None</em></MenuItem>
              
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Company Size</InputLabel>
            <Select>
              <MenuItem value=""><em>None</em></MenuItem>
             
            </Select>
          </FormControl>
          <TextField fullWidth margin="normal" label="CEO Name" />
          <TextField fullWidth margin="normal" label="CEO Email" />
          <Typography variant="subtitle1" gutterBottom>
            Required Framework
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={frameworks.HIPAA} onChange={handleFrameworkChange} name="HIPAA" />}
            label="HIPAA"
          />
          <FormControlLabel
            control={<Checkbox checked={frameworks.ISO27001} onChange={handleFrameworkChange} name="ISO27001" />}
            label="ISO27001"
          />
          <FormControlLabel
            control={<Checkbox checked={frameworks.SOC2} onChange={handleFrameworkChange} name="SOC2" />}
            label="SOC2"
          />
          <FormControlLabel
            control={<Checkbox checked={frameworks.GDPR} onChange={handleFrameworkChange} name="GDPR" />}
            label="GDPR"
          />
        </Box>
      </Box>

      {Object.keys(frameworks).map((framework) => (
        frameworks[framework] && renderUploadSection(framework)
      ))}
    </Container>
  );
}

export default Onboarding;
