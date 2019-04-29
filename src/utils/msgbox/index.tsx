import Swal from "sweetalert2";

export function error(title: string, err: any) {
  return Swal.fire(title, `${err}`, "error");
}

export function success(title: string, msg: any) {
  return Swal.fire(title, msg, "success");
}

export function confirm(title: string, msg: any) {
  return Swal.fire({
    title: title,
    type: "info",
    text: msg,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  });
}
