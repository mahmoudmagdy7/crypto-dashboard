import { useContext } from "react";
import { DataContext } from "./Data";
import { Link, Navigate, useParams } from "react-router-dom";
import { House } from "@phosphor-icons/react";

export default function Dashboard() {
  const { walletId } = useParams(); // Get the current wallet index
  localStorage.setItem("current_wallet_index", walletId); // Store it in localStorage

  const { data, sendMoney, receiveMoney } = useContext(DataContext);

  return (
    <>
      {data[walletId] ? (
        <section>
          <Link
            className="d-block d-md-none text-decoration-none text-dark d-flex align-items-center justify-content-center  gap-2 bg-black bg-opacity-10 btn py-2 rounded"
            to="/"
          >
            <span className="">
              <House size={24} className="text-success bg" />
            </span>
            <span className="d-md-none d-lg-block"> Back To Dashboard</span>
          </Link>
          <div className="row mx-2 g-3 ">
            <div className="col-lg-6 p-3 ">
              <div className="ms-1">
                <h3 className="fw-semibold c-text-primary ">
                  <span>$</span>
                  <span id="current-balance">{data[walletId]?.currentBalance}</span>
                </h3>
                <p className="muted opacity-75">Current balance</p>
              </div>
              <div>
                <div className="d-flex gap-3  rounded bg-body " style={{ fontSize: 14 + "px" }}>
                  <div className="flex-grow-1  bg-white  rounded-3 shadow-md p-3">
                    <h6>Daily limit</h6>

                    <p className="c-text-primary fw-bold  fs-4  mb-0">
                      <span>$</span>
                      <span id="daily-limit">{data[walletId]?.dailyLimit}</span>
                    </p>
                  </div>
                  <div className="flex-grow-1 rounded-3 p-3">
                    <h6>Monthly limit</h6>
                    <p className="text-primary text-opacity-75 fw-bold  fs-4  mb-0">
                      <span>$</span>
                      <span id="monthly-limit">{data[walletId]?.monthlyLimit}</span>
                    </p>
                  </div>
                </div>
                <div className=" mt-2 ms-1 d-flex">
                  <p className="muted opacity-75">How much mony I can receive?</p>
                  <span className="fw-bold ms-2 c-text-primary ">
                    <span>$</span>
                    <span id="available-balance">{data[walletId]?.dailyLimit - data[walletId]?.availableBalance}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6  p-lg-5 mb-4 ">
              <div className="mt-lg-5">
                <div>
                  <label htmlFor="make-transaction">Make Transaction</label>
                  <input
                    type="number"
                    id="make-transaction"
                    className="form-control border-0 shadow-md rounded-3 mb-2 mt-1  "
                    placeholder="3,000"
                    onKeyUp={() => (document.querySelector("#transaction-warning").innerHTML = "")}
                  />
                  <p id="transaction-warning"></p>
                </div>
                <div className="d-flex  gap-5 ">
                  <button onClick={sendMoney} className="btn btn-success flex-grow-1 shadow-md ">
                    Send
                  </button>
                  <button onClick={receiveMoney} className="btn bg-warning bg-opacity-75  flex-grow-1 shadow-md ">
                    Receive
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body p-4 bg-white rounded shadow-md mb-4">
            <h5 className="card-title fw-semibold mb-4">Recent Transactions</h5>
            <div className="table-responsive  ">
              <table className="table text-nowrap mb-0 align-middle  mx-2  ">
                <thead className="text-dark fs-4">
                  <tr>
                    <th>
                      <h6 className="fw-semibold mb-0">Date</h6>
                    </th>

                    <th>
                      <h6 className="fw-semibold mb-0">Action</h6>
                    </th>
                    <th>
                      <h6 className="fw-semibold mb-0">Budget</h6>
                    </th>
                  </tr>
                </thead>
                <tbody id="recent-transactions ">
                  {data[walletId]?.transactions.map((b, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <h6 className="mb-1">{b.time}</h6>
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {b.action === "receive" ? (
                              <span style={{ fontSize: 14 + "px" }} className="  bg-warning bg-opacity-10 c-text-primary rounded-3 fw-semibold  px-2 py-1">
                                {b.action}
                              </span>
                            ) : (
                              <span style={{ fontSize: 14 + "px" }} className="  bg-info bg-opacity-10 text-info rounded-3 fw-semibold  px-2 py-1">
                                {b.action}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <h6 className="fw-semibold mb-0 fs-5 ">${b.budget}</h6>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="ERR_404" />
      )}
    </>
  );
}
