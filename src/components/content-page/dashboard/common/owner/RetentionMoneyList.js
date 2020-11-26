import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  CardHeader,
  Card,
  Box,
  Tooltip,
  TableSortLabel,
  TablePagination,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';


const columns = [
  { id: 'date', label: 'Due Date\n(dd/mm/yyyy)', minWidth: 110 },
  { id: 'projectTitle', label: 'Project Title'},
  {
    id: 'companyName',
    label: 'Company Name',
  },
  {
    id: 'retentionAmount',
    label: 'Retention Amount ($)',
    format: (value) => value.toLocaleString('en-US')
  },
];

function createData(date, projectName, businessName, projectAmount) {
  return { date, projectName, businessName, projectAmount };
}

// mock data
var rows = [
  createData('12/04/2019', 'Fix TV', 'Jane Doe', 83019200),
  createData('12/04/2019', 'Renovate House', 'John Doe', 4857000),
  createData('11/04/2019', 'Install Curtain', 'Michael Jackson', 126317000),
  createData('09/04/2019', 'Repaint Wall', 'Marry Lisa', '11/08/2020', 67022000),
  createData('22/04/2019', 'Refurnish House', 'Jack Ma', 67545757),
  createData('08/04/2020', 'Rebuild the Heating System', 'Will Liu', 146793744),
  createData('08/04/2019', 'Plumbing', 'Selina Gomez', 200962417),
  createData('18/01/2020', 'Fix Floor', 'Justin Bieber', 126317000),
  createData('08/04/2019', 'Fix Light Bulb', 'Aria Granade', 200962417),
  createData('18/05/2019', 'Drill Hole', 'Kobe Bryant', 9984670),
  createData('08/04/2019', 'Sewage Dredge', 'Michael Jordan', 17098246),
  createData('08/04/2019', 'Fix Underground Pipe', 'Lebron James', 8515767),
  createData('08/03/2020', 'Fix Garage', 'Dwayne Wade', 242495),
  createData('08/09/2020', 'Connect NBN', 'Anthony Davis', 70273),
  createData('08/02/2020', 'Gardening', 'Shaquille O\'Neal', 4857000),
];


// CSS style
const useStyles = makeStyles(() => ({
  tableStyle: {
    fontWeight: 'bold'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  title: {
    color: 'white'
  }
}));


const RetentionMoneyList = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);
  const retentionMoney = useSelector(state => state.dashboard_data_display.retentionMoney);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  if (user && user.status && retentionMoney) {
    rows = retentionMoney;
  }
  else if (user && user.status) {
    rows = []
  }
  else {}

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
    <Card
      className={clsx(className)}
      {...rest}
    >
      <CardHeader title="Retention Money" className={classes.title} style={{backgroundColor: 'grey'}} />
      <Divider />
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  index === 0 ?
                  <TableCell key={index} sortDirection="asc" style={{ minWidth: column.minWidth, fontSize: '1.15rem' }}>
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="asc"
                        className={classes.tableStyle}
                      >
                        {column.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  :
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize: '1.15rem' }}
                    className={classes.tableStyle}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Card>
  );
};

RetentionMoneyList.propTypes = {
  className: PropTypes.string
};

export default RetentionMoneyList;
