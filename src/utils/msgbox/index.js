import Swal from 'sweetalert2'

export function error(title, err) {
  Swal.fire(
    title,
    `${err}`,
    'error'
  )
}

export function success(title, msg) {
  Swal.fire(
    title,
    msg,
    'success'
  )
}
