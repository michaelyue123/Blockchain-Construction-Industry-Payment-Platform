import { projectService } from '../services';
import { alertActions } from './alert.action'

export const projectAction = {
    createProject
};

async function createProject(ownerId, projectTitle, street, projectDescription, suburb, postcode, state, dueDate,
     startDate, projectAmount, projectBsb, projectAccount, invitations){

    const response = await projectService.createProject(ownerId, projectTitle, street, projectDescription, suburb, postcode, state, dueDate,
        startDate, projectAmount, projectBsb, projectAccount, invitations);

    let resultCode = response.resultCode;

    if (resultCode === 10601001){
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