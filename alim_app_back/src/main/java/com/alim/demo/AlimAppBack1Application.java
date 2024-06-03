package com.alim.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@MapperScan(basePackages = "com.alim.demo.repository.mybatis")
@EnableJpaRepositories(basePackages = "com.alim.demo.repository.jpa")
public class AlimAppBack1Application {

	public static void main(String[] args) {
		SpringApplication.run(AlimAppBack1Application.class, args);
	}

}
