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
	'ACCESS_SECRET',
	'WHITE_LIST',
	'REFRESH_SECRET',
];

environments.map(
	(variable: string) => (config[`${variable}`] = process.env[`${variable}`])
);

export default config;