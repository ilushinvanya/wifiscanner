<template>
    <tr class="item" :class="{ 'yes' : id}">
        <td>
            <input type="text"
                   v-model="room"
                   placeholder="room number"/>
        </td>
        <td><p class="ssid">{{obj.ssid}}</p></td>
        <td>{{obj.mac}}</td>
        <td class="signal_level">
            <span :style="{'width': Math.abs(parseInt(obj.signal_level)) + 'px'}"> </span>
            {{obj.signal_level}}
        </td>
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
    td {
        padding: 2px; /* Поля вокруг содержимого ячеек */
        border: 1px solid black; /* Граница вокруг ячеек */
    }
    .item {

        &.yes {
            background: #bcffb8;
        }

        input {
            width: 50px;
        }
        p {
            margin: 0;
        }
        .ssid {
            width: 100px;
            overflow: hidden;
            :hover {
                overflow: visible;
                background: white;
            }
        }
        .signal_level {
            width: 100px;
            background-image: linear-gradient(to left, #54f954, #ded103);
            position: relative;
            span {
                position: absolute;
                z-index: 11;
                background: white;
                top: 0;
                right: 0;
                height: 100%;
            }
        }

        button {
            line-height: 20px;
        }

    }


    a {
        color: #42b983;
    }
</style>
