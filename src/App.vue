<template>
	
    <div id="app">
	<button @click="getData()">OBNOVIT</button>
        <Hello v-for="(network, index) in networks"
               :key="index"
               :obj="network"></Hello>

        <!-- <pre>{{networks}}</pre> -->
    </div>
</template>

<script>
    import Hello from './components/Network.vue'
    import axios from 'axios'
    import jsonp from 'jsonp'

    export default {
        name: 'app',
        data(){
            return {
                networks:[]
            }
        },
        components: { Hello },
        mounted() {
            this.getData()
        },
        methods:{
            getData(){
                var self = this;
		
		axios.get("http://localhost:3002/").then((data)=>{
			var data_sort = data.data.sort(function(a,b){  return b.signal_level-a.signal_level })


			self.networks = data_sort;
		})



            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display:flex;
	flex-wrap:wrap;
    }
</style>
