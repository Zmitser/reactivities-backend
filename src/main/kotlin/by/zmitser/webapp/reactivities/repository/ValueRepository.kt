package by.zmitser.webapp.reactivities.repository

import by.zmitser.webapp.reactivities.domain.Value
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface ValueRepository : ReactiveMongoRepository<Value, String>