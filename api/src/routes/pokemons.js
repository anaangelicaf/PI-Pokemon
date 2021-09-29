const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const { v4: uuidv4 } = require('uuid');


router.get('/', async (req, res, next) => {
    //Primero reviso si me envian el nombre por query
    //const name = req.query.name
    const { name } = req.query;
    
    if (name) {
        try {
            //const pBD = await Pokemon.findOne({ where: { name: name }, include: Type });
            await Pokemon.findAll({
                where: {
                    name: name
                    },
                include: {
                    model: Type
                }
            })
            if (pBD) {
                const { id, name, life, attack, defense, speed, weight, height, image } = pBD
                const respuesta = {
                    id,
                    name,
                    life,
                    attack,
                    defense,
                    speed,
                    weight,
                    height,
                    image,
                    type: pBD.dataValues.types.map((p)=>p.dataValues.name),
                }
                return res.status(200).json(respuesta)
            } else {
                try {
                    const pApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                    let respuesta = {
                        id: pApi.data.id,
                        name: pApi.data.name,
                        life: pApi.data.stats[0].base_stat,
                        attack: pApi.data.stats[1].base_stat,
                        defense: pApi.data.stats[2].base_stat,
                        speed: pApi.data.stats[5].base_stat,
                        weight: pApi.data.weight,
                        height: pApi.data.height,
                        image: pApi.data.sprites.other.dream_world.front_default,
                        type: pApi.data.types.map(e => e.type.name),
                    }
                    return res.status(200).json(respuesta)
                } catch (error) {
                     next(res.json({message:"Pokemon no encontrado"}))
                }
            }
        } catch (error) {
            next(error)
        }
    }
    //si no envian nada por quiery traigo todos los Pokemons
    try {
        let pBD = await Pokemon.findAll( {include :Type } )
        if (pBD) {
            pBD = pBD.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    tipo: p.dataValues.types.map((p)=>p.dataValues.name),
                    image: p.image,
                    creado: p.creadoByMe,
                    attack: p.attack
                }
            })
        }
        
        const pApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
        let datosPApi = pApi.data.results
        let pData = []
        for (p of datosPApi) {
            let subReq = p.url
            let subReqPoke = await axios.get(`${subReq}`)
            pData.push({
                id:subReqPoke.data.id,
                name: subReqPoke.data.name,
                type: subReqPoke.data.types.map(e => e.type.name),
                image: subReqPoke.data.sprites.other.dream_world.front_default,
                attack: subReqPoke.data.stats[1].base_stat,
            })
        }
        res.status(200).send(pBD.concat(pData))
        
    } catch (error) {
        next("Api no responde")
    }

})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    if (id.length > 10) {
        try {
            const pBD = await Pokemon.findOne({ where: { id: id }, include: Type });
            
            const { name, life, attack, defense, speed, weight, height, image } = pBD
            const respuesta = {
                name,
                life,
                attack,
                defense,
                speed,
                weight,
                height,
                image,
                type:pBD.dataValues.types.map((p)=>p.dataValues.name),
            }
            return res.json(respuesta)
        } catch (error) {
            next("El id es incorrecto")
        }
    } else {
        try {
            const pApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            let respuesta = {
                name: pApi.data.name,
                life: pApi.data.stats[0].base_stat,
                attack: pApi.data.stats[1].base_stat,
                defense: pApi.data.stats[2].base_stat,
                speed: pApi.data.stats[5].base_stat,
                weight: pApi.data.weight,
                height: pApi.data.height,
                image: pApi.data.sprites.other.dream_world.front_default,
                type: pApi.data.types.map(e => e.type.name),
            }
            return res.json(respuesta)
        } catch (error) {
            next("El id es incorrecto")
        }
    }
})

router.post("/", async (req, res, next) => {
    const { name, life, attack, defense, speed, weight, height, image, types } = req.body
    try {
        const newPoke = await Pokemon.create({
            id: uuidv4(),
            name: name.toLowerCase(),
            life,
            attack,
            defense,
            speed,
            weight,
            height,
            image
        })
        await newPoke.addTypes(types) //para añadir los tipos a la tabla intermedia 
        // await newPoke.addType(type)
        return res.send(newPoke)
    } catch (error) {
        next(error)
    }
})
module.exports = router;