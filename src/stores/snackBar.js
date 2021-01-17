import { observable, action, makeAutoObservable } from 'mobx'


export class SnackBar {
    constructor() {
        this.toShow = false
        this.msg = ""
        this.type = ""
        
        makeAutoObservable(this,{
            toShow: observable,
            msg: observable,
            type: observable,
            alertSuccess: action,
            alertFailure: action,
            closeAlert: action
        })
    }

    alert = msg => {
        this.toShow = true
        this.msg = msg
    }

    alertSuccess = msg => {
        this.alert(msg)
        this.type = "success"
    }

    alertFailure = msg => {
        this.alert(msg)
        this.type = "error"
    }

    closeAlert = () => {
        this.toShow = false
    }
}