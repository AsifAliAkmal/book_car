package server.server.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import server.server.model.Authority;

public interface AuthorityDao extends JpaRepository<Authority,Integer>{

}
