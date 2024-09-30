import db from '@/libs/prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password } = body
        const hashedPassword = await bcrypt.hash(password, 12)
    
        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: 'Please provide all fields' }), { status: 400 })
        }
    
        const user = await db.User.create({
            data: {
                name,
                email,
               hashedPassword,
            }
        })
        
        return new Response(user)
        
    } catch (error) {
        return new Error(error.message)
    }
}