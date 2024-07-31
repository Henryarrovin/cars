package com.ty.cars.cars.services.impl;

import com.ty.cars.cars.models.Car;
import com.ty.cars.cars.repositories.CarRepo;
import com.ty.cars.cars.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    CarRepo carRepo;

    @Override
    public List<Car> getCar() {
        return carRepo.findAll();
    }

    @Override
    public Car getCarById(Long id) {
        return carRepo.findById(id).orElse(null);
    }

    @Override
    public Car addCar(Car car) {
        return carRepo.save(car);
    }

    @Override
    public Car updateCar(Long id, Car car) {
        car.setId(id);
        return carRepo.findById(id)
                .map(existingCar -> {
                    Optional.ofNullable(car.getModel()).ifPresent(existingCar::setModel);
                    Optional.ofNullable(car.getColor()).ifPresent(existingCar::setColor);
                    Optional.ofNullable(car.getType()).ifPresent(existingCar::setType);
                    Optional.ofNullable(car.getFuelType()).ifPresent(existingCar::setFuelType);
                    Optional.ofNullable(car.getCost()).ifPresent(existingCar::setCost);
                    return carRepo.save(existingCar);
                }).orElseThrow(() -> new RuntimeException("Car not found"));
    }

    @Override
    public void deleteCar(Long id) {
        carRepo.deleteById(id);
    }
}
