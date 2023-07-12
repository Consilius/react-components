import { animated, useSpring } from '@react-spring/web'
import { PropsWithChildren } from 'react'

interface FadeOutProps extends PropsWithChildren {
  delay?: number
  className?: string
}

const FadeOut = ({ children, delay, className }: FadeOutProps) => {
  const styles = useSpring({
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
    ...(delay && { delay }),
  })

  return (
    <animated.div style={styles} className={className}>
      {children}
    </animated.div>
  )
}

export default FadeOut
