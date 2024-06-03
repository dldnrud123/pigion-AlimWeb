package com.alim.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.alim.demo.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

// DB의 테이블 역할을 하는 클래스
@Entity
@Getter
@Setter
@Table(name = "user_info_tb")
public class UserEntity extends BaseEntity {

	@Id // pk 컬럼 지정. 필수
	@Column(name = "USER_ID", length = 255, nullable = false)
	private String userId;

	@Column(name = "USER_NAME", length = 100, nullable = false) // 크기 20, not null
	private String userName;

	@Column(name = "USER_PASS", length = 255, nullable = false) // 크기 255, null 가능
	private String userPass;

	@Column(name = "USER_BURN_DATE", length = 100, nullable = true) // 크기 20, not null
	private String burnDate;

	@Column(name = "USER_EMAIL", length = 100, nullable = true) // 크기 20, not null
	private String email;

	@Column(name = "USER_PHONE_NUM", length = 100, nullable = true) // 크기 20, not null
	private String phone;

	@Column(name = "USER_GENDER", length = 20, nullable = true)
	private char gender;

	@Column(name = "USER_SNS_YN", length = 20, nullable = false)
	private char snsYN;

	@Column(name = "USER_PRIMIUM_YN", length = 20, nullable = false)
	private char primiumYN;

	@Column(name = "USER_PROFILE_IMG", length = 255, nullable = true)
	private String profileImg;

	@Column(name = "USER_COLLECT_YN", length = 20, nullable = false)
	private char collectYN;

	@Column(name = "ACTIVE_YN", length = 20, nullable = false)
	private char activeYN;

	// mappedBy -> 대응하는 테이블에 선언되어있는 필드명
	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	private List<ClassUserEntity> classUserEntity = new ArrayList<>();

	@OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY)
	private List<BoardUserEntity> boardUserEntity = new ArrayList<>();

	public static UserEntity toSaveEntity(UserDTO UserDTO) {
		UserEntity userEntity = new UserEntity();
		userEntity.setUserId(UserDTO.getUserId());
		userEntity.setUserPass(UserDTO.getUserPass());
		userEntity.setUserName(UserDTO.getUserName());
		userEntity.setBurnDate(UserDTO.getBurnDate());
		userEntity.setEmail(UserDTO.getEmail());
		userEntity.setPhone(UserDTO.getPhone());
		userEntity.setGender(UserDTO.getGender());
		userEntity.setSnsYN(UserDTO.getSnsYN());
		userEntity.setPrimiumYN(UserDTO.getPrimiumYN());
		userEntity.setProfileImg(UserDTO.getProfileImg());
		userEntity.setCollectYN(UserDTO.getCollectYN());
		userEntity.setActiveYN(UserDTO.getActiveYN());
		userEntity.setCreateDate(UserDTO.getCreateDate());
		userEntity.setUpdateDate(UserDTO.getUpdateDate());

		return userEntity;
	}

}