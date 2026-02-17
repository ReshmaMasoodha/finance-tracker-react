export default function Dashboard ({data}){
  const total= data.reduce((accumlator,data)=> {return accumlator+data.amount},0)
  
  return(
    <div>
   <p>Balance</p>{total}
   </div>
  )
}