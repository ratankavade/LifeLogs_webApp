
interface ConfirmDialogProps {
    open: boolean;
    message: string;
    onConfirm: ()=> void;
    onCancel: ()=> void;
}
const ConfirmAlert = ({open, message, onConfirm, onCancel}: ConfirmDialogProps) => {
    if(!open) return null;
  return (
    <div>
        <dialog id="confirmation_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
              <button className="btn btn-soft btn-accent hover:text-white" onClick={onConfirm}>Confirm</button>
              <button className="btn btn-soft btn-error hover:text-white" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </dialog>
    </div>
  )
}

export default ConfirmAlert
