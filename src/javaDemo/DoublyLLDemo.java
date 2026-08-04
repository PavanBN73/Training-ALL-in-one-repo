// import java.util.LinkedList;

public class DoublyLLDemo {

    public static void main(String[] args) {
        DoublyLinkedList list = new DoublyLinkedList();

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


class DoublyLinkedList{
    Node head;
    Node tail;

    public DoublyLinkedList(){
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

        while(curr!=null){
            System.out.print(curr.value+" <-> ");
            curr = curr.next;
        }

        System.out.println();
    }

    public boolean isEmpty(){
        return head==null && tail==null;
    }
}