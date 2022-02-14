import { action, computed, makeObservable, observable } from 'mobx'
class Video{
    localStream = null
    remoteStream = null

    constructor() {
        makeObservable(this, {
            localStream: observable,
            remoteStream: observable,
            getLocalStream: computed,
            getRemoteStream: computed
        })
    }

    setLocalStream(stream) {
        this.localStream = stream
    }

    setRemoteStream(stream) {
        this.remoteStream = stream
    }

    unsetLocalStream() {
        this.localStream = null
    }

    unsetRemoteStream() {
        this.remoteStream = null
    }

    get getLocalStream() {
        return this.localStream
    }

    get getRemoteStream() {
        return this.remoteStream
    }
}

export const videoStore = new Video()