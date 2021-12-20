import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

var ModalService = {
    basic: (title, message, cancelBtn = 'Ok') => {
        return MySwal.fire({
            title: title,
            html: message,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: cancelBtn,
        })
    },
    success: (message) => {
        return MySwal.fire({
            icon: 'success',
            title: '',
            html: message,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        })
    },
    error: (message) => {
        return MySwal.fire({
            icon: 'error',
            title: '',
            html: message,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        })
    },
    confirm: (message, callback, acceptBtn, cancelBtn) => {
        Swal.fire({
            title: message,
            showCancelButton: true,
            cancelButtonText: cancelBtn,
            confirmButtonText: acceptBtn,
        }).then((result) => {
            if (result.isConfirmed) {
                callback()
            }
        })
    }
};

export default ModalService;
