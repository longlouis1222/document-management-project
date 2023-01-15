<template>
  <div>
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="connect">WebSocket connection:</label>
              <button
                id="connect"
                class="btn btn-default"
                type="submit"
                :disabled="connected == true"
                @click.prevent="connect"
              >
                Connect
              </button>
              <button
                id="disconnect"
                class="btn btn-default"
                type="submit"
                :disabled="connected == false"
                @click.prevent="disconnect"
              >
                Disconnect
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
  name: 'websocketdemo',
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false,
    }
  },
  methods: {
    connect() {
      this.socket = new SockJS(process.env.VUE_APP_API + 'manager-project-app')
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect(
        {},
        (frame) => {
          console.log(
            'this.stompClient.connected: ',
            this.stompClient.connected,
          )
          if (this.stompClient.connected) {
            console.log('connected to: ' + frame)
            this.connectChangeComment()
          }
        },
        (error) => {
          console.log(error)
          this.connected = false
        },
      )
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect()
      }
      this.connected = false
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect()
    },
    connectChangeComment() {
      console.log('vaooooooooooooo connect')
      try {
        this.stompClient.subscribe(
          process.env.VUE_APP_API + 'topic/messages/1',
          (tick) => {
            console.log('greeting: ', tick)
            const listDataNoti = JSON.parse(JSON.parse(tick.body).content).data
            console.log('reponse channel: ', listDataNoti)
          },
        )
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    // this.connect();
  },
}
</script>

<style scoped>
</style>