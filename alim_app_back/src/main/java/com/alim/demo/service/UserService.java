
package com.alim.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.alim.demo.dto.UserDTO;
import com.alim.demo.entity.UserEntity;
import com.alim.demo.repository.jpa.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	@Autowired
	private final UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Transactional
	public UserDTO findByIdOne(String id) {
		// 내용이 없을 수도 있어서 옵셔널로 받고,
		UserEntity userEntity = userRepository.findByIdOne(id);
		UserDTO userDTO = UserDTO.toUserDTO(userEntity);
		// 추후 try ~ catch

		return userDTO;
	}

	public boolean existsById(String id) {
		return userRepository.existsById(id);
	}

	@Transactional
	public UserDTO login(String id, String pwd) throws Exception {

		UserEntity userEntity = userRepository.findByIdOne(id);
		System.out.println("아이디값:" + id);
		System.out.println(userEntity);

		if (userEntity == null) {
			throw new Exception("아이디 비밀번호를 확인해주세요");
		}
		// 암호화 된 비밀번호 평서문과 비교
		boolean passCheack = bCryptPasswordEncoder.matches(pwd, userEntity.getUserPass());

		if (!passCheack) {
			throw new Exception("아이디 비밀번호를 확인해주세요");
		}
		UserDTO userDTO = UserDTO.toUserDTO(userEntity);

		return userDTO;
	}

	@Transactional
	public UserDTO snsLogin(String id) throws Exception {

		UserEntity userEntity = userRepository.findByIdOne(id);
		System.out.println("아이디값:" + id);
		System.out.println(userEntity);

		if (userEntity == null) {
			throw new Exception("SNS 로그인 불가");
		}
		UserDTO userDTO = UserDTO.toUserDTO(userEntity);

		return userDTO;
	}

	public void save(UserDTO userDTO) {
		// 단방향 암호화
		String encryptedPassword = bCryptPasswordEncoder.encode(userDTO.getUserPass());
		userDTO.setUserPass(encryptedPassword);

		UserEntity userEntity = UserEntity.toSaveEntity(userDTO);
		userRepository.save(userEntity);
	}

	@Transactional
	public List<UserDTO> clsUserInfoList(String clsId) {

		List<UserEntity> userEntityList = userRepository.findClsUserInfoByAll(clsId);
		List<UserDTO> userDTOList = new ArrayList<>();
		for (UserEntity userEntity : userEntityList) {
			userDTOList.add(UserDTO.toClassUserDTO(userEntity));
		}

		return userDTOList;
	}

}
