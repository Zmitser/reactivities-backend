package by.zmitser.webapp.reactivities

import com.github.cloudyrock.spring.v5.EnableMongock
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableMongock
class ReactivitiesApplication

fun main(args: Array<String>) {
    runApplication<ReactivitiesApplication>(*args)
}
