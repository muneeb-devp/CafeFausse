import { vi } from 'vitest'
import React from 'react'

// List of framer-motion props that should not be passed to DOM elements
const animationProps = new Set([
  'animate',
  'initial',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'whileFocus',
  'whileDrag',
  'drag',
  'dragConstraints',
  'layout',
  'layoutId',
  'onAnimationStart',
  'onAnimationComplete',
  'onHoverStart',
  'onHoverEnd',
  'onTap',
  'onTapStart',
  'onTapCancel',
  'onPan',
  'onPanStart',
  'onPanEnd',
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'viewport',
])

// Function to filter out animation props
const filterProps = (props: Record<string, unknown>) => {
  const filtered: Record<string, unknown> = {}
  Object.keys(props).forEach(key => {
    if (!animationProps.has(key)) {
      filtered[key] = props[key]
    }
  })
  return filtered
}

// Create motion mock factory
export const createMotionMock = (tag: string) => {
  return vi.fn(({ children, ...props }) => {
    const filteredProps = filterProps(props)
    return React.createElement(tag, filteredProps, children)
  })
}

// Common framer-motion mock (default export for Vitest compatibility)
const framerMotionMock = {
  motion: {
    div: createMotionMock('div'),
    section: createMotionMock('section'),
    h1: createMotionMock('h1'),
    h2: createMotionMock('h2'),
    h3: createMotionMock('h3'),
    p: createMotionMock('p'),
    img: createMotionMock('img'),
    button: createMotionMock('button'),
    form: createMotionMock('form'),
    nav: createMotionMock('nav'),
    ul: createMotionMock('ul'),
    li: createMotionMock('li'),
    a: createMotionMock('a'),
    main: createMotionMock('main'),
    header: createMotionMock('header'),
    footer: createMotionMock('footer'),
    article: createMotionMock('article'),
    span: createMotionMock('span'),
  },
  AnimatePresence: vi.fn(({ children }) => children),
}

export default framerMotionMock;
export { framerMotionMock };
