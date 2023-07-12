import { animated, useSpring } from '@react-spring/web'
import { PropsWithChildren } from 'react'

interface FadeInProps extends PropsWithChildren {
  delay?: number
  className?: string
}

const FadeIn = ({ children, delay, className }: FadeInProps) => {
  const styles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    ...(delay && { delay }),
  })

  return (
    <animated.div style={styles} className={className}>
      {children}
    </animated.div>
  )
}

export default FadeIn
