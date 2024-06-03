package com.alim.demo.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alim.demo.entity.UserNotificationEntity;
import com.alim.demo.entity.UserNotificationId;

public interface UserNotificationRepository extends JpaRepository<UserNotificationEntity, UserNotificationId> {

	@Query(value = "SELECT A FROM UserNotificationEntity A WHERE A.userId IN (SELECT B.userId FROM ClassUserEntity B WHERE B.clsId = :clsId AND B.activeYn = 'Y') AND A.activeYN = 'Y' ")
	List<UserNotificationEntity> findKeyByClsId(@Param("clsId") String clsId);

	@Query(value = "SELECT A FROM UserNotificationEntity A WHERE A.userId = :userId AND A.activeYN = 'Y' ")
	List<UserNotificationEntity> findKeyByUserId(@Param("userId") String userId);

	@Query(value = "SELECT coalesce(MAX(notiSeq)+1,1) FROM UserNotificationEntity A WHERE A.userId = :userId ")
	int findNotiKeyCountByUserId(@Param("userId") String userId);

	@Query(value = "SELECT coalesce(COUNT(notiSeq),0) FROM UserNotificationEntity A WHERE A.userId = :userId AND A.notiTokenVal = :notiTokenVal ")
	int findCountByNotiKey(@Param("userId") String userId, @Param("notiTokenVal") String notiTokenVal);

	@Modifying
	@Query(value = "update UserNotificationEntity A set A.activeYN = :activeYN WHERE A.userId = :userId")
	void updateNotiActiveYnByUserId(@Param("userId") String userId, @Param("activeYN") char activeYN);

	@Query(value = "SELECT A FROM UserNotificationEntity A WHERE A.userId = :userId AND A.notiTokenVal = :notiTokenVal")
	UserNotificationEntity findKeyByUserId(@Param("userId") String userId, @Param("notiTokenVal") String notiTokenVal);

}
