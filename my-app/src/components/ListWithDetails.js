
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';

function ListWithDetails({ data }) {
  const itemsPerPage = 5;
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 'none' }}>
        {displayedData.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontSize: '1.5rem' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.username}
                    </Typography>
                    <Typography
                      sx={{ display: 'inline', fontSize: '1.4rem' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {` - ${item.company.name}`}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ display: 'inline', fontSize: '1rem' }}
                      component="p"
                      variant="body2"
                      color="text.primary"
                    >
                      {`Lives in ${item.address.city} at ${item.address.street}`}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => openModal(item)}
                      sx={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }}
                    >
                      Open Modal
                    </Button>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      />

      <Modal open={isModalOpen} onClose={closeModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '50%', backgroundColor: 'white', border: '2px solid #000', borderRadius: '5px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h2>Details</h2>
            <Button onClick={closeModal}>X</Button>
          </div>
          {selectedItem && (
            <div>
              <p>ID: {selectedItem.id}</p>
              <p>Name: {selectedItem.name}</p>
              <p>Username: {selectedItem.username}</p>
              <p>Company: {selectedItem.company.name}</p>
              <p>Address: {selectedItem.address.street}, {selectedItem.address.city}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ListWithDetails;
