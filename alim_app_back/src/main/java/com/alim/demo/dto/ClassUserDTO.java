package com.alim.demo.dto;

import com.alim.demo.entity.ClassUserEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본생성자
@AllArgsConstructor // 모든 필드 매개변수 생성자
public class ClassUserDTO extends BaseDTO {

	private String clsId;
	private String userId;
	private String realName;
	private char readerYn;
	private char permissionYn;
	private char activeYn;

	public static ClassUserDTO toClassUserDTO(ClassUserEntity classUserEntity) {
		ClassUserDTO classUserDTO = new ClassUserDTO();
		classUserDTO.setClsId(classUserEntity.getClsId());
		classUserDTO.setUserId(classUserEntity.getUserId());
		classUserDTO.setRealName(classUserEntity.getRealName());
		classUserDTO.setReaderYn(classUserEntity.getReaderYn());
		classUserDTO.setPermissionYn(classUserEntity.getPermissionYn());
		classUserDTO.setActiveYn(classUserEntity.getActiveYn());
		classUserDTO.setCreateDate(classUserEntity.getCreateDate());
		classUserDTO.setUpdateDate(classUserEntity.getUpdateDate());
		return classUserDTO;
	}

}