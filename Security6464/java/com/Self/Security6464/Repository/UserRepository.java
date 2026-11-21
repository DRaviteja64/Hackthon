package com.Self.Security6464.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Self.Security6464.Entity.UserDetails;

@Repository
public interface UserRepository extends JpaRepository<UserDetails,Integer>{
	UserDetails findBymobile(String mobile);
}
