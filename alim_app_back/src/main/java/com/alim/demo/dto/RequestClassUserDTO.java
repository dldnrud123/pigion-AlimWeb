package com.alim.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//request body로 받을려고
@Getter
@Setter
@ToString
@NoArgsConstructor // 기본생성자
@AllArgsConstructor // 모든 필드 매개변수 생성자
public class RequestClassUserDTO extends BaseDTO {

	private String clsId;
	private String userId;
	private String realName;
	private char readerYn;
	private char permissionYn;
	private char activeYn;

	private String clsPass;

}