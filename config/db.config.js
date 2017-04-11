module.exports = {
    redis: {
        port: 6379,
        ip: "127.0.0.1",
        options: {
            db: 2
        }
    },
    pg: {
        user: "ats",
        database: "atsexam",
        host: "127.0.0.1",
        port: 5432,
        password: "12345678",
        poolSize: 20,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 1000,
        poolLog: false
    }
}