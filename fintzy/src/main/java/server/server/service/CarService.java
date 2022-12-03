package server.server.service;

import java.util.List;

import server.server.model.Car;

public interface CarService {
	
	public Car addCar(Car car);
	public Car removeCar(int carId);
	public Car bookCar(int carId,int userId);
	public Car cancleBooking(int carId);
	public List<Car> getAllCar();
	public List<Car> findCarByCapacity(int capacity);

}
