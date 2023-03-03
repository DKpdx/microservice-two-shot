import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ShoeColumn(props) {
    const handleDelete = (id) => {
        // perform delete operation with id
        fetch(
            `http://localhost:8080/api/shoes/${id}/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        window.location.reload();

    };

    return (
        <div className="col">
            {props.list.map(data => {
                const shoe = data;
                return (
                    <div key={shoe.id} value={shoe.id} className="card mb-3 shadow">
                        <img src={shoe.picture_url} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                        <div className="card-body">
                            <h5 className="card-title">{shoe.model_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {shoe.manufactuer_name}
                            </h6>
                            <p className="card-text">
                                Color: {shoe.color} Bin: {shoe.bin.closet_name}
                            </p>
                        </div>
                        <button type="button" className="btn btn-outline-danger me-md-2" onClick={() => handleDelete(shoe.id)}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
}


function ShoeList(props) {
    const [shoeColumns, setShoeColumns] = useState([[], [], []]);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/shoes/';
        try {
            const response = await fetch(url);
            if (response.ok) {
                // Get the list of shoes
                const data = await response.json();

                // Create a list for all requests
                const requests = [];
                for (let shoe of data.shoes) {
                    const shoeUrl = `http://localhost:8080/api/shoes/${shoe.id}/`;
                    requests.push(fetch(shoeUrl));
                }

                const responses = await Promise.all(requests);

                const columns = [[], [], []];

                let i = 0;
                for (const shoeResponse of responses) {
                    if (shoeResponse.ok) {
                        const detail = await shoeResponse.json();
                        columns[i].push(detail);
                        i = i + 1;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(shoeResponse);
                    }
                }

                setShoeColumns(columns);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
                <h1 className="display-5 fw-bold">My Shoe Collection</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        The only resource you'll ever need to organize your shoes.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Put A New Shoe</Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2>Shoe Collection</h2>
                <div className="row">
                    {shoeColumns.map((ShoeList, index) => {
                        return (
                            <ShoeColumn key={index} list={ShoeList} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ShoeList;
