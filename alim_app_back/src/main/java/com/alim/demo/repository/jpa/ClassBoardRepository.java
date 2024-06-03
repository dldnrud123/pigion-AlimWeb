package com.alim.demo.repository.jpa;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alim.demo.entity.ClassBoardEntity;

public interface ClassBoardRepository extends JpaRepository<ClassBoardEntity, Long> {

	@Query(value = "SELECT A FROM ClassBoardEntity A WHERE A.boardId = :boardId")
	ClassBoardEntity findBoardByOne(@Param("boardId") Long boardId);

	@Modifying
	@Query(value = "update ClassBoardEntity A set A.boardTitle = :boardTitle, A.boardText = :boardText WHERE A.boardId=:boardId")
	void updateByBoardId(@Param("boardId") Long boardId, @Param("boardTitle") String boardTitle,
			@Param("boardText") String boardText);

	@Modifying
	@Query(value = "update ClassBoardEntity A set A.activeYn = :activeYn WHERE A.boardId=:boardId")
	void updateActiveYnByBoardId(@Param("boardId") Long boardId, @Param("activeYn") char activeYn);

	@Modifying
	@Query(value = "update ClassBoardEntity A set A.activeYn = :activeYn WHERE A.clsId=:clsId")
	void updateBoardActiveYnByClsId(@Param("clsId") String clsId, @Param("activeYn") char activeYn);

	@Query(value = "SELECT A FROM ClassBoardEntity A WHERE A.writerId = :userId AND A.activeYn = 'Y' AND A.createDate >= :oneWeekAgo ORDER BY A.createDate DESC")
	List<ClassBoardEntity> findOneWeekBoardByUserId(@Param("userId") String userId,
			@Param("oneWeekAgo") LocalDateTime oneWeekAgo);
//
//	@Query(value = "SELECT A,B,C FROM ClassBoardEntity A JOIN BoardUserEntity B ON A.boardId = B.boardId JOIN ClassUserEntity C ON B.userId = C.userId AND A.clsId = C.clsId WHERE A.writerId = :userId AND B.userId = :userId  AND A.activeYn = 'Y' AND A.createDate >= :oneWeekAgo ORDER BY A.createDate DESC")
//	List<ClassBoardEntity> findOneWeekBoardByUserId1(@Param("userId") String userId,
//			@Param("oneWeekAgo") LocalDateTime oneWeekAgo);

	@Query(value = "SELECT COUNT(A) FROM ClassBoardEntity A WHERE A.writerId = :userId AND A.createDate >= :oneDayAgo ")
	int countWriteByuserId(@Param("userId") String userId, @Param("oneDayAgo") LocalDateTime oneDayAgo);
}
