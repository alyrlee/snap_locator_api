module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_ENDPOINT: 'https://murmuring-shore-59851.herokuapp.com/',
    DATABASE_URL: 'postgres://nsdquldjuminiw:52cdbad046bd1b9bc25ea812be935abd669e8a87c931dac3e6002d65077af50c@ec2-54-196-33-23.compute-1.amazonaws.com:5432/d9hqjm9h9fb7er',
    TEST_DATABASE_URL: 'postgres://nsdquldjuminiw:52cdbad046bd1b9bc25ea812be935abd669e8a87c931dac3e6002d65077af50c@ec2-54-196-33-23.compute-1.amazonaws.com:5432/d9hqjm9h9fb7er_test',
    JWT_SECRET: process.env.JWT_SECRET || 'snap_app_locator_secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '90m',
    SLL: process.env.SLL || true
}