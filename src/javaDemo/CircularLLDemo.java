
public class CircularLLDemo {

    public static void main(String[] args) {
        CircularLinkedList list = new CircularLinkedList();

        for(int i=1;i<=10;i++) list.add(i);

        list.display();
        
        list.remove();

        list.display();
    }
}


class Node{
    int value;
    Node next;
    Node prev;

    public Node(int value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
};


class CircularLinkedList{
    Node head;
    Node tail;

    public CircularLinkedList(){
        this.head = null;
        this.tail = null;
    }

    public void add(int value){
        Node newNode = new Node(value);
        newNode.prev = tail;

        if(isEmpty()){
            head = newNode;
            tail=newNode;
        }else{
            tail.next = newNode;
            tail = tail.next;
        }

        tail.next = head;
    }

    public int remove(){
        if(isEmpty()) throw new RuntimeException("List is empty");

        Node node = head;
        head = head.next;

        head.prev = null;

        return node.value;
    }

    public void display(){
        Node curr = head;

        while(curr!=tail){
            System.out.print(curr.value+" <-> ");
            curr = curr.next;
        }

        System.out.println(curr.value);// print tail

        
    }

    public boolean isEmpty(){
        return head==null && tail==null;
    }
} 