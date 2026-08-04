public class ExceptionDemo {
    public static void main(String[] args) {
        try{
            throw new RuntimeException("Runtime exception");
        }catch(RuntimeException e){
            System.out.println(e.getMessage());
        }catch(Exception e){
            System.out.println(e.getMessage());
        }finally{
            System.out.println("Done");
        }
    }
}
