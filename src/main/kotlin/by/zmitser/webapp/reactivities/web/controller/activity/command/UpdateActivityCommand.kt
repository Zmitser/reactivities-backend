package by.zmitser.webapp.reactivities.web.controller.activity.command

import java.time.LocalDateTime
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class UpdateActivityCommand(
        val id: String,
        @field:NotBlank
        val title: String?,
        @field:NotBlank
        val description: String?,
        @field:NotNull
        val date: LocalDateTime?,
        @field:NotBlank
        val category: String?,
        @field:NotBlank
        val city: String?,
        @field:NotBlank
        val venue: String?
)