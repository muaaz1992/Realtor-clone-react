import { useState } from "react"

export default function CreateListing() {
    function onChange(){

    }

    const [ formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: true,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        price: 0,
        discounted: 0,

    }); 

    const {
        type,
        name,
        bedrooms, 
        bathrooms, 
        parking, 
        furnished, 
        address, 
        description, 
        offer, 
        price, 
        discounted
        } = formData

  return (
    <main className="max-w-md mx-auto px-2">
       <h1 className="font-bold mt-6 text-3xl text-center">Create a Listing</h1> 
       <form>
            <p className="font-semibold mt-6 text-lg">Sell/Rent</p>
            <div className="flex">
                <button type="button" id="type" value="sale" onClick={onChange} 
                className={`mr-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    Sell
                </button>
                <button type="button" id="type" value="rent" onClick={onChange} 
                className={`ml-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    Rent
                </button>
            </div>
            
            <p className="font-semibold mt-6 text-lg">Name</p>
            
            <input type="text" id="name" value={name} onChange={onChange} placeholder="Name" maxLength={32} minLength={10} required 
              className="
              hover:border-red-400
              bg-white
              border-gray-400
              ease-in-out
              px-4
              py-2
              rounded
              text-gray-700
              text-xl transition 
              w-full
              duration-150
              focus:text-gray-700
              focus:bg-white
              focus:slate-600
                "/>

        
        <div className="flex mb-6 space-x-6">
                <div>
                    <p className="font-semibold mt-6 text-lg">Beds</p>
                    <input type="number" value={bedrooms} onChange={onChange} id="bedrooms" min="1" max="50" required    className="
                    hover:border-red-400
                    bg-white
                    border-gray-400
                    ease-in-out
                    px-4
                    py-2
                    text-center
                    text-xlg
                    rounded
                    text-gray-700
                    text-xl transition 
                    w-full
                    duration-150
                    focus:text-gray-700
                    focus:bg-white
                    focus:slate-600
                        "/>
                </div>
        <div>
                <p className="font-semibold mt-6 text-lg">Bathrooms</p>
                 <input type="number" value={bathrooms} onChange={onChange} id="bathrooms" min="1" max="50" required    className="
              hover:border-red-400
              bg-white
              border-gray-400
              ease-in-out
              px-4
              py-2
              text-center
              text-xlg
              rounded
              text-gray-700
              text-xl transition 
              w-full
              duration-150
              focus:text-gray-700
              focus:bg-white
              focus:slate-600
                "/>
            </div>

        </div>

        <p className="font-semibold mt-6 text-lg">Parking Spot</p>
            <div className="flex">
                <button type="button" id="parking" value={true} onClick={onChange} 
                className={`mr-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    !parking ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    Yes
                </button>
                <button type="button" id="parking" value={false} onClick={onChange} 
                className={`ml-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    parking ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    No
                </button>
            </div>

            <p className="font-semibold mt-6 text-lg">Furnished</p>
            <div className="flex">
                <button type="button" id="furnished" value={true} onClick={onChange} 
                className={`mr-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    Yes
                </button>
                <button type="button" id="furnished" value={false} onClick={onChange} 
                className={`ml-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    No
                </button>
            </div>

            <p className="font-semibold mt-6 text-lg">Address</p>
            <textarea type="text" id="address" value={address} onChange={onChange} placeholder="Address" required 
              className="
              hover:border-red-400
              bg-white
              border-gray-400
              ease-in-out
              px-4
              py-2
              rounded
              text-gray-700
              text-xl transition 
              w-full
              duration-150
              focus:text-gray-700
              focus:bg-white
              focus:slate-600
                "/>
            
            <p className="font-semibold mt-6 text-lg">Description</p>
            <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description" required 
              className="
              hover:border-red-400
              bg-white
              border-gray-400
              ease-in-out
              px-4
              py-2
              rounded
              text-gray-700
              text-xl transition 
              w-full
              duration-150
              focus:text-gray-700
              focus:bg-white
              focus:slate-600
                "/>

            <p className="font-semibold mt-6 text-lg">Offer</p>
            <div className="flex">
                <button type="button" id="offer" value={true} onClick={onChange} 
                className={`mr-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    !offer ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    Yes
                </button>
                <button type="button" id="parking" value={false} onClick={onChange} 
                className={`ml-3 px-7 shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                    offer ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}>
                    No
                </button>
            </div>

            <div className="flex items-center mb-6 mt-6">
                <div className="">
                        <p className="font-semibold text-lg">Regular Price</p>
                        <div className="flex items-center justify-center space-x-6 w-full">
                            <input type="number" value={price} onChange={onChange} id="price" min="1" max="100000" required    className="
                            hover:border-red-400
                            bg-white
                            border-gray-400
                            ease-in-out
                            px-4
                            py-2
                            text-center
                            text-xlg
                            rounded
                            text-gray-700
                            text-xl transition 
                            w-full
                            duration-150
                            focus:text-gray-700
                            focus:bg-white
                            focus:slate600
                                "/>
                                {type === "rent" && (
                                    <div>
                                        <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                                    </div>
                                )}
                        </div>
                 </div>
            </div>

           {offer && (
             <div className="flex items-center mb-6 mt-6">
                <div className="">
                        <p className="font-semibold text-lg">Discounted Price</p>
                        <div className="flex items-center justify-center space-x-6 w-full">
                            <input type="number" value={discounted} onChange={onChange} id="discounted" min="1" max="100000" required    className="
                            hover:border-red-400
                            bg-white
                            border-gray-400
                            ease-in-out
                            px-4
                            py-2
                            text-center
                            text-xlg
                            rounded
                            text-gray-700
                            text-xl transition 
                            w-full
                            duration-150
                            focus:text-gray-700
                            focus:bg-white
                            focus:slate-600
                                "/>
                                {type === "rent" && (
                                    <div>
                                        <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                                    </div>
                                )}
                        </div>
                 </div>
            </div>
           )}

           <div className="mb-6">
                <p className="font-semibold text-lg">Images</p>
                <p className="text-gray-600">The first image will be the cover (max 6 images)</p>
                <input type="file" id="images" onChange={onChange} accept=".jpg,.jpeg,.png" multiple required
                className="bg-white border border-gray-300 duration-150 ease-in-out focus:bg-white focus:border-slate-600 py-1.5 rounded text-gray-700 transition w-full"/>
           </div>

           <button type="submit" className="active:bg-blue-800 active:shadow-lg bg-blue-600 duration-150 ease-in-out focus:bg-blue-700 focus:shadow-lg font-md hover:bg-blue-700 hover:shadow-lg mb-6 px-4 py-2 rounded shadow-md text-center text-sm text-white transition uppercase w w-full">Create Listing</button>


       </form>
    </main>
  )
}
