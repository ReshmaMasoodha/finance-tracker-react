export default function Dashboard ({data}){
  const totalincome= data.reduce((accumlator,data)=> {if (data.type == "income"){return accumlator+data.amount}
    return accumlator;
  },0)
  const totalExpense = data.reduce((accumulator, currentValue)=>{
    if (currentValue.type == "expense"){
      return accumulator+currentValue.amount;
    }
    return accumulator;
  },0);
  const netBalance = totalincome - totalExpense;
  return(
    <div>
   <p>Balance</p>{netBalance}
   </div>
  )
}