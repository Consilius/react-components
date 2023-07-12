interface ArrowButtonProps extends React.HTMLProps<HTMLButtonElement> {
  direction: 'up' | 'down'
}

function ArrowButton({ direction, onClick }: ArrowButtonProps) {
  return (
    <button
      type="button"
      className="flex h-10 w-20 items-center justify-center rounded-lg bg-gray-2/10 text-gray-9"
      onClick={onClick}
    >
      <i className={`icon icon-chevron-${direction} `} />
    </button>
  )
}

export default ArrowButton
