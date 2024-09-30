"use client"
import { BiRupee } from 'react-icons/bi'


const Input = ({name, label, type='text', disabled, formatPrice, required, register , errors}) => {
  return (
    <div className='relative w-full'>
        {
            formatPrice && (
                <BiRupee size={24} className='absolue text-neutral-700 top-3 left-2' />
            )
        }
        <input type={type} name={name} disabled={disabled} {...register(`${name}`, { required })} placeholder=' ' 
        className={`peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
            ${formatPrice ? 'pl-9' : ' pl-4' }  ${errors[name] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black' }
        `} /> 
        <label className={`absolute text-md duration-150 transform -translate-y-4 top-5 z-10 origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4' } 
          ${errors[name] ? 'text-rose-500' : 'text-zinc-300'}
         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-4
        `}>{label}</label>
    </div>
  )
}

export default Input