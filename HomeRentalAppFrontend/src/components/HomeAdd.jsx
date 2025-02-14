import React, { useState } from 'react'
import axios from 'axios'

const HomeAdd = () => {
    const [thumbnails, setThumbnails] = useState([]);
    const [product, setProduct] = useState({
        product_id: "",
        name: "",
        type: "",
        address: [{ street: "", city: "", state: "", zip: "" }], // Example address structure
        amt: "",
        sqrt: "",
        isFavourites: false,
        isFurnished: false,
        isAvailable: false,
    });

    // Handle file selection
    const handleFileChange = (event) => {
        setThumbnails(event.target.files);
    };

    // Handle product input changes
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle address change
    const handleAddressChange = (index, event) => {
        const { name, value } = event.target;
        const updatedAddress = [...product.address];
        updatedAddress[index][name] = value;
        setProduct((prevProduct) => ({
            ...prevProduct,
            address: updatedAddress,
        }));
    };

    // Add new address field
    const addAddressField = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            address: [...prevProduct.address, { street: "", city: "", state: "", zip: "" }],
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare FormData
        const formData = new FormData();

        // Append product fields to FormData
        // Object.entries(product).forEach(([key, value]) => {
        //   if (key === "address") {
        //     // Convert address array to JSON string
        //     formData.append(key, JSON.stringify(value));
        //   } else {
        //     formData.append(key, value);
        //   }
        // });
        formData.append("product_id", product.product_id);
        formData.append("name", product.name);
        formData.append("type", product.type);
        formData.append("amt", product.amt);
        formData.append("sqrt", product.sqrt);
        formData.append("isFavourites", product.isFavourites);
        formData.append("isFurnished", product.isFurnished);
        formData.append("isAvailable", product.isAvailable);
        formData.append("address", JSON.stringify(product.address));

        // Append thumbnails to FormData
        for (let i = 0; i < thumbnails.length; i++) {
            formData.append("thumbnails", thumbnails[i]);
        }

        try {
            console.log("trying to post")
            // Make a POST request
            const response = await axios.post('http://localhost:8080/products/add', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Handle success
            console.log("Product added successfully:", response.data);
        } catch (error) {
            // Handle error
            console.error("Error:", error.response?.data || error.message);
        };

        return (
            <div>
                <h1>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    {/* Product ID */}
                    <div>
                        <label>Product ID:</label>
                        <input
                            type="text"
                            name="product_id"
                            value={product.product_id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Product Type */}
                    <div>
                        <label>Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={product.type}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Address Fields */}
                    <div>
                        <label>Address:</label>
                        {product.address.map((addr, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street"
                                    value={addr.street}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={addr.city}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={addr.state}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="Zip"
                                    value={addr.zip}
                                    onChange={(e) => handleAddressChange(index, e)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addAddressField}>
                            Add Address
                        </button>
                    </div>

                    {/* Amount */}
                    <div>
                        <label>Amount:</label>
                        <input
                            type="number"
                            name="amt"
                            value={product.amt}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Square Footage */}
                    <div>
                        <label>Square Footage:</label>
                        <input
                            type="number"
                            name="sqrt"
                            value={product.sqrt}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Checkboxes */}
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isFavourites"
                                checked={product.isFavourites}
                                onChange={handleInputChange}
                            />
                            Favourites
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isFurnished"
                                checked={product.isFurnished}
                                onChange={handleInputChange}
                            />
                            Furnished
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={product.isAvailable}
                                onChange={handleInputChange}
                            />
                            Available
                        </label>
                    </div>

                    {/* Thumbnails Upload */}
                    <div>
                        <label>Upload Thumbnails:</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Add Product</button>
                </form>
            </div>
        );
    };
}

export default HomeAdd;