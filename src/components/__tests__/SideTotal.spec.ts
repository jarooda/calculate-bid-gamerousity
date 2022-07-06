import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SideTotal from '@/components/SideTotal.vue'

describe('SideTotal', () => {
  it('render the amount', () => {
    const wrapper = mount(SideTotal, { props: { total: 300 } })
    expect(wrapper.text()).toContain(300)
  })

  it('render placeholder', () => {
    const wrapper = mount(SideTotal, { props: { total: 0 } })
    expect(wrapper.text()).toContain('Total you paid')
  })
})
