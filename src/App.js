// import { useState } from "react";
// import "./App.css";

// function App() {

//   const [expenses, setExpenses] = useState([
//     { name: "Food", amount: 200 },
//     { name: "Travel", amount: 500 },
//     { name: "Shopping", amount: 1000 }
//   ]);

//   const [name, setName] = useState("");
//   const [amount, setAmount] = useState("");

//   const addExpense = (e) => {
//     e.preventDefault();

//     const newExpense = {
//       name: name,
//       amount: Number(amount)
//     };

//     setExpenses([...expenses, newExpense]);

//     setName("");
//     setAmount("");
//   };

//   const deleteExpense = (index) => {
//     const newExpenses = expenses.filter((_, i) => i !== index);
//     setExpenses(newExpenses);
//   };

//   const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

//   return (
//     <div className="container">
//       <h1>💰 Expense Tracker</h1>

//       <form onSubmit={addExpense}>
//         <input
//           type="text"
//           placeholder="Expense Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         <button type="submit">Add Expense</button>
//       </form>

//       <h2>Expense List</h2>

//       <ul>
//         {expenses.map((expense, index) => (
//           <li key={index}>
//             {expense.name} - ₹{expense.amount}
//             <button onClick={() => deleteExpense(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       <h2 className="total">Total Expense: ₹{total}</h2>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([
    { name: "Supermarket", amount: 85, date: "Oct 24, 2023", type: "expense", icon: "🛒" },
    { name: "Freelance Project", amount: 1200, date: "Oct 22, 2023", type: "income", icon: "💼" },
    { name: "Monthly Rent", amount: 1200, date: "Oct 01, 2023", type: "expense", icon: "🏠" }
  ]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    const val = Number(amount);
    const newEntry = {
      name: name,
      amount: Math.abs(val),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type: val >= 0 ? "income" : "expense",
      icon: "💰"
    };

    setExpenses([newEntry, ...expenses]);
    setName("");
    setAmount("");
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  // Calculations
  const income = expenses
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const spent = expenses
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - spent;

  return (
    <div className="app-container">
      <header className="header">
        <h1>WalletWise</h1>
      </header>

      <section className="balance-section">
        <div className="balance-card">
          <p className="label">CURRENT BALANCE</p>
          <h2 className="balance-amount">₹{balance.toLocaleString('en-IN')}</h2>
          <div className="stats-row">
            <div className="stat-box income">
              <span className="stat-label">Income</span>
              <span className="stat-value">+₹{income.toLocaleString('en-IN')}</span>
            </div>
            <div className="stat-box expenses">
              <span className="stat-label">Expenses</span>
              <span className="stat-value">-₹{spent.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="card">
          <h3>Add Transaction</h3>
          <form onSubmit={addExpense}>
            <div className="input-group">
              <label>Expense Name</label>
              <input
                type="text"
                placeholder="e.g. Weekly Groceries"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Amount</label>
              <input
                type="number"
                placeholder="₹0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button type="submit" className="add-btn">Add Expense</button>
          </form>
        </div>
      </section>

      <section className="list-section">
        <div className="card">
          <h3>Expense List</h3>
          <ul className="expense-list">
            {expenses.map((item, index) => (
              <li key={index} className="expense-item">
                <div className="item-info">
                  <div className="item-icon">{item.icon}</div>
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-date">{item.date}</p>
                  </div>
                </div>
                <div className="item-actions">
                  <span className={`item-amount ${item.type === 'expense' ? 'negative' : 'positive'}`}>
                    {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                  </span>
                  <button className="delete-btn" onClick={() => deleteExpense(index)}>
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-expense">
            <span>Total Expense:</span>
            <span className="total-highlight">₹{spent.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;