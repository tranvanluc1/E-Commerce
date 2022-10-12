import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectAuth } from "../redux/slices/authSlice";

function Navbar() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isActive = (r: string) => {
    if (r === router.pathname) {
      return "active";
    } else return "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href={"/"}>
        <a className="navbar-brand">E-Commerce</a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href={"/cart"}>
              <a className={`nav-link ${isActive("/cart")}`}>
                <i className="fa fa-shopping-cart"></i> Cart
              </a>
            </Link>
          </li>
          {!auth.token ? (
            <li className="nav-item">
              <Link href={"/register"}>
                <a className={`nav-link ${isActive("/register")}`}>
                  <i className="fa fa-user"></i> Register
                </a>
              </Link>
            </li>
          ) : (
            <li className="nav-item dropdown d-inline">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={auth.user?.avatar}
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "3px",
                    transform: "translateY(-3px)",
                  }}
                />
                {auth.user.name}
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
                <div className="dropdown-divider"></div>
                <div onClick={() => dispatch(logout())}>
                  <a className="dropdown-item" href="">
                    Log out
                  </a>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
