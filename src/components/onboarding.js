import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  Modal,
  Tooltip,
} from "@mui/material";
import {
  CloudUpload,
  Delete,
  InsertDriveFile,
  ExpandMore,
  ExpandLess,
  Visibility,
  Add,
  Info,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

function Onboarding() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm();
  const initialSectionsState = {
    basicInfo: { expanded: false },
    contactDetails: { expanded: false },
    companyIdentification: { expanded: false },
    ownershipInformation: {
      expanded: false,
      owners: [{ id: uuidv4(), name: "", percentage: "" }],
    },
    relatedCompanies: { expanded: false },
    legalProceedings: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    legalProceedings1: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    Chart: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    Relevant: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    CompliancePolicies: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    SupportingDocuments: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    DetailedExecutive: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    AuditedFinancial: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    MaterialLegal: {
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
    collapse: {
      uploading: false,
      uploadProgress: 0,
      uploadedFiles: [],
      expanded: false,
    },
    collapsive: {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
          { id: uuidv4(), name: "", percentage: "" },
        ],
      },
    }));
  };

  const handleRemoveOwner = (idToRemove) => {
    setSections((prevSections) => ({
      ...prevSections,
      ownershipInformation: {
        ...prevSections.ownershipInformation,
        owners: prevSections.ownershipInformation.owners.filter(
          (owner) => owner.id !== idToRemove
        ),
      },
    }));
  };

  const handleOwnerChange = (id, field, value) => {
    setSections((prevSections) => {
      const updatedOwners = prevSections.ownershipInformation.owners.map(
        (owner) => (owner.id === id ? { ...owner, [field]: value } : owner)
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

  const handleModalOpen = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, section) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFileUpload({ target: { files } }, section);
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
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevents CardHeader click from triggering
                toggleSection(section);
              }}
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={6}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, section)}
              >
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
                            <ListItemText
                              primary={file.name}
                              sx={{
                                wordBreak: "break-all",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                              }}
                            />
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
          onClick={() => toggleSection(section)} // CardHeader click handler
          action={
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent CardHeader onClick from being triggered
                toggleSection(section);
              }}
            >
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

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (!isValid) {
      const errorFields = Object.keys(errors);

      const updatedSections = { ...sections };

      if (
        errorFields.some((field) =>
          ["legalName", "placeOfIncorporation", "headquartersAddress"].includes(
            field
          )
        )
      ) {
        updatedSections.basicInfo.expanded = true;
      }
      if (
        errorFields.some((field) =>
          [
            "keyContactName",
            "keyContactTitle",
            "keyContactEmail",
            "keyContactPhone",
            "secondaryEmail",
            "secondaryPhoneNumber",
            "websiteUrl",
          ].includes(field)
        )
      ) {
        updatedSections.contactDetails.expanded = true;
      }
      if (errorFields.includes("ein")) {
        updatedSections.companyIdentification.expanded = true;
      }
      if (
        errorFields.includes("relatedCompanyName") ||
        errorFields.includes("relationshipDescription")
      ) {
        updatedSections.relatedCompanies.expanded = true;
      }

      setSections(updatedSections);
    } else {
      console.log("Form submitted with:", data);
    }
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
          <Typography variant="h6">Onboarding Form</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ p: 4 }}>
            {renderSection(
              "basicInfo",
              "1. Basic Information",
              <>
                <Controller
                  name="legalName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Legal Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Legal Name of the Company"
                      error={!!errors.legalName}
                      helperText={errors.legalName?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="placeOfIncorporation"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Place of Incorporation is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Place of Incorporation"
                      error={!!errors.placeOfIncorporation}
                      helperText={errors.placeOfIncorporation?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="headquartersAddress"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Headquarters Address is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Headquarters Address"
                      error={!!errors.headquartersAddress}
                      helperText={errors.headquartersAddress?.message}
                      required
                    />
                  )}
                />
              </>
            )}

            {renderSection(
              "contactDetails",
              "2. Contact Details",
              <>
                <Controller
                  name="keyContactName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Key Contact Person's Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Key Contact Person - Name"
                      error={!!errors.keyContactName}
                      helperText={errors.keyContactName?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="keyContactTitle"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Key Contact Person's Title is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Key Contact Person - Title"
                      error={!!errors.keyContactTitle}
                      helperText={errors.keyContactTitle?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="keyContactEmail"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Key Contact Person's Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Key Contact Person - Email"
                      error={!!errors.keyContactEmail}
                      helperText={errors.keyContactEmail?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="keyContactPhone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Key Contact Person's Phone Number is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      type="tel"
                      label="Key Contact Person - Phone Number"
                      error={!!errors.keyContactPhone}
                      helperText={errors.keyContactPhone?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="secondaryEmail"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Secondary Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Secondary Email"
                      error={!!errors.secondaryEmail}
                      helperText={errors.secondaryEmail?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="secondaryPhoneNumber"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Secondary Phone Number is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      type="tel"
                      label="Secondary Phone Number"
                      error={!!errors.secondaryPhoneNumber}
                      helperText={errors.secondaryPhoneNumber?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="websiteUrl"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Website URL is required",
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                      message: "Invalid URL",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Website URL"
                      error={!!errors.websiteUrl}
                      helperText={errors.websiteUrl?.message}
                      required
                    />
                  )}
                />
              </>
            )}

            {renderSection(
              "companyIdentification",
              "3. Company Identification",
              <>
                <Controller
                  name="ein"
                  control={control}
                  defaultValue=""
                  rules={{
                    required:
                      "Employer Identification Number (EIN) is required",
                    pattern: {
                      value: /^[0-9]{9}$/,
                      message: "EIN must be a 9-digit number",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Employer Identification Number (EIN)"
                      error={!!errors.ein}
                      helperText={errors.ein?.message}
                      required
                    />
                  )}
                />
              </>
            )}

            {renderSection(
              "ownershipInformation",
              "4. Ownership Information",
              <>
                {sections.ownershipInformation.owners.map((owner, index) => (
                  <Box key={owner.id} sx={{ mb: 2 }}>
                    <Typography variant="h6">
                      Owner {index + 1}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveOwner(owner.id)}
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
                        handleOwnerChange(owner.id, "name", e.target.value)
                      }
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Ownership Percentage"
                      value={owner.percentage}
                      onChange={(e) =>
                        handleOwnerChange(
                          owner.id,
                          "percentage",
                          e.target.value
                        )
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
                <Controller
                  name="relatedCompanyName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Related Company Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Company Name"
                      error={!!errors.relatedCompanyName}
                      helperText={errors.relatedCompanyName?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="relationshipDescription"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Relationship Description is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Relationship Description"
                      error={!!errors.relationshipDescription}
                      helperText={errors.relationshipDescription?.message}
                      required
                    />
                  )}
                />
              </>
            )}

            {renderSection(
              "legalProceedings",
              <>
                6.Material Legal or Regulatory Proceedings/Consent Orders{" "}
<Tooltip title="Regulatory or litigation matters that could significantly impact the day-to-day operations of your company, such as a fine exceeding 10% of your revenue. This also includes any legal issues that, if unfavorable, would cause a partner institution to have considerable concern about your ability to perform under a contract." arrow>
                <IconButton
                  aria-label="info"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalOpen(
                      "Regulatory or litigation matters that could significantly impact the day-to-day operations of your company, such as a fine exceeding 10% of your revenue. This also includes any legal issues that, if unfavorable, would cause a partner institution to have considerable concern about your ability to perform under a contract."
                    );
                  }}
                >
                  <Info color="primary" />
                </IconButton></Tooltip>
              </>,
              <>
                {renderSection(
                  "collapsive",
                  "A. Legal proceedings/Consent orders",
                  <>
                    <Controller
                      name="legalProceedingDescription"
                      control={control}
                      defaultValue=""
                      rules={{
                        required:
                          "Description of Proceedings/Orders is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          label="Description of Proceedings/Orders"
                          error={!!errors.legalProceedingDescription}
                          helperText={
                            errors.legalProceedingDescription?.message
                          }
                          required
                        />
                      )}
                    />
                    <Controller
                      name="legalProceedingStatus"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Status is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          label="Status"
                          error={!!errors.legalProceedingStatus}
                          helperText={errors.legalProceedingStatus?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="legalProceedingDate"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Relevant Date is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          label="Relevant Dates"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!errors.legalProceedingDate}
                          helperText={errors.legalProceedingDate?.message}
                          required
                        />
                      )}
                    />

                    {renderUploadSection(
                      "SupportingDocuments",
                      "Upload Supporting Documents"
                    )}
                  </>
                )}
              </>
            )}

            {renderSection(
              "financialStatements",
              "7. Financial Information",

              <>
                {renderUploadSection(
                  "AuditedFinancial",
                  <>
                    A. Audited Financial Statement
                    <Tooltip title= "If an audited financial statement is not available, please provide management certified financial statements along with an explanation of why audited financials were not available." arrow>
                    <IconButton
                      aria-label="info"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModalOpen(
                          "If an audited financial statement is not available, please provide management certified financial statements along with an explanation of why audited financials were not available."
                        );
                      }}
                    >
                      <Info color="primary" />
                    </IconButton></Tooltip>
                  </>
                )}

                {renderSection(
                  "insuranceDetails",
                  "B.Insurance Details",
                  <>
                    <Controller
                      name="insuranceTypes"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Types of Insurance is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          label="Types of Insurance"
                          error={!!errors.insuranceTypes}
                          helperText={errors.insuranceTypes?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="coverageAmounts"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Coverage Amounts are required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          label="Coverage Amounts"
                          type="number"
                          inputProps={{ min: 0 }}
                          error={!!errors.coverageAmounts}
                          helperText={errors.coverageAmounts?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="expiryDates"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Expiry Date is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          margin="normal"
                          label="Expiry Dates"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          error={!!errors.expiryDates}
                          helperText={errors.expiryDates?.message}
                          required
                        />
                      )}
                    />
                  </>
                )}
                {renderUploadSection(
                  "insuranceCertificates",
                  "C. Insurance Certificates"
                )}
              </>
            )}

            {renderSection(
              "organizationalChart",
              <>
                8. Corporate Formalities
                <Tooltip title="Corporate formalities should include organizational documents (e.g., Operating Agreements for LLCs, Bylaws for corporations), a certificate of good standing, and a corporate resolution or similar document confirming signing authority."arrow>
                <IconButton
                  aria-label="info"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalOpen(
                      "Corporate formalities should include organizational documents (e.g., Operating Agreements for LLCs, Bylaws for corporations), a certificate of good standing, and a corporate resolution or similar document confirming signing authority."
                    );
                  }}
                >
                  <Info color="primary" />
                </IconButton></Tooltip>
              </>,
              <>
                {renderUploadSection("Chart", "A. Upload Organizational Chart")}
                {renderUploadSection(
                  "corporateDocuments",
                  "B. Upload Corporate Documents"
                )}
              </>
            )}

            {renderSection(
              "compliancePolicies",
              <>
                9. Compliance Management System Components
                <Tooltip title="Please upload all relevant Policies, procedures, and guidelines related to your current Compliance Management System (“CMS”). Your CMS should include, as applicable, a/an AI Governance Policy, BSA/AML/OFAC Policy, Complaint Management Policy, Credit Policy, Disaster Recovery Plan, Fair Credit Reporting Policy, Fair Lending Policy, Information Security Policy, Loan Servicing Policy, Record Retention Policy or Schedule, Reg. E & E-Sign Policy, Risk Management Policy, Privacy Policy, Reg. Z Policy, Regulatory Compliance Policy, Third-Party Risk Management Policy, and UDAAP Policy, or similar Policies along with related procedures and training"arrow>
                <IconButton
                  aria-label="info"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalOpen(
                      "Please upload all relevant Policies, procedures, and guidelines related to your current Compliance Management System (“CMS”). Your CMS should include, as applicable, a/an AI Governance Policy, BSA/AML/OFAC Policy, Complaint Management Policy, Credit Policy, Disaster Recovery Plan, Fair Credit Reporting Policy, Fair Lending Policy, Information Security Policy, Loan Servicing Policy, Record Retention Policy or Schedule, Reg. E & E-Sign Policy, Risk Management Policy, Privacy Policy, Reg. Z Policy, Regulatory Compliance Policy, Third-Party Risk Management Policy, and UDAAP Policy, or similar Policies along with related procedures and training"
                    );
                  }}
                >
                  <Info color="primary" />
                </IconButton></Tooltip>
              </>,
              <>
                {renderUploadSection(
                  "CompliancePolicies",
                  "A.Upload Compliance Policies"
                )}
                {renderUploadSection("auditReports", "B.Upload Audit Reports")}
                {renderUploadSection("soc2Report", "C.Upload SOC 2 Report")}
                {renderUploadSection("trainingPrograms", "D.Training Programs")}
              </>
            )}

            {renderSection(
              "executiveBios",
              "10. Executive Information",
              <>
                <>
                  <Controller
                    name="executiveBioName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Executive Bio - Name is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        margin="normal"
                        label="Executive Bio - Name"
                        error={!!errors.executiveBioName}
                        helperText={errors.executiveBioName?.message}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="executiveBioTitle"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Executive Bio - Title is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        margin="normal"
                        label="Executive Bio - Title"
                        error={!!errors.executiveBioTitle}
                        helperText={errors.executiveBioTitle?.message}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="executiveBioSummary"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Executive Bio - Bio Summary is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        margin="normal"
                        label="Executive Bio - Bio Summary"
                        error={!!errors.executiveBioSummary}
                        helperText={errors.executiveBioSummary?.message}
                        required
                      />
                    )}
                  />
                  {renderUploadSection(
                    "DetailedExecutive",
                    "Detailed Executive Bios"
                  )}
                </>
              </>
            )}

            {renderSection(
              "complianceCertifications",
              "11. Additional Relevant Information",
              <>
                {renderUploadSection("Relevant", "A.Relevant Certifications")}
                {renderUploadSection(
                  "riskManagementPlans",
                  "B.Risk Management Documentation"
                )}
                {renderUploadSection(
                  "incidentResponsePlans",
                  "C.Incident Response Plans"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Save & Progress
            </Button>
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </div>
        </form>
      </Box>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Information
          </Typography>
          <Typography sx={{ mt: 2 }}>{modalContent}</Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleModalClose} color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default Onboarding;
