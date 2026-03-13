export default function Popup({confirm,id,children}){
  const handleconfirm = () => {
    confirm(true)
    
  }
  const handleCancel = () => {
    confirm(false)
  }
  return(
    <div style ={{position:"fixed",top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,}} onClick={handleCancel}>
      <div style={{background: "gray",
      padding: "20px",
      borderRadius: "5px",
      zIndex: 1001,}} onClick={(e) => {e.stopPropagation()}}>
      {children}
    
    <button onClick={handleconfirm}>
      Confirm
    </button>
    <button onClick={handleCancel}>
      Cancel
    </button> 
    </div>
    </div>
    )
}