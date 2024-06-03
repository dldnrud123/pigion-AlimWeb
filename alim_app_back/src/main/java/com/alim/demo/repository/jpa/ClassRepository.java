package com.alim.demo.repository.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alim.demo.entity.ClassEntity;

public interface ClassRepository extends JpaRepository<ClassEntity, String> {

	@Query(value = "SELECT A FROM ClassEntity A WHERE A.createUserId = :id AND A.activeYn = 'Y' ORDER BY A.createDate DESC")
	List<ClassEntity> findClsByIdMine(@Param("id") String id);

	@Query(value = "SELECT A FROM ClassEntity A JOIN A.classUserEntity B WHERE A.activeYn = 'Y' AND B.userId = :id AND B.readerYn = 'N' AND B.activeYn = 'Y' ")
	List<ClassEntity> findClsByIdNotMine(@Param("id") String id);

	@Query(value = "SELECT A FROM ClassEntity A JOIN A.classUserEntity B WHERE A.activeYn = 'Y' AND B.userId = :id AND B.activeYn = 'Y' ")
	List<ClassEntity> AllfindClsById(@Param("id") String id);

	@Query(value = "SELECT A FROM ClassEntity A WHERE A.clsId = :id")
	ClassEntity findClsById(@Param("id") String id);

	@Modifying
	@Query(value = "update ClassEntity A set A.activeYn = :activeYn WHERE A.clsId = :clsId")
	void updateClassActiveYnByClsId(@Param("clsId") String clsId, @Param("activeYn") char activeYn);

}
