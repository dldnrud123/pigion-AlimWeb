package com.alim.demo.entity;

import com.alim.demo.dto.UserNotificationDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(UserNotificationId.class)
@Table(name = "user_notification_tb")
public class UserNotificationEntity extends BaseEntity {

	@Id
	@Column(name = "NOTI_SEQ")
	private int notiSeq;

	@Id
	@Column(name = "USER_ID", length = 255)
	private String userId;

	@Column(name = "NOTI_TOKEN_VAL", length = 255)
	private String notiTokenVal;

	@Column(name = "ACTIVE_YN", length = 1)
	private char activeYN;

	@JoinColumn(name = "USER_ID", insertable = false)
	@ManyToOne
	private UserEntity userEntity;

	public static UserNotificationEntity toSaveEntity(UserNotificationDTO userNotificationDTO) {
		UserNotificationEntity userNotificationEntity = new UserNotificationEntity();

		userNotificationEntity.setNotiSeq(userNotificationDTO.getNotiSeq());
		userNotificationEntity.setUserId(userNotificationDTO.getUserId());
		userNotificationEntity.setNotiTokenVal(userNotificationDTO.getNotiTokenVal());
		userNotificationEntity.setActiveYN(userNotificationDTO.getActiveYN());
		userNotificationEntity.setCreateDate(userNotificationDTO.getCreateDate());
		userNotificationEntity.setUpdateDate(userNotificationDTO.getUpdateDate());
		return userNotificationEntity;
	}
}