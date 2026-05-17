export default function TransactionTotal ({filteredList}){
  const categoryTotals = filteredList.reduce((accumulator, currentValue) => {
  const category = currentValue.category;
  if(accumulator[category]){
    accumulator[category] += Number(currentValue.amount);
  }
  else{
    accumulator[category] = Number(currentValue.amount);
  }
  return accumulator;
}, {});
  return(
    <>
    {Object.entries(categoryTotals).map(([category,total])=>(
    <p>{category}: ₹{total}</p>
    ))}
    </>
  )
}