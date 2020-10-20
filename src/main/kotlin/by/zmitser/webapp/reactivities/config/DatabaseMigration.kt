package by.zmitser.webapp.reactivities.config

import by.zmitser.webapp.reactivities.domain.Activity
import by.zmitser.webapp.reactivities.domain.Value
import com.github.cloudyrock.mongock.ChangeLog
import com.github.cloudyrock.mongock.ChangeSet
import com.github.cloudyrock.mongock.driver.mongodb.springdata.v3.decorator.impl.MongockTemplate
import java.time.LocalDateTime.now


@ChangeLog(order = "001")
class DatabaseMigration {

    @ChangeSet(order = "001", id = "01-addValues", author = "dbarysavets")
    fun addValues(mongockTemplate: MongockTemplate) {
        mongockTemplate.save(Value("5f8c1999adee3ae5ada84a84", "Value 101"))
        mongockTemplate.save(Value("5f8c19a430eb32e737434b5b", "Value 102"))
        mongockTemplate.save(Value("5f8c19a9c2fdfdc25e95eb09", "Value 103"))
    }

    @ChangeSet(order = "002", id = "02-addActivities", author = "dbarysavets")
    fun addActivities(mongockTemplate: MongockTemplate) {
        mongockTemplate.save(Activity("Past Activity 1", "Activity 2 months ago", now().minusMonths(2), "drinks", "London", "Pub"))
        mongockTemplate.save(Activity("Past Activity 2", "Activity 1 months ago", now().minusMonths(1), "culture", "Paris", "Louvre"))
        mongockTemplate.save(Activity("Future Activity 1", "Activity 1 month in future", now().plusMonths(1), "culture", "London", "Natural History Museum"))
        mongockTemplate.save(Activity("Future Activity 2", "Activity 2 month in future", now().plusMonths(2), "music", "London", "02 Arena"))
        mongockTemplate.save(Activity("Future Activity 3", "Activity 3 month in future", now().plusMonths(3), "drinks", "London", "Another Pub"))
        mongockTemplate.save(Activity("Future Activity 4", "Activity 4 month in future", now().plusMonths(4), "drinks", "London", "Yet Another Pub"))
        mongockTemplate.save(Activity("Future Activity 5", "Activity 5 month in future", now().plusMonths(5), "drinks", "London", "Just another pub"))
        mongockTemplate.save(Activity("Future Activity 6", "Activity 6 month in future", now().plusMonths(6), "music", "London", "Roundhouse Camden"))
        mongockTemplate.save(Activity("Future Activity 7", "Activity 7 month in future", now().plusMonths(7), "travel", "London", "Somewhere on the Thames"))
        mongockTemplate.save(Activity("Future Activity 8", "Activity 8 month in future", now().plusMonths(8), "film", "London", "Cinema"))
    }
}