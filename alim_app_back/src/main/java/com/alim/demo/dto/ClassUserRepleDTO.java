package com.alim.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor // 기본생성자
@AllArgsConstructor // 모든 필드 매개변수 생성자
public class ClassUserRepleDTO extends BaseDTO {

	// Reple
	private int replySeq;
	private long boardId;
	private String userId;
	private String replyText;
	private char replyLevel;
	private int parentReplySeq;

//	// ClassUser
	private String realName;
	private char readerYn;
	private char permissionYn;
	private char activeYn;

	// User
	private String profileImg;

}