import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function HatColumn(props) {
  const handleDelete = (id) => {
    fetch(`http://localhost:8090/api/hats/${id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  window.location.reload();
  };
  return (
    <div className="col">
      {props.list.map(data => {
        console.log(data);
        const hat = data;
        return (
          <div key={hat.id} className="card mb-3 shadow">
            <img src={hat.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{hat.style}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {hat.fabric}
              </h6>
              <p className="card-text">
                Color: { hat.color } location: {hat.location}
              </p>
            </div>
            <button type="button" className="btn btn-outline-danger me-md-2"
            onClick={() => handleDelete(hat.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}


function HatList() {
    const [hatColumns, setHatColumns] = useState([[], [], []]);
    const fetchData = async () => {
      const url = 'http://localhost:8090/api/hats/';
      try {
        const response = await fetch(url);
        if (response.ok) {
          // Get the list of shoes
            const data = await response.json();

            // Create a list for all requests
            const requests = [];
            for (let hat of data.hats) {
              const hatUrl = `http://localhost:8090/api/hats/${hat.id}/`;
              requests.push(fetch(hatUrl));
            }

            const responses = await Promise.all(requests);

            const columns = [[], [], []];

            let i = 0;
            for (const hatResponse of responses) {
              if (hatResponse.ok) {
                const detail = await hatResponse.json();
                columns[i].push(detail);
                i = i + 1;
                if (i > 2) {
                  i = 0;
                }
              } else {
                console.error(hatResponse);
              }
            }

            setHatColumns(columns);
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
        <h1 className="display-5 fw-bold">My Hat Collection</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The only resource you'll ever need to organize your Hats.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Log New Hat</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>My Hat Addiction</h2>
        <div className="row">
          {hatColumns.map((HatsList, index) => {
            return (
              <HatColumn key={index} list={HatsList} />
            );
          })}
        </div>
      </div>
        </>
    );
}

export default HatList;
