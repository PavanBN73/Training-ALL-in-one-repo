import java.util.HashMap;
import java.util.Map;

public class DatabaseService {
    private Map<String,String> records;
    private boolean connected;

    public  DatabaseService(){
        records = new HashMap<>();
    }

    public void connect(){
        this.connected = true;
    }

    public void disconnect(){
        this.connected = false;
    }

    public boolean isConnected(){
        return this.connected;
    }

    public void insert(String key,String val){
        if (!connected) {
            throw new IllegalStateException("Database not connected");
        }
        records.put(key,val);
    }

    public String fetch(String key){
        if (!connected) {
            throw new IllegalStateException("Database not connected");
        }
        return records.get(key);
    }

    public void delete(String key){
        if (!connected) {
            throw new IllegalStateException("Database not connected");
        }

        records.remove(key);
    }
}
