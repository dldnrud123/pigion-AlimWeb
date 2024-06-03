package com.alim.demo.dto;

import com.alim.demo.entity.BoardRepleEntity;

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
public class BoardRepleDTO extends BaseDTO {

	private int replySeq;
	private long boardId;
	private String userId;
	private String replyText;
	private char replyLevel;
	private int parentReplySeq;

	public static BoardRepleDTO toBoardRepleDTO(BoardRepleEntity boardRepleEntity) {
		BoardRepleDTO boardRepleDTO = new BoardRepleDTO();
		boardRepleDTO.setReplySeq(boardRepleEntity.getReplySeq());
		boardRepleDTO.setBoardId(boardRepleEntity.getBoardId());
		boardRepleDTO.setUserId(boardRepleEntity.getUserId());
		boardRepleDTO.setReplyText(boardRepleEntity.getReplyText());
		boardRepleDTO.setReplyLevel(boardRepleEntity.getReplyLevel());
		boardRepleDTO.setParentReplySeq(boardRepleEntity.getParentReplySeq());
		boardRepleDTO.setCreateDate(boardRepleEntity.getCreateDate());
		boardRepleDTO.setUpdateDate(boardRepleEntity.getUpdateDate());
		return boardRepleDTO;
	}

}