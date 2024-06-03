package com.alim.demo.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alim.demo.entity.ClassUserEntity;
import com.alim.demo.entity.ClassUserId;

public interface ClassUserRepository extends JpaRepository<ClassUserEntity, ClassUserId> {

	@Query(value = "select A from ClassUserEntity A where A.userId = :userId AND A.clsId = :clsId AND A.activeYn = 'Y'")
	ClassUserEntity findByClassUser(@Param("clsId") String clsId, @Param("userId") String userId);

	@Query(value = "select A from ClassUserEntity A where A.clsId = :clsId")
	List<ClassUserEntity> findAllClsUserInfoByclsId(@Param("clsId") String clsId);

	@Query(value = "select COUNT(A) from ClassUserEntity A where A.userId = :userId AND A.clsId = :clsId AND A.activeYn = 'N'")
	int countByUnActiveClassUser(@Param("clsId") String clsId, @Param("userId") String userId);

	// class user와 join하여 클래스 아이디로 리스트를 긁어와야함
	@Query(value = "SELECT B FROM UserEntity A JOIN A.classUserEntity B WHERE B.clsId  = :clsId AND A.activeYN = 'Y' AND B.activeYn = 'Y' ORDER BY B.readerYn DESC")
	List<ClassUserEntity> findClsUserInfoByAll(@Param("clsId") String clsId);

	@Query(value = "SELECT B FROM UserEntity A JOIN A.classUserEntity B WHERE B.clsId  = :clsId AND B.userId = :userId")
	List<ClassUserEntity> findClsUserInfoByOne(@Param("clsId") String clsId, @Param("userId") String userId);

	@Modifying
	@Query(value = "update ClassUserEntity A set A.activeYn = :activeYn WHERE A.clsId = :clsId AND A.userId = :userId")
	void updateClsUserActiveYnById(@Param("clsId") String clsId, @Param("userId") String userId,
			@Param("activeYn") char activeYn);

	@Modifying
	@Query(value = "update ClassUserEntity A set A.activeYn = :activeYn, A.realName = :realName WHERE A.clsId = :clsId AND A.userId = :userId")
	void updateClsUserDataById(@Param("clsId") String clsId, @Param("userId") String userId,
			@Param("activeYn") char activeYn, @Param("realName") String realName);

}
