import Layout from '@/components/layout'
import Link from 'next/link'
import React from 'react'

const Login = () => {
    return (
        <Layout>
            <main className="bg-black" id="messages">
                <div>
                    <div className="block md:flex items-center p-4 border-gray-900">
                        <div className="basis-1/4 my-4 md:m-0">
                            <h1 className="text-3xl text-center md:text-left text-white font-bold">
                                Login
                            </h1>
                        </div>
                    </div>
                    <div className="p-4 max-w-xs">
                        <div className='mt-4'>
                            <h1 className="text-xl text-white font-bold">Email</h1>
                            <input type="email" name="email" id="email" className='text-2xl p-2' />
                        </div>
                        <div className='mt-4'>
                            <h1 className="text-xl text-white font-bold">Password</h1>
                            <input type="password" name="password" id="password" className='text-2xl p-2' />
                        </div>
                        <div className='mt-4 flex justify-between items-center'>
                            <button type="submit" name="submit" id="submit" className='text-2xl text-white bg-green-500 p-2'>
                                Log In
                            </button>
                            <Link href={'/signup'}>
                                <h1 className='text-xl text-white'>
                                    Sign Up
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Login