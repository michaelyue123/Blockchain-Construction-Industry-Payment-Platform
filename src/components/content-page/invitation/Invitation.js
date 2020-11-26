import React, { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    FormLabel,
    makeStyles,
    List, 
    ListItem,
} from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { validateForm, validUsernameRegex, validEmailRegex } from '../../landing-page/validation/InputValidate';
import { alertActions, invitationAction } from '../../../actions';


// CSS style
const useStyles = makeStyles(() => ({
    listStyle: {
        fontSize: '1.15rem', 
        backgroundColor: 'azure', 
        marginLeft: '1rem', 
        borderRadius: '10px', 
        '&:hover': {
          animation: 'shake 1.5s'
        }
    },
    boxStyle: {
        backgroundColor: 'azure',
        height: '7rem',
        paddingLeft: '2rem'
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


const Invitation = ({ className, ...rest }) => {
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user);

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    const [inviteList, setInviteList] = useState([]);
    
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    // input validation + input value set
    const handleChange = async (e) => {
        if (e === undefined)
          return;

        const { name, value } = e.target;
    
        switch (name) {
            case 'first_name':
                errors.first_name = validUsernameRegex.test(value)
                    ? ''
                    : 'Please enter alphabetical character with first letter uppercase!';
                break;
            case 'last_name':
                errors.last_name = validUsernameRegex.test(value)
                    ? ''
                    : 'Please enter alphabetical character with first letter uppercase!';
                break;
            case 'email':
                errors.email = validEmailRegex.test(value)
                    ? ''
                    : 'Invalid email format. Please enter a valid email address!';
                break;
            default:
                break;
        }
    
        setValues({ ...values, [name]: value });
        setErrors(errors);
    };

    // add invitation details 
    const onClickAdd = () => {
        let newArray = [];
        if(values.first_name !== '' && values.last_name !== '' && values.email !== '') {
            newArray.push(...inviteList, values);
        }
        else {
            alertActions.error('Oops...', 'Please fill in all required details above!', true);
        }
        setInviteList(newArray);
    }

    // delete added invitation details
    const onClickDelete = (index) => {
        const newInviteList = [...inviteList];
        newInviteList.splice(index, 1)
        setInviteList(newInviteList);
    }

    // submit check + submit function
    const onFormSumbit = () => {
        if(validateForm())
        if(inviteList.length === 0) {
            alertActions.error('Oops...', 'Please fill in all required details above!', true);
        }
        else {
            invitationAction.inviteOthers(user.userId, inviteList);
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
                title="Invite others to join"
                className="text-center"
                titleTypographyProps={{variant:'h2' }}
                />
                <Divider />

                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        style={{ marginTop: "1rem", paddingLeft: "3rem", paddingRight: "3rem"  }}
                    >
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <FormLabel>First Name* </FormLabel>
                            <TextField
                                fullWidth
                                name="first_name"
                                onChange={handleChange}
                                required
                                value={values.first_name}
                                variant="outlined"
                            />
                            {errors.first_name.length > 0 && <span className='error'>{errors.first_name}</span>}
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <FormLabel>Last Name* </FormLabel>
                            <TextField
                                fullWidth
                                name="last_name"              
                                onChange={handleChange}
                                value={values.last_name}
                                variant="outlined"
                            />
                            {errors.last_name.length > 0 && <span className='error'>{errors.last_name}</span>}
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <FormLabel>Email* </FormLabel>
                            <TextField
                                fullWidth
                                name="email"              
                                onChange={handleChange}
                                value={values.email}
                                variant="outlined"
                            />
                            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                        </Grid>


                        <Button 
                            color="inherit"
                            variant="contained" 
                            style={{ borderRadius: "10px", margin: '2rem auto', width: '10rem'}}
                            onClick={onClickAdd}
                        > 
                            Add
                        </Button>
                    </Grid>
                </CardContent>
                <Divider />

                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        style={{ marginTop: "1rem", paddingLeft: "3rem", paddingRight: "3rem"  }}
                    >
                        {
                            inviteList.length !== 0 ?
                            inviteList.map((item, index) => ( 
                                <Grid 
                                    item
                                    md={6}
                                    xs={12}
                                    key={index}
                                >
                                    <List className={classes.boxStyle}>
                                        <span onClick={() => onClickDelete(index)} className={classes.listDeleteStyle}>&times;</span>
                                        <ListItem>Name: {item.first_name} {item.last_name}</ListItem>
                                        <ListItem>Email: {item.email}</ListItem>
                                    </List>
                                </Grid>
                            )) 
                            :
                            <div></div>
                        }
                    </Grid>

                </CardContent>

                <Button 
                    color="primary"
                    variant="contained" 
                    style={{ borderRadius: "10px", margin: '2rem auto', display: 'block', width: '10rem'}}
                    onClick={onFormSumbit}
                > 
                    Invite
                </Button>    
            </Card>
        </form>
    )
}

export default Invitation;
