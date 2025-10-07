
const Toast = ({message}:{message: string}) => {
  return (
    <div className="toast toast-center toast-middle">
        <div className="alert alert-success">
            <span>{message}</span>
        </div>
    </div>
  )
}

export default Toast
