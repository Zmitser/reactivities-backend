package by.zmitser.webapp.reactivities.service

import by.zmitser.webapp.reactivities.domain.Activity
import by.zmitser.webapp.reactivities.repository.ActivityRepository
import by.zmitser.webapp.reactivities.web.controller.activity.command.CreateActivityCommand
import by.zmitser.webapp.reactivities.web.controller.activity.command.DeleteActivityCommand
import by.zmitser.webapp.reactivities.web.controller.activity.command.UpdateActivityCommand
import by.zmitser.webapp.reactivities.web.controller.activity.exception.RestException
import org.axonframework.commandhandling.CommandHandler
import org.axonframework.messaging.interceptors.ExceptionHandler
import org.springframework.stereotype.Service
import org.zalando.problem.Status
import org.zalando.problem.Status.*
import reactor.core.Exceptions
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono

@Service
class ActivityService(val repository: ActivityRepository) {

    fun findAll() = repository.findAll()

    fun findOne(id: String) = repository.findById(id).switchIfEmpty(Mono.error(RestException(NOT_FOUND, NOT_FOUND.name, "Activity with id $id not found")))

    @CommandHandler
    fun create(createActivityCommand: CreateActivityCommand) {
        createActivityCommand.toMono()
                .map { (id, title, description, date, category, city, venue) ->
                    Activity(id, title, description, date, category, city, venue)
                }.flatMap {
                    repository.save(it)
                }.switchIfEmpty(Mono.error(Exception("Cannot create activity")))
                .subscribe()


    }

    @CommandHandler
    fun update(updateActivityCommand: UpdateActivityCommand) {
        repository.findById(updateActivityCommand.id)
                .switchIfEmpty(Mono.error(Exception("Activity not found")))
                .map {
                    it.title = updateActivityCommand.title
                    it.description = updateActivityCommand.description
                    it.date = updateActivityCommand.date
                    it.category = updateActivityCommand.category
                    it.city = updateActivityCommand.city
                    it.venue = updateActivityCommand.venue
                    it
                }
                .flatMap { repository.save(it) }
                .subscribe()
    }

    @CommandHandler
    fun delete(deleteActivityCommand: DeleteActivityCommand) {
        repository.deleteById(deleteActivityCommand.id)
                .switchIfEmpty(Mono.error(RestException(NOT_FOUND, NOT_FOUND.name, "Activity with id ${deleteActivityCommand.id} not found")))
                .subscribe()
    }
}