package com.alim.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alim.demo.dto.UserDTO;
import com.alim.demo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;

	@GetMapping("/")
	public UserDTO getUserById(@RequestParam("id") String id) {
		UserDTO userDTO = userService.findByIdOne(id);
		System.out.println("user list all test");

		return userDTO;
	}

	@GetMapping("/idCheck")
	public boolean existsById(@RequestParam("id") String id) {
		System.out.println("id confirm check");
		System.out.println(id);
		return !userService.existsById(id);
	}

	@PostMapping("/save")
	public void save(@RequestBody UserDTO userDTO) {
		System.out.println("userDTO = " + userDTO);
		userService.save(userDTO);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam("id") String userId, @RequestParam("pass") String userPass) {
		System.out.println("-- test id:" + userId);
		System.out.println("-- test pass:" + userPass);

		UserDTO userDTO = new UserDTO();

		try {
			userDTO = userService.login(userId, userPass);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
		return ResponseEntity.ok(userDTO);
	}

	@PostMapping("/snsLogin")
	public ResponseEntity<?> snsLogin(@RequestParam("id") String userId) {
		System.out.println("-- test id:" + userId);

		UserDTO userDTO = new UserDTO();

		try {
			userDTO = userService.snsLogin(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
		return ResponseEntity.ok(userDTO);
	}

	@GetMapping("/classUserList")
	public List<UserDTO> clsUserInfoList(@RequestParam("clsId") String clsId) {
		System.out.println(clsId);
		List<UserDTO> userDTOlist = userService.clsUserInfoList(clsId);
		System.out.println("class user list all test");

		System.out.println(userDTOlist);

		return userDTOlist;
	}

}
