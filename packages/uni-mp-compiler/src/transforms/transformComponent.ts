import {
  ComponentNode,
  createSimpleExpression,
  DirectiveNode,
  isSimpleIdentifier,
  isStaticExp,
  NodeTypes,
} from '@vue/compiler-core'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import { isVForScope, NodeTransform, TransformContext } from '../transform'
import { ATTR_VUE_ID, ATTR_VUE_PROPS, rewirteWithHelper } from './utils'
import { genExpr, genBabelExpr } from '../codegen'
import {
  identifier,
  logicalExpression,
  objectExpression,
  objectProperty,
  ObjectProperty,
  stringLiteral,
} from '@babel/types'
import { RENDER_PROPS } from '../runtimeHelpers'
import { parseExpr } from '../ast'

export const transformComponent: NodeTransform = (node, context) => {
  if (!isUserComponent(node, context as any)) {
    return
  }
  addVueId(node, context)
  processBooleanAttr(node)
  return function postTransformComponent() {
    context.vueIds.pop()
  }
}

function addVueId(node: ComponentNode, context: TransformContext) {
  let { hashId, scopes, currentScope, currentVueId } = context
  if (!hashId) {
    return
  }
  let vueId = hashId + '-' + scopes.vueId++
  const indexs: string[] = []
  while (currentScope) {
    if (isVForScope(currentScope)) {
      indexs.push(`+'-'+${currentScope.indexAlias}`)
    }
    currentScope = currentScope.parent!
  }
  const inFor = !!indexs.length
  if (inFor) {
    vueId = `'${vueId}'` + indexs.reverse().join('')
  }

  context.vueIds.push(vueId)

  let value = vueId
  if (currentVueId) {
    const isParentDynamic = currentVueId.includes('+')
    const isCurrentDynamic = vueId.includes('+')
    if (isParentDynamic || isCurrentDynamic) {
      value = `(${vueId})+','+(${
        isParentDynamic ? currentVueId : `'${currentVueId}'`
      })`
    } else {
      value = vueId + ',' + currentVueId
    }
  }
  if (value.includes('+')) {
    return node.props.push(createBindDirectiveNode(ATTR_VUE_ID, value))
  }
  return node.props.push(createAttributeNode(ATTR_VUE_ID, value))
}
/**
 * <uni-collapse accordion/> => <uni-collapse :accordion="true"/>
 * 否则部分平台(快手)可能获取到的 accordion 是空字符串
 * @param param0
 */
function processBooleanAttr({ props }: ComponentNode) {
  props.forEach((prop, index) => {
    if (
      prop.type === NodeTypes.ATTRIBUTE &&
      typeof prop.value === 'undefined'
    ) {
      props.splice(index, 1, createBindDirectiveNode(prop.name, 'true'))
    }
  })
}

function isComponentProp(name: string) {
  if (
    [
      'class',
      'style',
      'u-i',
      'u-r',
      'u-r-i-f',
      'u-s',
      'eO',
      'e-o',
      'onVI',
      'ref',
      'slot',
      'key',
      'is',
    ].includes(name)
  ) {
    return false
  }
  if (name.startsWith('data-')) {
    return false
  }
  return true
}
/**
 * 重写组件 props 绑定
 * @param node
 * @param context
 */
export function rewriteBinding(
  { props }: ComponentNode,
  context: TransformContext
) {
  const properties: ObjectProperty[] = []
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    if (prop.type === NodeTypes.ATTRIBUTE) {
      const { name } = prop
      if (!isComponentProp(name)) {
        continue
      }
      const computed = !isSimpleIdentifier(name)
      properties.push(
        objectProperty(
          computed ? stringLiteral(name) : identifier(name),
          stringLiteral(prop.value?.content || ''),
          computed
        )
      )
    } else if (prop.type === NodeTypes.DIRECTIVE) {
      if (prop.name !== 'bind') {
        continue
      }
      const { arg, exp } = prop
      if (!arg || !exp) {
        continue
      }
      if (isStaticExp(arg)) {
        if (!isComponentProp(arg.content)) {
          continue
        }
        // :name="name"
        const valueExpr = parseExpr(genExpr(exp), context, exp)
        if (!valueExpr) {
          continue
        }
        const name = arg.content
        const computed = !isSimpleIdentifier(name)
        properties.push(
          objectProperty(
            computed ? stringLiteral(name) : identifier(name),
            valueExpr,
            computed
          )
        )
      } else {
        // :[dynamic]="dynamic"
        const leftExpr = parseExpr(genExpr(arg), context, exp)
        if (!leftExpr) {
          continue
        }
        const valueExpr = parseExpr(genExpr(exp), context, exp)
        if (!valueExpr) {
          continue
        }
        properties.push(
          objectProperty(
            logicalExpression('||', leftExpr, stringLiteral('')),
            valueExpr,
            true
          )
        )
      }
    }
    props.splice(i, 1)
    i--
  }
  if (properties.length) {
    props.push(
      createBindDirectiveNode(
        ATTR_VUE_PROPS,
        genBabelExpr(objectExpression(properties))
      )
    )
  }
}
export function isPropsBinding({ arg }: DirectiveNode) {
  return (
    arg &&
    arg.type === NodeTypes.SIMPLE_EXPRESSION &&
    arg.content === ATTR_VUE_PROPS
  )
}

export function rewritePropsBinding(
  dir: DirectiveNode,
  context: TransformContext
) {
  dir.exp = createSimpleExpression(
    genBabelExpr(
      rewirteWithHelper(
        RENDER_PROPS,
        parseExpr(dir.exp!, context)!,
        dir.loc,
        context
      )!
    )
  )
}
