import swal from 'sweetalert2';

export default class SwalAlertUtil {

    /**
     * show successful message
     * 
     * @param message 
     */
    static showSuccessMessage(message: string) {
        swal.fire({ position: 'top-end', icon: 'success', title: message, showConfirmButton: false, timer: 1500 })
    }

    /**
     * show error message
     * 
     * @param message 
     */
    static showErrorsMessage(message: string) {
        swal.fire({ position: 'top-end', icon: 'error', title: message, showConfirmButton: false, timer: 1500 })
    }
}
