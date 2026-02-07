require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://enchanting-centaur-aeb498.netlify.app'
    ]
}));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));