import React from 'react';
import {
    CardHeader,
    Paper,
    TableContainer,
    TablePagination,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    makeStyles,
    Tooltip,
    TableSortLabel
  } from '@material-ui/core';
import PropTypes from 'prop-types';

const columns = [
  { id: 'number', label: 'Number', minWidth: 110 },
  { id: 'contractName', label: 'Contract Name', minWidth: 135 },
  {
    id: 'projectLead',
    label: 'Project Lead',
    minWidth: 135
  },
  {
    id: 'startDate',
    label: 'Start Date\n(dd/mm/yyyy)',
    minWidth: 135
  },
  {
    id: 'endDate',
    label: 'End Date\n(dd/mm/yyyy)',
    minWidth: 135
  },
  {
    id: 'contractAmount',
    label: 'Contract Amount ($)',
    minWidth: 135,
    format: (value) => value.toLocaleString('en-US')
  },
];

function createData(number, contractName, projectLead, startDate, endDate, contractAmount) {
  return { number, contractName, projectLead, startDate, endDate, contractAmount };
}

// mock data
const rows = [
  createData('1', 'Fix TV', 'Jane Doe', '08/11/2019', '09/05/2020', 83019200),
  createData('2', 'Renovate House', 'John Doe', '03/05/2019', '09/09/2020', 4857000),
  createData('3', 'Install Curtain', 'Michael Jackson', '09/05/2020', '09/05/2021', 126317000),
  createData('4', 'Repaint Wall', 'Marry Lisa', '11/08/2020', '09/05/2021', 67022000),
  createData('5', 'Refurnish House', 'Jack Ma', '04/08/2020', '04/08/2022', 67545757),
  createData('6', 'Rebuild the Heating System', 'Will Liu', '09/05/2020', '09/05/2020', 146793744),
  createData('7', 'Plumbing', 'Selina Gomez', '09/05/2020', '09/05/2020', 200962417),
  createData('8', 'Fix Floor', 'Justin Bieber', '09/05/2020', '09/05/2020', 126317000),
  createData('9', 'Fix Light Bulb', 'Aria Granade', '09/05/2020', '09/05/2020', 200962417),
  createData('10', 'Drill Hole', 'Kobe Bryant', '09/05/2020', '09/05/2020', 9984670),
  createData('11', 'Sewage Dredge', 'Michael Jordan', '09/05/2020', '09/05/2020', 17098246),
  createData('12', 'Fix Underground Pipe', 'Lebron James', '09/05/2020', '09/05/2020', 8515767),
  createData('13', 'Fix Garage', 'Dwayne Wade', '09/05/2020', '09/05/2020', 242495),
  createData('14', 'Connect NBN', 'Anthony Davis', '09/05/2020', '09/05/2020', 70273),
  createData('15', 'Gardening', 'Lucia Mia', '25/10/2020', '11/12/2020', 16500),
];

const useStyles = makeStyles({
  root: {
    width: '70rem',
    marginLeft: '5rem',
    marginRight: '5rem',
  },
  container: {
    maxHeight: 450
  },
  title: {
      color: 'white',
      fontWeight: 'bold'
  },
  tableStyle: {
    fontWeight: 'bold'
  }
});

const ViewContract = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // set page
  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  // set row
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <CardHeader title="Contract List" className={classes.title} style={{backgroundColor: 'grey'}} titleTypographyProps={{variant:'h4' }} />
      <Divider />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column, index) => (
                    index === 0 ?
                    <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth, fontSize: '1.15rem' }}
                        sortDirection="asc"
                        className={classes.tableStyle}
                    >
                      <Tooltip
                          enterDelay={300}
                          title="Sort"
                      >
                        <TableSortLabel
                            active
                            direction="asc"
                        >
                            {column.label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    :
                    <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth, fontSize: '1.15rem' }}
                        className={classes.tableStyle}
                    >
                    {
                        column.label.search('\n') > 0 ?
                        column.label.split('\n').map((item, i) => {
                        return <div key={i}>{item}</div>
                        })
                        :
                        column.label
                    }  
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell style={{ fontSize: '1.15rem' }} key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

ViewContract.propTypes = {
    className: PropTypes.string
};

export default ViewContract;