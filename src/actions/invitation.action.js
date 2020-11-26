import { invitationService } from '../services';
import { alertActions } from './alert.action'

export const invitationAction = {
    inviteOthers
};

async function inviteOthers(userId, inviteList){

    const response = await invitationService.inviteOthers(userId, inviteList);

    let resultCode = response.resultCode;

    if (resultCode === 10304001){
        alertActions.success(
            "Successfully",
            response.returnObj,
            false,
            2000);
    }else{
        alertActions.error(
            "Oops...",
            response.returnObj,
            true);
    }
}