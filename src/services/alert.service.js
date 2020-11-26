import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const alertService = {
    success,
    error,
    warning,
    info,
    informalInvite
};

function success(title, message, showConfirmButton, timer) {
    MySwal.fire({
        position: 'center',
        icon: 'success',
        title: title,
        text: message,
        showConfirmButton: showConfirmButton,
        timer: timer
    });
}

function error(title, message, showConfirmButton) {
    MySwal.fire({
        position: 'center',
        icon: 'error',
        title: title,
        text: message,
        showConfirmButton: showConfirmButton,
    });
}

function info(title, message, showConfirmButton) {
    MySwal.fire({
        position: 'center',
        icon: 'info',
        title: title,
        text: message,
        showConfirmButton: showConfirmButton,
    });
}

function warning(title, message, confirm_btn_text, cancel_btn_text, confirm_func, cancel_func) {
    MySwal.fire({
        position: 'center',
        title: title,
        text: message,
        icon: 'warning',
        onClose: cancel_func,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirm_btn_text,
        cancelButtonText: cancel_btn_text
    }).then(confirm_func);
}


function informalInvite(title, showCancelButton, preConfirm_func, confirmResult_func) {
    MySwal.fire({
        title: title,
        input: 'email',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: showCancelButton,
        confirmButtonText: 'Add',
        showLoaderOnConfirm: true,
        preConfirm_func: preConfirm_func,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(confirmResult_func);
}