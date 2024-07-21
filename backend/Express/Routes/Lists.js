const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.lists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', auth, async (req, res) => {
    const { name, responseCodes, imageLinks } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const newList = { name, creationDate: new Date(), responseCodes, imageLinks };
        user.lists.push(newList);
        await user.save();
        res.json(user.lists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:listId', auth, async (req, res) => {
    const { listId } = req.params;
    const { name, responseCodes, imageLinks } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const list = user.lists.id(listId);
        if (!list) return res.status(404).json({ msg: 'List not found' });

        list.name = name || list.name;
        list.responseCodes = responseCodes || list.responseCodes;
        list.imageLinks = imageLinks || list.imageLinks;

        await user.save();
        res.json(user.lists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:listId', auth, async (req, res) => {
    const { listId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        user.lists.id(listId).remove();
        await user.save();
        res.json(user.lists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
