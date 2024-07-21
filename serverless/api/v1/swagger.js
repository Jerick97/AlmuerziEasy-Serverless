const {
	createUser,
	CreateUserBody,
	loginUser,
	LoginUserBody,
	getMe,
	getAllUsers,
	deleteUserById,
} = require("./docs/users");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const CSS_URL =
	"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

// Metadata info about our API
const swaggerOptions = {
	definition: {
		openapi: "3.0.1",
		info: {
			version: "1.0.0",
			title: "AlmuerziEasy - Documentation",
			description:
				"Esta es una aplicación de API REST hecha con Express. Recupera datos del backend.",
			license: {
				name: "Licensed Under MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "AlmuerziEasy API",
				url: "https://almuerzieasy.vercel.app",
				email: "emersonsuarez2904@gmail.com",
			},
		},
		servers: [
			{
				url: "http://localhost:3000/api/v1",
				description: "Development server",
			},
			{
				url:
					process.env.API_HOST ||
					"https://almuerzieasy-backend.vercel.app/api/v1",
				description: "Production server",
			},
		],
		tags: [
			{
				name: "Users",
			},
			{
				name: "Meals",
			},
			{
				name: "Orders",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
			schemas: {
				CreateUserBody,
				LoginUserBody,
			},
		},
		paths: {
			"/register": {
				post: createUser,
			},
			"/login": {
				post: loginUser,
			},
			"/me": {
				get: getMe,
			},
			"/users": {
				get: getAllUsers,
			},
			"/users/{id}": {
				delete: deleteUserById,
			},
		},
	},
	apis: ["./v1/routes/*.js", "./v1/docs/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
	app.use(
		"/api/v1/docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocs, {
			customCss:
				".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; } .swagger-ui .opblock .opblock-summary-path-description-wrapper .opblock-summary-path{word-break: inherit; align-items: center;color: #3b4151;display: flex;font-family: monospace;font-weight: 600;padding: 0 10px;} @media (max-width: 768px) {.swagger-ui .scheme-container .schemes {flex-direction: column;align-items: flex-start;}} .scheme-container .schemes .schemes-server-container{width: 100%;box-sizing: border-box;max-width: 100%;} .swagger-ui .btn.authorize {background-color: transparent;border-color: #49cc90;color: #49cc90;display: inline;line-height: 1;white-space: nowrap;}",
			customCssUrl: CSS_URL,
			customfavIcon:
				"https://static1.smartbear.co/swagger/media/assets/swagger_fav.png",
		})
	);
};

module.exports = setupSwagger;
