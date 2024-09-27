"use client"

import { useCallback, useEffect, useState } from "react"
import { IoMdClose } from 'react-icons/io'
import Button from "../Button"

const Modal = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryActionLabel, secondaryAction }) => {

    const [showModal, setShowModal] = useState(isOpen)
    const [showFooter, setShowFooter] = useState(false)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return
        }
        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)

    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return
        }

        onSubmit()

    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryActionLabel) {
            return
        }
        secondaryAction()
    }, [disabled, secondaryActionLabel])

    if (!isOpen) {
        return null
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70 ">
                <div className="relative w-full h-full mx-auto my-6 md:w-3/4 lg:w-3/5 xl:w-2/5 lg:h-auto md:h-auto">

                    {/* Content */}
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none translate lg:h-auto md:h-auto focus:outline-none">

                            {/* Header */}
                            <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]  ">
                                <button onClose={handleClose} className="absolute p-1 transition border-0 right-9 hover:opacity-70">
                                    <IoMdClose size={16} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="relative flex-auto p-6">
                                {body}
                            </div>


                            {/* Footer */}
                            <div className="flex flex-col gap-2 p-6">

                                <div className="flex flex-row items-center w-full gap-4">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button outline label={secondaryActionLabel} disabled={disabled} onClick={handleSecondaryAction} />
                                    )}
                                    <Button label={actionLabel} disabled={disabled} onClick={handleSubmit} />
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal