import React, { useContext, useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        type: "",
        address: [
            {
                house_no: "",
                street: "",
                city: "",
                district: "",
                state: "",
                country: "",
                zip: "",
            },
        ],
        amt: 0,
        sqrt: 0,
        isFurnished: false,
        isAvailable: false,
    });

    const [thumbnails, setThumbnails] = useState([]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle address changes
    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAddresses = [...product.address];
        updatedAddresses[index][name] = value;
        setProduct({ ...product, address: updatedAddresses });
    };

    // Add more address fields
    const addAddressField = () => {
        setProduct({
            ...product,
            address: [
                ...product.address,
                {
                    house_no: "",
                    street: "",
                    city: "",
                    district: "",
                    state: "",
                    country: "",
                    zip: "",
                },
            ],
        });
    };

    // Handle file uploads
    const handleFileChange = (e) => {
        setThumbnails(e.target.files);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare FormData
        const formData = new FormData();
        formData.append(
            "HomeModule",
            new Blob([JSON.stringify(product)], { type: "application/json" })
        );

        Array.from(thumbnails).forEach((file) => {
            formData.append("thumbnails", file);
        });

        try {
            const response = await axios.post("http://localhost:8080/products/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Product created successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Product</h1>

            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label>
                Type:
                <input
                    type="text"
                    name="type"
                    value={product.type}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <h3>Addresses:</h3>
            {product.address.map((addr, index) => (
                <div key={index} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
                    <label>
                        House No:
                        <input
                            type="text"
                            name="house_no"
                            value={addr.house_no}
                            onChange={(e) => handleAddressChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        Street:
                        <input
                            type="text"
                            name="street"
                            value={addr.street}
                            onChange={(e) => handleAddressChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={addr.city}
                            onChange={(e) => handleAddressChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        District:
                        <input
                            type="text"
                            name="district"
                            value={addr.district}
                            onChange={(e) => handleAddressChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={addr.state}
                            onChange={(e) => handleAddressChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            name="country"
                            value={addr.country}
                            onChange={(e) => handleAddressChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        ZIP Code:
                        <input
                            type="text"
                            name="zip"
                            value={addr.zip}
                            onChange={(e) => handleAddressChange(index, e)}
                            required
                        />
                    </label>
                </div>
            ))}
            <button type="button" onClick={addAddressField}>
                Add Another Address
            </button>

            <label>
                Amount:
                <input
                    type="number"
                    name="amt"
                    value={product.amt}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label>
                Square Feet:
                <input
                    type="number"
                    name="sqrt"
                    value={product.sqrt}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label>
                Is Furnished:
                <input
                    type="checkbox"
                    name="isFurnished"
                    checked={product.isFurnished}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Is Available:
                <input
                    type="checkbox"
                    name="isAvailable"
                    checked={product.isAvailable}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Upload Thumbnails:
                <input type="file" multiple onChange={handleFileChange} />
            </label>

            <button type="submit">Create Product</button>
        </form>
    );
};

export default AddProduct;
