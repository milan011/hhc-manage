<template>
  <list-detail :is-all="false" />
</template>

<script>
import ListDetail from './components/ListDetail'

export default {
  name: 'AllCar',
  components: { ListDetail }
}
</script>