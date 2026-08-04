import org.junit.jupiter.api.*;

public class DatabaseServiceTest {
    static DatabaseService databaseService;

    @BeforeAll
    static void setup(){
        databaseService = new DatabaseService();
    }

    @AfterAll
    static void cleanup(){
        databaseService = null;
    }

    @BeforeEach
    void connectToDB(){
        databaseService.connect();
    }

    @AfterEach
    void disconnectFromDB(){
        databaseService.disconnect();
    }

    @Test
    void insert_insertData_fetchData(){
        // Arrange
        databaseService.insert("1","apple");
        // Act
        String res = databaseService.fetch("1");

        // Assert
        Assertions.assertEquals(res,"apple");
    }

    @Test
    void fetch_missingVal_returnsNull(){
        String res = databaseService.fetch("4");

        Assertions.assertEquals(res,null);
    }

    @Test
    void insert_duplicateKey_overwritesExistingValue() {
        databaseService.insert("user1", "Prasunamba");
        databaseService.insert("user1", "Anjali");

        Assertions.assertEquals(
                "Anjali",
                databaseService.fetch("user1")
        );
    }

    @Test
    void insert_whenDisconnected_throwsException() {

        databaseService.disconnect();

        Exception ex = Assertions.assertThrows(
                IllegalStateException.class,
                () -> databaseService.insert("user1", "Prasunamba")
        );

        Assertions.assertEquals(
                "Database not connected",
                ex.getMessage()
        );
    }


}
