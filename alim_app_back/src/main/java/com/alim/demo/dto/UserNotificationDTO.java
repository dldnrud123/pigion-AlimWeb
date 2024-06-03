package com.alim.demo.dto;

import com.alim.demo.entity.UserNotificationEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본생성자
@AllArgsConstructor // 모든 필드 매개변수 생성자
public class UserNotificationDTO extends BaseDTO {

	private int notiSeq;
	private String userId;
	private String notiTokenVal;
	private char activeYN;

	public static UserNotificationDTO toUserNotificationDTO(UserNotificationEntity userNotificationEntity) {
		UserNotificationDTO userNotificationDTO = new UserNotificationDTO();
		userNotificationDTO.setNotiSeq(userNotificationEntity.getNotiSeq());
		userNotificationDTO.setUserId(userNotificationEntity.getUserId());
		userNotificationDTO.setNotiTokenVal(userNotificationEntity.getNotiTokenVal());
		userNotificationDTO.setActiveYN(userNotificationEntity.getActiveYN());
		userNotificationDTO.setCreateDate(userNotificationEntity.getCreateDate());
		userNotificationDTO.setUpdateDate(userNotificationEntity.getUpdateDate());

		return userNotificationDTO;
	}

}