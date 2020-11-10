module.exports = {
    PORT: process.env.PORT || 8008,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_ENDPOINT: 'http://localhost:8008/api',
    DATABASE_URL: process.env.DATABASE_URL ||'postgresql://ashley@localhost/snap_locator',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL ||'postgresql://ashley@localhost/snap_locator_auth_test',
    JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '90m'
}