package com.alim.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alim.demo.dto.BoardBoardUserDTO;
import com.alim.demo.dto.ClassBoardDTO;
import com.alim.demo.service.ClassBoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/classBoard")
public class ClassBoardController {

	private final ClassBoardService classBoardService;

	// viewYn 붙여서 리스트가져오기
	@GetMapping("/")
	public List<BoardBoardUserDTO> getClassByIdMine(@RequestParam("clsId") String clsId,
			@RequestParam("userId") String userId) {
		System.out.println(clsId + userId);
		List<BoardBoardUserDTO> boardBoardUserDTOList = classBoardService.clsBoardList(clsId, userId);
		System.out.println("board list all test");

		System.out.println(boardBoardUserDTOList);
		return boardBoardUserDTOList;
	}

	@PostMapping("/save")
	public long save(@RequestBody ClassBoardDTO classBoardDTO) {
		System.out.println("classBoardDTO = " + classBoardDTO);

		return classBoardService.save(classBoardDTO);
	}

	@PutMapping("/update")
	public void updateBoard(@RequestBody ClassBoardDTO classBoardDTO) {
		System.out.println("classBoardDTO = " + classBoardDTO);
		classBoardService.updateBoardByBoardId(classBoardDTO);
	}

	@PutMapping("/delete")
	public void delete(@RequestParam("boardId") Long boardId, @RequestParam("activeYn") char activeYn) {
		System.out.println("boardId = " + boardId + "activeYn = " + activeYn);
		classBoardService.deleteById(boardId, activeYn);
	}

	@GetMapping("/boardInfo")
	public ClassBoardDTO enter(@RequestParam("boardId") Long boardId) {
		System.out.println("class info");
		System.out.println(boardId);

		ClassBoardDTO classBoardDTO = classBoardService.findByIdOne(boardId);

		return classBoardDTO;
	}

	@GetMapping("/aWeekBoard")
	public List<ClassBoardDTO> getOneWeekBoard(@RequestParam("userId") String userId) {
		System.out.println(userId);
		List<ClassBoardDTO> classBoardDTOlist = classBoardService.oneWeekBoardList(userId);
		System.out.println("one week board list all test");

		System.out.println(classBoardDTOlist);

		return classBoardDTOlist;
	}

	@GetMapping("/getWriteCount")
	public int writeCount(@RequestParam("userId") String userId) {
		System.out.println("getWriteCount");
		System.out.println(userId);

		return classBoardService.countUserWrite(userId);
	}

}
