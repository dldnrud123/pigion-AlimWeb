package com.alim.demo.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.alim.demo.entity.BoardUserEntity;
import com.alim.demo.entity.BoardUserId;

public interface BoardUserRepository extends JpaRepository<BoardUserEntity, BoardUserId> {
	@Query(value = "select A from BoardUserEntity A where A.boardId = :boardId AND A.userId = :userId")
	BoardUserEntity findByClassUser(@Param("boardId") Long boardId, @Param("userId") String userId);

	// 게시물에 해당하는 클래스 유저들의 해당 클래스내의 이름, 프로필사진, 유저-게시물에관한 정보
	@Query(value = "SELECT A, B FROM BoardUserEntity A JOIN UserEntity B ON B.userId = A.userId WHERE A.boardId = :boardId AND B.activeYN = 'Y' ORDER BY A.createDate")
	List<BoardUserEntity> findBoardUserByBoardId(@Param("boardId") Long boardId);

	@Modifying
	@Query(value = "update BoardUserEntity A set A.viewYn = :viewYn, updateDate = NOW() WHERE A.boardId=:boardId AND A.userId = :userId")
	void updateViewYnByBoardUserId(@Param("boardId") Long boardId, @Param("userId") String userId,
			@Param("viewYn") char viewYn);

	@Modifying
	@Procedure("PROC_CREATE_BOARD_USER")
	void procAhtoBoardUserSave(@Param("boardId") Long boardId, @Param("clsId") String clsId);

	@Query(value = "SELECT A.viewYn FROM BoardUserEntity A WHERE A.boardId = :boardId AND A.userId = :userId")
	String findViewYnById(@Param("boardId") Long boardId, @Param("userId") String userId);

	@Modifying
	@Query(value = "update BoardUserEntity A set A.reNotiYn = :reNotiYn WHERE A.boardId=:boardId AND A.userId = :userId")
	void updateReNotiYnByBoardUserId(@Param("boardId") Long boardId, @Param("userId") String userId,
			@Param("reNotiYn") char reNotiYn);

	// classboard에서 위치변경
	@Query(value = "SELECT A, B FROM BoardUserEntity A JOIN ClassBoardEntity B ON A.boardId = B.boardId WHERE A.userId = :userId AND B.clsId = :clsId AND  B.activeYn = 'Y' ORDER BY B.createDate DESC")
	List<BoardUserEntity> findClsBoardByAll(@Param("clsId") String clsId, @Param("userId") String userId);

}
