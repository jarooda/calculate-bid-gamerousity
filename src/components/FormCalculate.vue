<script setup lang="ts">
import { ref, computed, watch, defineEmits, onMounted } from 'vue'

const emit = defineEmits(['change'])

const bid = ref('')
const thousand = ref(1000)
const isBin = ref(false)
const productPrice = computed(():number => {
  // 3% kalo dibawah 700 bro
  // Kalo diatas 700 jd 1.5% plus 10ribu hehe
  const value = +bid.value
  const price = thousand.value * value

  if (isBin.value) {
    return price
  } else if (value < 700) {
    return price + (price * 3 / 100)
  } else {
    return price + (price * 1.5 / 100) + 10000
  }
})

const shipping = ref('') // default is using ongkir to semarang
const totalLogistic = computed(():number => {
  // free ongkir tokopedia 20.000 pembelian minimal 50.000
  const MINIMAL_ONGKIR = 50000
  if (productPrice.value >= MINIMAL_ONGKIR) {
    if (+shipping.value <= 20000) {
      return 0
    } else {
      return +shipping.value - 20000
    }
  } else {
    return +shipping.value
  }
})

const hasInsurance = ref(true)
const productPricePlusLogisticPlusInsurance = computed(():number => {
  // sebesar 0.50% (Nol koma lima puluh persen) dari harga produk + ongkos kirim dengan pembulatan ke atas ke nominal ratusan terdekat
  const originLogisticPlusProduct = productPrice.value + +shipping.value
  const logisticPlusProduct = productPrice.value + totalLogistic.value

  if (hasInsurance.value) {
    const insurance = originLogisticPlusProduct * 0.50 / 100
    const insuranceRoundUp = Math.ceil(insurance / 100) * 100
    
    return logisticPlusProduct + insuranceRoundUp
  } else {
    return logisticPlusProduct
  }
})

watch(productPricePlusLogisticPlusInsurance, (newValue) => {
  emit('change', newValue)
})

watch(bid, (newValue) => {
  localStorage.setItem('bid', newValue)
})

watch(shipping, (newValue) => {
  localStorage.setItem('shipping', newValue)
})

onMounted(() => {
  bid.value = localStorage.getItem('bid') || ''
  shipping.value = localStorage.getItem('shipping') || ''
})

const onlyNumber = (event) => {
  if (event.target.value && event.target.value.length > 6) {
    event.preventDefault()
  }
  
  const keyCode = (event.keyCode ? event.keyCode : event.which);
  if (keyCode < 48 || keyCode > 57) {
    event.preventDefault()
  }
}

</script>

<template>
  <form>
    <div class="mt-10 green">
      <h2>Input Bid ( 1 = IDR {{ thousand.toLocaleString() }} )</h2>
      <input id="bid" v-model="bid" type="text" placeholder="Input Bid" @keypress="onlyNumber" />
    </div>
    <div class="mt-10 green">
      <h2>Shipping Cost</h2>
      <input v-model="shipping" type="text" placeholder="Input Shipping" @keypress="onlyNumber" />
    </div>
    <div class="mt-10">
      <label for="hasInsurance">
        <input type="checkbox" id="hasInsurance" v-model="hasInsurance" />
        <h3>Use Insurance ?</h3>
      </label>
      <label for="isBin">
        <input type="checkbox" id="isBin" v-model="isBin" />
        <h3>Is it BIN (Buy It Now) ?</h3>
      </label>
    </div>
  </form>
</template>
