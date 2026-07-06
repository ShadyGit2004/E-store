
const ProductCard = ({details, deleteProduct, userRole}) => {    
  const {name, price, category, _id} = details 

  return (
     <div className="w-fit p-6 my-3 flex flex-col justify-center border border-slate-600">
            <h1>Name - {name}</h1>
            <span>Price - {price}&#8377;</span>
            <span>Category - {category}</span>
            {(userRole == "admin") && <span onClick={()=>{deleteProduct(_id)}} className="cursor-pointer w-fit border border-blue-300 py-1 px-2 mt-3">Delete</span>}
    </div>
  )
}

export default ProductCard
