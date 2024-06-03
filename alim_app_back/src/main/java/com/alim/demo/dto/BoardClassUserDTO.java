package com.alim.demo.dto;

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
public class BoardClassUserDTO extends BaseDTO {

	// BoardUser
	private Long boardId;
	private String userId;
	private char reNotiYn;
	private char likeYn;
	private char viewYn;

	// ClassUser
	private String realName;
	private char readerYn;
	private char permissionYn;
	private char activeYn;

	// User
	private String email;
	private String profileImg;

}