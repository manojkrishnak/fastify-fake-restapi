const { homeController,
    getAllUsersController,
    getUserDetailsController,
    createUserController,
    deleteUserController,
    updateUserController } = require("../controller/users");

const userProps = {
    type: "object",
    properties: {
        id: { type: "number" },
        name: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        address: {
            type: "object",
            properties: {
                street: { type: "string" },
                suit: { type: "string" },
                city: { type: "string" },
                pincode: { type: "string" },
                geo: {
                    type: "object",
                    properties: {
                        lat: { type: "string" },
                        lng: { type: "string" }
                    }
                }
            }
        },
        phone: { type: "string" },
        website: { type: "string" },
        company: {
            type: "object",
            properties: {
                name: { type: "string" },
                catchPhrase: { type: "string" },
                bs: { type: "string" }
            }
        }
    }
};

const getAllUsersOptns = {
    schema: {
        response: {
            200: {
                type: "array",
                items: userProps
            },
            502: {
                type: "string",
                properties: {
                    id: { type: "string" }
                }
            }
        }
    },
    handler: getAllUsersController
};

const getUserOptns = {
    schema: {
        response: {
            200: userProps,
            404: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    },
    handler: getUserDetailsController
};

const createUserOptns = {
    schema: {
        body: { ...userProps, required: ["name", "username", "phone", "email"] },
        response: {
            201: {
                type: "array",
                items: userProps
            }
        }
    },
    handler: createUserController
};

const deleteUserOptns = {
    schema: {
        params: {
            type: "object",
            properties: {
                username: { type: "string" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    },
    handler: deleteUserController
};

const updateUserOptns = {
    schema: {
        params: {
            type: "object",
            required: ["username"],
            properties: {
                username: { type: "string" }
            }
        },
        response: {
            200: userProps,
            404: {
                type: "object",
                properties:{
                    message: { type: "string" }
                }
            }
        }
    },
    handler: updateUserController
};



function usersRoutes(fastify, options, done) {

    fastify.get('/', homeController)

    fastify.get('/users', getAllUsersOptns)

    fastify.get("/users/:id", getUserOptns)

    fastify.post("/user", createUserOptns)

    fastify.delete("/users/:username", deleteUserOptns)

    fastify.put("/users/:username", updateUserOptns)

    done();
}

module.exports = usersRoutes;