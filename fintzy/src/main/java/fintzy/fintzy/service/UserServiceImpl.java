package fintzy.fintzy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fintzy.fintzy.dao.UserDao;
import fintzy.fintzy.model.Car;
import fintzy.fintzy.model.User;
import fintzy.fintzy.utility.EmailPassword;


@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserDao userDao;

	@Override
	public User addUser(User user) {
		userDao.save(user);
		return user;
	}

	@Override
	public User removeUser(int userId) {
		User user = userDao.findById(userId).get();
		userDao.delete(user);
		return user;
	}

	@Override
	public List<User> getAllUser() {
		return userDao.findAll();
	}

	@Override
	public List<Car> getBookedCar(int userId) {
		 User user = userDao.findById(userId).get();
		 List<Car> bookedCars = new ArrayList<>();
		 bookedCars = user.getCars();
		 return bookedCars;
		 
	}

	@Override
	public User login(String email) {
		List<User> user = userDao.findByEmail(email);
		if(user.size() == 0)
			return null;
		return user.get(0);
	}

}
