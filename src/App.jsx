import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'

function App() {
  const [balance, setBalance] = useState([]);
  const addTransaction = (data) => {
    if(data != null){
      const addData = [...balance];
      addData.push(data)
      setBalance(addData);
    }
  }
  const deleteTransaction = (idToDelete) => {
    const filterDelete = balance.filter(bal=> {if (bal.id!=idToDelete){return true}else {return false}});
    setBalance(filterDelete);
  }
  const updateTransaction = (changeValue) => {
    const swapValues =[...balance];
    const temp = changeValue.value;
    swapValues[changeValue.id] = temp;
    setBalance(swapValues);
  }
  return (
    <>
      <div>
        <nav>
        <Link to="/">Dashboard</Link> | <Link to="/Transactions">Transactions</Link> 
      </nav>
        <Routes>
          <Route path="/" element={<Dashboard data={balance}/>} />
          <Route path="/Transactions" element={ <Transactions newTrans={addTransaction} deleteTrans={deleteTransaction} updateTrans={updateTransaction} />} />
        </Routes>
      </div>
    </>
  )
}

export default App
