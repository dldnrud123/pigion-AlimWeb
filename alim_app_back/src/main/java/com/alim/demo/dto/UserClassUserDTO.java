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
public class UserClassUserDTO extends BaseDTO {

	// ClassUser
	private String userId;
	private String realName;
	private char readerYn;
	private char permissionYn;
	private char activeYn;

	// User
	private String burnDate;
	private String email;
	private String phone;
	private char gender;
	private String profileImg;

	public static UserClassUserDTO toUserClassUserDTO(ClassUserEntity classUserEntity) {
		UserClassUserDTO userClassUserDTO = new UserClassUserDTO();

		userClassUserDTO.setUserId(classUserEntity.getUserId());
		userClassUserDTO.setRealName(classUserEntity.getRealName());
		userClassUserDTO.setReaderYn(classUserEntity.getReaderYn());
		userClassUserDTO.setPermissionYn(classUserEntity.getPermissionYn());
		userClassUserDTO.setActiveYn(classUserEntity.getActiveYn());
		userClassUserDTO.setCreateDate(classUserEntity.getCreateDate());

		userClassUserDTO.setBurnDate(classUserEntity.getUserEntity().getBurnDate());
		userClassUserDTO.setEmail(classUserEntity.getUserEntity().getEmail());
		userClassUserDTO.setPhone(classUserEntity.getUserEntity().getPhone());
		userClassUserDTO.setGender(classUserEntity.getUserEntity().getGender());
		userClassUserDTO.setProfileImg(classUserEntity.getUserEntity().getProfileImg());

		return userClassUserDTO;
	}

}