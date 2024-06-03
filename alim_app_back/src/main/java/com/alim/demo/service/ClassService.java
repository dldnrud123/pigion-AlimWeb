package com.alim.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.alim.demo.dto.ClassDTO;
import com.alim.demo.entity.ClassEntity;
import com.alim.demo.repository.jpa.ClassBoardRepository;
import com.alim.demo.repository.jpa.ClassRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClassService {
	@Autowired
	private final ClassRepository classRepository;

	@Autowired
	private final ClassBoardRepository classBoardRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Transactional
	public List<ClassDTO> AllfindClsById(String id) {

		List<ClassEntity> classEntityList = classRepository.AllfindClsById(id);
		List<ClassDTO> classDTOList = new ArrayList<>();
		for (ClassEntity classEntity : classEntityList) {
			classDTOList.add(ClassDTO.toClassDTO(classEntity));
		}
		return classDTOList;
	}

	@Transactional
	public List<ClassDTO> findClsByIdMine(String id) {

		List<ClassEntity> classEntityList = classRepository.findClsByIdMine(id);
		List<ClassDTO> classDTOList = new ArrayList<>();
		for (ClassEntity classEntity : classEntityList) {
			classDTOList.add(ClassDTO.toClassDTO(classEntity));
		}
		return classDTOList;
	}

	@Transactional
	public List<ClassDTO> findClsByIdNotMine(String id) {

		List<ClassEntity> classEntityList = classRepository.findClsByIdNotMine(id);
		List<ClassDTO> classDTOList = new ArrayList<>();
		for (ClassEntity classEntity : classEntityList) {
			classDTOList.add(ClassDTO.toClassDTO(classEntity));
		}
		return classDTOList;
	}

	public void save(ClassDTO classDTO) {
		// 단방향 암호화
		String encryptedPassword = bCryptPasswordEncoder.encode(classDTO.getClsPass());
		classDTO.setClsPass(encryptedPassword);

		ClassEntity classEntity = ClassEntity.toSaveEntity(classDTO);
		classRepository.save(classEntity);

	}

	@Transactional
	public void deleteById(ClassDTO classDTO) {
		classRepository.deleteById(classDTO.getClsId());
	}

	public boolean existsById(String id) {
		return classRepository.existsById(id);
	}

	@Transactional
	public void updateClsActiveYnById(String clsId, char activeYn) {
		System.out.println("updateNotiActiveYnById : " + clsId + activeYn);
		classRepository.updateClassActiveYnByClsId(clsId, activeYn);
		classBoardRepository.updateBoardActiveYnByClsId(clsId, activeYn);
	}

	@Transactional
	public ClassDTO findClsById(String id) {

		ClassEntity classEntity = classRepository.findClsById(id);
		ClassDTO classDTO = ClassDTO.toClassDTO(classRepository.findClsById(id));

		return classDTO;
	}

}
