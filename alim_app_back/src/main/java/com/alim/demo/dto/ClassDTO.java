package com.alim.demo.dto;

import com.alim.demo.entity.ClassEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본생성자 파라미터
@AllArgsConstructor // 모든 필드 매개변수 생성자
public class ClassDTO extends BaseDTO {

	private String clsId;
	private String clsPass;
	private String clsName;
	private String clsComment;
	private char clsPublicYn;
	private String createUserId;
	private char activeYn;

	public static ClassDTO toClassDTO(ClassEntity classEntity) {

		ClassDTO classDTO = new ClassDTO();
		classDTO.setClsId(classEntity.getClsId());
		classDTO.setClsPass(classEntity.getClsPass());
		classDTO.setClsName(classEntity.getClsName());
		classDTO.setClsComment(classEntity.getClsComment());
		classDTO.setClsPublicYn(classEntity.getClsPublicYn());
		classDTO.setActiveYn(classEntity.getActiveYn());
		classDTO.setCreateUserId(classEntity.getCreateUserId());
		classDTO.setCreateDate(classEntity.getCreateDate());
		classDTO.setUpdateDate(classEntity.getUpdateDate());

		return classDTO;
	}

}