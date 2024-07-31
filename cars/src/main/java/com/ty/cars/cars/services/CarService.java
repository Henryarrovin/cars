package com.ty.cars.cars.services;

import com.ty.cars.cars.models.Car;

import java.util.List;

public interface CarService {

    public List<Car> getCar();

    public Car getCarById(Long id);

    public Car addCar(Car car);

    public Car updateCar(Long id, Car car);

    public void deleteCar(Long id);

}
