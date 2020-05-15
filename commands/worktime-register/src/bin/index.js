const dotenv = require('dotenv')
const importModule = require('esm')(module)

importModule('module-alias/register')

dotenv.config()

importModule('./index')
