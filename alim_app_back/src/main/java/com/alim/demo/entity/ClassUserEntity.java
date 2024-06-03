package com.alim.demo.entity;

import com.alim.demo.dto.ClassUserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@IdClass(ClassUserId.class)
@Table(name = "class_user_tb")
public class ClassUserEntity extends BaseEntity {

	@Id
	@Column(name = "CLS_ID", nullable = false, length = 255)
	private String clsId;

	@Id
	@Column(name = "USER_ID", nullable = false, length = 255)
	private String userId;

	@Column(name = "REAL_NAME", nullable = true, length = 255)
	private String realName;

	@Column(name = "READER_YN", nullable = false, length = 1)
	private char readerYn;

	@Column(name = "PERMISSION_YN", nullable = false, length = 1)
	private char permissionYn;

	@Column(name = "ACTIVE_YN", nullable = false, length = 1)
	private char activeYn;

	@JoinColumn(name = "CLS_ID", insertable = false)
	@ManyToOne
	private ClassEntity classEntity;

	@JoinColumn(name = "USER_ID", insertable = false)
	@ManyToOne
	private UserEntity userEntity;

	public static ClassUserEntity toSaveEntity(ClassUserDTO classUserDTO) {
		ClassUserEntity classUserEntity = new ClassUserEntity();
		classUserEntity.setClsId(classUserDTO.getClsId());
		classUserEntity.setUserId(classUserDTO.getUserId());
		classUserEntity.setRealName(classUserDTO.getRealName());
		classUserEntity.setReaderYn(classUserDTO.getReaderYn());
		classUserEntity.setPermissionYn(classUserDTO.getPermissionYn());
		classUserEntity.setActiveYn(classUserDTO.getActiveYn());
		classUserEntity.setCreateDate(classUserDTO.getCreateDate());
		classUserEntity.setUpdateDate(classUserDTO.getUpdateDate());
		return classUserEntity;
	}
}