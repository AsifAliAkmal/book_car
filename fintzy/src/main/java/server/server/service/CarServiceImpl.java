package server.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import server.server.dao.CarDao;
import server.server.dao.UserDao;
import server.server.model.Car;
import server.server.model.User;

@Service

public class CarServiceImpl implements CarService{
	
	@Autowired
	CarDao carDao;
	
	@Autowired
	UserDao userDao;

	@Override
	public Car addCar(Car car) {
		carDao.save(car);
		return car;
	}

	@Override
	public Car removeCar(int carId) {
		Car car = carDao.findById(carId).get();
		car.removeDriver();
		carDao.delete(car);
		return car;
	}

	@Override
	public Car bookCar(int carId,int userId) {
		Car car = carDao.findById(carId).get();
		User user = userDao.findById(userId).get();
		car.setIs_booked(true);
		car.setUser(user);
		carDao.save(car);
		return car;
	}

	@Override
	public Car cancleBooking(int carId) {
		Car car = carDao.findById(carId).get();
		car.setUser(null);
		car.setIs_booked(false);
		carDao.save(car);
		return car;
	}

	@Override
	public List<Car> getAllCar() {
		List<Car> cars = carDao.findAll();
		return cars;
	}

	@Override
	public List<Car> findCarByCapacity(int capacity) {
		List<Car> cars  = carDao.findByCapacity(capacity,false);
		return cars;
	}

}
