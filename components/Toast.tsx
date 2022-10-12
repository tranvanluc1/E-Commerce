interface Props {
  title: string;
  msg: string;
  handleShow: () => void;
  bgColor: string;
}

const Toast = ({ title, msg, handleShow, bgColor }: Props) => {
  return (
    <div
      className={`toast position-fixed ${bgColor} text-light show`}
      data-autohide="false"
      style={{ top: "7%", right: "5px", zIndex: "9", minWidth: "280px" }}
    >
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className="mr-auto">{title}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
      <div className="toast-body">{msg}</div>
    </div>
  );
};

export default Toast;
