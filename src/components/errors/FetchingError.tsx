interface FetchingErrorProps {
  error: boolean
  errorMessage: string
  refetch: () => void
}

function FetchingError({ error, errorMessage, refetch }: FetchingErrorProps) {
  if (!error) return null

  return (
    <div className="flex w-full justify-between">
      <span>{errorMessage}</span>
      <button type="button" className="h-full w-10">
        <i className="icon-repeat" onClick={() => refetch()} />
      </button>
    </div>
  )
}

export default FetchingError
