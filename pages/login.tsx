import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { login } from "../redux/asyncThunk/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectToken } from "../redux/slices/authSlice";

const Login: NextPage = () => {
  const tk = useAppSelector(selectToken);
  const router = useRouter();

  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const { email, password } = dataLogin;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tk) router.push("/");
  }, [tk]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = dataLogin;
    dispatch(login(dataLogin));
  };

  return (
    <div>
      <Head>
        <title>Log in Page</title>
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChange}
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            We will never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChange}
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
          Login
        </button>
        <p>
          You don&apos;t have an account?{" "}
          <Link href={"/register"}>
            <a style={{ color: "crimson" }}>Register Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
