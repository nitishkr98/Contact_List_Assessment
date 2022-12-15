import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Dialog,
  Slide,
  DialogTitle,
  DialogActions,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../../redux/reducers/contact';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState('');
  const contactList = useSelector((state) => state.contacts.contactList);

  const handleClickDelete = (id) => {
    setSelectedContactId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    const allContacts = contactList.filter(
      (contact) => contact.id !== selectedContactId
    );
    dispatch(updateContact(allContacts));
    setOpen(false);
    setSelectedContactId('');
  };

  let allContacts = [...contactList];
  allContacts.sort((a, b) =>
    a.contactName.toLowerCase() < b.contactName.toLowerCase() ? -1 : 1
  );

  return (
    <Container maxWidth={'xl'}>
      <Grid container justifyContent={'space-between'}>
        <Typography variant="h5" mt={2} gutterBottom>
          Contact List
        </Typography>
        <Typography
          variant="button"
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          gutterBottom
        >
          <Link to={'/add-contact'} style={{ textDecoration: 'none' }}>
            <Button variant="contained">
              <AddIcon /> &nbsp; Add New
            </Button>
          </Link>
        </Typography>
      </Grid>
      <Divider />
      <Grid container spacing={3} justifyContent={'center'} my={2}>
        {allContacts.length ? (
          allContacts.map((contact, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={contact.profile}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    Name -{' '}
                    <Typography variant="span" color="text.secondary">
                      {contact.contactName}
                    </Typography>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Phone -{' '}
                    <Typography variant="span" color="text.secondary">
                      {contact.phone}
                    </Typography>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    Type -{' '}
                    <Typography variant="span" color="text.secondary">
                      {contact.type}
                    </Typography>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    isWhatsapp -{' '}
                    <Typography variant="span" color="text.secondary">
                      {contact.isWhatsapp?.toString()}
                    </Typography>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/edit-contact/${contact.id}`}
                    style={{ textDecoration: 'none', marginRight: '8px' }}
                  >
                    <Button size="small" variant="outlined">
                      <EditIcon /> &nbsp; Edit
                    </Button>
                  </Link>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleClickDelete(contact.id)}
                  >
                    <DeleteIcon /> &nbsp; Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" mt={2} gutterBottom>
            No contacts saved
          </Typography>
        )}
      </Grid>

      {/* Delete Dialog Starts */}
      <Dialog open={open} TransitionComponent={Transition} keepMounted>
        <DialogTitle>
          {'Are you sure you want to Delete this contact ?'}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setSelectedContactId('');
              setOpen(false);
            }}
          >
            Disagree
          </Button>
          <Button onClick={() => handleDelete()}>Agree</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog Ends */}
    </Container>
  );
};

export default ContactList;
