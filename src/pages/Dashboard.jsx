export default function Dashboard ({data}){
  return(
    <div>
      <h2 style ={{padding: '10px',
marginBottom: '15px',
gap: '10px'}}> Money Tracker</h2>
    <p>Track your Income and Expenses</p>
   <p>Balance</p>{data.netBalance}
   </div>
  )
}