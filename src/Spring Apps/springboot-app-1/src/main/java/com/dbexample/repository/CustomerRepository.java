package com.dbexample.repository;

import com.dbexample.entity.Customer;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomerRepository {

//    private String driver = "com.mysql.cj.jdbc.Driver";
    private String driver = "org.postgresql.Driver";

//    private String url = "jdbc:mysql://localhost:3306/customerdb";
private String url = "jdbc:postgresql://localhost:5432/customerdb";
//    private String username = "root";
//    private String password = "pass123";
private String username = "postgres";
    private String password = "pass123";
    // CREATE
    public void save(Customer customer)
            throws ClassNotFoundException, SQLException {

        Class.forName(driver);

        Connection con =
                DriverManager.getConnection(
                        url,
                        username,
                        password);

        PreparedStatement ps =
                con.prepareStatement(
                        "INSERT INTO CustomerInfo VALUES(?, ?)");

        ps.setInt(1, customer.getId());
        ps.setString(2, customer.getName());

        ps.executeUpdate();

        con.close();
    }

    // READ ALL
    public List<Customer> findAll()
            throws ClassNotFoundException, SQLException {

        Class.forName(driver);

        Connection con =
                DriverManager.getConnection(
                        url,
                        username,
                        password);

        Statement stmt = con.createStatement();

        ResultSet rs =
                stmt.executeQuery(
                        "SELECT * FROM CustomerInfo");

        List<Customer> customers =
                new ArrayList<>();

        while (rs.next()) {

            Customer customer =
                    new Customer();

            customer.setId(rs.getInt(1));
            customer.setName(rs.getString(2));

            customers.add(customer);
        }

        con.close();

        return customers;
    }

    // READ BY ID
    public Customer findById(int id)
            throws ClassNotFoundException, SQLException {

        Class.forName(driver);

        Connection con =
                DriverManager.getConnection(
                        url,
                        username,
                        password);

        PreparedStatement ps =
                con.prepareStatement(
                        "SELECT * FROM CustomerInfo WHERE id=?");

        ps.setInt(1, id);

        ResultSet rs = ps.executeQuery();

        Customer customer = null;

        if (rs.next()) {

            customer = new Customer();

            customer.setId(rs.getInt(1));
            customer.setName(rs.getString(2));
        }

        con.close();

        return customer;
    }

    // UPDATE
    public void update(Customer customer)
            throws ClassNotFoundException, SQLException {

        Class.forName(driver);

        Connection con =
                DriverManager.getConnection(
                        url,
                        username,
                        password);

        PreparedStatement ps =
                con.prepareStatement(
                        "UPDATE CustomerInfo SET name=? WHERE id=?");

        ps.setString(1, customer.getName());
        ps.setInt(2, customer.getId());

        ps.executeUpdate();

        con.close();
    }

    // DELETE
    public void deleteById(int id)
            throws ClassNotFoundException, SQLException {

        Class.forName(driver);

        Connection con =
                DriverManager.getConnection(
                        url,
                        username,
                        password);

        PreparedStatement ps =
                con.prepareStatement(
                        "DELETE FROM CustomerInfo WHERE id=?");

        ps.setInt(1, id);

        ps.executeUpdate();

        con.close();
    }
}