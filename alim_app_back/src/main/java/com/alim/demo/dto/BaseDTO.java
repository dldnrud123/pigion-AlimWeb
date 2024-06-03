package com.alim.demo.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본생성자 파라미터
@AllArgsConstructor // 모든 필드 매개변수 생성자
public class BaseDTO {

	private LocalDateTime createDate;
	private LocalDateTime updateDate;
}
