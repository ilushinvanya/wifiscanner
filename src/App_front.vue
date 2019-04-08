<template>
	
    <div id="app">

	<section id="map">
		<button @click="active_view = 'map'">Karta</button>
		<Map v-if="active_view == 'map'" components_height></Map>
	</section>
	
	<section id="room" v-if="selected_room">
		<button @click="active_view = 'room'">Zal #{{selected_room}}</button>
		<Room v-if="active_view == 'room'" components_height></Room>
	</section>

	<section id="tags">
		<button @click="active_view = 'tags'">{{tags_string}}</button>
		<Tags v-if="active_view == 'tags'" components_height></Tags>
	</section>
        

    </div>
</template>

<script>
    import Map from './components/Map.vue'
    import Room from './components/Room.vue'
    import Tags from './components/Tags.vue'

    export default {
        name: 'app',
        data(){
            return {	
		active_view: "map"
            }
        },
        components: { Map, Room, Tags },
	computed:{
		selected_room(){
			return state.room;
		},
		tags_string(){
			if( state.tags.length > 0 ){
				return state.tags.reduce(function(iter,result){
					result += iter.name
				}, "")
			}else{
				return "Tematika"
			}
		},
		components_height(){
			var window.height;
			var count_btns = this.selected_room ? 3 : 2;
			var map_btn_height = document.getElementById("map").getElementsByTagName("button").height;
			var tags_btn_height = document.getElementById("tags").getElementsByTagName("button").height;
			var total_height = map_btn_height + tags_btn_height;
			
			if(this.selected_room){
				var room_btn_height = document.getElementById("room").getElementsByTagName("button").height;
				total_height += room_btn_height
			}

			return window.height - total_height;
		}
	},
        mounted() {
            
        },
        methods:{
            
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
