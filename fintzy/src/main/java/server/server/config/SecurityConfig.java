package server.server.config;

import java.util.Arrays;

import java.util.Collections;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;
import server.server.filter.JWTTokenGeneratorFilter;
import server.server.filter.JWTTokenValidatorFilter;

@Configuration
public class SecurityConfig {
	
	
	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
		.cors().configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setExposedHeaders(Arrays.asList("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, " +
                        "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"));
                config.setMaxAge(3600L);
                return config;
            }})
		    .and().csrf().disable()
		    .addFilterAfter(new JWTTokenGeneratorFilter(), BasicAuthenticationFilter.class)
		    .addFilterBefore(new JWTTokenValidatorFilter(), BasicAuthenticationFilter.class)
		    .authorizeHttpRequests()
		    .requestMatchers("/drivers","/cars","/addCar","/removeCar/{carId}","/addDriver",
					"/removeDriver/{driverId}","/assignDriver/{driverId}/car/{carId}").hasAuthority("ADMIN")
			.requestMatchers("/carByCapacity/{capacity}",
				"/bookCar/{carId}/user/{userId}","/cancleBooking/{carId}","/getBookedCar/{userId}").hasAuthority("USER")
			.requestMatchers("/user").authenticated()
			 .requestMatchers("/register").permitAll()
			 .and().httpBasic()
			 .and().formLogin();
			
		return http.build();
		
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
