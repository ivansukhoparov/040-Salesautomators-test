import "reflect-metadata"
import {app} from "./app";
import {MongoDbAdapter} from "./bd/mongodb.adapter";
import {container} from "./composition-root";

const port = 3002

const db:MongoDbAdapter = container.resolve<MongoDbAdapter>(MongoDbAdapter)
app.listen(port, async () => {
    console.log(`app start on port ${port}`);
    console.log(`open in browser http://localhost:${port}`);
})