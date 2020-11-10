package by.zmitser.webapp.reactivities.web.controller.activity.command

import java.time.LocalDateTime

data class CreateActivityCommand(val id:String, val title: String, val description: String, val date: LocalDateTime, val category: String, val city: String, val venue: String)