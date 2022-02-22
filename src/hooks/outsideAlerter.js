import { useEffect, useRef, useState } from 'react'

export const useOutsideAlerter = (initialValue) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(initialValue)

    const handleClickOutSide = (event) => {
        if(ref.current && !ref.current.contains(event.target))
        {
            setVisible(false)
        }
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Escape')
        {
            setVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide, true)
        document.addEventListener('keydown', handleKeyPress, true)
        return () => {
            document.removeEventListener('click', handleClickOutSide, true)
            document.addEventListener('keydown', handleKeyPress, true)
        }
    }, [ref])

    return { visible, setVisible, ref}
}