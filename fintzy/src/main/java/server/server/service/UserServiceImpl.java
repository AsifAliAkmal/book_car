package server.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import server.server.dao.AuthorityDao;
import server.server.dao.UserDao;
import server.server.model.Authority;
import server.server.model.Car;
import server.server.model.User;
import server.server.utility.EmailPassword;


@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserDao userDao;
	
	@Autowired 
	AuthorityDao authorityDao;

	@Override
	public User addUser(User user) {
		User userNew = userDao.save(user);
		Authority auth = new Authority();
		auth.setUser(userNew);
		auth.setName(userNew.getRole());
		authorityDao.save(auth);
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
