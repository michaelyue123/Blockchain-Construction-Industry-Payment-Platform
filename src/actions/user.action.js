import { userService } from '../services'
import { alertActions } from './alert.action'

export const userActions = {
    getUser,
    getCompany
};

async function getUser(userId, role, email){

    const response = await userService.getUser(userId, role, email);

    let resultCode = response.resultCode;

    if (resultCode === 30303001 || resultCode === 30303002){
        alertActions.error("Oops...", response.returnObj, true);
        return;
    }else{
        let user = response.returnObj;
        return user;
    }

}

async function getCompany(companyId){

    const response = await userService.getCompany(companyId);

    let resultCode = response.resultCode;

    if (resultCode === 30303001 || resultCode === 30303004){
        alertActions.error("Oops...", response.returnObj, true);
        return;
    }else{
        let user = response.returnObj;
        return user;
    }

}