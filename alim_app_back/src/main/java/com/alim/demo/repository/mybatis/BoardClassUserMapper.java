package com.alim.demo.repository.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.alim.demo.dto.BoardClassUserDTO;

@Repository
@Mapper
public interface BoardClassUserMapper {

	// 프로필사진 + realName + 보드-유저정보
	List<BoardClassUserDTO> findBoardUserByBoardId(@Param("clsId") String clsId, @Param("boardId") long boardId);
}
