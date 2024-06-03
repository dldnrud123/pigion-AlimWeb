
package com.alim.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alim.demo.dto.BoardBoardUserDTO;
import com.alim.demo.dto.ClassBoardDTO;
import com.alim.demo.entity.BoardUserEntity;
import com.alim.demo.entity.ClassBoardEntity;
import com.alim.demo.repository.jpa.BoardUserRepository;
import com.alim.demo.repository.jpa.ClassBoardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClassBoardService {

	@Autowired
	private final ClassBoardRepository classBoardRepository;

	@Autowired
	private final BoardUserRepository boardUserRepository;

	@Transactional
	public ClassBoardDTO findByIdOne(Long boardId) {
		ClassBoardEntity classBoardEntity = classBoardRepository.findBoardByOne(boardId);
		ClassBoardDTO classBoardDTO = ClassBoardDTO.toClassBoardDTO(classBoardEntity);

		return classBoardDTO;
	}

	public List<BoardBoardUserDTO> clsBoardList(String clsId, String userId) {

		List<BoardUserEntity> boardUserEntityList = boardUserRepository.findClsBoardByAll(clsId, userId);
		List<BoardBoardUserDTO> boardBoardUserDTOList = new ArrayList<>();

		for (BoardUserEntity boardUserEntity : boardUserEntityList) {
			boardBoardUserDTOList.add(BoardBoardUserDTO.toBoardBoardUserDTO(boardUserEntity));
		}

		return boardBoardUserDTOList;
	}

	@Transactional
	public long save(ClassBoardDTO classBoardDTO) {
		ClassBoardEntity classBoardEntity = ClassBoardEntity.toSaveEntity(classBoardDTO);
		classBoardEntity = classBoardRepository.save(classBoardEntity);
		boardUserRepository.procAhtoBoardUserSave(classBoardEntity.getBoardId(), classBoardEntity.getClsId());

		return classBoardEntity.getBoardId();
	}

	@Transactional
	public void deleteById(Long boardId, char activeYn) {
		ClassBoardEntity classBoardEntity = new ClassBoardEntity();
		classBoardEntity.setBoardId(boardId);
		classBoardEntity.setActiveYn(activeYn);
		System.out.println("deleteById : " + boardId + activeYn);
		classBoardRepository.updateActiveYnByBoardId(classBoardEntity.getBoardId(), classBoardEntity.getActiveYn());
	}

	@Transactional
	public void updateBoardByBoardId(ClassBoardDTO classBoardDTO) {

		ClassBoardEntity classBoardEntity = ClassBoardEntity.toSaveEntity(classBoardDTO);
		classBoardRepository.updateByBoardId(classBoardEntity.getBoardId(), classBoardEntity.getBoardTitle(),
				classBoardEntity.getBoardText());
	}

	public List<ClassBoardDTO> oneWeekBoardList(String userId) {
		// 일주일 전 날짜생성
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime oneWeekAgo = now.minusWeeks(1);

		List<ClassBoardEntity> classBoardEntityList = classBoardRepository.findOneWeekBoardByUserId(userId, oneWeekAgo);
		List<ClassBoardDTO> classBoardDTOList = new ArrayList<>();

		for (ClassBoardEntity classBoardEntity : classBoardEntityList) {
			classBoardDTOList.add(ClassBoardDTO.toClassBoardDTO(classBoardEntity));
		}

		return classBoardDTOList;
	}

	public int countUserWrite(String userId) {
		// 하루 전 날짜생성
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime onedayAgo = now.minusDays(1);

		return classBoardRepository.countWriteByuserId(userId, onedayAgo);
	}

}
