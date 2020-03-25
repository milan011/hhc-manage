<template>
  <list-detail :is-all="true" />
</template>

<script>
import ListDetail from './components/ListDetail'

export default {
  name: 'AllCar',
  components: { ListDetail }
}
</script>