package by.zmitser.webapp.reactivities.config

import by.zmitser.webapp.reactivities.domain.Value
import com.github.cloudyrock.mongock.ChangeLog
import com.github.cloudyrock.mongock.ChangeSet
import com.github.cloudyrock.mongock.driver.mongodb.springdata.v3.decorator.impl.MongockTemplate


@ChangeLog(order = "001")
class DatabaseMigration {

    @ChangeSet(order = "001", id = "01-addValues", author = "dbarysavets")
    fun addValues(mongockTemplate: MongockTemplate) {
        mongockTemplate.save(Value("5f8c1999adee3ae5ada84a84", "Value 101"))
        mongockTemplate.save(Value("5f8c19a430eb32e737434b5b", "Value 102"))
        mongockTemplate.save(Value("5f8c19a9c2fdfdc25e95eb09", "Value 103"))
    }
}