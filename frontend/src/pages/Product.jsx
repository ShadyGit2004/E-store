
import { useContext, useEffect, useState } from "react";
import axios from "../api/axios.config.jsx"
import ProductCard from "../components/ProductCard.jsx"
import { DataContext } from "../context/DataContext.jsx";
import { toast } from "react-toastify";

const Product = () => {

  const {user} = useContext(DataContext)

  const categoryArr = ["Electronics", "Books","Clothing","Sports","Home"]
  const [products, setProducts] = useState([])
  const [nextCursor, setNextCursor] = useState({})
  const [productCategory, setProductCategory] = useState("")
  const [createModal, setCreateModal] = useState(false)

  
  const handleDelete = async (id) => {
    try {
      const {data} = await axios.delete(`/products/delete/${id}`)
      fetchProducts()
      toast.success(data.message)
    } catch (e) {      
      toast.error(e)
    }
  }
 
  async function fetchProducts(limit = 20, type="", cursorUpdatedAt="", cursorId="") {
    
      // console.log(limit , type, cursorUpdatedAt, cursorId)      
      // console.log(products, nextCursor?.cursorId, products[products?.length-1]?.key)      
      // console.log((nextCursor?.cursorId != undefined  && products != undefined) && nextCursor?.cursorId === products[products?.length-1]?.key)      
      // if((nextCursor?.cursorId != undefined  && products != undefined) && nextCursor?.cursorId === products[products?.length-1]?.key){
      //     return console.log('no data')
      // } 
      const {data} = await axios.get(`/products?limit=${limit}&category=${type}&cursorUpdatedAt=${cursorUpdatedAt}&cursorId=${cursorId}`) 

      if(data.count){
        setProducts((prev) => [...prev, ...data?.products?.map((p)=>        
          <ProductCard key={p._id} details={p} deleteProduct={handleDelete} userRole={user?.role} />
        )])
        console.log(data)         
        setNextCursor(data?.nextCursor)
      }  
  } 

  function handleCategory(e) {
    const value = e.target.value  
    setProductCategory(value)
    setProducts([]);
    fetchProducts(20, value);
  }

  useEffect(() => {
    fetchProducts()
  }, [])  


  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/products/create", formData);
      toast.success(data.message);

      setFormData({
        name: "",
        price: "",
        category: "",
      });

      setCreateModal(false)
      fetchProducts()
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setCreateModal(false)
    }
  };

  return (
    <div className="py-8 p-6 bg-blue-800 h-screen w-screen">
      <h1 className="w-full pr-5 mb-5 inline-flex justify-between items-center"><span className="text-6xl">All Products</span> 
      {(user?.role == "admin") && <button className="border bg-blue-800 py-1 px-4 cursor-pointer" onClick={()=>setCreateModal(true)}>Add product</button>}
      </h1>
      
      {products ?
      (<div > 
        <select onChange={(e)=>{handleCategory(e)}} className="px-3 py-0.5 cursor-pointer block border my-3 text-2xl text-white bg-blue-800">
        {categoryArr.map((c, idx)=>
          <option key={idx} value={c}>{c}</option>
        )}
        </select>
        
        {(products.length > 0) && products.length + " Products"}
          <div className="flex flex-wrap gap-2">{products}</div>
          {products.length && <button className = "cursor-pointer border border-gray-400 text-2xl px-4 py-2 reounded" onClick={()=>{fetchProducts(20, productCategory, nextCursor?.cursorUpdatedAt, nextCursor?.cursorId)}}>Load products</button>}
        </div>
      ) : ("Loading...")}

      {(user?.role == "admin") && createModal && 
      (<div className="w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0000006f] flex items-center justify-center p-4">       
      <div className="relative bg-blue-900 w-full max-w-md shadow-lg rounded-xl p-6">
        <span onClick={()=>setCreateModal(false)} className="absolute top-3 right-1 cursor-pointer">close</span>
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border bg-blue-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
             {categoryArr.map((c, idx)=>
                <option key={idx} value={c}>{c}</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Product
          </button>

        </form>
      </div>
    </div>
  )}
    </div>
  )
}

export default Product

