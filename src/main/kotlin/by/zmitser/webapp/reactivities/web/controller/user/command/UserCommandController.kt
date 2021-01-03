package by.zmitser.webapp.reactivities.web.controller.user.command

import by.zmitser.webapp.reactivities.service.UserService
import by.zmitser.webapp.reactivities.web.controller.user.command.RegisterCommand
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import javax.validation.Valid

@RestController
@RequestMapping("/api/v1/users")
class UserCommandController(val userService: UserService) {


    @PostMapping("/register")
    fun register(@RequestBody @Valid registerCommand: Mono<RegisterCommand>): Mono<Void> {
//    fun register(@RequestBody @Valid registerCommand: RegisterCommand): Mono<Void> {
       return registerCommand.flatMap { userService.register(it) }.then()
//       return userService.register(registerCommand).then()
    }
}