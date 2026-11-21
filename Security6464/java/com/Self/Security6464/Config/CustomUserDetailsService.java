package com.Self.Security6464.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Self.Security6464.Repository.UserRepository;
@Service
public class CustomUserDetailsService implements UserDetailsService{
	@Autowired 
	public UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String mobile) throws UsernameNotFoundException {
		com.Self.Security6464.Entity.UserDetails u= userRepository.findBymobile(mobile);
		if(u==null) {
			throw new UsernameNotFoundException("User Not found man");
		}
		return User.withUsername(u.getFullName())
				.password(u.getPassword())
				.roles(u.getRole())
				.build();
		
	}

	

}
