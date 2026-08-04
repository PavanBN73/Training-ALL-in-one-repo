public class EncapsulationDemo {
    public static void main(String[] args) {
        User u1 = new User("Pavan", "pavan@gmail.com");

        System.out.println(u1.getEmail());
        System.out.println(u1.getName());

        u1.setName("Pavan B N");

        System.out.println(u1.getName());

        // u1.name // Error: the field name is not visible
    }
}

class User{
    private String name;
    private final String email;

    public User(String name,String email){
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail(){
        return email;
    }

    public void setName(String name){
        this.name = name;
    }

}