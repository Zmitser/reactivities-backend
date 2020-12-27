package by.zmitser.webapp.reactivities.web.controller.user.query

import javax.validation.constraints.*

data class LoginQuery(
    @field:NotBlank
    @field:Email
    val email: String,
    @field:NotBlank
    @field:Size(min = 6)
    @field:Pattern.List(
        value = [
            Pattern(regexp = ".*[A-Z].*", message = "Password must contain 1 uppercase letter"),
            Pattern(regexp = ".*[a-z].*", message = "Password must have at least 1 lowercase character"),
            Pattern(regexp = ".*[0-9].*", message = "Password must have at least  1 numeric letter"),
            Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "Password must contain non alphanumeric character")
        ]
    )
    val password: String
)