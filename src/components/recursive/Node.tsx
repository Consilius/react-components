import Box from '../form/Box'
import Divider from '../layout/Divider'
import { useReplicaContext, useReplicaIndexContext } from './Replicas'
import Questions from './Tree'
import { Tree } from './types'
import { useElementByType, useVisibilityRule } from './utils'

interface NodeProps {
  node: Tree
}

const Node = ({ node }: NodeProps) => {
  const Element = useElementByType(node)
  const show = useVisibilityRule(node)
  const replicaIndex = useReplicaIndexContext()
  const { addReplica, removeReplica, showRemoveReplica, showAddReplica } = useReplicaContext()
  const showAddReplicaButton = showAddReplica(replicaIndex)
  const showRemoveReplicaButton = showRemoveReplica(replicaIndex)

  if (!show) return null

  if (node.parent) {
    return (
      <>
        {node.parent.parent ? (
          <Divider className="my-5" />
        ) : (
          <div className="py-5">
            <Divider className="absolute left-0" />
          </div>
        )}
        {Element}
        <div className="flex justify-between">
          {showRemoveReplicaButton ? (
            <button
              type="button"
              className="bg-gray-9/10  right-0 bottom-0 mt-5 flex h-10 w-10 items-center justify-center rounded-lg"
              onClick={removeReplica}
            >
              <i className="icon-minus text-gray-7 text-sm" />
            </button>
          ) : (
            <div />
          )}
          {showAddReplicaButton && (
            <button
              type="button"
              className="bg-gray-9/10 mt-5 flex h-10 w-10 items-center justify-center rounded-lg "
              onClick={addReplica}
            >
              <i className="icon-plus text-gray-7 p-5 text-sm" />
            </button>
          )}
        </div>
        {node.children.length > 0 && replicaIndex === null && <Questions tree={node.children} />}
      </>
    )
  }

  return (
    <Box key={node.key} className="relative my-5 p-5 shadow-md">
      {showAddReplicaButton && (
        <button
          type="button"
          className="bg-gray-9/10 absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg"
          onClick={addReplica}
        >
          <i className="icon-plus text-gray-7 text-sm" />
        </button>
      )}
      {showRemoveReplicaButton && (
        <button
          type="button"
          className="bg-gray-9/10 absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg"
          onClick={removeReplica}
        >
          <i className="icon-minus text-gray-7 text-sm" />
        </button>
      )}
      {Element}
      {node.children.length > 0 && replicaIndex === null && <Questions tree={node.children} />}
    </Box>
  )
}

Node.displayName = 'Node'

export default Node
