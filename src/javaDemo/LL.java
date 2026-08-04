// import java.util.LinkedList;

public class LL {

    public static void main(String[] args) {
        LinkedList list = new LinkedList();

        for(int i=1;i<=10;i++) list.add(i);

        list.display();
        
        list.remove();

        list.display();
    }
}


class Node{
    int value;
    Node next;

    public Node(int value){
        this.value = value;
        this.next = null;
    }
};


class LinkedList{
    Node head;
    Node tail;

    public LinkedList(){
        this.head = null;
        this.tail = null;
    }

    public void add(int value){
        Node newNode = new Node(value);
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

        return node.value;
    }

    public void display(){
        Node curr = head;

        while(curr!=null){
            System.out.print(curr.value+" -> ");
            curr = curr.next;
        }

        System.out.println();
    }

    public boolean isEmpty(){
        return head==null && tail==null;
    }
}