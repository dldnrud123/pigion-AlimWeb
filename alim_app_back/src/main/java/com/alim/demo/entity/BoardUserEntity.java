package com.alim.demo.entity;

import com.alim.demo.dto.BoardUserDTO;

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
@IdClass(BoardUserId.class)
@Table(name = "board_user_tb")
public class BoardUserEntity extends BaseEntity {

	@Id
	@Column(name = "BOARD_ID")
	private Long boardId;

	@Id
	@Column(name = "USER_ID", length = 255, nullable = false)
	private String userId;

	@Column(name = "RE_NOTI_YN", length = 1, nullable = false)
	private char reNotiYn;

	@Column(name = "LIKE_YN", length = 1, nullable = false)
	private char likeYn;

	@Column(name = "VIEW_YN", length = 1, nullable = false)
	private char viewYn;

	@JoinColumn(name = "BOARD_ID", insertable = false)
	@ManyToOne
	private ClassBoardEntity classBoardEntity;

	@JoinColumn(name = "USER_ID", insertable = false)
	@ManyToOne
	private UserEntity userEntity;

	public static BoardUserEntity toSaveEntity(BoardUserDTO boardUserDTO) {
		BoardUserEntity boardUserEntity = new BoardUserEntity();
		boardUserEntity.setBoardId(boardUserDTO.getBoardId());
		boardUserEntity.setUserId(boardUserDTO.getUserId());
		boardUserEntity.setReNotiYn(boardUserDTO.getReNotiYn());
		boardUserEntity.setLikeYn(boardUserDTO.getLikeYn());
		boardUserEntity.setCreateDate(boardUserDTO.getCreateDate());
		boardUserEntity.setUpdateDate(boardUserDTO.getUpdateDate());
		return boardUserEntity;
	}
}