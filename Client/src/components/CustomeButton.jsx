
const CustomeButton = ({titile,containerStyle,iconRight,type,onClick}) => {
  return (
    <button onClick={onClick} type={type||"button"} className={`inline-flex items-center text-base ${containerStyle}`}>{titile}
    {iconRight&&<div className='ml-2'></div>}
    </button>
  )
}

export default CustomeButton