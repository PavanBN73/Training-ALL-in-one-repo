import java.io.*;

public class FileHandlingDemo {

    public static void main(String[] args) {

        // Character Input/Output
        try {
            FileWriter writer = new FileWriter("character.txt");

            writer.write("Hello Java\n");
            writer.write("Character Input Output");

            writer.close();

            FileReader reader = new FileReader("character.txt");

            int ch;

            System.out.println("Character I/O:");

            while ((ch = reader.read()) != -1) {
                System.out.print((char) ch);
            }

            reader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }


        // Buffered Input/Output
        try {
            BufferedWriter writer =
                    new BufferedWriter(new FileWriter("buffered.txt"));

            writer.write("Hello Java");
            writer.newLine();
            writer.write("Buffered Input Output");

            writer.close();

            BufferedReader reader =
                    new BufferedReader(new FileReader("buffered.txt"));

            String line;

            System.out.println("\n\nBuffered I/O:");

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            reader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
