package by.zmitser.webapp.reactivities.repository

import by.zmitser.webapp.reactivities.domain.Authority
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface AuthorityRepository : ReactiveMongoRepository<Authority, String> {
}