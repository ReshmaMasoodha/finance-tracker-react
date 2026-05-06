import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'

function App() {
  const [balance,setBalance] = useState(() => {
        const stored = localStorage.getItem('balance');
        const storedValue = JSON.parse(stored)
        const dateArray = storedValue.map(item => {
          item.date = new Date(item.date);
         return item} );
        return stored ? storedValue : [];
    });
    
  useEffect(() => {
        localStorage.setItem('balance', JSON.stringify(balance));
    }, [balance]);
  const totalExpense = balance.reduce((accumulator, currentValue)=>{
    if (currentValue.type == "expense"){
      return accumulator+Number(currentValue.amount);
    }
    return accumulator;
  },0);
  const totalIncome = balance.reduce((accumulator, currentValue)=>{
    if (currentValue.type == "income"){
      return accumulator+Number(currentValue.amount);
    }
    return accumulator;
  },0);
  const netBalance = totalIncome - totalExpense;
  const data={totalIncome:totalIncome,
  totalExpense:totalExpense,
  netBalance:netBalance}
  const addTransaction = (data) => {
    if(data != null){
      const addData = [...balance];
      addData.push(data)
      setBalance(addData);
    }
  }
  const deleteTransaction = (idToDelete) => {
    const filterDelete = balance.filter(bal=> {if (bal.id!=Number(idToDelete)){return true}else {return false}});
    setBalance(filterDelete);
  }
  const updateTransaction = (changeValue,editId) => {
    const swapValues = balance.map(tran => {
      if(tran.id == editId) {
        return changeValue;
      }
      else{
        return tran;
      }
    });
    setBalance(swapValues);
  }
  return (
    <>
      <div>
        <nav>
        <Link to="/">Dashboard</Link> | <Link to="/Transactions">Transactions</Link> 
      </nav>
        <Routes>
          <Route path="/" element={<Dashboard data={data}/>} />
          <Route path="/Transactions" element={ <Transactions display={balance} newTrans={addTransaction} deleteTrans={deleteTransaction} updateTrans={updateTransaction}
          totals = {data}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
