<template>
    <div id="app">

        <Hello v-for="(network, index) in networks"
               :key="index"
               :obj="network"></Hello>

        <pre>{{networks}}</pre>
    </div>
</template>

<script>
    import Hello from './components/Network.vue'
//    import axios from 'axios'
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
                jsonp("http://localhost:3002/", null, function(data){
                    self.networks = data.data;
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
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        display:flex;
        .item {
            border:1px black solid;
            margin: 20px;
            text-align: left;
        }
    }
</style>
