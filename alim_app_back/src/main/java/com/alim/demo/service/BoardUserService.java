
package com.alim.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alim.demo.dto.BoardClassUserDTO;
import com.alim.demo.dto.BoardUserDTO;
import com.alim.demo.entity.BoardUserEntity;
import com.alim.demo.repository.jpa.BoardUserRepository;
import com.alim.demo.repository.mybatis.BoardClassUserMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardUserService {

	@Autowired
	private final BoardUserRepository boardUserRepository;

	@Autowired
	private final BoardClassUserMapper boardClassUserMapper;

	public List<BoardClassUserDTO> boardClassUserListByBoardId(String clsId, Long boardId) {

		List<BoardClassUserDTO> BoardClassUserDTOlist = boardClassUserMapper.findBoardUserByBoardId(clsId, boardId);
		return BoardClassUserDTOlist;
	}

	public void save(BoardUserDTO boardUserDTO) {
		BoardUserEntity boardUserEntity = BoardUserEntity.toSaveEntity(boardUserDTO);
		boardUserRepository.save(boardUserEntity);
	}

	@Transactional
	public void autoSave(Long boardId, String clsId) {

		boardUserRepository.procAhtoBoardUserSave(boardId, clsId);
	}

	@Transactional
	public void updateViewYnById(Long boardId, String userId, char viewYn) {
		BoardUserEntity boardUserEntity = new BoardUserEntity();
		boardUserEntity.setViewYn(viewYn);
		System.out.println("updateViewYnById : " + boardId + userId + viewYn);
		boardUserRepository.updateViewYnByBoardUserId(boardId, userId, boardUserEntity.getViewYn());
	}

	@Transactional
	public boolean isViewMine(Long boardId, String userId) {
		// 유저가 알림장 읽었는지 확인
		String viewYn = boardUserRepository.findViewYnById(boardId, userId);
		System.out.println("isViewMine : " + viewYn);
		// 안읽었을 경우 처리 -> 업데이트 완료 'true'
		if (viewYn.equals("N") || viewYn.equals(null)) {
			System.out.println("isViewMine inner: " + viewYn);
			boardUserRepository.updateViewYnByBoardUserId(boardId, userId, 'Y');
			return true;
		}

		// 업데이트 필요없음 'false'
		return false;
	}

	@Transactional
	public void updateReNoti(Long boardId, String userId, char reNotiYn) {
		BoardUserEntity boardUserEntity = new BoardUserEntity();
		boardUserEntity.setReNotiYn(reNotiYn);
		System.out.println("updateViewYnById : " + boardId + userId + reNotiYn);
		boardUserRepository.updateReNotiYnByBoardUserId(boardId, userId, boardUserEntity.getReNotiYn());
	}

}
