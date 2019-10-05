<template>
    <tr class="item" :class="{ 'yes' : id}">
        <td>
            <input type="text" style="width: 100px" v-model="room" placeholder="room number"/>
        </td>
        <td>{{obj.ssid}}</td>
        <td>{{obj.mac}}</td>
        <td><span :style="{'width': 100 + parseInt(obj.signal_level) + 'px'}">  </span>{{obj.signal_level}}</td>
        <td>{{obj.channel}}</td>
        <td>
            <button @click="submit()">OK</button>
        </td>
    </tr>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'network',
        props: {
            obj: Object
        },
        data() {
            return {
                id: null,
                room: null
            }
        },
        mounted() {
            this.getRoom()
        },
        methods: {
            getRoom() {
                var self = this;
                axios.get(`http://localhost:3001/rooms?mac=${this.obj.mac}`).then((data) => {
                    if (data.data.length > 0) {
                        self.room = data.data[0].room;
                        self.id = data.data[0].id;
                    } else {
                        self.room = null;
                        self.id = null;
                    }
                })
            },
            submit() {
                var self = this;
                var obj = {
                    room: this.room,
                    mac: this.obj.mac,
                    ssid: this.obj.ssid
                }

                if (this.id != null) {


                    if (this.room) {
                        axios.put(`http://localhost:3001/rooms/${this.id}`, obj).then((data) => {
                            //console.log(data.data)
                            self.getRoom()
                        })
                    } else {
                        axios.delete(`http://localhost:3001/rooms/${this.id}`).then((data) => {
                            //console.log(data.data)
                            self.getRoom()
                        })
                    }

                } else {
                    axios.post(`http://localhost:3001/rooms/`, obj).then((data) => {
                        //console.log(data.data)
                        self.getRoom()
                    })
                }


            }
        }
    }
</script>

<style scoped lang="scss">
    .item {
        padding: 2px;
        border: 1px #7c7c7c solid;
        margin: 2px;
        text-align: left;

        &.yes {
            background: #e4ffde;
        }

        p {
            margin: 0;

            span {
                background-image: linear-gradient(to left, #54f954, #de6363);
                height: 10px;
                display: inline-block;
            }
        }

        button {
            width: 100%;
            line-height: 20px;
        }

    }


    a {
        color: #42b983;
    }
</style>
