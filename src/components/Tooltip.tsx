import { splitText } from '@/utils/textUtils'
import RCTooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { memo } from 'react'
import FadeIn from './animation/FadeIn'

interface TooltipProps {
  text: React.ReactNode
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip = memo(({ text, placement = 'top' }: TooltipProps) => {
  const parsedText = splitText(text)

  return (
    <RCTooltip
      placement={placement}
      trigger={['hover']}
      overlayClassName="max-w-xs"
      overlay={
        <FadeIn>
          <span>{parsedText}</span>
        </FadeIn>
      }
    >
      <i className="icon-info text-gray-7" />
    </RCTooltip>
  )
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
