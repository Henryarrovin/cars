interface Car {
  id: number;
  model: string;
  color: string;
  type: string;
  fuelType: string;
  cost: string;
}

interface CarProps {
  car: Car;
}

const CarCardForm = ({ car }: CarProps) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{car.model}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{car.color}</h6>
        <p className="card-text">
          <strong>Type:</strong> <input type="text" defaultValue={car.type} />
          <br />
          <strong>Fuel Type:</strong>{" "}
          <input type="text" defaultValue={car.fuelType} />
          <br />
          <strong>Cost:</strong> <input type="text" defaultValue={car.cost} />
        </p>
      </div>
      <button type="button" className="btn btn-secondary">
        Update
      </button>
    </div>
  );
};

export default CarCardForm;
