module.exports = {
  props: {
    name: {
      type:String,
      required:true
    },
    value: {
      required:false,
      default:''
    },
    label:{
      type:String,
      required:false
    }
  }
}
