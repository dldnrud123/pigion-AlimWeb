package com.alim.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alim.demo.dto.UserNotificationDTO;
import com.alim.demo.service.UserNotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/UserNotification")
public class UserNotificationController {

	private final UserNotificationService userNotificationService;

	@GetMapping("/")
	public List<UserNotificationDTO> getNotificationKey(@RequestParam("clsId") String clsId) {
		System.out.println(clsId);
		List<UserNotificationDTO> userNotificationDTOlist = userNotificationService.userNotificationListByClsId(clsId);
		System.out.println("userNotification list all test");

		System.out.println(userNotificationDTOlist);
		return userNotificationDTOlist;
	}

	@PostMapping("/save")
	public boolean save(@RequestBody UserNotificationDTO userNotificationDTO) {
		System.out.println("userNotificationDTO = " + userNotificationDTO);
		return userNotificationService.save(userNotificationDTO);
	}

	@PutMapping("/notiOnOff")
	public char notiOnOff(@RequestParam("userId") String userId, @RequestParam("notiTokenVal") String notiTokenVal,
			@RequestParam("activeYN") char activeYN) {
		System.out.println("userId = " + userId + "notiTokenVal = " + notiTokenVal + "activeYN = " + activeYN);
		userNotificationService.updateNotiActiveYnById(userId, notiTokenVal, activeYN);

		return activeYN;
	}

	@GetMapping("/isNotiOnOff")
	public UserNotificationDTO getNotiforOne(@RequestParam("userId") String userId,
			@RequestParam("notiTokenVal") String notiTokenVal) {
		System.out.println(userId);
		UserNotificationDTO userNotificationDTO = userNotificationService.userNotificationByUserId(userId,
				notiTokenVal);
		System.out.println("userNotification getNotiforOne all test");

		System.out.println(userNotificationDTO);
		return userNotificationDTO;
	}

	@GetMapping("/userNotiTokens")
	public List<UserNotificationDTO> renotiByOne(@RequestParam("userId") String userId) {
		System.out.println("userId = " + userId);

		return userNotificationService.getTokenByUserId(userId);
	}

}
