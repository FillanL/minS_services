import dotenv from 'dotenv';
dotenv.config();

export interface configImpl {
	[key: string]: any;
}
const config: configImpl = {};
const environments: string[] = [
	'SALT',
	'PORT',
	'mongoConnect',
	'CLOUD_NAME',
	'API_KEY',
	'API_SECRET',
	"WHITE_LIST"
];

environments.map(
	(variable: string) => (config[`${variable}`] = process.env[`${variable}`])
);

export default config;
