import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../../redux/reducers/contact';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './ContactForm.css';

const initialState = {
  id: '',
  contactName: '',
  profile: '',
  phone: '',
  type: '',
  isWhatsapp: true,
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const contactList = useSelector((state) => state.contacts.contactList);
  const [formValues, setFormValues] = useState(initialState);
  const [formSubmit, setFormSubmit] = useState(false);
  const [formSaved, setFormSaved] = useState(false);
  const [error, setError] = useState({});

  const handleClose = () => {
    setFormSaved(false);
  };

  const handleChange = (e) => {
    let values = {};
    if (e.target.name === 'profile') {
      const selectedFile =
        e.target.files && e.target.files.length && e.target.files[0];
      if (!selectedFile) {
        values = {
          profile: '',
        };
        return setFormValues({ ...formValues, ...values });
      }
      let reader = new FileReader();
      reader.onload = function (e) {
        values = {
          profile: e.target.result,
        };
        setFormValues({ ...formValues, ...values });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      values = {
        [e.target.name]:
          e.target.name === 'isWhatsapp' ? e.target.checked : e.target.value,
      };
      setFormValues({ ...formValues, ...values });
    }
  };

  const checkValidation = (data) => {
    if (!formSubmit) return;
    let err = {};
    for (const key in data) {
      if (data[key].length === 0) {
        err = { ...err, [key]: `${key} is a required field` };
      } else if (data['phone'].length > 10) {
        err = {
          ...err,
          ['phone']: `phone number is not valid. Enter 10 digit phone number`,
        };
      }
    }
    setError(err);
  };

  const onSubmit = () => {
    setFormSubmit(true);
    let data = {};
    if (id) {
      data = { ...formValues };
    } else {
      data = { ...formValues, id: uuidv4() };
    }
    if (
      Object.values(data).every((field) => field.length > 0 || field === true)
    ) {
      if (id) {
        let allContacts = contactList.map((el) => {
          return el.id === id ? data : el;
        });
        dispatch(updateContact(allContacts));
      } else {
        dispatch(addContact(data));
      }
      setFormSaved(true);
    }
  };

  useEffect(() => {
    checkValidation(formValues);
  }, [formSubmit, formValues]);

  useEffect(() => {
    if (id) {
      let contact = contactList.find((el) => el.id === id);
      setFormValues(contact);
    }
  }, []);

  return (
    <Container maxWidth={'xl'}>
      <Grid container justifyContent={'space-between'}>
        <Typography variant="h5" mt={2} gutterBottom>
          {id ? 'Edit Contact' : 'Add New Contact'}
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Grid container mb={3} justifyContent={'center'}>
              <Grid item>
                <input
                  accept="image/*"
                  type={'file'}
                  name="profile"
                  className={`profile-pic ${
                    formValues.profile ? 'profile-pic-added' : ''
                  } ${
                    error.hasOwnProperty('profile') ? 'profile-pic-error' : ''
                  }`}
                  onChange={(e) => handleChange(e)}
                  onBlur={() => checkValidation(formValues)}
                  style={{
                    backgroundImage: `url(${formValues.profile})`,
                    backgroundRepeat: 'round',
                  }}
                />
                {error.hasOwnProperty('profile') && (
                  <Typography variant="body2" gutterBottom color="#d32f2f">
                    {error.profile}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            >
              <TextField
                name="contactName"
                label="Contact Name"
                value={formValues.contactName}
                onChange={(e) => handleChange(e)}
                onBlur={() => checkValidation(formValues)}
                error={error.hasOwnProperty('contactName')}
                helperText={
                  error.hasOwnProperty('contactName') && error.contactName
                }
              />
              <TextField
                name="phone"
                label="Phone"
                value={formValues.phone}
                onChange={(e) => handleChange(e)}
                onBlur={() => checkValidation(formValues)}
                error={error.hasOwnProperty('phone')}
                helperText={error.hasOwnProperty('phone') && error.phone}
              />
              <FormControl fullWidth error={error.hasOwnProperty('type')}>
                <InputLabel id="contact-type-select">Type</InputLabel>
                <Select
                  labelId="contact-type-select"
                  id="contact-type-simple-select"
                  name="type"
                  label="Type"
                  value={formValues.type}
                  onChange={(e) => handleChange(e)}
                  onBlur={() => checkValidation(formValues)}
                >
                  <MenuItem value={'Personal'}>Personal</MenuItem>
                  <MenuItem value={'Office'}>Office</MenuItem>
                </Select>
                <FormHelperText>
                  {error.hasOwnProperty('type') && error.type}
                </FormHelperText>
              </FormControl>
              <Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isWhatsapp"
                      checked={formValues.isWhatsapp}
                      onChange={(e) => handleChange(e)}
                    />
                  }
                  label="isWhatsapp"
                />
              </Typography>
            </Box>
            <Stack
              alignItems="flex-end"
              direction="row"
              justifyContent={'end'}
              spacing={1}
              sx={{ mt: 3 }}
            >
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Button type="button" variant="contained">
                  {'Back'}
                </Button>
              </Link>
              <Button
                type="button"
                variant="contained"
                onClick={() => onSubmit()}
              >
                {!id ? 'Add contact' : 'Save Changes'}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      {formSaved && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Contact saved successfully !
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ContactForm;
