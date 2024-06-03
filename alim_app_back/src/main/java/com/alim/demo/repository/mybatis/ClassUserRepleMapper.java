package com.alim.demo.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.alim.demo.dto.ClassUserRepleDTO;

@Repository
@Mapper
public interface ClassUserRepleMapper {

	// 프로필사진 + realName + 댓글정보를 동시에 가져가기위함
	List<ClassUserRepleDTO> findReplyUserClsUser(@Param("clsId") String clsId, @Param("boardId") long boardId);
}
