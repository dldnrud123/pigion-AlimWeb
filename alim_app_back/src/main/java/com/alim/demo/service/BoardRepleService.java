
package com.alim.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alim.demo.dto.BoardRepleDTO;
import com.alim.demo.dto.ClassUserRepleDTO;
import com.alim.demo.entity.BoardRepleEntity;
import com.alim.demo.repository.jpa.BoardRepleRepository;
import com.alim.demo.repository.mybatis.ClassUserRepleMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardRepleService {

	@Autowired
	private final BoardRepleRepository boardRepleRepository;

	@Autowired
	private final ClassUserRepleMapper classUserRepleMapper;

	public void save(BoardRepleDTO boardRepleDTO) {
		int count = boardRepleRepository.findReplyCountByBoardId(boardRepleDTO.getBoardId());
		System.out.println("카운트 :" + count);
		boardRepleDTO.setReplySeq(count);
		BoardRepleEntity boardRepleEntity = BoardRepleEntity.toSaveEntity(boardRepleDTO);
		boardRepleRepository.save(boardRepleEntity);
	}

	@Transactional
	public void deleteById(Long boardId, int replySeq) {
		boardRepleRepository.deleteChildrenBySeqBoardId(boardId, replySeq);
		boardRepleRepository.deleteBySeqBoardId(boardId, replySeq);

	}

	public List<ClassUserRepleDTO> boardRepleListByBoardId(String clsId, long boardId) {

		System.out.println("확인" + classUserRepleMapper.findReplyUserClsUser(clsId, boardId));
		return classUserRepleMapper.findReplyUserClsUser(clsId, boardId);
	}

}
