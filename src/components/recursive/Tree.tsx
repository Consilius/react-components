import { LoadingSpinner } from '../loaders/LoadingSpinner'
import Node from './Node'
import ReplicaProvider from './Replicas'
import { Tree } from './types'

interface TreeProps {
  tree: Tree[]
  isLoading?: boolean
}

function renderTree(tree: Tree[]) {
  const renderTree = []
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.maxNumberOfReplicas !== null) {
      // Replicas per Node implementation "Question to answer pairing & form submission" SHA: fb51bd7
      renderTree.push(<ReplicaProvider key={node.key} parent={node} />)
    } else {
      renderTree.push(<Node key={node.key} node={node} />)
    }
  }

  return renderTree
}

function Tree({ tree, isLoading }: TreeProps) {
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner color="black" />
      </div>
    )

  return <>{renderTree(tree)}</>
}

export default Tree
