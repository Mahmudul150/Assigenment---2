import app from "./app"
import config from "./config"
import initDB from "./DB"

function main(){
    initDB()
    app.listen(config.port, () => {
  console.log(` My Assigenment project is running on the port ${config.port}`)
})
}
main()