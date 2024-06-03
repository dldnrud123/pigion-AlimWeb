package com.alim.demo.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class BaseEntity {

	@CreationTimestamp
	@Column(name = "CREATE_DATE")
	private LocalDateTime createDate;

	@UpdateTimestamp
	@Column(name = "UPDATE_DATE", updatable = true)
	private LocalDateTime updateDate;
}
