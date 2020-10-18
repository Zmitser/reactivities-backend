package by.zmitser.webapp.reactivities.web.controller

import by.zmitser.webapp.reactivities.repository.ValueRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/values")
class ValueController(private val valueRepository: ValueRepository) {

    @GetMapping
    fun findAll() = valueRepository.findAll()

    @GetMapping("/{id}")
    fun findOne(@PathVariable id: String) = valueRepository.findById(id)
}