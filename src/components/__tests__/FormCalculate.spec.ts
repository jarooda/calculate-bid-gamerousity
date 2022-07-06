import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FormCalculate from '@/components/FormCalculate.vue'

describe('FormCalculate', () => {
  it('check productPrice', async () => {
    const wrapper = mount(FormCalculate)
    const instance = wrapper.vm as any

    instance.bid = 540
    expect(instance.productPrice).toBe(556200)

    instance.bid = 940
    expect(instance.productPrice).toBe(964100)

    instance.isBin = true
    instance.bid = 1080
    expect(instance.productPrice).toBe(1080000)
  })

  it('check totalLogistic', async () => {
    const wrapper = mount(FormCalculate)
    const instance = wrapper.vm as any

    instance.bid = 20
    instance.shipping = 20000
    expect(instance.totalLogistic).toBe(20000)

    instance.bid = 540
    instance.shipping = 11000
    expect(instance.totalLogistic).toBe(0)

    instance.bid = 54
    instance.shipping = 30000
    expect(instance.totalLogistic).toBe(10000)
  })

  it('check productPricePlusLogisticPlusInsurance', async () => {
    const wrapper = mount(FormCalculate)
    const instance = wrapper.vm as any

    instance.bid = 540
    instance.shipping = 11000
    expect(instance.productPricePlusLogisticPlusInsurance).toBe(559100)

    instance.hasInsurance = false
    instance.bid = 540
    instance.shipping = 11000
    expect(instance.productPricePlusLogisticPlusInsurance).toBe(556200)
  })
})
