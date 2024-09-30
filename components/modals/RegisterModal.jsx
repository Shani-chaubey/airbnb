"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import useRegisterModal from '@/hooks/useRegisterMoal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import Button from '../Button'


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        console.log(data)
        try {
            const response = await axios.post('/api/auth', data)
            registerModal.onClose()
            toast.success('Register successfully')
            setIsLoading(false)
        } catch (err) {
            toast.error(err.message)
            setIsLoading(false)
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4 mt-3">
            <Heading title="Create an Account with us!" center={true} />
            <Input name='name' label='Your Name' register={register} disabled={isLoading} errors={errors} required />
            <Input name='email' type='email' label='Your Email' register={register} disabled={isLoading} errors={errors} required />
            <Input name='password' type='password' label='Your Password' register={register} disabled={isLoading} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4">
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>{}} />
            <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={()=>{}} />
            <div className='mt-4 font-light text-center text-neutral-500'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div className=''> Already have an account? </div>
                    <div onClick={registerModal.onClose} className='cursor-pointer text-neutral-800 hover:underline '> Sign In </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register Here"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal