const { generateSongs } = require('../generator/song.generator');

exports.getSongs = (req, res) => {
    try {
        const seed = req.query.seed || "1";
        const lang = req.query.lang || 'en-US';
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const likes = parseFloat(req.query.likes) || 0;

        if (page < 1 || pageSize < 1) {
            return res.status(400).json({ error: 'Page and pageSize must be positive numbers' });
        }
        const data = generateSongs({ seed, lang, page, pageSize, likes });
        return res.status(200).json(data);
        
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

