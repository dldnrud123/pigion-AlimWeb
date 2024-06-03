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
public class BoardBoardUserDTO extends BaseDTO {

	/////////////// 테스트
	// Board
	private Long boardId;
	private String clsId;
	private String writerId;
	private String boardTitle;
	private String boardText;

	// BoardUser
	private char viewYn;

	public static BoardBoardUserDTO toBoardBoardUserDTO(BoardUserEntity boardUserEntity) {
		BoardBoardUserDTO boardBoardUserDTO = new BoardBoardUserDTO();

		boardBoardUserDTO.setBoardId(boardUserEntity.getClassBoardEntity().getBoardId());
		boardBoardUserDTO.setClsId(boardUserEntity.getClassBoardEntity().getClsId());
		boardBoardUserDTO.setWriterId(boardUserEntity.getClassBoardEntity().getWriterId());
		boardBoardUserDTO.setBoardTitle(boardUserEntity.getClassBoardEntity().getBoardTitle());
		boardBoardUserDTO.setBoardText(boardUserEntity.getClassBoardEntity().getBoardText());

		boardBoardUserDTO.setViewYn(boardUserEntity.getViewYn());

		boardBoardUserDTO.setCreateDate(boardUserEntity.getClassBoardEntity().getCreateDate());
		boardBoardUserDTO.setUpdateDate(boardUserEntity.getClassBoardEntity().getUpdateDate());

		return boardBoardUserDTO;
	}

}