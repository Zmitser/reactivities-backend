package by.zmitser.webapp.reactivities.web.controller.user.command

import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank

data class RegisterCommand(
        @field:NotBlank
        val displayName: String,
        @field:NotBlank
        val username: String,
        @field:NotBlank
        @field:Email
        val email: String,
        @field:NotBlank
        val password: String
)