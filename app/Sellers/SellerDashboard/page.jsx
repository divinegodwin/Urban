"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import useUserAuth from "@/app/Auth/useUserAuth";
import Swal from "sweetalert2";
import supabase from "@/app/supabaseClient";
import Loader from "@/app/Loader";
const SellerDashboard = () => {

  const user = useUserAuth()

  const [plusIconIsClicked, setPlusIconIsClicked] = useState(false);
  const [isInserting, setIsInserting] = useState(false)

  const [imageUrl, setImageUrl] = useState("");

  const handleImage = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const filePath = selectedFile.name;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) {
        console.log("error uploading file", uploadError);
        Swal.fire({
          title: "Upload Error",
          text: "unable to upload image",
          icon: "error",
        });
        return;
      }
      console.log("image uploaded successfully ");

      const { data, error: urlError } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath)
      if (data) {
      
      const publicUrl = data.publicUrl;  // Get the URL string
      setImageUrl(publicUrl);
      console.log(publicUrl)  // Store only the string
      }else if(urlError){
        console.log('error fetching url', urlError)
      }
     
    
  }
  };
  const [formData, setFormData] = useState({
    productPic: "",
    category: "",
    productName: "",
    productDescription: "",
    productBrand: "",
    discountPrice: "",
    productPrice: "",
    currency: "",
    stockQuantity: "",
  });

  const handleChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const [formError, setFormError] = useState("");
  const SubmitProducts = () => {
    if (
      Object.values(formData).some((field) => field === null || field === "")
    ) {
      setFormError("All fields more be filled");
    }
    if (user && user?.id) {
      setIsInserting(true)
      const insertProductDetails = async () => {
        const { error } = await supabase.from("Seller_Products").insert({
          product_image: imageUrl,
          category: formData.category,
          product_name: formData.productName,
          product_description: formData.productDescription,
          product_brand: formData.product_brand,
          discount_price: formData.discountPrice,
          product_price: formData.productPrice,
          currency: formData.currency,
          stock_quantity: formData.stockQuantity,
          seller_id: user.id,
        });
        if (error) {
          console.log("error inserting data into seller_products", error);
          Swal.fire({
            title: "Oops!",
            text: "Your product failed to upload.",
            icon: "error",
          })
        } else {
          Swal.fire({
            title: "Upload Successfull!",
            text: "your item is now up for sale.",
            icon: "success",
          }).then(() => {
            console.log("success");
            setPlusIconIsClicked(false);
          });
        }
      };
      insertProductDetails();
    }
  };

  const ShowForm = () => {
    setPlusIconIsClicked(!plusIconIsClicked);
    return Swal.fire({
      title: "Registeration guide!",
      text: "Please make sure you fill in the correct details.",
      icon: "info",
    });
  };

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
  
   const  fetchSellerProducts = async() =>{
      try {
        const { data, error } = await supabase.from("Seller_Products")
        .select()
        .eq('seller_id', user.id)
          if(data){
            setProducts(data)
          }
      } catch (error) {
        console.log('can not fetch seller products', error)
        setLoading(false)
      }finally{
        setLoading(false)
      }
   }
   fetchSellerProducts()

  })
  return (
    <div>
      <Navbar />
      {loading && <Loader />}

      <div className="mt-[5rem] w-full">
        <svg
          onClick={ShowForm}
          className="w-[30px] float-right mr-2"
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
          ></path>
        </svg>
      </div>



        
      {products.length > 0 ? (
       
       <div className="mt-[1rem] grid py-6 grid-cols-2 p-2 gap-4 w-full ">
         {products.map((product) => {
           console.log(product.product_image)
           return(
           <div key={product.id} className=" w-[100%] h-fit pb-4  mb-3 bg-slate-200 text-center rounded-2xl shadow-lg ">
             <img src={product.product_image}></img>
             <p className="font-bold text-lg pt-4 ">{product.product_name}</p>
            
             <p className="font-mono text-lg font-bold">{product.currency}{product.product_price}</p>
           </div>
           
          )          
})
}

       </div>
     ) : (
       <p></p>
      
     )}
           
      {plusIconIsClicked && (
        <div className=" bg-white p-8 rounded-lg shadow-lg max-w-md m-auto w-full mt-[5rem] absolute top-8">
          <h2 className="text-2xl font-bold mb-1 ">Create a Product</h2>
          {formError && <p className="text-lg text-red-500 p-3">{formError}</p>}
          <div className="">
            <input
              onChange={handleImage}
              className="mb-6 "
              type="file"
              accept="image/*"
              name="productPic"
            />
          </div>

          <div className="mb-4">
            <label>Category</label>
            <select
              name="category"
              className="p-1 font-bold"
              onChange={handleChange}
              value={formData.category}
            >
              <option value="electronics">select the category </option>
              <option value="phones & tablets">phones & tablets </option>
              <option value="Laptops"> Laptops </option>
              <option value="Accessories"> Accessories </option>
              <option value="Wearables">Bags </option>
              <option value="Gaming"> Shirts</option>
              <option value="Food stuffs"> FoodStufs</option>
              
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="productName"
              placeholder="Product name"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <textarea
              type="text"
              name="productDescription"
              placeholder="Product description"
              className="w-full h-[100px] p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
              onChange={handleChange}
            />
          </div>

          {isInserting && <Loader />}

          <div className="mb-4">
            <input
              type="text"
              name="productBrand"
              placeholder="Product brand"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <input
              onChange={handleChange}
              type="number"
              name="discountPrice"
              placeholder="Discount price"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            />
          </div>

          <div className="mb-4">
            <input
              onChange={handleChange}
              type="Number"
              name="productPrice"
              placeholder="Product price"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            />
          </div>

          <div className="mb-4">
            <select
              name="currency"
              className="p-1 font-bold"
              onChange={handleChange}
              value={formData.currency}
            >
              <option value="">Select a currency</option>
              <option value="N"> N </option>
              <option value="$">$ </option>
              <option value="£">£ </option>
            </select>
          </div>

          <div className="mb-4">
            <input
              onChange={handleChange}
              type="number"
              name="stockQuantity"
              placeholder="Stock Quantity"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            />
          </div>

          <button
            onClick={SubmitProducts}
            className="center p-3 bg-[#1746c3] h-[50px] text-white rounded-lg"
          >
            SUBMIT
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
