import { action, computed, makeObservable, observable } from 'mobx'
class User{
    user = Object
    userCount = 0

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,
            unsetUser: action,
            userCount: observable,
            setUserCount: action,
            unsetUserCount: action,
            currentUser: computed, 
            getUserCount: computed, 
        })
    }

    setUser(user) {
        this.user = user
    }

    unsetUser() {
        this.user = {}
    }

    setUserCount(userCount) {
        this.userCount = userCount
    }

    unsetUserCount() {
        this.userCount = 0
    }


    get currentUser() {
        return this.user
    }

    get getUserCount() {
        return this.userCount
    }
}

export const userStore = new User()