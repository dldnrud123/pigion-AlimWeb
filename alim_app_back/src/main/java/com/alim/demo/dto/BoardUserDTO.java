package com.alim.demo.dto;

import com.alim.demo.entity.BoardUserEntity;

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
public class BoardUserDTO extends BaseDTO {

	private Long boardId;
	private String userId;
	private char reNotiYn;
	private char likeYn;
	private char viewYn;

	public static BoardUserDTO toBoardUserDTO(BoardUserEntity boardUserEntity) {
		BoardUserDTO boardUserDTO = new BoardUserDTO();
		boardUserDTO.setBoardId(boardUserEntity.getBoardId());
		boardUserDTO.setUserId(boardUserEntity.getUserId());
		boardUserDTO.setReNotiYn(boardUserEntity.getReNotiYn());
		boardUserDTO.setLikeYn(boardUserEntity.getLikeYn());
		boardUserDTO.setViewYn(boardUserEntity.getViewYn());
		boardUserDTO.setCreateDate(boardUserEntity.getCreateDate());
		boardUserDTO.setUpdateDate(boardUserEntity.getUpdateDate());
		return boardUserDTO;
	}

}