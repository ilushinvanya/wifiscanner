<template>
    <div class="item" :class="{ 'yes' : id}">
        <input type="text" v-model="room"/>
        <p>ssid: {{obj.ssid}}</p>
        <p>mac: {{obj.mac}}</p>
        <p>signal: <span :style="{'width': 100 + parseInt(obj.signal_level) + 'px'}">  </span>{{obj.signal_level}}</p>
        <p>channel: {{obj.channel}}</p>
        <button @click="submit()">OK</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'network',
        props: {
            obj: Object
        },
        data(){
            return {
                id: null,
                room: null
            }
        },
        mounted(){
            this.getRoom()
        },
        methods:{
            getRoom(){
                var self = this;
                axios.get(`http://localhost:3001/rooms?mac=${this.obj.mac}`).then((data)=>{
                    if(data.data.length > 0){
                        self.room = data.data[0].room;
                        self.id = data.data[0].id;
                    }else{
                        self.room = null;
                        self.id = null;
                    }
                })
            },
            submit(){
                var self = this;
                var obj = {
                    room: this.room,
                    mac: this.obj.mac,
                    ssid: this.obj.ssid
                }

                if(this.id != null){


                    if(this.room){
                        axios.put(`http://localhost:3001/rooms/${this.id}`, obj).then((data)=>{
                            //console.log(data.data)
                            self.getRoom()
                        })
                    }else{
                        axios.delete(`http://localhost:3001/rooms/${this.id}`).then((data)=>{
                            //console.log(data.data)
                            self.getRoom()
                        })
                    }

                }else{
                    axios.post(`http://localhost:3001/rooms/`, obj).then((data)=>{
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
        padding: 10px;
	border:1px black solid;
        margin: 20px;
        text-align: left;
        &.yes {
            background: #e4ffde;
        }

        p {
            span {
		background-image:
    			linear-gradient(
      				to left, #54f954, #de6363
    			);
    		height: 10px;
    		display: inline-block;
		}
        }
	button {
		width:100%;	
		line-height:50px;		
	}

    }


    a {
        color: #42b983;
    }
</style>
