import { contactService } from '../services/contact.service';
import { alertActions } from '../actions';

export const contactAction = {
    sendContactInfo
};

async function sendContactInfo (name, email, phone, message) {
    const message_1 = await contactService.sendContactService(name, email, phone, message);
    
    if (message_1.resultCode === 10101001) {
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