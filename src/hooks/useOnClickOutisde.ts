import { RefObject, useEffect } from 'react'

export function useOnClickOutside(ref: RefObject<HTMLDivElement>, onClick: () => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClick])
}
