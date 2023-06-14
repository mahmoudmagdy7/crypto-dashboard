import { useEffect, useState } from "react";
import { createContext } from "react";
import Wallet from "./Components/Wallet";
export const DataContext = createContext(); // Creating the store

function Data({ children }) {
  // Declare all needed variables
  const [allAmount, setAllAmount] = useState(JSON.parse(localStorage.getItem("all_amount")) ?? 0); // "??" means will set a default value if the first value is undefined or null or false
  const [cryptoAmount, setCryptoAmount] = useState(JSON.parse(localStorage.getItem("crypto_amount")) ?? 0);
  const [allMoney, setAllMoney] = useState(JSON.parse(localStorage.getItem("all_money")) ?? 0);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("Data")) ?? [
      {
        id: 0,
        amount: 0,
        number: "01061005364",
        dailyLimit: 30000,
        monthlyLimit: 100000,
        availableBalance: 0,
        currentBalance: 0,
        transactions: [],
      },
    ]
  );
  const [searchResult, setSearchResult] = useState([]);

  const transactionTime = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour12: true,
    // second: '2-digit', // If you want to get the exact time
    minute: "2-digit",
    hour: "2-digit",
  });
  let currentWalletIndex = localStorage.getItem("current_wallet_index"); // Current wallet id or index in the data array

  function search() {
    const searchInput = document.getElementById("search-input").value; // Get the search input value
    const filteredArray = data.filter(function (wallet) {
      // Loop of the wallets array
      return wallet.number.includes(searchInput); // Check if the search value matches with any wallet number
    });
    setSearchResult(
      filteredArray.map((i, idx) => {
        return <Wallet key={idx} i={i} />; // Rerender the page
      })
    );
  }
  function sendMoney() {
    //Send mony function in custom wallet
    let transactionInput = document.querySelector("#make-transaction");
    let transactionWarning = document.querySelector("#transaction-warning");
    if (transactionInput.value > 0 && transactionInput.value !== "") {
      if (transactionInput.value <= data[currentWalletIndex].dailyLimit) {
        if (transactionInput.value <= data[currentWalletIndex].currentBalance) {
          const updatedItem = {
            // Updated data
            id: +currentWalletIndex,
            amount: data[currentWalletIndex].amount - +transactionInput.value,
            number: data[currentWalletIndex].number,
            dailyLimit: data[currentWalletIndex].dailyLimit - +transactionInput.value,
            monthlyLimit: data[currentWalletIndex].monthlyLimit - +transactionInput.value,
            availableBalance: data[currentWalletIndex].availableBalance - +transactionInput.value,
            currentBalance: data[currentWalletIndex].currentBalance - +transactionInput.value,
            transactions: [
              {
                time: transactionTime,
                action: "send",
                budget: +transactionInput.value,
              },
              ...data[currentWalletIndex].transactions,
            ],
          };
          data.splice(currentWalletIndex, 1, updatedItem); // Remove current wallet and replace with new one updatedItem
          localStorage.setItem("Data", JSON.stringify(data)); // Update the data in localStorage
          setData(JSON.parse(localStorage.getItem("Data"))); // Rerender the page
          transactionInput.value = "";
        } else {
          transactionWarning.innerHTML = "Your balance is not enough";
        }
      } else {
        transactionWarning.innerHTML = "You have reached the daily limit";
      }
    } else {
      transactionWarning.innerHTML = "The value can not be less than one or empty";
    }
  }

  function receiveMoney() {
    //Receive mony function in custom wallet
    let transactionInput = document.querySelector("#make-transaction");
    let transactionWarning = document.querySelector("#transaction-warning");

    if (transactionInput.value > 0 && transactionInput.value !== "") {
      // if (transactionInput.value <= data[currentWalletIndex].dailyLimit + data[currentWalletIndex].availableBalance) {
      const updatedItem = {
        id: +currentWalletIndex,
        amount: data[currentWalletIndex].amount + +transactionInput.value,
        number: data[currentWalletIndex].number,
        dailyLimit: data[currentWalletIndex].dailyLimit,
        monthlyLimit: data[currentWalletIndex].monthlyLimit,
        availableBalance: data[currentWalletIndex].availableBalance + +transactionInput.value,
        currentBalance: data[currentWalletIndex].currentBalance + +transactionInput.value,
        transactions: [
          {
            time: transactionTime,
            action: "receive",
            budget: +transactionInput.value,
          },
          ...data[currentWalletIndex].transactions,
        ],
      };
      data.splice(currentWalletIndex, 1, updatedItem); // Remove current wallet and replace with new one updatedItem
      localStorage.setItem("Data", JSON.stringify(data)); // Update the data in localStorage
      setData(JSON.parse(localStorage.getItem("Data"))); // Rerender the page
      transactionInput.value = ""; // Clear the input field
      // } else {
      //   transactionWarning.innerHTML = "You can not receive more transaction today";
      // }
    } else {
      transactionWarning.innerHTML = "The value can not be less than one or empty";
    }
  }

  function addNewWallet(e) {
    e.preventDefault();
    let walletNumber = document.querySelector("#wallet-number"); // Select the input field
    if (walletNumber.value.match(/^01[0|1|2|5]\d{8}/)) {
      let validationResult; // store the checking result
      for (const a of data) {
        // Detect if the input value matches any exist wallet
        if (a.number == walletNumber.value) {
          validationResult = true;
          break; // Stop the loop
        } else if (a.id == data.length - 1) {
          validationResult = false;
          break;
        }
      }
      // validationResult;
      if (!validationResult) {
        const newWallet = {
          id: data[data.length - 1].id + 1, // Make the id dynamic get the previous id and increase it by one
          // Default values
          amount: 0,
          number: walletNumber.value,
          dailyLimit: 30000,
          monthlyLimit: 100000,
          availableBalance: 30000,
          currentBalance: 0,
          transactions: [],
        };
        data.push(newWallet); // Add the new wallet to the data
        localStorage.setItem("Data", JSON.stringify(data)); // Update the data in localStorage
        setData(JSON.parse(localStorage.getItem("Data"))); // Rerender the page
        walletNumber.value = ""; // Clear the input field
        search(); // Make sure that the added wallet in the wallet lis and if it matches the search show it
      } else {
        document.getElementById("wallet-warning").classList.remove("d-none");
        document.getElementById("wallet-warning").innerHTML = "This number is already in use";
      }
    } else {
      document.getElementById("wallet-warning").innerHTML = "Please enter a valid wallet number";
      document.getElementById("wallet-warning").classList.remove("d-none");
    }
  }

  function addCrypto() {
    let sendCryptoInput = document.querySelector("#send-crypto"); // Select the input field
    // Set the crypto amount value in localStorage with the current value + the input field value
    localStorage.setItem("crypto_amount", +localStorage.getItem("crypto_amount") + +sendCryptoInput.value);
    setCryptoAmount(+localStorage.getItem("crypto_amount")); // Rerender the page
    sendCryptoInput.value = ""; //Clear the input field
  }

  useEffect(() => {
    let amount = 0;
    for (const wallet of data) {
      // Loop on all amounts in all wallets
      amount += wallet.amount; // Store all amounts in amount variable
    }

    localStorage.setItem("all_amount", JSON.stringify(amount)); // Update the all_amount in localStorage
    setAllAmount(JSON.parse(localStorage.getItem("all_amount"))); // Rerender the page

    localStorage.setItem("all_money", JSON.stringify(cryptoAmount + amount)); // Update the all_money in localStorage
    setAllMoney(JSON.parse(localStorage.getItem("all_money"))); // Rerender the page

    setInterval(function () {
      const day = new Date().getDate().toString();

      if (day !== localStorage.getItem("current_day")) {
        for (const wallet of data) {
          // Loop for all wallets
          wallet.dailyLimit = 30000; // Update daily limit for all wallets
        }
        localStorage.setItem("Data", JSON.stringify(data)); // Update the data in localStorage
        localStorage.setItem("current_day", day); // Update the current day
        setData(JSON.parse(localStorage.getItem("Data"))); // Rerender the page
      }
    }, 1000);
    setInterval(function () {
      const month = (new Date().getMonth() + 1).toString(); // Javascript must add 1 to get the right month number

      if (month !== localStorage.getItem("current_month")) {
        for (const wallet of data) {
          // Loop for all wallets
          wallet.monthlyLimit = 100000; // Update monthly limit for all wallets
        }
        localStorage.setItem("Data", JSON.stringify(data)); // Update the data in localStorage
        localStorage.setItem("current_month", month); // Update the current month
        setData(JSON.parse(localStorage.getItem("Data"))); // Rerender the page
      }
    }, 1000);
  }, [cryptoAmount, data]); // Rerender the page id any one of the dependencies value change

  return (
    //Provide the application with the context
    <DataContext.Provider
      value={{
        currentWalletIndex,
        data,
        sendMoney,
        receiveMoney,
        addNewWallet,
        allMoney,
        addCrypto,
        cryptoAmount,
        allAmount,
        searchResult,
        search,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default Data;
