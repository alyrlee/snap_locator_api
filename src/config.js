module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_ENDPOINT: 'https://murmuring-shore-59851.herokuapp.com/api',
    DATABASE_URL: 'postgres://xjjnbkymmwibzv:2aa5a60dda71fc581ece0493a74901ade2fd024cd9e117db0e36c3afbfc7c420@ec2-52-7-168-69.compute-1.amazonaws.com:5432/d58gi1rjhfmr7g',
    TEST_DATABASE_URL: 'postgres://xjjnbkymmwibzv:2aa5a60dda71fc581ece0493a74901ade2fd024cd9e117db0e36c3afbfc7c420@ec2-52-7-168-69.compute-1.amazonaws.com:5432/d58gi1rjhfmr7g_test',
    JWT_SECRET: process.env.JWT_SECRET || 'snap_app_locator_secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '90m',
    SLL: process.env.SLL || true
}