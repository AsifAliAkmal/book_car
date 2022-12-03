package server.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import server.server.model.Driver;

public interface DriverDao extends JpaRepository<Driver,Integer>{

}
