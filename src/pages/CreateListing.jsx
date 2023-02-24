import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [geolocationEnabled, setGetLocationEnabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: true,
    furnished: true,
    address: "",
    description: "",
    offer: true,
    price: +0,
    discounted: +0,
    latitude: 0,
    longitude: 0,
    images: {},
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
    discounted,
    latitude,
    longitude,
    images,
  } = formData;

  function onChange(e) {
    let boolean = null;
    //True/False Boolean
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    //Discounted Price Toast Error
    if (+discounted >= +price) {
      setLoading(false);
      toast.error("Discounted price needs to be less than the Regular price");
      return;
    }
    //More Images than 6 Toast Error
    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images are allowed");
      return;
    }
    // GeolOcation geocoding api
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https//maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_API_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error("Please enter valid Address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    //Upload Images individually to database

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);

        const uploadTask = uploadBytesResumable(storageRef, image);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    //Image Mapping
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timeStamp: serverTimestamp(),
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discounted;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md mx-auto px-2">
      <h1 className="font-bold mt-6 text-3xl text-center">Create a Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="font-semibold mt-6 text-lg">Sell/Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 shadow-md border border-transparent font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                ${
                  type === "rent"
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`ml-3 px-7 border border-transparent shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                  type === "sale"
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            Rent
          </button>
        </div>

        <p className="font-semibold mt-6 text-lg">Name</p>

        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength={50}
          minLength={5}
          required
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
                "
        />

        <div className="flex mb-6 space-x-6">
          <div>
            <p className="font-semibold mt-6 text-lg">Beds</p>
            <input
              type="number"
              value={bedrooms}
              onChange={onChange}
              id="bedrooms"
              min="1"
              max="50"
              required
              className="
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
                        "
            />
          </div>
          <div>
            <p className="font-semibold mt-6 text-lg">Bathrooms</p>
            <input
              type="number"
              value={bathrooms}
              onChange={onChange}
              id="bathrooms"
              min="1"
              max="50"
              required
              className="
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
                "
            />
          </div>
        </div>

        <p className="font-semibold mt-6 text-lg">Parking Spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 border border-transparent shadow-md font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                  !parking
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 shadow-md border border-transparent font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                  parking
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            No
          </button>
        </div>

        <p className="font-semibold mt-6 text-lg">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 shadow-md border border-transparent font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                  !furnished
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 shadow-md border border-transparent font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                  furnished
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            No
          </button>
        </div>

        <p className="font-semibold mt-6 text-lg">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          required
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
                "
        />

        {!geolocationEnabled && (
          <div className="flex space-x-6">
            <div className="">
              <p className="font-semibold mt-6 text-lg">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                min="-90"
                max="90"
                required
                className="
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
                        "
              />
            </div>
            <div>
              <p className="font-semibold mt-6 text-lg">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                min="-180"
                max="180"
                required
                className="
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
                        "
              />
            </div>
          </div>
        )}

        <p className="font-semibold mt-6 text-lg">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
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
                "
        />

        <p className="font-semibold mt-6 text-lg">Offer</p>
        <div className="flex">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 shadow-md border border-transparent font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                  !offer
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 shadow-md border border-transparent font-medium text-sm py-3 rounded uppercase hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full 
                ${
                  offer
                    ? "bg-white text-black hover:border-red-400"
                    : "bg-slate-600 text-white hover:border-red-400"
                }`}
          >
            No
          </button>
        </div>

        <div className="flex items-center mb-6 mt-6">
          <div className="">
            <p className="font-semibold text-lg">Regular Price</p>
            <div className="flex items-center justify-center space-x-6 w-full">
              <input
                type="number"
                value={price}
                onChange={onChange}
                id="price"
                min="1"
                max="100000"
                required
                className="
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
                                "
              />
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
                <input
                  type="number"
                  value={discounted}
                  onChange={onChange}
                  id={discounted}
                  min="0"
                  max="100000"
                  required={offer}
                  className="
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
                                "
                />
                {type === "rent" && (
                  <div>
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="font-semibold text-lg">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6 images)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.jpeg,.png"
            multiple
            required
            className="bg-white border border-gray-300 duration-150 ease-in-out focus:bg-white focus:border-slate-600 py-1.5 rounded text-gray-700 transition w-full"
          />
        </div>

        <button
          type="submit"
          className="active:bg-blue-800 active:shadow-lg bg-blue-600 duration-150 ease-in-out focus:bg-blue-700 focus:shadow-lg font-md hover:bg-blue-700 hover:shadow-lg mb-6 px-4 py-2 rounded shadow-md text-center text-sm text-white transition uppercase w w-full"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}
