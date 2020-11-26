import { contractService } from '../services/contract.service';
import { alertActions } from '../actions';

export const contractAction = {
    createContract,
    getUserInfoByEmail,
    getProjectList
};

async function createContract (email, password, projectId, contractTitle, partyAEmail, partyBEmail, startDate, dueDate, contractAmount, 
    contractGst, retentionAmount, claimDate, description) {
    const message_1 = await contractService.createContract(email, password, projectId, contractTitle, partyAEmail, partyBEmail, 
                                                           startDate, dueDate, contractAmount, contractGst, retentionAmount, 
                                                           claimDate, description);
    
    if (message_1.resultCode === 10702001) {
        alertActions.success(
            "Successfully",
            message_1.returnObj,
            false,
            2000);
    }
    else {
        alertActions.error(
            "Oops...",
            message_1.returnObj,
            true);
    }
}

async function getUserInfoByEmail (email, password, companyId) {
    const message_1 = await contractService.getUserInfoByEmail(email, password, companyId);
    
    if (message_1.resultCode === 10702002) {
        return message_1.returnObj;
    }
    else {
        alertActions.error(
            "Oops...",
            message_1.returnObj,
            true);
    }
}

async function getProjectList (email, password) {
    const result = await contractService.getProjectList(email, password);

    if (result.resultCode === 10701001) {
        return result.returnObj;
    }
    else {
        alertActions.error(
            "Oops...",
            result.returnObj,
            true);
    }
}