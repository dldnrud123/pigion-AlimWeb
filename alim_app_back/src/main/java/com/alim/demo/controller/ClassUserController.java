package com.alim.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alim.demo.dto.ClassUserDTO;
import com.alim.demo.dto.RequestClassUserDTO;
import com.alim.demo.dto.UserClassUserDTO;
import com.alim.demo.service.ClassUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/classUser")
public class ClassUserController {

	private final ClassUserService classUserService;

	@GetMapping("/")
	public ClassUserDTO getUserById(@RequestParam("clsId") String clsId, @RequestParam("userId") String userId) {
		ClassUserDTO classUserDTO = classUserService.findByIdOne(clsId, userId);
		System.out.println("class-user list all test");

		return classUserDTO;
	}

	@GetMapping("/list")
	public List<ClassUserDTO> getUserListById(@RequestParam("clsId") String clsId) {
		List<ClassUserDTO> classUserDTOlist = classUserService.findByIdAll(clsId);
		System.out.println("class-user list all test");

		return classUserDTOlist;
	}

	@PostMapping("/save")
	public boolean save(@RequestBody RequestClassUserDTO requestClassUserDTO) {

		ClassUserDTO classUserDTO = new ClassUserDTO();
		classUserDTO.setClsId(requestClassUserDTO.getClsId());
		classUserDTO.setUserId(requestClassUserDTO.getUserId());
		classUserDTO.setRealName(requestClassUserDTO.getRealName());
		classUserDTO.setReaderYn(requestClassUserDTO.getReaderYn());
		classUserDTO.setPermissionYn(requestClassUserDTO.getPermissionYn());
		classUserDTO.setActiveYn(requestClassUserDTO.getActiveYn());

		System.out.println("userDTO = " + classUserDTO);
		System.out.println("clsPass = " + requestClassUserDTO.getClsPass());
		try {
			return classUserService.save(classUserDTO, requestClassUserDTO.getClsPass());

		} catch (Exception e) {
			// TODO: handle exception
		}
		return true;
	}

	@GetMapping("/classjoinCheck")
	public boolean isJoinUser(@RequestParam("clsId") String clsId, @RequestParam("userId") String userId) {
		return classUserService.isJoinUser(clsId, userId);
	}

	@GetMapping("/classUserList")
	public List<UserClassUserDTO> clsUserInfoList(@RequestParam("clsId") String clsId) {
		System.out.println(clsId);
		List<UserClassUserDTO> userClassUserDTOlist = classUserService.clsUserInfoList(clsId);
		System.out.println("class user list all test");

		System.out.println(userClassUserDTOlist);

		return userClassUserDTOlist;
	}

	@PutMapping("/delete")
	public void deleteClass(@RequestParam("clsId") String clsId, @RequestParam("userId") String userId) {
		System.out.println("clsId = " + clsId + "userId = " + userId);
		classUserService.deleteById(clsId, userId, 'N');
	}

}
