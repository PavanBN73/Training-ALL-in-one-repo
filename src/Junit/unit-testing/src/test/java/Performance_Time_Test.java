import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;

import java.time.Duration;

public class Performance_Time_Test {
    static PerformanceService performanceService;

    @BeforeAll
    static void setup(){
        performanceService = new PerformanceService();
    }

    @Test
    void quickOperation_execute100MS_success(){
        Assertions.assertTimeout(Duration.ofMillis(500),()->{
            performanceService.quickOperatin();
        });
    }

    @Test
    void slowOperation_executesFor1000MS_failure(){
        Assertions.assertTimeout(Duration.ofMillis(500),()->{
            performanceService.slowOperatin();
        });
    }
}
