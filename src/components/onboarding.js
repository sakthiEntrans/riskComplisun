import React, { useState } from "react";
import {
  Container,
  TextField,
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
  Card,
  CardContent,
  CardHeader,
  Collapse,
} from "@mui/material";
import {
  CloudUpload,
  Delete,
  InsertDriveFile,
  ExpandMore,
  ExpandLess,
  Visibility,
  Add,
} from "@mui/icons-material";

function Onboarding() {
  const initialSectionsState = {
    basicInfo: { expanded: false },
    contactDetails: { expanded: false },
    companyIdentification: { expanded: false },
    ownershipInformation: {
      expanded: false,
      owners: [{ name: "", percentage: "" }],
    },
    relatedCompanies: { expanded: false },
    legalProceedings: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    financialStatements: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    insuranceDetails: { expanded: false },
    insuranceCertificates: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    organizationalChart: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    corporateDocuments: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    compliancePolicies: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    auditReports: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    soc2Report: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    trainingPrograms: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    executiveBios: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    complianceCertifications: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    riskManagementPlans: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    incidentResponsePlans: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
  };

  const [sections, setSections] = useState(initialSectionsState);

  const handleFileUpload = (event, section) => {
    const files = Array.from(event.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));

    setSections((prevSections) => ({
      ...prevSections,
      [section]: {
        ...prevSections[section],
        uploading: true,
        uploadProgress: 0,
      },
    }));

    fileURLs.forEach((fileURL, index) => {
      setTimeout(() => {
        setSections((prevSections) => {
          const newProgress = ((index + 1) / files.length) * 100;
          const isUploading = index !== files.length - 1;
          return {
            ...prevSections,
            [section]: {
              ...prevSections[section],
              uploading: isUploading,
              uploadProgress: newProgress,
              uploadedFiles: [
                ...prevSections[section].uploadedFiles,
                { name: files[index].name, url: fileURL },
              ],
            },
          };
        });
      }, (index + 1) * 1000);
    });
  };

  const handleDeleteFile = (section, fileName) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: {
        ...prevSections[section],
        uploadedFiles: prevSections[section].uploadedFiles.filter(
          (file) => file.name !== fileName
        ),
      },
    }));
  };

  const handleViewFile = (url) => {
    window.open(url, "_blank");
  };

  const toggleSection = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: {
        ...prevSections[section],
        expanded: !prevSections[section].expanded,
      },
    }));
  };

  const handleAddOwner = () => {
    setSections((prevSections) => ({
      ...prevSections,
      ownershipInformation: {
        ...prevSections.ownershipInformation,
        owners: [
          ...prevSections.ownershipInformation.owners,
          { name: "", percentage: "" },
        ],
      },
    }));
  };
  const handleRemoveOwner = () => {
    setSections((prevSections) => ({
      ...prevSections,
      ownershipInformation: {
        ...prevSections.ownershipInformation,
        owners: [...prevSections.ownershipInformation.owners.slice(0, -1)],
      },
    }));
  };

  const handleOwnerChange = (index, field, value) => {
    setSections((prevSections) => {
      const updatedOwners = prevSections.ownershipInformation.owners.map(
        (owner, i) => (i === index ? { ...owner, [field]: value } : owner)
      );
      return {
        ...prevSections,
        ownershipInformation: {
          ...prevSections.ownershipInformation,
          owners: updatedOwners,
        },
      };
    });
  };

  const renderUploadSection = (section, label) => {
    const { uploading, uploadProgress, uploadedFiles, expanded } =
      sections[section];

    return (
      <Card sx={{ mt: 2 }} key={section}>
        <CardHeader
          title={label}
          onClick={() => toggleSection(section)}
          action={
            <IconButton onClick={() => toggleSection(section)}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "2px dashed #1C509D",
                    borderRadius: 2,
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    justifyContent: "center",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <CloudUpload sx={{ fontSize: 48, color: "#1C509D", mb: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    Drag & drop files here or click to browse
                  </Typography>
                  <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    {uploading ? "Uploading..." : "Select Files"}
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={(event) => handleFileUpload(event, section)}
                    />
                  </Button>
                  {uploading && (
                    <Box sx={{ width: "100%", mt: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                      />
                      <Typography
                        variant="body2"
                        sx={{ mt: 1 }}
                      >{`${uploadProgress.toFixed(2)}% Uploaded`}</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    p: 2,
                    height: "100%",
                    overflowY: "auto",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Uploaded Files
                  </Typography>
                  {uploadedFiles.length > 0 ? (
                    <List>
                      {uploadedFiles.map((file, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            mb: 1,
                            p: 1,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            backgroundColor: "#fff",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flex: 1,
                              mr: 2,
                            }}
                          >
                            <InsertDriveFile sx={{ mr: 2, color: "#1C509D" }} />
                            <ListItemText primary={file.name} />
                          </Box>
                          <Box>
                            <IconButton
                              edge="end"
                              aria-label="view"
                              onClick={() => handleViewFile(file.url)}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() =>
                                handleDeleteFile(section, file.name)
                              }
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2">
                      No files uploaded yet.
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  const renderSection = (section, label, content) => {
    const { expanded } = sections[section];

    return (
      <Card sx={{ mt: 2 }} key={section}>
        <CardHeader
          title={label}
          onClick={() => toggleSection(section)}
          action={
            <IconButton onClick={() => toggleSection(section)}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{content}</CardContent>
        </Collapse>
      </Card>
    );
  };

  return (
    <Container maxWidth="md" sx={{ pb: 4 }}>
      <Box
        component={Paper}
        sx={{ p: 0, borderRadius: 7, boxShadow: 3, overflow: "hidden" }}
      >
        <Box
          sx={{
            backgroundColor: "#6abfad",
            color: "white",
            py: 2,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6">Third-Party Onboarding Form</Typography>
        </Box>
        <Box sx={{ p: 4 }}>
          {renderSection(
            "basicInfo",
            "1. Basic Information",
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Legal Name of the Company"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Place of Incorporation"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Headquarters Address"
                required
              />
            </>
          )}

          {renderSection(
            "contactDetails",
            "2. Contact Details",
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Key Contact Person - Name"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Key Contact Person - Title"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Key Contact Person - Email"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Key Contact Person - Phone Number"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="General Email"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="General Phone Number"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Website URL"
                required
              />
            </>
          )}

          {renderSection(
            "companyIdentification",
            "3. Company Identification",
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Employer Identification Number (EIN)"
                required
              />
            </>
          )}

          {renderSection(
            "ownershipInformation",
            "4. Ownership Information",
            <>
              {sections.ownershipInformation.owners.map((owner, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6">
                    Owner {index + 1}{" "}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveOwner()}
                    >
                      <Delete style={{ color: "red" }} />
                    </IconButton>
                  </Typography>

                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    value={owner.name}
                    onChange={(e) =>
                      handleOwnerChange(index, "name", e.target.value)
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Ownership Percentage"
                    value={owner.percentage}
                    onChange={(e) =>
                      handleOwnerChange(index, "percentage", e.target.value)
                    }
                    required
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddOwner}
              >
                Add Owner
              </Button>
            </>
          )}

          {renderSection(
            "relatedCompanies",
            "5. Related Companies",
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Company Name"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Relationship Description"
                required
              />
            </>
          )}

          {renderSection(
            "legalProceedings",
            "6. Legal Proceedings/Consent Orders",
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Description of Proceedings/Orders"
                required
              />
              <TextField fullWidth margin="normal" label="Status" required />
              <TextField
                fullWidth
                margin="normal"
                label="Relevant Dates"
                required
              />
              {renderUploadSection(
                "legalProceedings",
                "Upload Supporting Documents"
              )}
            </>
          )}

          {renderSection(
            "financialStatements",
            "7. Financial Information",
            <>
              {renderUploadSection(
                "financialStatements",
                "Recent Financial Statements"
              )}
              {renderSection(
                "insuranceDetails",
                "Insurance Details",
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Types of Insurance"
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Coverage Amounts"
                    required
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Expiry Dates"
                    required
                  />
                </>
              )}

              {renderUploadSection(
                "insuranceCertificates",
                "Insurance Certificates"
              )}
            </>
          )}

          {renderSection(
            "organizationalChart",
            "8. Corporate Formalities",
            <>
              {renderUploadSection(
                "organizationalChart",
                "Organizational Chart"
              )}
              {renderUploadSection("corporateDocuments", "Corporate Documents")}
            </>
          )}

          {renderSection(
            "compliancePolicies",
            "9. Compliance Management System Components",
            <>
              {renderUploadSection(
                "compliancePolicies",
                "Compliance Policies and Procedures"
              )}
              {renderUploadSection("auditReports", "Latest Audit Reports")}
              {renderUploadSection("soc2Report", "SOC 2 Report")}
              {renderUploadSection(
                "trainingPrograms",
                "Training Program Descriptions and Records"
              )}
            </>
          )}

          {renderSection(
            "executiveBios",
            "10. Executive Information",
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Executive Bios - Name"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Executive Bios - Title"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Executive Bios - Bio Summary"
                required
              />
              {renderUploadSection("executiveBios", "Detailed Executive Bios")}
            </>
          )}

          {renderSection(
            "complianceCertifications",
            "11. Additional Relevant Information",
            <>
              {renderUploadSection(
                "complianceCertifications",
                "Relevant Certifications"
              )}
              {renderUploadSection(
                "riskManagementPlans",
                "Risk Management Documentation"
              )}
              {renderUploadSection(
                "incidentResponsePlans",
                "Incident Response Plans"
              )}
            </>
          )}
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            marginRight: "15px",
          }}
        >
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Save & Progress
          </Button>
          <Button variant="contained" color="success">
            Submit
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default Onboarding;
