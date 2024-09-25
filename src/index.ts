import "reflect-metadata"
import {App} from "./app";
import {container} from "./composition-root";


const port = 3002
const app:App = container.resolve<App>(App)

app.start(port)