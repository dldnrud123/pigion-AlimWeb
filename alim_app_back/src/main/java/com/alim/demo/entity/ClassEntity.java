package com.alim.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.alim.demo.dto.ClassDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "class_info_tb")
public class ClassEntity extends BaseEntity {

	@Id
	@Column(name = "CLS_ID", nullable = false, length = 255)
	private String clsId;

	@Column(name = "CLS_PASS", length = 255)
	private String clsPass;

	@Column(name = "CLS_NAME", length = 255)
	private String clsName;

	@Column(name = "CLS_COMMENT", length = 255)
	private String clsComment;

	@Column(name = "CLS_PUBLIC_YN", length = 1)
	private char clsPublicYn;

	@Column(name = "CREATE_USER_ID", length = 255, nullable = false)
	private String createUserId;

	@Column(name = "ACTIVE_YN", length = 1)
	private char activeYn;

	@OneToMany(mappedBy = "classEntity")
	private List<ClassUserEntity> classUserEntity = new ArrayList<>();

	public static ClassEntity toSaveEntity(ClassDTO ClassDTO) {
		ClassEntity classEntity = new ClassEntity();
		classEntity.setClsId(ClassDTO.getClsId());
		classEntity.setClsPass(ClassDTO.getClsPass());
		classEntity.setClsName(ClassDTO.getClsName());
		classEntity.setClsComment(ClassDTO.getClsComment());
		classEntity.setClsPublicYn(ClassDTO.getClsPublicYn());
		classEntity.setCreateUserId(ClassDTO.getCreateUserId());
		classEntity.setActiveYn(ClassDTO.getActiveYn());
		classEntity.setCreateDate(ClassDTO.getCreateDate());
		classEntity.setUpdateDate(ClassDTO.getUpdateDate());

		return classEntity;
	}

}