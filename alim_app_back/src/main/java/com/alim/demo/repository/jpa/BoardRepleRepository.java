package com.alim.demo.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alim.demo.entity.BoardRepleEntity;
import com.alim.demo.entity.BoardRepleId;

public interface BoardRepleRepository extends JpaRepository<BoardRepleEntity, BoardRepleId> {

	@Query(value = "SELECT A FROM BoardRepleEntity A WHERE A.boardId = :boardId ORDER BY A.replySeq ASC")
	List<BoardRepleEntity> findReplyByBoardId(@Param("boardId") Long boardId);

	@Query(value = "SELECT coalesce(MAX(replySeq)+1,1) FROM BoardRepleEntity A WHERE A.boardId = :boardId")
	int findReplyCountByBoardId(@Param("boardId") Long boardId);

	@Modifying
	@Query(value = "DELETE FROM BoardRepleEntity A WHERE A.boardId = :boardId AND A.replySeq = :replySeq")
	int deleteBySeqBoardId(@Param("boardId") Long boardId, @Param("replySeq") int replySeq);

	@Modifying
	@Query(value = "DELETE FROM BoardRepleEntity A WHERE A.boardId = :boardId AND A.parentReplySeq = :replySeq")
	int deleteChildrenBySeqBoardId(@Param("boardId") Long boardId, @Param("replySeq") int replySeq);

	@Query(value = "SELECT A, B, C FROM BoardRepleEntity A JOIN UserEntity B ON B.userId = A.userId JOIN ClassUserEntity C ON C.userId = B.userId WHERE A.boardId = :boardId AND C.clsId = :clsId AND B.activeYN = 'Y' ORDER BY A.replySeq")
	List<BoardRepleEntity> findReplyUserClsUser(@Param("clsId") String clsId, @Param("boardId") Long boardId);
}
