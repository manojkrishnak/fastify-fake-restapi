const fastify = require("fastify")({logger: true});
const PORT = process.env.PORT || 3001;

fastify.register(require("fastify-swagger"), {
    exposeRoute: true, 
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "Fake REST API", 
            description: "A Fake REST API built with Fastify",
            version: "1.0.0"
    }
    }
});
fastify.register(require("./routes/index"));


fastify.listen(PORT,"0.0.0.0", function (err, address){
    if(err){
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server is running on ${address}`);
})