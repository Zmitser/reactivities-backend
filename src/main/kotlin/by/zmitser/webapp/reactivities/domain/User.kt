package by.zmitser.webapp.reactivities.domain

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class User(
        @Id
        val id: String?,
        val login: String,
        val password: String,
        val image: String,
        val email: String,
        val displayName: String,
        var authorities: MutableSet<Authority>
) {

    constructor(login: String, password: String, image: String, email: String, displayName: String):this(null, login, password, image, email, displayName, mutableSetOf())
}