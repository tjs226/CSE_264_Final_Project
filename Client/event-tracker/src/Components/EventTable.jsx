import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';

function EventTable({ events, openEventModule }) {
  
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, width: '60vw', maxHeight: '85vh', margin: 'auto', overflowY: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0a3561', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>Name</TableCell>
              <TableCell sx={{ backgroundColor: '#0a3561', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>Date</TableCell>
              <TableCell sx={{ backgroundColor: '#0a3561', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>Location</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {events.length > 0 ? events.map((e) => (
              <TableRow key={e.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'white' }, '&:hover': { backgroundColor: '#32689fff' }}} onClick={() => openEventModule(e)}>
                <TableCell>
                  <Typography variant="h6" fontWeight="500">{e.name}</Typography>
                </TableCell>
                <TableCell><Typography variant="h6">{e.date}</Typography></TableCell>
                <TableCell><Typography variant="h6">{e.location}</Typography></TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center"><Typography color="text.secondary" variant="h6">No events available</Typography></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventTable;
