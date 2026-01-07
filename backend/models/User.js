import db from '../database/index.js'
import bcrypt from 'bcryptjs'

export class User {
  static async create(userData) {
    const { name, email, password, role = 'donor' } = userData

    // Check if user exists
    const existing = await db.getUserByEmail(email)
    if (existing) {
      throw new Error('User already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await db.addUser({
      name,
      email,
      password: hashedPassword,
      role,
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }

  static async findByEmail(email) {
    return await db.getUserByEmail(email)
  }

  static async findById(id) {
    return await db.getUser(id)
  }

  static async verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password)
  }
}

