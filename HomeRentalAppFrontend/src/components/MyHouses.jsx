import React, { useContext, useEffect, useState } from 'react'
import HomeContext from '../context/Context'
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyHouses = () => {
    const { API } = useContext(HomeContext);
    const [data, setData] = useState([]);

    // useEffect(() => {
    const fetchData = async () => {
        await axios.get(API + `products/items/${localStorage.getItem("userId")}`)
            .then((response) => {
                console.log(response.data)
                setData(response.data);
            }).catch((err) => {
                console.log("Error: ", err);
            })
    }
    // fetchData();
    // }, [])
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            {data.length > 0 ?
                data.map((item, index) => (<List item={item} fetchData={fetchData} key={index} />)) : "No Houses"
            }
        </>
    )
}

const List = ({ item, fetchData }) => {
    const { API } = useContext(HomeContext);

    const handleDelete = async () => {
        await axios.delete(API + `products/delete/${item.houseId}`)
            .then(() => {
                toast.success("Deleted Successfully.");
                fetchData();
            }).catch((err) => {
                // console.log("Error ", err);
                toast.error("Error while deleting.")
            })
    }
    return (
        <>
            <Card className='shadow m-2 p-2'>
                <div className="d-flex align-items-center">
                    <Card.Img variant="bottom" src={API + `products/${item.houseId}/thumbnails/${0}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                    <Card.Body className='d-flex align-items-center justify-content-between'>
                        {/* <h4>{item.addressDetails.city} city</h4> */}
                        <div className='fs-4'>{item.addressDetails.city} city</div>
                        <div>
                            <Link to={'/updateHouse'} state={item}><i class="bi bi-pen-fill btn"></i></Link>
                            {/* <Link to={'/updateHouse'} state={item}><i class="bi bi-trash3-fill btn"></i></Link> */}
                            <i class="bi bi-trash3-fill btn" onClick={handleDelete}></i>
                        </div>
                    </Card.Body>
                </div>
            </Card>
        </>
    )
}

export default MyHouses