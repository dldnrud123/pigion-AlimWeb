package com.alim.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alim.demo.dto.ClassDTO;
import com.alim.demo.service.ClassService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/class")
public class ClassController {

	private final ClassService classService;

	@GetMapping("/mineList")
	public List<ClassDTO> getClassByIdMine(@RequestParam("id") String id) {
		System.out.println(id);
		List<ClassDTO> classDTOlist = classService.findClsByIdMine(id);
		System.out.println("class list all test for mine");

		System.out.println(classDTOlist);
		return classDTOlist;
	}

	@GetMapping("/commonList")
	public List<ClassDTO> getClassById(@RequestParam("id") String id) {
		System.out.println(id);
		List<ClassDTO> classDTOlist = classService.findClsByIdNotMine(id);
		System.out.println("class list all test for common");
		System.out.println(classDTOlist);
		return classDTOlist;
	}

	@GetMapping("/allList")
	public List<ClassDTO> AllfindClsById(@RequestParam("id") String id) {
		System.out.println(id);
		List<ClassDTO> classDTOlist = classService.AllfindClsById(id);
		System.out.println("class list all test for common");
		System.out.println(classDTOlist);
		return classDTOlist;
	}

	@GetMapping("/idCheck")
	public boolean existsById(@RequestParam("id") String id) {
		System.out.println("id confirm check");
		System.out.println(id);
		return !classService.existsById(id);
	}

	@PostMapping("/save")
	public void save(@RequestBody ClassDTO classDTO) {
		System.out.println("classDTO = " + classDTO);
		classService.save(classDTO);
	}

	@GetMapping("/classInfo")
	public ClassDTO enter(@RequestParam("clsId") String clsId) {
		System.out.println("class info");
		System.out.println(clsId);

		ClassDTO classDTO = classService.findClsById(clsId);

		return classDTO;
	}

	@PutMapping("/delete")
	public void deleteClass(@RequestParam("clsId") String clsId) {
		System.out.println("clsId = " + clsId);
		classService.updateClsActiveYnById(clsId, 'N');
	}

}
