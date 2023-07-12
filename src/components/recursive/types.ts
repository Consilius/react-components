export interface NodeValidation {
  required: boolean
  validation?: string
  enabled: boolean
  label?: string
  min?: number
  minLength?: number
  max?: number
  maxLength?: number
}

export interface Node {
  id: number
  key: string
  type: any
  parent: Partial<Node> | null
  maxNumberOfReplicas: number
  parentVisibilityRule: string
  parentRuleType: string
  order: number
  field: Field
  validation: NodeValidation
}

interface Field {
  type: any
  name: string
  disabled?: boolean
  placeholder?: string | null
  tooltip?: string | null
  hint?: string | null
  value?: string | boolean
  isMulti: boolean
  label: string
  exclusiveAnswer?: string
  variant?: 'time' | 'datetime' | 'date'
}

export interface QuestionSimplified {
  id: number
  parentId: number | null
  groupId: number
  type: any
}

export interface Tree extends Node {
  children: Tree[]
  static?: boolean
}
