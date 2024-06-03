
package com.alim.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.alim.demo.dto.ClassUserDTO;
import com.alim.demo.dto.UserClassUserDTO;
import com.alim.demo.entity.ClassEntity;
import com.alim.demo.entity.ClassUserEntity;
import com.alim.demo.repository.jpa.ClassRepository;
import com.alim.demo.repository.jpa.ClassUserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClassUserService {

	@Autowired
	private final ClassUserRepository classUserRepository;

	@Autowired
	private final ClassRepository classRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Transactional
	public ClassUserDTO findByIdOne(String clsId, String userId) {
		ClassUserEntity classUserEntity = classUserRepository.findByClassUser(clsId, userId);
		ClassUserDTO classUserDTO = ClassUserDTO.toClassUserDTO(classUserEntity);

		return classUserDTO;
	}

	@Transactional
	public List<ClassUserDTO> findByIdAll(String clsId) {
		List<ClassUserEntity> classUserEntityList = classUserRepository.findAllClsUserInfoByclsId(clsId);
		List<ClassUserDTO> classUserDTOList = new ArrayList<>();

		for (ClassUserEntity classUserEntity : classUserEntityList) {
			classUserDTOList.add(ClassUserDTO.toClassUserDTO(classUserEntity));
		}

		return classUserDTOList;
	}

	public boolean isJoinUser(String clsId, String userId) {
		ClassUserEntity classUserEntity = classUserRepository.findByClassUser(clsId, userId);
		System.out.println("비어있니? " + classUserEntity);
		if (classUserEntity == null) {
			return false;
		}
		return true;
	}

	@Transactional
	public boolean save(ClassUserDTO classUserDTO, String clsPass) throws Exception {
		ClassEntity classEntity = classRepository.findClsById(classUserDTO.getClsId());

		boolean passCheack = bCryptPasswordEncoder.matches(clsPass, classEntity.getClsPass());
		if (!passCheack) {
			throw new Exception("비밀번호를 확인해주세요");
		}

		int count = classUserRepository.countByUnActiveClassUser(classUserDTO.getClsId(), classUserDTO.getUserId());

		// 가입경력이 있는 경우
		if (count > 0) {
//			classUserRepository.updateClsUserActiveYnById(classUserDTO.getClsId(), classUserDTO.getUserId(), 'Y');
			classUserRepository.updateClsUserDataById(classUserDTO.getClsId(), classUserDTO.getUserId(), 'Y',
					classUserDTO.getRealName());
			return false;
		}

		// 최초가입
		ClassUserEntity classUserEntity = ClassUserEntity.toSaveEntity(classUserDTO);
		classUserRepository.save(classUserEntity);
		return true;

	}

	@Transactional
	public List<UserClassUserDTO> clsUserInfoList(String clsId) {

		List<ClassUserEntity> classUserEntityList = classUserRepository.findClsUserInfoByAll(clsId);
		List<UserClassUserDTO> userClassUserDTOList = new ArrayList<>();
		for (ClassUserEntity classUserEntity : classUserEntityList) {
			userClassUserDTOList.add(UserClassUserDTO.toUserClassUserDTO(classUserEntity));
		}

		return userClassUserDTOList;
	}

	@Transactional
	public void deleteById(String clsId, String userId, char activeYn) {

		System.out.println("deleteById : " + clsId + userId + activeYn);
		classUserRepository.updateClsUserActiveYnById(clsId, userId, activeYn);
	}

}
