package server.server.config;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import server.server.dao.UserDao;
import server.server.model.Authority;
import server.server.model.User;


@Component
public class AuthenticationSecurity implements AuthenticationProvider{
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        List<User> user = userDao.findByEmail(username);
        if (user.size() > 0) {
            if (passwordEncoder.matches(password, user.get(0).getPassword())) {
                return new UsernamePasswordAuthenticationToken(username, password, getGrantedAuthority(user.get(0).getAuthorities()));
            } else {
                throw new BadCredentialsException("Invalid password!");
            }
        }else {
            throw new BadCredentialsException("No user registered with this details!");
        }
	}
	
	private List<GrantedAuthority>  getGrantedAuthority(List<Authority> authorities){
				List<GrantedAuthority> grantedAuthorities = new ArrayList();
				for(Authority authority : authorities) {
					grantedAuthorities.add(new SimpleGrantedAuthority(authority.getName()));
				}
				return grantedAuthorities;
				
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
