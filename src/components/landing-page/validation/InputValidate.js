import { API_POSTCODE_SUBURB } from '../../../constants';

const validEmailRegex =
    RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const validUsernameRegex = RegExp(/^[A-Z][A-Za-z]+([A-Za-z]+)+$/);

const validPhoneNumber = RegExp(/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/);

const validBusinessName = RegExp(/^((?![\^!@#$*~ <>?]).)((?![\^!@#$*~<>?]).){0,73}((?![\^!@#$*~ <>?]).)$/);

const validPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

const validBSB = RegExp(/^\d{3}-?\d{3}$/);

const validAccount = RegExp(/^(\d{8}|\d{9})$/);

const validStreetAddress = RegExp(/^[a-zA-Z0-9\s,'-]*$/);

// valid postcode
async function validPostcode (postcode) {
    
    const response = await fetch(API_POSTCODE_SUBURB + `/postalCodeSearchJSON?postalcode=${postcode}&country=AU&username=adslbbcc1023`);

    const response_1 = await handleResponse(response);

    return response_1;
}

// handle API response
const handleResponse = (response) => {
    return response.text().then(text => {
        const data = JSON.parse(text);

        if(!response.ok) {
            if(response.status === 401) {
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}

// validate form
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 &&
            (valid = false)
    );
    return valid;
}

// validate TFN
function validTFN(tfn) {
    //remove spaces and update
    tfn = tfn.replace(/\s+/g, '');
    
    //remove hyphens and update
    tfn = tfn.replace(/[-]/g, '');
   
    //validate only digits
    var isNumber = /^[0-9]+$/.test(tfn);
    if(!isNumber) {
       return 'Invalid TFN, only numbers are allowed!';
    }
    else {
        //validate length
        var length = tfn.length;
        if(length !== 9) {
            return 'Invalid TFN, must have 9 digits!';
        }
        else {
            var digits = tfn.split('');
            
            //do the calcs
            var sum = (digits[0]*1)
                    + (digits[1]*4)
                    + (digits[2]*3)
                    + (digits[3]*7)
                    + (digits[4]*5)
                    + (digits[5]*8)
                    + (digits[6]*6)
                    + (digits[7]*9)
                    + (digits[8]*10);

            var remainder = sum % 11;

            if(remainder === 0) {
                return '';
            } else {
                return 'Invalid TFN, check the digits!';
            }
        }
    }
}
    

// validate ABN

function validateABN(abn) {
    var isValid = true;

    //remove all spaces
    abn = abn.replace(/\s/g, '');

    //0. ABN must be 11 digits long
    isValid &= abn && /^\d{11}$/.test(abn);

    if(isValid){

        var weightedSum = 0;
        var weight = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

        //Rules: 1,2,3  
        for (var i = 0; i < weight.length; i++) {
            weightedSum += (parseInt(abn[i]) - ((i === 0) ? 1 : 0)) * weight[i]; 
        }

        //Rules: 4,5                 
        isValid &= ((weightedSum % 89) === 0);
    }

    return isValid;
};


// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};



export { validEmailRegex, validateForm, validUsernameRegex, validPhoneNumber, validBusinessName, validPassword, validBSB, validateABN, validAccount, validStreetAddress, validPostcode, validTFN, isValidDate };
