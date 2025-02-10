function ApiResponse(code,message,data=null){
    this.code=code,
    this.message=message,
    this.data=data
}
export default ApiResponse