module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_ENDPOINT: 'https://murmuring-shore-59851.herokuapp.com/api',
    DATABASE_URL: process.env.DATABASE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'snap_app_locator_secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '90m',
    SLL: process.env.SLL || true
}