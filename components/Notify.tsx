import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { resetNotify, selectNotify } from "../redux/slices/authSlice";
import Loading from "./Loading";
import Toast from "./Toast";
let timeOutId = undefined;
const Notify = () => {
  const notify = useAppSelector(selectNotify);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notify.success || notify.error) {
      timeOutId = setTimeout(() => {
        dispatch(resetNotify());
      }, 3000);
    }
  }, [notify, dispatch]);

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          title="Error"
          bgColor="bg-danger"
          msg={notify.error}
          handleShow={() => dispatch(resetNotify())}
        />
      )}
      {notify.success && (
        <Toast
          title="Error"
          bgColor="bg-success"
          msg={notify.success}
          handleShow={() => dispatch(resetNotify())}
        />
      )}
    </>
  );
};
export default Notify;
