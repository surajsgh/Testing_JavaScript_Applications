const teardown = async () => {
    await global.__databaseInstance.stop();
}

module.exports = teardown;