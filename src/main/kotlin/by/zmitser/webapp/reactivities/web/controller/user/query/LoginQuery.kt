package by.zmitser.webapp.reactivities.web.controller.user.query

import javax.validation.constraints.*

data class LoginQuery(
    @field:NotBlank
    @field:Email
    var email: String?,
    @field:NotBlank
    @field:Size(min = 6)
    @field:Pattern.List(
        value = [
            Pattern(regexp = ".*[A-Z].*", message = "must contain 1 uppercase letter"),
            Pattern(regexp = ".*[a-z].*", message = "must have at least 1 lowercase character"),
            Pattern(regexp = ".*[0-9].*", message = "must have at least  1 numeric letter"),
            Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "must contain non alphanumeric character")
        ]
    )
    var password: String?
)