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

const CarCard = ({ car }: CarProps) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{car.model}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{car.color}</h6>
        <p className="card-text">
          <strong>Type:</strong> {car.type}
          <br />
          <strong>Fuel Type:</strong> {car.fuelType}
          <br />
          <strong>Cost:</strong> {car.cost}
        </p>
      </div>
    </div>
  );
};

export default CarCard;
