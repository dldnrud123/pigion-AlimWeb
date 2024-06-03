package com.alim.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.securityMatcher("/api", "/error")
				.authorizeHttpRequests((authz) -> authz.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
						.requestMatchers(HttpMethod.GET, "**").permitAll().requestMatchers(HttpMethod.POST, "**")
						.permitAll().requestMatchers(HttpMethod.PUT, "**").permitAll()
						.requestMatchers(HttpMethod.DELETE, "**").permitAll().anyRequest().authenticated());

		return http.build();
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}