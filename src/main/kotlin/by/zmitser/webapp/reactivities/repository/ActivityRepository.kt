package by.zmitser.webapp.reactivities.repository

import by.zmitser.webapp.reactivities.domain.Activity
import org.springframework.data.mongodb.repository.ReactiveMongoRepository

interface ActivityRepository : ReactiveMongoRepository<Activity, String>