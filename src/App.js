import { useState, useEffect } from "react";
let id = "";
function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  }, []);

  const deleteRestaurant = async (_id) => {
    const response = await fetch(`http://localhost:4000/restaurant/${_id}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();
  };

  const editRestaurant = (restaurant) => {
    id = "";
    setName(restaurant.name);
    setDescription(restaurant.description);
    setAddress(restaurant.address);
    setCity(restaurant.city);
    id = restaurant._id;
    console.log(id);
  };

  const updateRestaurant = async () => {
    const body = {
      name,
      description,
      address,
      city,
    };
    const response = await fetch(`http://localhost:4000/restaurant/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    id=""
  };
  const addRestaurant = async () => {
    const body = {
      name,
      description,
      address,
      city,
    };
    const response = await fetch("http://localhost:4000/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
  };

  return (
    <div className="container">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label for="floatingInput">Name</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label for="floatingInput">Description</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />

        <label for="floatingInput">Address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <label for="floatingInput">City</label>
      </div>

      <button type="button" class="btn btn-primary" onClick={addRestaurant}>
        Add
      </button>
      <button
        type="button"
        class="btn btn-primary"
        onClick={updateRestaurant}
        style={{
          marginLeft: "4px",
        }}
      >
        Edit
      </button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">address</th>
            <th scope="col">city</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>
                  {" "}
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      editRestaurant(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      deleteRestaurant(item._id);
                    }}
                    style={{
                      marginLeft: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
