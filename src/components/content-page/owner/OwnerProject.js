import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { validateForm, validBusinessName, validAccount, validStreetAddress, validPostcode, isValidDate, validBSB } from '../../landing-page/validation/InputValidate';
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
  List, 
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { alertActions, projectAction } from '../../../actions';
import { isBefore, isAfter, isEqual } from 'date-fns';


const MySwal = withReactContent(Swal); 

// CSS style
const useStyles = makeStyles(() => ({
  listStyle: {
    fontSize: '1.15rem', 
    backgroundColor: 'azure', 
    marginLeft: '1rem', 
    borderRadius: '10px'
  },
  listDeleteStyle: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    zIndex: '100',
    backgroundColor: '#FFF',
    padding: '5px 2px 2px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    opacity: '.2',
    textAlign: 'center',
    fontSize: '22px',
    lineHeight: '10px',
    borderRadius: '50%'
  } 
}));


const OwnerProject = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user);

  const [values, setValues] = useState({
    projectTitle: '',
    projectStartDate: '',
    projectDueDate: '',
    projectAmount: '',
    projectDescription: '',
    bsb: '',
    account: '',
    street: '',
    postcode: '',
    suburb: '',
    ausState: ''
  });

  const [inviteEmailList, setInviteEmailList] = useState([]);
  const [suburbArray, setSuburbArray] = useState([]);
  const [errors, setErrors] = useState({
    projectTitle: '',
    projectStartDate: '',
    projectDueDate: '',
    projectAmount: '',
    projectDescription: '',
    bsb: '',
    account: '',
    street: '',
    postcode: ''
  });

  // input validation + input value set
  const handleChange = async (e) => {
    let stateFromAPI = "";
    let suburbFromAPI = "";
    if (e === undefined)
      return;
    const { name, value } = e.target;

    switch (name) {
      case 'projectTitle':
          errors.projectTitle = validBusinessName.test(value)? 
              ''
              : 'Please enter alphabetical character with first letter uppercase and no space at the end!';
          break;
      case 'projectStartDate':
        if(isValidDate(value)) {
          var dateArray = value.split('/');
          var newStartDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];

          console.log(new Date(newStartDate));

          var currentTime = new Date(new Date().setHours(0,0,0,0));


          if(isAfter(new Date(newStartDate), currentTime) || isEqual(new Date(newStartDate), currentTime)) {
            if(values.projectDueDate !== '') {
              var dueDateArray = values.projectDueDate.split('/');
              var newDueDate = dueDateArray[1] + '/' + dueDateArray[0] + '/' + dueDateArray[2];

              if(isBefore(new Date(newStartDate), new Date(newDueDate)) 
                || isEqual(new Date(newStartDate), new Date(newDueDate))) {
                errors.projectStartDate = '';
              }
              else {
                errors.projectStartDate = 'Project start date must be smaller or equal to project due Date!';
              }
            }
            else {
              errors.projectStartDate = '';
            }
          }
          else {
            errors.projectStartDate = 'Project start date must be bigger or equal to current date!';
          }
        }
        else {
          errors.projectStartDate = 'Please enter a valid project start date!'
        }
        break;
      case 'projectDueDate':
        if(isValidDate(value)) {
          var dateArray1 = value.split('/');
          var newDueDate1 = dateArray1[1] + '/' + dateArray1[0] + '/' + dateArray1[2];

          var currentTime1 = new Date(new Date().setHours(0,0,0,0));

          console.log(new Date(newDueDate1));

          if(isAfter(new Date(newDueDate1), currentTime1) || isEqual(new Date(newDueDate1), currentTime1)) {
            if(values.projectStartDate !== '') {
              var startDateArray = values.projectStartDate.split('/');
              var newStartDate1 = startDateArray[1] + '/' + startDateArray[0] + '/' + startDateArray[2];

              if(isAfter(new Date(newDueDate1), new Date(newStartDate1)) 
                || isEqual(new Date(newStartDate1), new Date(newDueDate1))) {
                errors.projectDueDate = '';
              }
              else {
                errors.projectDueDate = 'Project due date must be bigger or equal to project start Date!';
              }
            }
            else {
              errors.projectDueDate = '';
            }
          }
          else {
            errors.projectDueDate = 'Project due date must be bigger or equal to current date!';
          }
        }
        else {
          errors.projectDueDate = 'Please enter a valid project start date!'
        }
        break;
      case 'street':
          errors.street = validStreetAddress.test(value)
              ? ''
              : 'Please enter a valid street name! For example, 6 Pashen Street.';
          break;    
      case 'postcode':
          if(value.length !== 4) {
            errors.postcode = 'Postcode needs to be four digits!';
          }
          else {
            let result = JSON.stringify(await validPostcode(value));
            let test = JSON.parse(result);
            let size = test.postalCodes.length;
            console.log(result);

            let suburbList = new Array(size);

            for(var i=0; i<size; i++) {
                suburbList[i] = test.postalCodes[i].placeName;
            }
            setSuburbArray(suburbList);
            if(test.postalCodes.length !== 0) {
              stateFromAPI = test.postalCodes[0].adminName1;
              suburbFromAPI = suburbList[0];
            }
            
            if(size === 0) {
                errors.postcode = 'Invalid postcode! Please re-enter!';
            }
            else {
                errors.postcode = '';
            }
          }
          break;
      case 'projectAmount':
          errors.projectAmount = /^\d*$/.test(value)
          ? ''
          : 'Project amount is number only and cannot be smaller than 0!';   
          break;
      case 'account':
          errors.account = validAccount.test(value)
              ? ''
              : 'Please enter a valid 8 or 9 digit account number!';
          break;
      case 'bsb':
          errors.bsb = validBSB.test(value)
              ? ''
              : 'Please enter 6-digit BSB number!';
          break;
      default:
          break;
    }

    if (name === 'postcode'){
      setValues({ 
        ...values,
        [name]: value,
        suburb: suburbFromAPI,
        ausState: stateFromAPI
      });
    }else{
      setValues({
        ...values, [name]: value
      });
    }
    setErrors(errors);
  };

  // submit check + submit function
  const onFormSubmit = () => {
    const { 
      projectTitle,
      projectStartDate,
      projectDueDate,
      projectAmount,
      projectDescription,
      bsb,
      account,
      street,
      postcode,
      suburb,
      ausState 
    } = values;

  if(projectTitle !== '' &&
    street !== '' &&
    postcode !== '' &&
    suburb !== '' &&
    ausState !== '') {
      if(validateForm(errors)) {
        projectAction.createProject(user.userId, projectTitle, street, projectDescription, suburb, postcode, ausState, projectDueDate,
          projectStartDate, projectAmount, bsb, account, inviteEmailList);
      }
      else {
        alertActions.error('Oops...', 'Please make sure details you\'ve entered are correct!', true);
      }
    }
    else {
      alertActions.error('Oops...', 'Please fill in all required details above!', true);
    }
  }
   
  // click to invite others by email
  const onClickInvite = async () => {
    const { value: email } = await MySwal.fire({
      title: 'Please enter email address',
      input: 'email',
      confirmButtonText: 'Add',
      showCancelButton: true,
      inputPlaceholder: 'Enter email address to invite'
    })
    
    if (email) {
      MySwal.fire({
        title: 'Add email successfully!'
      })
      let newArray = [];
      newArray.push(...inviteEmailList, email);

      setInviteEmailList(newArray);
    }
  }

  // click to delete the added email
  const onClickDelete = (index) => {
    const newInviteList = [...inviteEmailList];
    newInviteList.splice(index, 1)
    setInviteEmailList(newInviteList);
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
          title="Create Project"
          className="text-center"
          titleTypographyProps={{variant:'h2' }}
        />
        <Divider />

        <CardContent>
          <strong style={{ fontSize: '1.2em', paddingLeft: "3rem", paddingRight: "3rem" }}>Project Information</strong>
          <Grid
            container
            spacing={3}
            style={{ marginTop: "1rem", paddingLeft: "3rem", paddingRight: "3rem"  }}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Project Title*: </FormLabel>
              <TextField
                fullWidth
                name="projectTitle"
                onChange={handleChange}
                required
                value={values.projectTitle}
                variant="outlined"
              />
              {errors.projectTitle.length > 0 && <span className='error'>{errors.projectTitle}</span>}
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Street*: </FormLabel>
              <TextField
                fullWidth
                name="street"              
                onChange={handleChange}
                value={values.street}
                variant="outlined"
              />
              {errors.street.length > 0 && <span className='error'>{errors.street}</span>}
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Postcode*: </FormLabel>
              <TextField
                fullWidth
                name="postcode"
                onChange={handleChange}            
                value={values.postcode}
                variant="outlined"
                onInput = {(e) =>{
                  if (isNaN(parseInt(e.target.value))) {
                    e.target.value = e.target.value.slice(0,e.target.value.length-1);
                  }else{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
                  }
                }}
              />
              {errors.postcode.length > 0 && <span className='error'>{errors.postcode}</span>}
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Suburb*: </FormLabel>
              <TextField
                fullWidth
                name="suburb"
                onChange={handleChange}   
                select
                SelectProps={{ native: true }}            
                value={values.suburb}
                variant="outlined"
              >
                {suburbArray.map((option) => { 
                  return  <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                })}
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>State*: </FormLabel>
              <TextField
                fullWidth
                name="state"
                onChange={handleChange}              
                value={values.ausState}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Project Start Date (dd/mm/yyyy): </FormLabel>
              <TextField
                fullWidth
                name="projectStartDate"
                onChange={handleChange}
                value={values.projectStartDate}
                variant="outlined"
              />
              {errors.projectStartDate.length > 0 && <span className='error'>{errors.projectStartDate}</span>}
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Project Due Date (dd/mm/yyyy): </FormLabel>
              <TextField
                fullWidth
                name="projectDueDate"
                onChange={handleChange}
                value={values.projectDueDate}
                variant="outlined"
              />
              {errors.projectDueDate.length > 0 && <span className='error'>{errors.projectDueDate}</span>}
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Project Amount: </FormLabel>
              <TextField
                fullWidth
                name="projectAmount"
                onChange={handleChange}
                value={values.projectAmount}
                variant="outlined"
              />
              {errors.projectAmount.length > 0 && <span className='error'>{errors.projectAmount}</span>}
            </Grid>

             <Grid
              item
              md={12}
              xs={12}
            >
              <FormLabel>Project Description: </FormLabel>
              <TextField
                fullWidth
                multiline
                name="projectDescription"
                onChange={handleChange}
                value={values.projectDescription}
                variant="outlined"
              />
            </Grid>
            
          </Grid>
          <hr></hr>

          <strong style={{ fontSize: '1.2em', paddingLeft: "3rem", paddingRight: "3rem" }}>Financial Information</strong>
          <Grid
            container
            spacing={3}
            style={{marginTop:"1rem", paddingLeft: "3rem", paddingRight: "3rem" }}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>BSB: </FormLabel>
              <TextField
                fullWidth
                name="bsb"
                onChange={handleChange}
                value={values.bsb}
                variant="outlined"
              />
              {errors.bsb.length > 0 && <span className='error'>{errors.bsb}</span>}
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Account Number: </FormLabel>
              <TextField
                fullWidth
                name="account"
                onChange={handleChange}
                value={values.account}
                variant="outlined"
              />
              {errors.account.length > 0 && <span className='error'>{errors.account}</span>}
            </Grid>
 
          </Grid>

          <hr></hr>
          <strong style={{ fontSize: '1.2em', paddingLeft: "3rem", paddingRight: "3rem" }}>Invite Others</strong>
          <Grid item md={6} xs={12} style={{ marginTop: "1rem", paddingLeft: "2.5rem", paddingRight: "2rem" }}>
            <List>
              { 
                inviteEmailList.map((email, index) => (
                  email !== undefined ?
                  <ListItem className={classes.listStyle} key={index}>
                      <span onClick={() => onClickDelete(index)} className={classes.listDeleteStyle}>&times;</span>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={email}
                      />  
                  </ListItem>
                  :
                  <div></div>
                ))
              }
              <ListItem>
                <Button 
                  color="inherit"
                  variant="contained"
                  fullWidth 
                  style={{ borderRadius: "10px"}}
                  onClick={onClickInvite}
                > 
                    Add
                </Button>
              </ListItem>
              <ListItem>
                <Button 
                  color="inherit"
                  variant="contained"
                  fullWidth 
                  style={{ borderRadius: "10px"}}
                > 
                    Navigate
                </Button>
              </ListItem>
            </List>
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
                style={{marginRight: "2rem"}}
                onClick={onFormSubmit}
              >
                Create Project
              </Button>
              <Button
                  color="primary"
                  variant="contained"
                  to= "/owner"
                  style={{marginRight: "1rem"}}
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

OwnerProject.propTypes = {
  className: PropTypes.string
};


export default OwnerProject;




                