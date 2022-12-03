package server.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import server.server.dao.CarDao;
import server.server.dao.DriverDao;
import server.server.model.Car;
import server.server.model.Driver;

@Service
public class DriverSerivceImpl implements DriverService{
	
	@Autowired
	DriverDao driverDao;
	
	@Autowired
	CarDao carDao;
	

	@Override
	public Driver removeDriver(int driverId) {
		Driver driver = driverDao.findById(driverId).get();
		driver.removeCar();
		driverDao.delete(driver);
		return driver;
	}

	@Override
	public Driver addDriver(Driver driver) {
		driverDao.save(driver);
		return driver;
	}

	@Override
	public List<Driver> getAllDriver() {
		return driverDao.findAll();
	}

	@Override
	public boolean assignCarToDriver(int driverId, int carId) {
		Car car = carDao.findById(carId).get();
		Driver driver = driverDao.findById(driverId).get();
		driver.assignCar(car);
		driverDao.save(driver);
		return true;
	}


}
