module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_ENDPOINT: 'http://localhost:8000/api',
    DATABASE_URL: 'postgresql://ashley_dev:201030410Vera@localhost/snap_app',
    TEST_DATABASE_URL: 'postgresql://ashley_dev:201030410Vera@localhost/snap_app_auth_test',
    JWT_SECRET: process.env.JWT_SECRET || 'snap_app_locator_secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '90m'
}