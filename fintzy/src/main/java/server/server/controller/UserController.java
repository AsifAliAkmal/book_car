package server.server.controller;

import java.util.List;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import server.server.dao.UserDao;
import server.server.model.Car;
import server.server.model.User;
import server.server.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserDao userDao;
	
	
	@GetMapping("/users")
	public List<User> getAllUser(){
		List<User> list = userService.getAllUser();
		return list;
	}
	
	@GetMapping("/getBookedCar/{userId}")
	public List<Car> bookedCar(@PathVariable int userId){
		return userService.getBookedCar(userId);
	}
	
	@DeleteMapping("/deleteuser/{userId}")
	public User deleteUser(@PathVariable int userId) {
		User user = userService.removeUser(userId);
		return user;
	}
	
	@PostMapping("/register")
	public User addUser(@RequestBody User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userService.addUser(user);
	}
	
	@GetMapping("/login/{email}")
	public User login(@PathVariable String email) {
			User user =  userService.login(email);
			return user;
	}
	
	
	@GetMapping("/user")
	public User  getUserDetailsAfterLogin(Authentication authentication) {
        List<User> user = userDao.findByEmail(authentication.getName());
        if (user.size() > 0) {
            return user.get(0);
        } else {
            return null;
        }

    }
    

}
