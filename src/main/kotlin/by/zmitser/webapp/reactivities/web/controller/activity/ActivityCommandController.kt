package by.zmitser.webapp.reactivities.web.controller.activity

import by.zmitser.webapp.reactivities.web.controller.activity.command.CreateActivityCommand
import by.zmitser.webapp.reactivities.web.controller.activity.command.DeleteActivityCommand
import by.zmitser.webapp.reactivities.web.controller.activity.command.UpdateActivityCommand
import org.axonframework.extensions.reactor.commandhandling.gateway.ReactorCommandGateway
import org.springframework.validation.BindingResult
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import javax.validation.Valid


@Validated
@RestController
@RequestMapping("/api/v1/activities")
class ActivityCommandController(private val commandGateway: ReactorCommandGateway) {

    @PostMapping
    fun create(@Valid @RequestBody createActivityCommand: CreateActivityCommand): Mono<Void> {
        return commandGateway.send(createActivityCommand)
    }

    @PutMapping("/{id}")
    fun update(@Valid @RequestBody updateActivityCommand: UpdateActivityCommand,
               @PathVariable id: String): Mono<Void> {
        return commandGateway.send(updateActivityCommand)
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Mono<Void> {
        return commandGateway.send(DeleteActivityCommand(id))
    }
}