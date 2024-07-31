import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button, Carousel, Form } from "react-bootstrap";
import CarCard from "./components/CarCard";
import CarCardForm from "./components/CarCardForm";

interface Car {
  id: number;
  model: string;
  color: string;
  type: string;
  fuelType: string;
  cost: string;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Omit<Car, "id">>({
    model: "",
    color: "",
    type: "",
    fuelType: "",
    cost: "",
  });
  const [error, setError] = useState("");
  const [cardClicked, setCardClicked] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8090/car/getcar").then((res) => {
      setCars(res.data);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const addCar = () => {
    if (
      !newCar.model ||
      !newCar.color ||
      !newCar.type ||
      !newCar.fuelType ||
      !newCar.cost
    ) {
      setError("All fields are required!");
      return;
    }
    const carToAdd = { ...newCar };
    axios
      .post("http://localhost:8090/car/addcar", carToAdd)
      .then((res) => {
        setCars([...cars, res.data]);
        setNewCar({ model: "", color: "", type: "", fuelType: "", cost: "" });
        setError("");
      })
      .catch((err) => {
        setError("Error adding car: " + err.message);
      });
  };

  return (
    <div className="App">
      <h1>Cars</h1>
      {cars.length > 0 && (
        <Carousel>
          {cars.map((car) =>
            cardClicked ? (
              <Carousel.Item key={car.id} onClick={() => setCardClicked(false)}>
                <div className="d-flex justify-content-center">
                  <CarCardForm car={car} />
                </div>
              </Carousel.Item>
            ) : (
              <Carousel.Item key={car.id} onClick={() => setCardClicked(true)}>
                <div className="d-flex justify-content-center">
                  <CarCard car={car} />
                </div>
              </Carousel.Item>
            )
          )}
        </Carousel>
      )}
      <Form className="mt-4">
        <Form.Group controlId="formModel">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter model"
            name="model"
            value={newCar.model}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formColor">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter color"
            name="color"
            value={newCar.color}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter type"
            name="type"
            value={newCar.type}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formFuelType">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fuel type"
            name="fuelType"
            value={newCar.fuelType}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formCost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cost"
            name="cost"
            value={newCar.cost}
            onChange={handleInputChange}
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button variant="primary" onClick={addCar} className="mt-3">
          Add Car
        </Button>
      </Form>
    </div>
  );
}

export default App;
