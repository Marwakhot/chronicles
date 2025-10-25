// lib/auth.js - FIXED VERSION WITH LOGGING
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token verified successfully:', decoded);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

export function getUserFromRequest(req) {
  try {
    const authHeader = req.headers.get('authorization');
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid auth header');
      return null;
    }

    const token = authHeader.substring(7);
    console.log('Extracted token length:', token.length);
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      console.log('Token verification failed');
      return null;
    }
    
    console.log('Returning userId:', decoded.userId);
    return decoded.userId;
  } catch (error) {
    console.error('getUserFromRequest error:', error);
    return null;
  }
}
