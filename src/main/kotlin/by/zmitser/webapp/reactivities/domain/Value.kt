package by.zmitser.webapp.reactivities.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Value(@Id val id: String?, val name: String)