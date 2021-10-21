import { serverHttp } from './app'

try {
    serverHttp.listen(4000, () => console.log("Está rodando"))

} catch (e) {
    console.log(e)
}