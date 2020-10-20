package by.zmitser.webapp.reactivities.web.controller.activity

import by.zmitser.webapp.reactivities.domain.Activity
import by.zmitser.webapp.reactivities.service.ActivityService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono


@RestController
@RequestMapping("/api/v1/activities")
class ActivityQueryController(private val service: ActivityService) {

    @GetMapping
    fun findAll(): Flux<Activity> = service.findAll()

    @GetMapping("/{id}")
    fun findOne(@PathVariable id: String): Mono<Activity> = service.findOne(id)
}