import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { validateForm, validUsernameRegex, validBusinessName, validPhoneNumber, validBSB, validateABN, validAccount, validStreetAddress, validPostcode, validTFN } from '../../landing-page/validation/InputValidate';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormLabel
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { alertActions, userActions } from '../../../actions';
import { authService } from '../../../services';
import { authConstants } from '../../../constants';


const states = [
  {
    value: 'Victoria',
    label: 'Victoria'
  },
  {
    value: 'Australian Capital Territory',
    label: 'Australian Capital Territory'
  },
  {
    value: 'New South Wales',
    label: 'New South Wales'
  },
  {
    value: 'Queensland',
    label: 'Queensland'
  },
  {
    value: 'Tasmania',
    label: 'Tasmania'
  },
  {
    value: 'Western Australia',
    label: 'Western Australia'
  },
  {
    value: 'South Australia',
    label: 'South Australia'
  }
];

const ProfileDetails = ({ className, userInfo, ...rest }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const people = useSelector(state => state.authentication.user);
  const [values, setValues] = useState({
    firstName: people.firstName,
    lastName: people.lastName,
    email: people.email
  });
  const [suburbArray, setSuburbArray] = useState([]);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bsb: '',
    account: '',
    tfn: '',
    businessName: '',
    abn: '',
    vba: '',
    street: '',
    postcode: '',
    state: ''
  });
  
  // get user data and set input value
  const getUser = async () => {
    let user = await userActions.getUser(people.userId, people.role, people.email);
    setUser(user);
    setValues({
      ...values, 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      account: user.accountNumber,
      bsb: user.bsb,
      tfn: user.tfn
    });
  }

  // get company data and set input value
  const getCompany = async() => {
    if (people.companyId!==null){

      let company = await userActions.getCompany(people.companyId);
      let suburbList = new Array(1);
      suburbList[0] = company.addressSuburb;
      setSuburbArray(suburbList);
      setValues({
        ...values,
        bsb: values.bsb,
        phone: values.phone,
        businessName: company.companyName,
        abn: company.abn,
        vba: company.vba,
        street: company.addressStreet,
        suburb: company.addressSuburb,
        state: company.addressState,
        postcode: company.addressPostcode,
      });
    }
  }

  useEffect(() => {
    getUser()
  }, []);

  useEffect(() => {
    getCompany()
  }, []);

  // input validation + input value set
  const handleChange = async (e) => {
    let stateFromAPI = "";
    let suburbFromAPI = "";
    if (e === undefined)
      return;
    const { name, value } = e.target;

    console.log(name);

    switch (name) {
      case 'firstName':
          errors.firstName = validUsernameRegex.test(value)
              ? ''
              : 'Please enter alphabetical character with first letter uppercase!';
          break;
      case 'lastName':
          errors.lastName = validUsernameRegex.test(value)
              ? ''
              : 'Please enter alphabetical character with first letter uppercase!';
          break;
      case 'phone':
          errors.phone = validPhoneNumber.test(value)
              ? ''
              : 'Phone entered is invalid. Please enter a Australian phone number!';
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
      case 'tfn':
          errors.tfn = validTFN(value) 
          break;
      default:
          break;
    }

    if (people.role !== 'owner' || name === 'postcode') {
      switch(name){
        case 'businessName':
          errors.businessName = validBusinessName.test(value)
              ? ''
              : 'Please enter a valid business name!';
          break;
        case 'abn':
          errors.abn = validateABN(value)
              ? ''
              : 'Please enter a valid ABN number!';
          break;
        case 'street':
          errors.street = validStreetAddress.test(value)
              ? ''
              : 'Please enter a valid street name! For example, 6 Pashen Street.';
          break;    
        case 'postcode':
          if(value.length !== 4) {
            errors.postcode = 'Postcode needs to be four digits!';
          }else {
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
      case 'vba':
          if(value.length !== 11)
            errors.vba = validStreetAddress.test(value)
              ? ''
              : 'Please enter a valid VBA number!';
          break; 
      default:
        break;
      }
    }
    
    if (name === 'postcode'){
      setValues({ 
        ...values,
        [name]: value,
        suburb: suburbFromAPI,
        state: stateFromAPI
      });
    }else{
      setValues({
        ...values, [name]: value
      });
    }
    setErrors(errors);
  };

  // once user clicks save, information will be sent to backend 
  const onSave = () => {
    let { abn, bsb, account, businessName, email, firstName, lastName, phone, postcode, state, street, suburb, tfn, vba} = values;
    
    if (phone === undefined){
      phone = user.phone;
    }
    if (bsb === undefined){
      bsb = user.bsb;
    }
    if (account === undefined){
      account = user.accountNumber;
    }
    if (tfn === undefined){
      tfn = user.tfn;
    }


    let signatures = document.getElementById('signature_file');
    let insurances = document.getElementById('insurance_file');
    let fileMessage = "";
  
    if (user.status) {
      if (signatures.files.length === 0) {
        fileMessage = "Signature file";
      }
      if (people.role !== 'owner') {
        if (insurances.files.length === 0) {
          if (fileMessage.length !== 0) {
            fileMessage += ", ";
          }
          fileMessage += "Insurance file";
        }
      }
      if (fileMessage.length !== 0){
        alertActions.error("Please upload files...", fileMessage, true);
        return;
      }
    }

    if(validateForm(errors)) {
      let fd = new FormData();
      if (people.role !== 'owner'){
        fd.append('insurance_file', insurances.files[0]);
      }else{
        fd.append('insurance_file', null);
      }
      fd.append('signature_file', signatures.files[0]);
      fd.append('user_id', people.userId);
      fd.append('status', people.status);
      fd.append('role', people.role);
      fd.append('first_name', firstName);
      fd.append('last_name', lastName);
      fd.append('email', email);
      fd.append('phone', phone);
      fd.append('tfn', tfn);
      fd.append('bsb', bsb);
      fd.append('account', account);
      fd.append('company_name', businessName);
      fd.append('vba', vba);
      fd.append('abn', abn);
      fd.append('street', street);
      fd.append('suburb', suburb);
      fd.append('postcode', postcode);
      fd.append('state', state);

      function updateSuccess(user) { return { type: authConstants.UPDATE_SUCCESS, user } }

      authService.updateProfile(fd)
        .then(
          response => { 
              let resultCode = response.resultCode;
              if(resultCode === 10202002){
                let user = response.returnObj;

                dispatch(updateSuccess(user));
                alertActions.success("Your profile is updated successfully.","", false, 1500);
                      
              }else{
                  let message = response.returnObj;
                  alertActions.error("Update profile is failed.", message, true);
              }
          },
          error => {
              alertActions.error(error.toString());
          }
      );

    }
    else {
        alertActions.error("Oops...", 'Please make sure details you\'ve entered are correct!', true)
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Profile"
          titleTypographyProps={{variant:'h2' }}
          className="text-center"
        />
        <Divider />

        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>First Name: </FormLabel>
              <TextField
                fullWidth
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
              {errors.firstName.length > 0 && <span className='error'>{errors.firstName}</span>}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              >
              <FormLabel>Last Name: </FormLabel>
              <TextField
                fullWidth
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
              {errors.lastName.length > 0 && <span className='error'>{errors.lastName}</span>}
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Email: </FormLabel>
              <TextField
                fullWidth
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Phone: </FormLabel>
              <TextField
                fullWidth
                name="phone"
                onChange={handleChange}
                required
                value={values.phone}
                variant="outlined"
              />
              {errors.phone.length > 0 && <span className='error'>{errors.phone}</span>}
            </Grid>

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
                required
                value={values.bsb}
                variant="outlined"
                onInput = {(e) =>{
                  if (isNaN(parseInt(e.target.value))) {
                    e.target.value = e.target.value.slice(0,e.target.value.length-1);
                  }else{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
                  }
                }}
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
                required
                value={values.account}
                variant="outlined"
              />
              {errors.account.length > 0 && <span className='error'>{errors.account}</span>}
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <FormLabel>Tax File Number: </FormLabel>
              <TextField
                fullWidth
                name="tfn"
                onChange={handleChange}
                required
                value={values.tfn}
                variant="outlined"
                onInput = {(e) =>{
                  if (isNaN(parseInt(e.target.value))) {
                    e.target.value = e.target.value.slice(0,e.target.value.length-1);
                  }else{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,9)
                  }
                }}
              />
              {errors.tfn.length > 0 && <span className='error'>{errors.tfn}</span>}
            </Grid>           
        </Grid>
        <hr></hr>

        
        {
          people.role === "owner" ?
          <div>
            <strong>Business Information (if applicable)</strong>
            <Grid
            container
            spacing={3}
            style={{marginTop:"1rem"}}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormLabel>Business Name: </FormLabel>
                <TextField
                  fullWidth
                  name="businessName"
                  onChange={handleChange}
                  value={values.businessName}
                  variant="outlined"
                />
                {errors.businessName.length > 0 && <span className='error'>{errors.businessName}</span>}
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <FormLabel>ABN: </FormLabel>
                <TextField
                  fullWidth
                  name="abn"
                  onChange={handleChange}               
                  value={values.abn}
                  variant="outlined"
                  onInput = {(e) =>{
                    if (isNaN(parseInt(e.target.value))) {
                      e.target.value = e.target.value.slice(0,e.target.value.length-1);
                    }else{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,11)
                    }
                  }}
                />
                {errors.abn.length > 0 && <span className='error'>{errors.abn}</span>}
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <FormLabel>Street: </FormLabel>
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
                <FormLabel>Postcode: </FormLabel>
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
                <FormLabel>Suburb: </FormLabel>
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
                <FormLabel>State: </FormLabel>
                <TextField
                  fullWidth
                  name="state"
                  onChange={handleChange}              
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </div>
          :       
            <div>
              <strong>Business Information</strong>
              <Grid
                container
                spacing={3}
                style={{marginTop:"1rem"}}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormLabel>Business Name: </FormLabel>
                  <TextField
                    fullWidth
                    name="businessName"
                    onChange={handleChange}
                    required
                    value={values.businessName}
                    variant="outlined"
                  />
                  {errors.businessName.length > 0 && <span className='error'>{errors.businessName}</span>}
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormLabel>ABN: </FormLabel>
                  <TextField
                    fullWidth
                    name="abn"
                    onChange={handleChange}
                    required
                    value={values.abn}
                    variant="outlined"
                    onInput = {(e) =>{
                      if (isNaN(parseInt(e.target.value))) {
                        e.target.value = e.target.value.slice(0,e.target.value.length-1);
                      }else{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,11)
                      }
                    }}
                  />
                  {errors.abn.length > 0 && <span className='error'>{errors.abn}</span>}
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormLabel>VBA: </FormLabel>
                  <TextField
                    fullWidth
                    name="vba"
                    onChange={handleChange}
                    required
                    value={values.vba}
                    variant="outlined"
                    onInput = {(e) =>{
                      if (isNaN(parseInt(e.target.value))) {
                        e.target.value = e.target.value.slice(0,e.target.value.length-1);
                      }else{
                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,11)
                      }
                    }}
                  />
                  {errors.vba.length > 0 && <span className='error'>{errors.vba}</span>}
                </Grid>       

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormLabel>Street: </FormLabel>
                  <TextField
                    fullWidth
                    name="street"
                    required
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
                  <FormLabel>Postcode: </FormLabel>
                  <TextField
                    fullWidth
                    name="postcode"
                    onChange={handleChange}
                    required
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
                  <FormLabel>Suburb: </FormLabel>
                  <TextField
                    fullWidth
                    name="suburb"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.suburb}
                    variant="outlined"
                  >
                    {suburbArray.map((option) => (
                      <option
                          key={option}
                          value={option}
                        >
                          {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormLabel>State: </FormLabel>
                  <TextField
                    fullWidth
                    name="state"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.state}
                    variant="outlined"
                  >
                    {states.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>     
              </Grid>
            </div>
             
          }

          {
            people.role === "owner"?
            <Row style={{marginTop:"1.5rem", marginLeft: "0.4rem"}}>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormLabel>Please upload your <strong>Signature</strong> file <span style={{color: "red"}}>(.jpg/.jpeg/.png)</span></FormLabel>
                <input type='file' id="signature_file" accept=".jpg, .jpeg, .png" />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <div></div> 
              </Grid>
            </Row>
            :
            <Row style={{marginTop:"1.5rem", marginLeft: "0.4rem"}}>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormLabel>Please upload your <strong>Signature</strong> file<span style={{color: "red"}}> (.jpg/.jpeg/.png)</span></FormLabel>
                <input type='file' id="signature_file" accept=".jpg, .jpeg, .png"/>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <FormLabel>Please upload your <strong>Insurance</strong> file<span style={{color: "red"}}> (.pdf/.docx/.doc)</span></FormLabel>
                <input type='file' id="insurance_file" accept=".pdf, .docx,.doc" />
              </Grid>
            </Row>       
          }

       </CardContent>
        <Divider />

        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          {
            people !== undefined ?
            (
              people.role === "owner" ?
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  style={{marginRight: "3rem"}}
                  onClick={onSave}
                >
                  Save
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    to="/owner"
                    component={RouterLink}
                >
                    Back
                </Button>
              </div>
              :
              (
                people.role === "lead" ? 
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{marginRight: "3rem"}}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                  <Button
                      color="primary"
                      variant="contained"
                      to="/lead"
                      component={RouterLink}
                  >
                      Back
                  </Button>
                </div>
                :
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{marginRight: "3rem"}}
                    onClick={onSave}
                  >
                    Save
                  </Button>
                  <Button
                      color="primary"
                      variant="contained"
                      to="/contractor"
                      component={RouterLink}
                  >
                      Back
                  </Button>
                </div>
              )
            )
            : 
            <div>
              <Button
                color="primary"
                variant="contained"
                style={{marginRight: "3rem"}}
              >
                Save
              </Button>
              <Button
                  color="primary"
                  variant="contained"
              >
                  Back
              </Button>
            </div>
          }
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};


export default ProfileDetails;




                