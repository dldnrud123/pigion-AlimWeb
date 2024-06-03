package com.alim.demo.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alim.demo.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {

	@Query(value = "select A from UserEntity A where A.userId = :userId")
	UserEntity findByIdOne(@Param("userId") String userId);

	@Query(value = "select A from UserEntity A where A.userId = :userId AND A.userPass = :userPass")
	UserEntity findByIdPwdOne(@Param("userId") String userId, @Param("userPass") String userPass);

	// class user와 join하여 클래스 아이디로 리스트를 긁어와야함
	@Query(value = "SELECT A, B.realName FROM UserEntity A JOIN A.classUserEntity B WHERE B.clsId  = :clsId")
	List<UserEntity> findClsUserInfoByAll(@Param("clsId") String clsId);

}
