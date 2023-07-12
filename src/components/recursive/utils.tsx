import { useFormContext } from 'react-hook-form'
import Boolean from '../form/Boolean'
import Choice from '../form/Choice'
import DatePicker from '../form/DatePicker'
import DateTimePicker from '../form/DateTimePicker'
import Input from '../form/Input'
import TimePicker from '../form/TimePicker'
import { Validation } from '../types'
import { Node, NodeValidation, Tree } from './types'

// Replicas per Node implementation "Replicas" SHA: 3c12fae
export function createTree(
  nodes: Node[],
  parent: number | null = null,
  replicaCount: number | null,
  cb: (node: Tree) => void
) {
  return nodes?.reduce((acc, node) => {
    if (parent !== null && node.parent?.id !== parent) return acc

    const validation = nodeToValidation(node)
    const numberOfReplicas = node.maxNumberOfReplicas ? node.maxNumberOfReplicas - 1 : null
    const iterations = replicaCount ?? 0

    for (let i = 0; i <= iterations; i++) {
      const key = replicaCount === null ? node.key : getReplicaName(node.key, i)

      const treeNode = {
        ...node,
        children: createTree(nodes, node.id, numberOfReplicas, cb).sort((a, b) => a.order - b.order),
      }

      cb(treeNode)
      acc.push(treeNode)
    }

    return acc
  }, [] as Tree[])
}

export function useElementByType(node: Tree) {
  const validation = useValidationRule(node)
  const { field } = node
  let element

  switch (field.type) {
    case 'bool':
      element = (
        <Boolean
          key={field.name}
          name={field.name}
          label={field.label}
          disabled={field.disabled}
          defaultValue={null}
          validation={validation}
          tooltip={field.tooltip}
          hint={field.hint}
        />
      )
      break
    case 'number':
      element = (
        <Input
          key={field.name}
          name={field.name}
          disabled={field.disabled}
          label={field.label}
          defaultValue={null}
          validation={validation}
          tooltip={field.tooltip}
          placeholder={field.placeholder ?? undefined}
          hint={field.hint}
          type="number"
        />
      )
      break
    case 'text':
      element = (
        <Input
          key={field.name}
          name={field.name}
          label={field.label}
          disabled={field.disabled}
          defaultValue={''}
          validation={validation}
          tooltip={field.tooltip}
          hint={field.hint}
        />
      )
      break
    case 'datetime':
      const variant = node.field.variant

      if (variant === 'time') {
        element = (
          <TimePicker
            key={field.name}
            name={field.name}
            disabled={field.disabled}
            validation={validation}
            defaultValue={''}
            label={field.label}
            placeholder={field.placeholder ?? undefined}
            tooltip={field.tooltip}
            hint={field.hint}
          />
        )
      }

      if (variant === 'date') {
        element = (
          <DatePicker
            key={field.name}
            name={field.name}
            label={field.label}
            disabled={field.disabled}
            placeholder={field.placeholder ?? undefined}
            skipFilterDays={true}
            defaultValue={null}
            validation={validation}
            tooltip={field.tooltip}
            hint={field.hint}
          />
        )
      }

      if (variant === 'datetime') {
        element = (
          <DateTimePicker
            key={field.name}
            disabled={field.disabled}
            skipFilterDays={true}
            placeholder={field.placeholder ?? undefined}
            name={field.name}
            label={field.label}
            defaultValue={null}
            validation={validation}
            tooltip={field.tooltip}
            hint={field.hint}
          />
        )
      }
      break
    case 'choice': {
      element = (
        <Choice
          questionId={node.id}
          name={node.key}
          parentName={node.parent?.key}
          label={field.label}
          isMulti={field.isMulti}
          exclusiveAnswer={''}
          validation={validation}
          disabled={field.disabled}
          defaultValue={null}
          tooltip={field.tooltip}
          hint={field.hint}
          options={[]}
        />
      )
      break
    }
    default:
      element = null
  }

  return element
}

export function useVisibilityRule(node: Tree) {
  const { watch } = useFormContext()
  const parentKey = node.parent?.key
  const parentValue = watch(parentKey || '')
  const { parentVisibilityRule, parentRuleType } = node

  let show = true
  // console.log(`general-${node.key}`, parentRuleType, parentVisibilityRule)

  if (parentVisibilityRule && parentRuleType) {
    if (node.parentRuleType === 'pattern') {
      if (Array.isArray(parentValue)) {
        return parentValue.includes(parentVisibilityRule)
      } else if (typeof parentValue === 'string' || typeof parentValue === 'number') {
        const reg = new RegExp(parentVisibilityRule)
        const value = String(parentValue)
        return reg.test(value)
      } else if (typeof parentValue === 'boolean') {
        if (parentVisibilityRule == '1') {
          return parentValue === true
        }
        if (parentVisibilityRule == '0') {
          return parentValue === false
        }

        return false
      } else {
        return node.parentVisibilityRule === parentValue
      }
    } else if (parentRuleType === 'contains' && Array.isArray(parentValue)) {
      if (parentVisibilityRule.includes('|')) {
        const values = parentVisibilityRule.split('|')
        show = values.some((value) => {
          return parentValue.includes(value)
        })
      } else {
        show = parentValue.includes(parentVisibilityRule)
      }
    } else if (parentRuleType === 'contains' && !Array.isArray(parentValue)) {
      // This condition is for the case when the parent is static or profile
      show = parentValue === parentVisibilityRule
    } else {
      show = false
    }
  } else {
    if (Array.isArray(parentValue)) {
      show = parentValue.length > 0
    } else {
      show = parentValue !== null
    }
  }

  return show
}

export function useValidationRule(node: Tree): Validation {
  const validation = node.validation

  if (node.field.type === 'bool') {
    return {
      rules: {
        validate: {
          boolean: (value: boolean) => value !== null,
        },
      },
      errorMessage: 'Something went wrong',
    }
  }

  const rules = {
    required: {
      value: validation.required,
      message: 'Something went wrong',
    },
    pattern: validation.validation
      ? {
          value: new RegExp(validation.validation),
          message: 'Something went wrong',
        }
      : undefined,
    min: validation.min
      ? {
          value: validation.min,
          message: 'Something went wrong',
        }
      : undefined,
    minLength: validation.minLength
      ? {
          value: validation.minLength,
          message: 'Something went wrong',
        }
      : undefined,
    max: validation.max
      ? {
          value: validation.max,
          message: 'Something went wrong',
        }
      : undefined,
    maxLength: validation.maxLength
      ? {
          value: validation.maxLength,
          message: 'Something went wrong',
        }
      : undefined,
  }

  return { rules, tooltip: validation.label }
}

function nodeToValidation(node: any): NodeValidation {
  return {
    required: node.required,
    enabled: node.validation_enabled,
    label: node.validation_help ?? undefined,
    validation: node.validation ?? undefined,
    min: node.number ? node.number.min_value ?? undefined : undefined,
    max: node.number ? node.number.max_value ?? undefined : undefined,
    minLength: node.text ? node.text.min_length ?? undefined : undefined,
    maxLength: node.text ? node.text.max_length ?? undefined : undefined,
  }
}

export function getNumberFromString(value: string) {
  return parseInt(value, 10)
}

export function getReplicaName(name: string, replicaIndex: number | null) {
  return replicaIndex !== null ? `${name}:replica-${replicaIndex}` : name
}

export function parseReplicaName(name: string) {
  return name.split(':replica-')
}
