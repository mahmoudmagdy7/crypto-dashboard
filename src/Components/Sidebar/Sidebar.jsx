import React from "react";
import "../Sidebar/Sidebar.css";
import { House } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column my-3  align-items-stretch">
        <figure style={{ height: 4 + "vw" }}>
          <img
            src="https://web3pros.dev/images/logo/full_logo_horizontal.svg?imwidth=384"
            alt=""
            className="h-100"
          />
        </figure>
        <ul className="list-unstyled mt-3 ">
          <li className=" mb-3 active py-2 px-3 rounded cursor-pointer">
            <Link className="text-decoration-none text-dark d-flex align-items-center justify-content-center  gap-2" to="/">
              <span className="">
                <House size={24} className="text-success bg" />
              </span>
              <span className="d-md-none d-lg-block"> Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
