package server.server.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import server.server.model.User;

public interface UserDao extends JpaRepository<User,Integer>{
	@Query("select u from User u where u.email=:email")
	public List<User> findByEmail(@Param("email") String email);
}
