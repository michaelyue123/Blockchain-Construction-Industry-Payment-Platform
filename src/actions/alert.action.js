import { alertService } from '../services';

export const alertActions = {
    success,
    error,
    info,
    warning,
    informalInvite
};

function success(title, message, showConfirmButton, timer){
    alertService.success(title, message, showConfirmButton, timer);
}
function error(title, message, showConfirmButton){
    alertService.error(title, message, showConfirmButton);
}
function info(title, message, showConfirmButton){
    alertService.info(title, message, showConfirmButton);
}
function warning(title, message, confirm_btn_text, cancel_btn_text, confirm_func, cancel_func){
    alertService.warning(title, message, confirm_btn_text, cancel_btn_text, confirm_func, cancel_func);
}

function informalInvite(title, showCancelButton, preConfirm_func, confirmResult_func) {
    alertService.informalInvite(title, showCancelButton, preConfirm_func, confirmResult_func);
}