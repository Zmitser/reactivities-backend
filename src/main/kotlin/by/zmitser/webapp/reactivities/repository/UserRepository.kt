package by.zmitser.webapp.reactivities.repository

import by.zmitser.webapp.reactivities.domain.User
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import reactor.core.publisher.Mono

interface UserRepository : ReactiveMongoRepository<User, String> {

    fun findOneByEmailIgnoreCase(login: String?): Mono<User>

    fun findOneByUsername(login: String?): Mono<User>

}