import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useContext } from "react";
import { DataContext } from "../Data";
import Wallet from "./Wallet";
export default function Layout() {
  const { data, addNewWallet, search, searchResult } = useContext(DataContext);

  return (
    <div className="container-fluid">
      <div className="row position-relative">
        <aside className="col-md-2 col-sm-6 d-none d-md-block  bg-white  ">
          <Sidebar />
        </aside>
        <main className="col-md-10 px-4 bg-lighter">
          {/* heading  */}

          <h1 className="fs-3 fw-semibold mt-4 pt-2 mb-0 c-text-primary">Transactions Dashboard</h1>
          <p className="muted ms-2 mb-4 opacity-75 ">Slogan will be here !</p>
          <div className="row ">
            {/* Wallets history */}
            <section className="col-sm-9 m-auto col-lg-4 bg-white p-3 rounded-3 shadow-md">
              <div className="  rounded ">
                <h5 className="text-dark mb-3">Wallets history </h5>
                <input id="search-input" onKeyUp={search} className="form-control rounded-5 border-light mb-3  bg-light" type="text" placeholder="search" />
              </div>
              <div className="wallets-transactions rounded">
                {searchResult.length === 0
                  ? data?.map((i, idx) => {
                      return <Wallet key={idx} i={i} />;
                    })
                  : searchResult}
              </div>

              <form onSubmit={addNewWallet} onChange={() => document.getElementById("wallet-warning").classList.add("d-none")}>
                <button id="submit-wallet" type="submit" className="btn btn-info text-white w-100 mt-2 ">
                  Add Wallet
                </button>
                <input id="wallet-number" maxLength={11} className="form-control mt-2" placeholder="Wallet Number" />
                <p id="wallet-warning" className="ms-3 mb-0 mt-2 d-none c-text-primary"></p>
              </form>
            </section>
            <section className=" col-lg-8  mx-auto col-lg-4 mt-3 mt-lg-0 ">
              <Outlet /> {/* main content in the right side*/}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
