import React from "react";
import { useContext } from "react";
import { DataContext } from "../Data";
export default function Home() {
  const { allAmount, addCrypto, cryptoAmount, allMoney } = useContext(DataContext);

  return (
    <>
      <div className="row mx-2 g-3 ">
        <div className="col-lg-6 p-3 ">
          <div className="ms-1">
            <h3 className="fw-semibold c-text-primary ">
              <span>$</span>
              <span id="current-balance">{allMoney}</span>
            </h3>
            <p className="muted opacity-75"> All Money</p>
          </div>
          <div>
            <div className="d-flex gap-3  rounded bg-body " style={{ fontSize: 14 + "px" }}>
              <div className="flex-grow-1  bg-white  rounded-3 shadow-md p-3">
                <h6>All Amount</h6>

                <p className="c-text-primary fw-bold  fs-4  mb-0">
                  <span>$</span>
                  <span id="daily-limit">{allAmount}</span>
                </p>
              </div>
              <div className="flex-grow-1 rounded-3 p-3">
                <h6>Crypto Amount</h6>
                <p className="text-primary text-opacity-75 fw-bold  fs-4  mb-0">
                  <span>$</span>
                  <span id="monthly-limit">{cryptoAmount}</span>
                </p>
              </div>
            </div>
            <div className=" mt-2 ms-1 d-flex"></div>
          </div>
        </div>
        <div className="col-lg-6  p-lg-5 mb-4 ">
          <div className="mt-lg-5">
            <label htmlFor="make-transaction">Send Crypto</label>
            <input type="number" id="send-crypto" className="form-control border-0 shadow-md rounded-3 mb-3 mt-1  " placeholder="3,000" />
            <div className="d-flex  gap-5 ">
              <button onClick={addCrypto} className="btn btn-info  text-white flex-grow-1 shadow-md ">
                save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body p-4 bg-white rounded shadow-md ">
        <div className="table-responsive px-4  ">
          <table className="table text-nowrap mb-0  ">
            <thead className="text-dark fs-4">
              <tr>
                <th>
                  <h6 className="fw-semibold mb-0">Wallets</h6>
                </th>

                <th>
                  <h6 className="fw-semibold mb-0">Status</h6>
                </th>
                <th>
                  <h6 className="fw-semibold mb-0">Reward</h6>
                </th>
              </tr>
            </thead>
            <tbody id="recent-transactions  "></tbody>
          </table>
        </div>
      </div>
    </>
  );
}
