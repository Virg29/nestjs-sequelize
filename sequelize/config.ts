import config from "../src/common/config/config"
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
module.exports = config.database
