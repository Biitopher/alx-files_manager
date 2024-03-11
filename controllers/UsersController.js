import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in DB
    const userExists = await dbClient.usersCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Already exists' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Create a new user
    const newUser = {
      email,
      password: hashedPassword,
    };

    // Insert the new user into the database
    const result = await dbClient.usersCollection.insertOne(newUser);

    // Return the new user with only email and id
    const { _id } = result.insertedId.toString();
    const createdUser = {
      id: _id,
      email,
    };

    return res.status(201).json(createdUser);
  }
}

export default UsersController;
