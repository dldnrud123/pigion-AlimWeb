package com.alim.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alim.demo.dto.BoardRepleDTO;
import com.alim.demo.dto.ClassUserRepleDTO;
import com.alim.demo.service.BoardRepleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boardReple")
public class BoardRepleController {

	private final BoardRepleService boardRepleService;

	@GetMapping("/")
	public List<ClassUserRepleDTO> getClassByIdMine(@RequestParam("boardId") Long boardId,
			@RequestParam("clsId") String clsId) {
		System.out.println("bd:" + boardId);
		System.out.println("cd:" + clsId);

		List<ClassUserRepleDTO> classUserRepleDTOlist = boardRepleService.boardRepleListByBoardId(clsId, boardId);
		System.out.println("boardReple list all test : ");

		System.out.println(classUserRepleDTOlist);
		return classUserRepleDTOlist;
	}

	@PostMapping("/save")
	public void save(@RequestBody BoardRepleDTO boardRepleDTO) {
		System.out.println("boardRepleDTO = " + boardRepleDTO);
		boardRepleService.save(boardRepleDTO);
	}

	@DeleteMapping("/delete")
	public void delete(@RequestParam("boardId") Long boardId, @RequestParam("replySeq") int replySeq) {
		System.out.println("boardId = " + boardId + "activeYn = " + replySeq);
		boardRepleService.deleteById(boardId, replySeq);
	}

}
