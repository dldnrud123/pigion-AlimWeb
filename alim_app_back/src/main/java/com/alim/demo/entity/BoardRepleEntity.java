package com.alim.demo.entity;

import com.alim.demo.dto.BoardRepleDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(BoardRepleId.class)
@Table(name = "board_reple_tb")
public class BoardRepleEntity extends BaseEntity {

	@Id
	@Column(name = "REPLY_SEQ")
	private int replySeq;

	@Id
	@Column(name = "BOARD_ID")
	private long boardId;

	@Column(name = "USER_ID", length = 255)
	private String userId;

	@Column(name = "REPLY_TEXT", length = 255)
	private String replyText;

	@Column(name = "REPLY_LEVEL", length = 1)
	private char replyLevel;

	@Column(name = "PARENT_REPLY_SEQ")
	private int parentReplySeq;

	@JoinColumn(name = "USER_ID", insertable = false, updatable = false)
	@ManyToOne
	private UserEntity userEntity;

	public static BoardRepleEntity toSaveEntity(BoardRepleDTO boardRepleDTO) {
		BoardRepleEntity boardRepleEntity = new BoardRepleEntity();
		boardRepleEntity.setReplySeq(boardRepleDTO.getReplySeq());
		boardRepleEntity.setBoardId(boardRepleDTO.getBoardId());
		boardRepleEntity.setUserId(boardRepleDTO.getUserId());
		boardRepleEntity.setReplyText(boardRepleDTO.getReplyText());
		boardRepleEntity.setReplyLevel(boardRepleDTO.getReplyLevel());
		boardRepleEntity.setParentReplySeq(boardRepleDTO.getParentReplySeq());
		boardRepleEntity.setCreateDate(boardRepleDTO.getCreateDate());
		boardRepleEntity.setUpdateDate(boardRepleDTO.getUpdateDate());
		return boardRepleEntity;
	}
}