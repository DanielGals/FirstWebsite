import mysql from 'mysql2'
import dotenv from 'dotenv';

dotenv.config()



// * database credentials are located on .env
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
}).promise()

/*
  ! always use export and async when creating a function
  * You can check the response of database here:
  * on terminal - node database.js
  *const user = await getUsers()
  *console.log(user); 


  TODO - Create functions for other table; getBalance
*/
export async function getUsers()
{
    const [rows] = await pool.query("SELECT * FROM Users");
    return rows
}

export async function checkCredentials(email, password) {
  const connection = await pool.getConnection(); // Get a connection from the pool

  try {
    const [rows] = await connection.query(`
      SELECT * 
      FROM Users
      WHERE email = ? AND password = ?
    `, [email, password]);

    const user = rows[0];

    if (!user) {
      return { error: 'Invalid email or password' };  
    }

    // If the email and password are correct, return the username
    return user.username;
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

//const user = await getUsers()
//console.log(user); 

export async function getUser(username)
{
   const [rows] = await pool.query(`
   SELECT * 
   FROM Users
   WHERE username = ?
   `, [username]);

   return rows[0]
}

export async function createUser(username, password, fullName, email, phone, address)
{
    const [rows] = await pool.query(`
    INSERT INTO Users (username, password, full_name, email, phone, address)
    VALUES (?,?,?,?,?,?)
    `, [username, password, fullName, email, phone, address])

    return getUser(username)
}

export async function updateUser(username, newUsername)
{
    const [rows] = await pool.query(`
    UPDATE Users
    SET username = ?
    WHERE username = ?;
    `, [username, newUsername])

    return getUser(username)
}

export async function updatePassword(username, newPassword) {

    const connection = await pool.getConnection();
    try {
      // Begin a transaction
      await connection.beginTransaction();
  
      // Update the user's password
      const updateQuery = `
        UPDATE Users
        SET PASSWORD = ?
        WHERE USERNAME = ?;
      `;
      await connection.query(updateQuery, [newPassword, username]);
  
      // Commit the transaction
      await connection.commit();
  
      return getUser(username)
    } catch (error) {
      // Rollback the transaction in case of an error
      await connection.rollback();
      throw error; // Rethrow the error to be handled by the caller
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  }

export async function deleteUser(username) {
    const connection = await pool.getConnection();
    try {
      // Begin a transaction
      await connection.beginTransaction();
  
      // Delete the user
      const deleteQuery = `
        DELETE FROM Users
        WHERE USERNAME = ?;
      `;
      await connection.query(deleteQuery, [username]);
  
      // Commit the transaction
      await connection.commit();
  
      // Return true to indicate that the user was deleted successfully
      return getUsers();
    } catch (error) {
      // Rollback the transaction in case of an error
      await connection.rollback();
      throw error; // Rethrow the error to be handled by the caller
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  }
  
 