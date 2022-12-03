package server.server.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import server.server.model.Car;

public interface CarDao extends JpaRepository<Car,Integer>{
	
	@Query("select c from Car c where c.capacity=:capacity and c.is_booked=:flag")
	public List<Car> findByCapacity(@Param("capacity") int capacity,@Param("flag") boolean flag);

}
