import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormLabel,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { alertActions, contractAction } from '../../../actions';



const OwnerContract = ({ className, ...rest }) => {
  // Get user information from Redux
  const user = useSelector(state => state.authentication.user);

  // Prepare all the values for this page
  const [values, setValues] = useState({
    projectId: '', contractTitle: '', partyAFirstName: user.firstName, partyALastName: user.lastName, partyBFirstName: '',
    partyBLastName: '', partyAEmail: user.email, partyBEmail: '', contractStartDate: '', contractDueDate: '', contractAmount: '',
    contractGst: '', retentionAmount: '', claimDate: '', contractDescription: ''
  });
  const [projectList, setProjectList] = useState([]);

  // Get projects when loading the page
  useEffect(async () => {
    let projects = await contractAction.getProjectList(user.email, user.password);
    setProjectList(projects);
    setValues({ ...values, 'projectId': projects.projectId });
  }, [])

  // 
  const handleChange = async (e) => {
    if (e === undefined)
      return;

    // TO DO: add input validation here 
    const { name, value } = e.target;

    setValues({
      ...values, [name]: value
    });

    // Calculate other amounts
    if (name == 'contractAmount') {
      let contractGst = Math.round(parseInt(value) * 0.1 * 100) / 100
      let totalAmount = Math.round((parseInt(value) + contractGst) * 100) / 100
      let retentionAmount = Math.round(totalAmount * 0.05 * 100) / 100
      setValues({
        ...values,
        [name]: value,
        "contractGst": contractGst,
        "totalAmount": totalAmount,
        "retentionAmount": retentionAmount
      });
    }
  };

  // Call RESTful API to get user name with entered email
  const getInfoByEmail = async (e) => {
    if (values.partyBEmail.length != 0) {
      let partyBInfo = await contractAction.getUserInfoByEmail(user.email, user.password, values.partyBEmail);
      if (partyBInfo != undefined) {
        setValues({
          ...values,
          "partyBFirstName": partyBInfo.firstName,
          "partyBLastName": partyBInfo.lastName
        })
      } else {
        setValues({
          ...values,
          "partyBFirstName": "",
          "partyBLastName": ""
        });
      }
    }
  }

  // Submit the form
  const onFormSubmit = () => {
    const {
      projectId, contractTitle, partyAEmail, partyBEmail, contractStartDate, contractDueDate,
      contractAmount, contractGst, retentionAmount, claimDate, contractDescription
    } = values;

    if (contractTitle !== '' && partyAEmail !== '' && partyBEmail !== '' && contractStartDate !== '' && contractDueDate !== ''
      && contractAmount !== '' && retentionAmount !== '' && claimDate !== '' && contractGst !== '') {

      // Send all the contract information to RESTful API to create the contract
      contractAction.createContract(user.email, user.password, projectId, contractTitle, partyAEmail, partyBEmail,
        contractStartDate, contractDueDate, contractAmount, contractGst, retentionAmount, claimDate, contractDescription);
    }
    else {
      alertActions.error('Oops...', 'Please fill in all required details above!', true);
    }
  }


  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(className)}
      {...rest}
    >
      <Card style={{ paddingTop: "1rem", marginTop: "4rem" }}>
        <CardHeader
          title="Create Contract"
          className="text-center"
          titleTypographyProps={{ variant: 'h2' }}
        />
        <Divider />

        <CardContent>
          <strong style={{ fontSize: '1.2em' }}>Contract Information</strong>
          <Grid
            container
            spacing={3}
            style={{ marginTop: "1rem" }}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <FormLabel>Please select project from the list</FormLabel>
              <TextField
                fullWidth
                name="projectId"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.projectId}
                variant="outlined"
              >
                {projectList.map((option) => {
                  return <option
                    key={option.projectId}
                    value={option.projectId}
                  >
                    {option.projectTitle}
                  </option>
                })}
              </TextField>
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <FormLabel>Contract Title*: </FormLabel>
              <TextField
                fullWidth
                name="contractTitle"
                onChange={handleChange}
                required
                value={values.contractTitle}
                variant="outlined"
              />

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Party A First Name*: </FormLabel>
              <TextField
                fullWidth
                name="partyAFirstName"
                onChange={handleChange}
                value={values.partyAFirstName}
                variant="outlined"
              />

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Party A Last Name*: </FormLabel>
              <TextField
                fullWidth
                name="partyALastName"
                onChange={handleChange}
                value={values.partyALastName}
                variant="outlined"
              />

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Party A Email*: </FormLabel>
              <TextField
                fullWidth
                name="partyAEmail"
                onChange={handleChange}
                value={values.partyAEmail}
                variant="outlined"
              />

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Party B First Name*: </FormLabel>
              <TextField
                fullWidth
                name="partyBFirstName"
                onChange={handleChange}
                value={values.partyBFirstName}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Party B Last Name*: </FormLabel>
              <TextField
                fullWidth
                name="partyBLastName"
                onChange={handleChange}
                value={values.partyBLastName}
                variant="outlined"
              >
              </TextField>
            </Grid>


            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Party B Email*: </FormLabel>
              <TextField
                fullWidth
                name="partyBEmail"
                onChange={handleChange}
                value={values.partyBEmail}
                variant="outlined"
                onBlur={getInfoByEmail}
              />

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Contract Start Date (dd/mm/yyyy)*: </FormLabel>
              <TextField
                fullWidth
                name="contractStartDate"
                onChange={handleChange}
                value={values.contractStartDate}
                variant="outlined"
              />

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Contract Due Date (dd/mm/yyyy)*: </FormLabel>
              <TextField
                fullWidth
                name="contractDueDate"
                onChange={handleChange}
                value={values.contractDueDate}
                variant="outlined"
              />

            </Grid>


            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Claim Day (1~31)*: </FormLabel>
              <TextField
                fullWidth
                name="claimDate"
                onChange={handleChange}
                value={values.claimDate}
                variant="outlined"
              />

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Contract Amount*: </FormLabel>
              <TextField
                fullWidth
                name="contractAmount"
                onChange={handleChange}
                value={values.contractAmount}
                variant="outlined"
              />

            </Grid>


            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Contract GST (10% Contract Amount)*: </FormLabel>
              <TextField
                fullWidth
                name="contractGst"
                onChange={handleChange}
                value={values.contractGst}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Total Amount: </FormLabel>
              <TextField
                fullWidth
                name="totalAmount"
                value={values.totalAmount}
                variant="outlined"
                disabled
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <FormLabel>Retention Amount (5% Total Amount)*: </FormLabel>
              <TextField
                fullWidth
                name="retentionAmount"
                onChange={handleChange}
                value={values.retentionAmount}
                variant="outlined"
              />

            </Grid>


            <Grid
              item
              md={12}
              xs={12}
            >
              <FormLabel>Contract Description: </FormLabel>
              <TextField
                fullWidth
                multiline
                name="contractDescription"
                onChange={handleChange}
                value={values.contractDescription}
                variant="outlined"
              />
            </Grid>

          </Grid>

        </CardContent>
        <Divider />

        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <div>
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight: "2rem" }}
              onClick={onFormSubmit}
            >
              Create Contract
              </Button>
            <Button
              color="primary"
              variant="contained"
              to="/owner"
              style={{ marginRight: "1rem" }}
              component={RouterLink}
            >
              Back
              </Button>
          </div>
        </Box>
      </Card>
    </form>
  );
};

OwnerContract.propTypes = {
  className: PropTypes.string
};


export default OwnerContract;




