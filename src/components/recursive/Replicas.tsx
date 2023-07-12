import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Divider from '../layout/Divider'
import Node from './Node'
import { Tree } from './types'
import { parseReplicaName, useElementByType, useVisibilityRule } from './utils'

interface ReplicaProviderProps {
  parent: Tree // parent with maxNumberOfReplicas !== null
}

type ReplicaMap = Tree[][]

const initialContext = {
  addReplica: () => {},
  removeReplica: () => {},
  showRemoveReplica: (index: number | null) => false,
  showAddReplica: (index: number | null) => false,
}
const replicaIndexContext = null
const ReplicaContext = createContext(initialContext)
const ReplicaIndexContext = createContext<number | null>(replicaIndexContext)
export const useReplicaContext = () => useContext(ReplicaContext)
export const useReplicaIndexContext = () => useContext(ReplicaIndexContext)

/*
 * Current implementation: maxNumberOfReplicas indicates how many time children can be replicated
 *
 * Replicas per Nodes implementation: maxNumberOfReplicas indicates how many times the current
 * node can be replicated.
 *
 * This approach offers several advantages:
 *
 * 1. Consistent replication: It guarantees an identical structure across all replicas,
 *    as it replicates the entire node along with its children. This is beneficial if
 *    we want to maintain the same tree structure for each replica.
 *
 *    Node A (numberOfReplicas = 2)
 *    ├── Node B
 *    └── Node C
 *
 *    Would replicate as:
 *
 *    Node A
 *    ├── Node B
 *    └── Node C
 *
 *    Node A (replica)
 *    ├── Node B
 *    └── Node C
 *
 * 2. Reduced complexity: It reduces the complexity associated with managing individual
 *    replicas of child nodes, as we only need to track replicas of the current node.
 *
 * 3. Flexibility: It provides flexibility in terms of how much of the tree we want to
 *    replicate. By setting numberOfReplicas at the desired node, we can control the
 *    replication process at different levels of the tree.
 */

function ReplicaProvider({ parent }: ReplicaProviderProps) {
  const Element = useElementByType(parent)
  const show = useVisibilityRule(parent)
  const { replicaMap, initialReplicas } = useReplicas(parent.children)
  const [activeReplicas, setActiveReplicas] = useState(initialReplicas)

  // console.log(`replicating-${parent.key}`, parent.children, initialReplicas)

  const numberOfNodesPerReplica = replicaMap[0]?.length

  const addReplica = useCallback(() => {
    if (activeReplicas.length === parent.children.length) return

    setActiveReplicas((prev) => {
      if (!isNaN(numberOfNodesPerReplica)) {
        const replicaIndex = prev.length / numberOfNodesPerReplica
        return [...prev, ...replicaMap[replicaIndex]]
      }

      return prev
    })
  }, [activeReplicas, numberOfNodesPerReplica, replicaMap, parent.children.length])

  const removeReplica = useCallback(() => {
    if (!isNaN(numberOfNodesPerReplica)) {
      setActiveReplicas((prev) => prev.slice(0, prev.length - 1 * numberOfNodesPerReplica))
    }
  }, [numberOfNodesPerReplica])

  const showRemoveReplica = useCallback(
    (replicaIndex: number | null) =>
      replicaIndex !== null && replicaIndex > 0 && replicaIndex === activeReplicas.length - 1,
    [activeReplicas]
  )

  const showAddReplica = useCallback(
    (replicaIndex: number | null) => replicaIndex !== null && replicaIndex === activeReplicas.length - 1,
    [activeReplicas]
  )

  const value = useMemo(() => {
    return {
      addReplica,
      removeReplica,
      showRemoveReplica,
      showAddReplica,
    }
  }, [addReplica, removeReplica, showRemoveReplica, showAddReplica])

  if (!show) return null

  return (
    <ReplicaContext.Provider value={value}>
      <div className="py-5">
        <Divider className="absolute left-0" />
      </div>
      {Element}
      {activeReplicas.map((node, i) => (
        <ReplicaIndexContext.Provider key={node.key} value={i}>
          <Node node={node} />
        </ReplicaIndexContext.Provider>
      ))}
    </ReplicaContext.Provider>
  )
}

function useReplicas(nodes: Tree[]) {
  const initialReplicas: Tree[] = []
  const replicaMap: ReplicaMap = [] // one to many mapping of replicaIndices to nodes map[index] = [Node(q-bool), Node(q-choice), ...]
  const sortedNodes = nodes.sort(sortChildren)

  for (const node of sortedNodes) {
    const replica = parseReplicaName(node.key)[1]

    if (replicaMap[replica]) {
      replicaMap[replica].push(node)
    } else {
      replicaMap[replica] = [node]
    }
  }

  for (const replica in replicaMap) {
    const index = parseInt(replica, 10)
    if (index == 0) {
      initialReplicas.push(...replicaMap[0])
      continue
    }
  }

  return {
    initialReplicas,
    replicaMap,
  }
}

function sortChildren(a: Tree, b: Tree) {
  return parseInt(parseReplicaName(a.key)[1], 10) < parseInt(parseReplicaName(b.key)[1], 10) ? -1 : 1
}

export default ReplicaProvider
