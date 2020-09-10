module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL="postgresql://ashley:201030410Vera@localhost/snap_locator",
    TEST_DB_URL="postgresql://ashley:201030410Vera@localhost/snap_locator",
    JWT_SECRET: process.env.JWT_SECRET || 'ee887df1-aeff-4660-b489-f025fc599666',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '90m'
};