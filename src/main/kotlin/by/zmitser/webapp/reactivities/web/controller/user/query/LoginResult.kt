package by.zmitser.webapp.reactivities.web.controller.user.query

import java.io.Serializable

data class LoginResult(val username: String, val token: String?) : Serializable