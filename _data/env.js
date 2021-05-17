const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = "production";
const prodUrl = "https://www.sidds.me";
const devUrl = "http://localhost:8080";
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl;
const isProduction = environment === PROD_ENV;

module.exports = {
	environment,
	isProduction,
	baseUrl,
};
