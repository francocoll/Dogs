const { Router } = require('express');
const axios = require('axios')
const { Dog, Temperament } = require('../db')
const { API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let apiInfo = apiUrl.data.map(r => {
        return {
            id: r.id,
            name: r.name,
            life_span: r.life_span,
            heightMin: parseInt(r.height.metric.slice(0, 2).trim()),
            heightMax: parseInt(r.height.metric.slice(4).trim()),
            weightMin: parseInt(r.weight.metric.slice(0, 2).trim()),
            weightMax: parseInt(r.weight.metric.slice(4).trim()),
            temperament: r.temperament,
            image: r.image.url
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name']
        },
        through: {
            attributes: []
        }
    })
}

const getTotalInfo = async () => {
    let apiInfo = await getApiInfo()
    let dbInfo = await getDbInfo();
    return apiInfo.concat(dbInfo)
}

router.get('/dogs', async (req, res) => {
    try {
        const { name } = req.query
        const info = await getTotalInfo()
        if (name) {
            let dogFilter = await info.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
            if (dogFilter.length !== 0) {
                res.status(200).send(dogFilter)
            } else {
                res.status(404).send('Error')
            }
        } else {
            res.status(200).send(info)
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/dogs/:id", async (req, res) => {
    const id = req.params.id;
    let allDogs = await getTotalInfo();
    if (id) {
        let dogId = await allDogs.filter((e) => e.id == id);
        dogId.length
            ? res.status(200).json(dogId)
            : res.status(404).send("Dog not found");
    }
});

router.get("/temperaments", async function (req, res) {
    try {
        const dataApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let temperaments = dataApi.data.map((el) => el.temperament);
        temperaments = temperaments.join(", ").split(", ");
        temperaments = temperaments.filter((el) => el);
        temperaments = [...new Set(temperaments)].sort();
        temperaments.forEach((el) => {
            Temperament.findOrCreate({
                where: { name: el },
            });
        });
        const allTemperament = await Temperament.findAll();
        res.send(allTemperament);
    } catch {
        res.send("Error")
    }
});



router.post("/dog", async (req, res) => {
    try {
        const {
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span,
            image,
            temperament,
        } = req.body; 
        const createdDog = await Dog.create({
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span,
            image,
        });
        temperament?.map(async (el) => {
            try {
                let temps = await Temperament.findAll({
                    where: { name: el },
                });
                await createdDog.addTemperament(temps);
            } catch (error) {
                res.send(error);
            }
        });
        res.status(200).send("Dog successfully created!!!");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;