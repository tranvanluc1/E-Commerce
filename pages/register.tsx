import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { register } from "../redux/asyncThunk/auth";
import valid from "../utils/valid";
import { notify, selectToken } from "../redux/slices/authSlice";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useAppDispatch();
  const tk = useAppSelector(selectToken);
  const router = useRouter();
  const [dataUser, setDataUser] = useState(initialState);
  const { name, email, password, confirmPassword } = dataUser;

  useEffect(() => {
    if (tk) router.push("/");
  }, [tk]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) return dispatch(notify({ error: errMsg }));
    dispatch(register(dataUser));
  };
  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>
      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
            name="name"
            value={name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={email}
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We&apos;ll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChange}
            value={password}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChange}
            value={confirmPassword}
          ></input>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          ></input>
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="w-100 btn btn-dark">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link href={"/login"}>
            <a style={{ color: "crimson" }}>Login Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
