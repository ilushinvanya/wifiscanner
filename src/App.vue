<template>

    <div id="app">
        <button class="fixed_button" @click="getData()">OBNOVIT</button>

        <table>
            <thead>
                <th ></th>
                <th>ssid</th>
                <th>mac</th>
                <th>signal</th>
                <th>ch</th>
                <th></th>
            </thead>
            <tbody>
            <Hello v-for="(network, index) in networks"
                   :key="index"
                   :obj="network"></Hello>
            </tbody>
        </table>


    </div>
</template>

<script>
    import Hello from './components/Network.vue'
    import axios from 'axios'
    import jsonp from 'jsonp'

    export default {
        name: 'app',
        data() {
            return {
                networks: []
            }
        },
        components: {Hello},
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                var self = this;

                axios.get("http://localhost:3002/").then((data) => {
                    var data_sort = data.data.sort(function (a, b) {
                        return b.signal_level - a.signal_level
                    })


                    self.networks = data_sort;
                })


            }
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        padding: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display: flex;
        flex-wrap: wrap;
        .fixed_button {
            position: fixed;
            top:0;
            left:0;
        }
        table {
            border: 1px black solid;
            border-collapse: collapse;
        }
    }
</style>
