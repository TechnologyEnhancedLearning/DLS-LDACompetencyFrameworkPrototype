const messagesDao = require("./dao/messagesDao");

const setupRoutes = (router) => {

    router.get('/inbox', async (req, res) => {
        const userId = req.cookies.heeUserId;
        const messages = await messagesDao.getInboxFor(userId);
        res.render('messages/inbox', { messages: messages });
    });

    router.get('/inbox/sent', async (req, res) => {
        const userId = req.cookies.heeUserId;
        const messages = await messagesDao.getOutboxFor(userId);
        res.render('messages/outbox', { messages: messages });
    });
}

module.exports = {
    setupRoutes: setupRoutes
}