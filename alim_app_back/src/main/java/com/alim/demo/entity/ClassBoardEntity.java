package com.alim.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.alim.demo.dto.ClassBoardDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "class_board_tb")
public class ClassBoardEntity extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BOARD_ID", nullable = false)
	private Long boardId;

	@Column(name = "CLS_ID", nullable = false, length = 255)
	private String clsId;

	@Column(name = "WRITER_ID", nullable = false, length = 255)
	private String writerId;

	@Column(name = "BOARD_TITLE", nullable = false, length = 255)
	private String boardTitle;

	@Column(name = "BOARD_TEXT", nullable = false, length = 1000)
	private String boardText;

	@Column(name = "ACTIVE_YN", nullable = false, length = 1)
	private char activeYn;

	@JoinColumn(name = "USER_ID", insertable = false)
	@ManyToOne
	private UserEntity userEntity;

	@OneToMany(mappedBy = "classBoardEntity", fetch = FetchType.LAZY)
	private List<BoardUserEntity> boardUserEntity = new ArrayList<>();

	public static ClassBoardEntity toSaveEntity(ClassBoardDTO classBoardDTO) {
		ClassBoardEntity classBoardentity = new ClassBoardEntity();

		classBoardentity.setBoardId(classBoardDTO.getBoardId());
		classBoardentity.setClsId(classBoardDTO.getClsId());
		classBoardentity.setWriterId(classBoardDTO.getWriterId());
		classBoardentity.setBoardTitle(classBoardDTO.getBoardTitle());
		classBoardentity.setBoardText(classBoardDTO.getBoardText());
		classBoardentity.setActiveYn(classBoardDTO.getActiveYn());
		classBoardentity.setCreateDate(classBoardDTO.getCreateDate());
		classBoardentity.setUpdateDate(classBoardDTO.getUpdateDate());

		return classBoardentity;
	}

}