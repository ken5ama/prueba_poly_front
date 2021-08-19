import { useState, useEffect } from "react";
let id = "";
let mapNames = [];
function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        data.forEach((restaurant) => {
          mapNames[restaurant._id] = restaurant.name;
        });
        fetch("http://localhost:4000/books")
          .then((response) => response.json())
          .then((data) => {
            setBooking(data);
          });
      });
  }, []);

  const deleteRestaurant = async (_id) => {
    const response = await fetch(`http://localhost:4000/restaurant/${_id}`, {
      method: "DELETE",
    });
    tables()
    const responseJson = await response.json();
  };

  const tables =  () => {
    fetch("http://localhost:4000/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        data.forEach((restaurant) => {
          mapNames[restaurant._id] = restaurant.name;
        });
        fetch("http://localhost:4000/books")
          .then((response) => response.json())
          .then((data) => {
            setBooking(data);
          });
      });
  }

  const bookRestaurant = async (id, date) => {
    const parseDate = date.split("-");
    const body = {
      restaurant: id,
      year: parseDate[0],
      month: parseDate[1]-1,
      day: parseDate[2],
    };
    const response = await fetch("http://localhost:4000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    tables()
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
    tables()
    id = "";
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
    setName("")
    setDescription("" )
    setAddress("")
    setCity(" ")
    tables()
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
      <h3>Restaurants List</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Actions</th>
            <th scope="col">Booking</th>
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
                <td>
                  <Book
                    callback={(date) => {
                      bookRestaurant(item._id, date);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h3>Booking List</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{mapNames[item.restaurant]}</td>
                <td>{new Date(item.date).toDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
const Book = (props) => {
  const [date, setDate] = useState("");
  return (
    <div>
      <div class="form-floating mb-3">
        <input
          type="date"
          class="form-control"
          id="floatingInput"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <label for="floatingInput">Date</label>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => {
          props.callback(date);
        }}
        style={{
          marginLeft: "4px",
        }}
      >
        Book
      </button>
    </div>
  );
};
export default App;
