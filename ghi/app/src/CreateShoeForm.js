import React, { useEffect, useState } from 'react';


function CreateShoeForm() {
  const [bins, setBins] = useState([]);
  const fetchData = async () => {
    const url = 'http://localhost:8100/api/bins/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins);
    }
  }

  const [modelName, setModelName] = useState('');
  const [color, setColor] = useState('');
  const [manufactuer_name, setManufacName] = useState('');
  const [binNumber, setBinNum] = useState('');
  const [picture, setPicture] = useState('');

  const handleModelName = (event) => {
    setModelName(event.target.value);
  }

  const handleColor = (event) => {
    setColor(event.target.value);
  }

  const handleManufacName = (event) => {
    setManufacName(event.target.value);
  }

  const handleBinNum = (event) => {
    setBinNum(event.target.value);
  }

  const handlePicture = (event) => {
    setPicture(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {}

    data.model_name = modelName;
    data.manufactuer_name = manufactuer_name;
    data.color = color;
    data.bin = binNumber;
    data.picture_url = picture;

    const shoesUrl = 'http://localhost:8080/api/shoes/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(shoesUrl, fetchConfig)
    if (response.ok) {
      setModelName('');
      setColor('');
      setManufacName('');
      setBinNum('');
      setPicture('');
    }

  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Put a new shoe!</h1>
          <form id="create-conference-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                placeholder=""
                required type="text"
                name="model_name"
                id="model_name"
                className="form-control"
                onChange={handleModelName}
                value={modelName}
              />
              <label htmlFor="model_name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Picture url"
                required type="url"
                name="picture"
                id="picture"
                className="form-control"
                onChange={handlePicture}
                value={picture}
              />
              <label htmlFor="picture">Picture URL</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder=""
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
                onChange={handleColor}
                value={color}
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder=""
                required
                type="text"
                name="manufactuer_name"
                id="manufactuer_name"
                className="form-control"
                onChange={handleManufacName}
                value={manufactuer_name}
              />
              <label htmlFor="manufactuer_name">Manufacturer</label>
            </div>
            <div className="mb-3">
              <select required name="bin" id="bin" className="form-select" onChange={handleBinNum} value={binNumber}>
                <option value="">Choose a bin</option>
                {bins.map(bin => {
                  return (
                    <option value={bin.id} key={bin.id}>
                      {bin.closet_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateShoeForm;
