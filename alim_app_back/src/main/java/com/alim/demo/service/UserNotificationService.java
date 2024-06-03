
package com.alim.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alim.demo.dto.UserNotificationDTO;
import com.alim.demo.entity.UserNotificationEntity;
import com.alim.demo.repository.jpa.BoardUserRepository;
import com.alim.demo.repository.jpa.UserNotificationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserNotificationService {

	@Autowired
	private final UserNotificationRepository userNotificationRepository;

	@Autowired
	private final BoardUserRepository boardUserRepository;

	public List<UserNotificationDTO> userNotificationListByClsId(String clsId) {

		List<UserNotificationEntity> userNotificationEntityList = userNotificationRepository.findKeyByClsId(clsId);
		List<UserNotificationDTO> userNotificationDTOList = new ArrayList<>();

		for (UserNotificationEntity userNotificationEntity : userNotificationEntityList) {
			userNotificationDTOList.add(UserNotificationDTO.toUserNotificationDTO(userNotificationEntity));
		}

		return userNotificationDTOList;
	}

	@Transactional
	public boolean save(UserNotificationDTO userNotificationDTO) {
		// 현 아이디에 같은 디바이스값이 있나없나 확인
		int count1 = userNotificationRepository.findCountByNotiKey(userNotificationDTO.getUserId(),
				userNotificationDTO.getNotiTokenVal());

		System.out.println("초기값 카운트 :" + count1);
		// 있으면 저장없이 false
		if (count1 > 0) {
			return false;
		}
		// 있을경우 시퀀스값 생성 후
		int count2 = userNotificationRepository.findNotiKeyCountByUserId(userNotificationDTO.getUserId());
		System.out.println("생성된 시퀀스 :" + count2);

		userNotificationDTO.setNotiSeq(count2);
		UserNotificationEntity userNotificationEntity = UserNotificationEntity.toSaveEntity(userNotificationDTO);
		userNotificationRepository.save(userNotificationEntity);

		return true;
	}

	@Transactional
	public void updateNotiActiveYnById(String userId, String notiTokenVal, char activeYN) {
		UserNotificationEntity userNotificationEntity = new UserNotificationEntity();
		userNotificationEntity.setActiveYN(activeYN);
		System.out.println("updateNotiActiveYnById : " + userId + activeYN);
		userNotificationRepository.updateNotiActiveYnByUserId(userId, userNotificationEntity.getActiveYN());
	}

	public UserNotificationDTO userNotificationByUserId(String userId, String notiTokenVal) {

		UserNotificationEntity userNotificationEntity = userNotificationRepository.findKeyByUserId(userId,
				notiTokenVal);
		UserNotificationDTO userNotificationDTO = UserNotificationDTO.toUserNotificationDTO(userNotificationEntity);

		return userNotificationDTO;
	}

	public List<UserNotificationDTO> getTokenByUserId(String userId) {
		// 해당 유저 토큰 리턴
		List<UserNotificationEntity> userNotificationEntityList = userNotificationRepository.findKeyByUserId(userId);
		List<UserNotificationDTO> userNotificationDTOList = new ArrayList<>();

		for (UserNotificationEntity userNotificationEntity : userNotificationEntityList) {
			userNotificationDTOList.add(UserNotificationDTO.toUserNotificationDTO(userNotificationEntity));
		}
		return userNotificationDTOList;
	}


}
