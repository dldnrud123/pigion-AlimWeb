package com.alim.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alim.demo.dto.BoardClassUserDTO;
import com.alim.demo.dto.BoardUserDTO;
import com.alim.demo.service.BoardUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boardUser")
public class BoardUserController {

	private final BoardUserService boardUserService;

	@GetMapping("/")
	public List<BoardClassUserDTO> getBoardUserInfo(@RequestParam("boardId") Long boardId,
			@RequestParam("clsId") String clsId) {
		System.out.println("bd:" + boardId);
		System.out.println("cd:" + clsId);
		List<BoardClassUserDTO> boardClassUserDTOlist = boardUserService.boardClassUserListByBoardId(clsId, boardId);
		System.out.println("BoardClassUser list all test");

		System.out.println(boardClassUserDTOlist);
		return boardClassUserDTOlist;
	}

	@PostMapping("/save")
	public void save(@RequestBody BoardUserDTO boardUserDTO) {
		System.out.println("boardRepleDTO = " + boardUserDTO);
		boardUserService.save(boardUserDTO);
	}

	@PostMapping("/autoSave")
	public void autoSave(@RequestParam("boardId") Long boardId, @RequestParam("clsId") String clsId) {
		boardUserService.autoSave(boardId, clsId);
	}


	@PostMapping("/viewMine")
	public boolean isViewMine(@RequestParam("boardId") Long boardId, @RequestParam("userId") String userId) {
		System.out.println("bd:" + boardId);
		System.out.println("uid:" + userId);

		return boardUserService.isViewMine(boardId, userId);
	}

	@PutMapping("/reNotiUpate")
	public void renotiByOne(@RequestParam("boardId") Long boardId, @RequestParam("userId") String userId) {
		System.out.println("boardId = " + boardId + "userId = " + userId);

		boardUserService.updateReNoti(boardId, userId, 'Y');
	}

}
