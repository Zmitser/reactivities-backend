package by.zmitser.webapp.reactivities

import com.github.cloudyrock.spring.v5.EnableMongock
import org.axonframework.commandhandling.CommandBus
import org.axonframework.commandhandling.SimpleCommandBus
import org.axonframework.eventhandling.EventBus
import org.axonframework.eventhandling.SimpleEventBus
import org.axonframework.queryhandling.QueryBus
import org.axonframework.queryhandling.SimpleQueryBus
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
@EnableMongock
class ReactivitiesApplication

fun main(args: Array<String>) {
    runApplication<ReactivitiesApplication>(*args)
}
