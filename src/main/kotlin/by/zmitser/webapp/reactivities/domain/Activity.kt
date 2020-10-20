package by.zmitser.webapp.reactivities.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document
data class Activity(@Id val id: String?, var title: String?, var description: String?, var date: LocalDateTime?, var category: String?, var city: String?, var venue: String?) {

    constructor(title: String?, description: String?, date: LocalDateTime?, category: String?, city: String?, venue: String?) : this(null, title, description, date, category, city, venue)
}