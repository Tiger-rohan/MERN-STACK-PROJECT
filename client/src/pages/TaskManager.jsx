import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Typography,
  Container,
  Paper
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  minWidth: 120,
}));

const FormButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
}));

const TaskForm = () => {
  const theme = useTheme();
  const [formValues, setFormValues] = useState({
    description: '',
    dueDate: '',
    status: '',
    owner: '',
    project: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formValues);
  };

  return (
    <FormContainer maxWidth="sm">
      <FormPaper elevation={3}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create a New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={formValues.dueDate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlStyled variant="outlined" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                  label="Status"
                  required
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="blocked">Blocked</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="not-started">Not Started</MenuItem>
                </Select>
              </FormControlStyled>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Owner"
                name="owner"
                value={formValues.owner}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Project"
                name="project"
                value={formValues.project}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create Task
              </FormButton>
            </Grid>
          </Grid>
        </form>
      </FormPaper>
    </FormContainer>
  );
};

export default TaskForm;


