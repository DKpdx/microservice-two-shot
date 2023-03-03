import React, {useState, useEffect} from 'react';

function HatForm() {

    const [locations, setLocations] = useState([]);
    const fetchData = async () => {
    const locationsUrl = "http://localhost:8100/api/locations/";
    const locationsResponse = await fetch(locationsUrl);
    if (locationsResponse.ok) {
        const locationsData = await locationsResponse.json();
        setLocations(locationsData.locations);
    }
}

    const [fabric, setFabric] = useState('');
    const [style, setStyle] = useState('');
    const [color, setColor] = useState('');
    const [picture, setPicture] = useState('');
    const [location, setLocation] = useState('');


    const handleFabricChange = event => {
            const value = event.target.value;
            setFabric(value)
        }

    const handleStyleChange = event => {
            const value = event.target.value;
            setStyle(value)
        }

    const handleColorChange = event => {
            const value = event.target.value;
            setColor(value)
        }

    const handlePictureChange = event => {
            const value = event.target.value;
            setPicture(value)
        }

    const handleLocationChange = event => {
            const value = event.target.value;
            setLocation(value)
        }

        useEffect(() => {
            fetchData();
            }, []);


    const handleSubmit = async (event) => {
            event.preventDefault();

            const data = {};

            data.fabric = fabric;
            data.style = style;
            data.color = color;
            data.picture_url = picture;
            data.location = location;

        const url = "http://localhost:8090/api/hats/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
        const hatData = await response.json();
        console.log(hatData);

            setFabric('');
            setStyle('');
            setColor('');
            setPicture('');
            setLocation('');
        }
    }


return (
    <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create Hat</h1>
                <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                    <input onChange={handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" value={fabric} />
                    <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleStyleChange} placeholder="Style" required type="text" name="style" id="style" className="form-control" value={style} />
                    <label htmlFor="style">Style</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" value={color} />
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePictureChange} placeholder="Picture URL" required type="text" name="picture" id="picture" className="form-control" value={picture} />
                    <label htmlFor="picture">Picture</label>
                </div>
                <div className="mb-3">
                    <select  value={location} onChange={handleLocationChange} required id="location" name="location" className="form-select" >
                    <option value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                            <option key={location.href} value={location.href}>{location.closet_name}
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
    </div>
        );
}


export default HatForm;
