package com.alim.demo.dto;

import java.util.ArrayList;
import java.util.List;

import com.alim.demo.entity.ClassUserEntity;
import com.alim.demo.entity.UserEntity;

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
public class UserDTO extends BaseDTO {

	private String userId;
	private String userName;
	private String userPass;
	private String burnDate;
	private String email;
	private String phone;
	private char gender;
	private char snsYN;
	private char primiumYN;
	private String profileImg;
	private char collectYN;
	private char activeYN;

	private List<ClassUserEntity> classUserEntity = new ArrayList<>();

	public static UserDTO toUserDTO(UserEntity userEntity) {

		UserDTO userDTO = new UserDTO();
		userDTO.setUserId(userEntity.getUserId());
		userDTO.setUserName(userEntity.getUserName());
		userDTO.setUserPass(userEntity.getUserPass());
		userDTO.setBurnDate(userEntity.getBurnDate());
		userDTO.setEmail(userEntity.getEmail());
		userDTO.setPhone(userEntity.getPhone());
		userDTO.setGender(userEntity.getGender());
		userDTO.setSnsYN(userEntity.getSnsYN());
		userDTO.setPrimiumYN(userEntity.getPrimiumYN());
		userDTO.setProfileImg(userEntity.getProfileImg());
		userDTO.setCollectYN(userEntity.getCollectYN());
		userDTO.setActiveYN(userEntity.getActiveYN());
		userDTO.setCreateDate(userEntity.getCreateDate());
		userDTO.setUpdateDate(userEntity.getUpdateDate());

		return userDTO;
	}

	// 클래스유저 컬럼도 같이 생성
	public static UserDTO toClassUserDTO(UserEntity userEntity) {

		UserDTO userDTO = new UserDTO();
		userDTO.setUserId(userEntity.getUserId());
		userDTO.setUserName(userEntity.getUserName());
		userDTO.setUserPass(userEntity.getUserPass());
		userDTO.setBurnDate(userEntity.getBurnDate());
		userDTO.setEmail(userEntity.getEmail());
		userDTO.setPhone(userEntity.getPhone());
		userDTO.setGender(userEntity.getGender());
		userDTO.setSnsYN(userEntity.getSnsYN());
		userDTO.setPrimiumYN(userEntity.getPrimiumYN());
		userDTO.setProfileImg(userEntity.getProfileImg());
		userDTO.setCollectYN(userEntity.getCollectYN());
		userDTO.setActiveYN(userEntity.getActiveYN());
		userDTO.setCreateDate(userEntity.getCreateDate());
		userDTO.setUpdateDate(userEntity.getUpdateDate());

		return userDTO;
	}

}