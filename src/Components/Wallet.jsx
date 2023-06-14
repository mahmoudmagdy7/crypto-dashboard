import React from "react";
import { Link } from "react-router-dom";

export default function Wallet({ i }) {
  return (
    <>
      <Link className="wallets-container text-decoration-none text-dark" to={"/" + i.id}>
        <div className="wallet bg-white p-2 border-light border rounded-2 d-flex gap-2 my-3 shadow-sm ">
          <figure style={{ width: 40 + "px", height: 40 + "px" }} className="m-0  d-flex  p-1">
            <img
              className="w-100"
              src={
                i.number[2] === "0"
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/239px-Vodafone_icon.svg.png"
                  : i.number[2] === "1"
                  ? require("../images/etisalat_cash.webp")
                  : i.number[2] === "2"
                  ? require("../images/Orange_Cash.png")
                  : require("../images/we_pay.png")
              }
              alt={
                i.number[2] === "0"
                  ? "Vodafone Cash"
                  : i.number[2] === "1"
                  ? "Etisalat cash"
                  : i.number[2] === "2"
                  ? "Orange cash"
                  : "WE pay"
              }
            />
          </figure>
          <div className="d-flex justify-content-between flex-grow-1">
            <div>
              <h6 className="mb-0 fs-6 fw-bold">{i.number}</h6>
              <p style={{ fontSize: 14 + "px" }} className="m-0 opacity-50">
                {i.number[2] === "0"
                  ? "Vodafone Cash"
                  : i.number[2] === "1"
                  ? "Etisalat cash"
                  : i.number[2] === "2"
                  ? "Orange cash"
                  : "WE pay"}
              </p>
            </div>
            <span className="fw-bold opacity-75 text-muted "> ${i.amount}</span>
          </div>
        </div>
      </Link>
    </>
  );
}
