package by.zmitser.webapp.reactivities.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Authority(@Id val name: String)