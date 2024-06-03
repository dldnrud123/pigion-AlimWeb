package com.alim.demo.dto;

import com.alim.demo.entity.ClassBoardEntity;

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
public class ClassBoardDTO extends BaseDTO {

	private Long boardId;
	private String clsId;
	private String writerId;
	private String boardTitle;
	private String boardText;
	private char activeYn;

	public static ClassBoardDTO toClassBoardDTO(ClassBoardEntity classBoardEntity) {
		ClassBoardDTO classBoardDTO = new ClassBoardDTO();

		classBoardDTO.setBoardId(classBoardEntity.getBoardId());
		classBoardDTO.setClsId(classBoardEntity.getClsId());
		classBoardDTO.setWriterId(classBoardEntity.getWriterId());
		classBoardDTO.setBoardTitle(classBoardEntity.getBoardTitle());
		classBoardDTO.setBoardText(classBoardEntity.getBoardText());
		classBoardDTO.setActiveYn(classBoardEntity.getActiveYn());
		classBoardDTO.setCreateDate(classBoardEntity.getCreateDate());
		classBoardDTO.setUpdateDate(classBoardEntity.getUpdateDate());

		return classBoardDTO;
	}

}