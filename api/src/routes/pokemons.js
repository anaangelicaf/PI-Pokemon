const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()
const { Pokemon, Type } = require('../db.js')
const { v4: uuidv4 } = require('uuid');

router.use(express.json())

router.get('/', async (req, res, next) => {
    //Primero reviso si me envian el nombre por query
    const { name, by } = req.query;
   
    if (by) {
       
        try {
            if (by == 2) { 
                let pBD = await Pokemon.findAll( {include :Type } )
                if (pBD) {                   
                    pBD = pBD.map(p => {
                        return {
                            id: p.id,
                            name: p.name,
                            type: p.dataValues.types.map((p)=>p.dataValues.name),
                            img: p.image,
                            creado: p.creadoByMe,
                            attack: p.attack
                        }
                    })
                    return res.status(200).send(pBD)
                } 
            }
            if (by == 1){
                const pApi =  (await axios.get('https://pokeapi.co/api/v2/pokemon')).data.results
                let pData = []
                    for (let p of pApi) {  
                        pData.push(axios.get(p.url))
                    }
                    let rApi = (await Promise.all(pData)).map(pok => {
                        
                        return ({
                            id: pok.data.id,
                            name: pok.data.name,
                            type: pok.data.types.map(e => e.type.name),
                            img: pok.data.sprites.other.dream_world.front_default,
                            attack: pok.data.stats[1].base_stat
                        })
                    })
               return res.status(200).send(rApi)
            }        
            
        } catch (error) {
            next(error)
        }
    }
    if (name) {
        
        try {
            const pBD = await Pokemon.findAll({
                where: {
                    name: name
                    },
                include: {
                    model: Type
                }
            })
            if (pBD != 0) {  
                          
                let respuesta = pBD.map(p=>{
                    return ({
                        id: p.id,
                        name: p.name,
                        life: p.life,
                        attack: p.attack,
                        defense: p.defense,
                        speed: p.speed,
                        weight: p.weight,
                        height: p.height,
                        img: p.image,
                        //type: p.types.map(type => Number(type.name)),
                        type: p.types.map((p)=>p.name),
                    })
                })
                res.status(200).send(respuesta)
            }else{
                const pApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                let respuestaApi = [
                {
                    id: pApi.data.id,
                    name: pApi.data.name,
                    life: pApi.data.stats[0].base_stat,
                    attack: pApi.data.stats[1].base_stat,
                    defense: pApi.data.stats[2].base_stat,
                    speed: pApi.data.stats[5].base_stat,
                    weight: pApi.data.weight,
                    height: pApi.data.height,
                    img: pApi.data.sprites.other.dream_world.front_default,
                    type: pApi.data.types.map(e => e.type.name),
                } ]
                    res.status(200).send(respuestaApi)
            }        
            
        } catch (error) {
            return error.message.includes('404') 
                ? res.status(404).send('No se pudo encontrar al pokemon')
                : res.status(500).send(`Server error: ${error}`)
        }
    } else {
        //si no envian nada por quiery traigo todos los Pokemons
            try {
                let pBD = await Pokemon.findAll( {include :Type } )
                if (pBD) {
                    
                    pBD = pBD.map(p => {
                        return {
                            id: p.id,
                            name: p.name,
                            type: p.dataValues.types.map((p)=>p.dataValues.name),
                            img: p.image,
                            creado: p.creadoByMe,
                            attack: p.attack
                        }
                    })
                }
        
                //const pApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
                const pApi =  (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results
                //let datosPApi = pApi.data.results
                let pData = []
                //for (let p of datosPApi) {
                    for (let p of pApi) {  
                    /*let subReq = p.url
                    let subReqPoke = await axios.get(`${subReq}`)
                    pData.push({
                        id:subReqPoke.data.id,
                        name: subReqPoke.data.name,
                        type: subReqPoke.data.types.map(e => e.type.name),
                        img: subReqPoke.data.sprites.other.dream_world.front_default,
                        attack: subReqPoke.data.stats[1].base_stat,
                    })*/
                        pData.push(axios.get(p.url))
                    }
                    let rApi = (await Promise.all(pData)).map(pok => {
                        
                        return ({
                            id: pok.data.id,
                            name: pok.data.name,
                            type: pok.data.types.map(e => e.type.name),
                            img: pok.data.sprites.other.dream_world.front_default,
                            attack: pok.data.stats[1].base_stat
                        })
                    })
                res.status(200).send(pBD.concat(rApi))
        
            } catch (error) {
                return error.message.includes('404') 
                ? res.status(404).send('No se pudo encontrar al pokemon')
                : res.status(500).send(`Server error: ${error}`)
            }
        }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    if (id.length > 10) {
        try {
            const pBD = await Pokemon.findByPk(id, { include: Type });
            const respuesta = {
                id: pBD.id,
                name: pBD.name,
                type:pBD.dataValues.types.map((p)=>p.dataValues.name),
                img: "https://media.redadn.es/imagenes/pokemaster_340798.jpg",
                life: pBD.life,
                attack: pBD.attack,
                defense: pBD.defense,
                speed: pBD.speed,
                height: pBD.height,
                weight: pBD.weight,
              };
            return res.json(respuesta)
        } catch (error) {
            next("El id es incorrecto")
        }
    } else {
        try {
            const pApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            let respuesta = {
                id: pApi.data.id,
                name: pApi.data.name,
                life: pApi.data.stats[0].base_stat,
                attack: pApi.data.stats[1].base_stat,
                defense: pApi.data.stats[2].base_stat,
                speed: pApi.data.stats[5].base_stat,
                weight: pApi.data.weight,
                height: pApi.data.height,
                img: pApi.data.sprites.other.dream_world.front_default,
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
            image:"https://media.redadn.es/imagenes/pokemaster_340798.jpg"
        })
        await newPoke.addTypes(types) //para añadir los tipos a la tabla intermedia 
        // await newPoke.addType(type)
        return res.send(newPoke)
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    if (id.length > 10) {
        try {
            const eliminado = await Pokemon.destroy({ where:{id : id}});
            return res.json(eliminado)
        } catch (error) {
            next("El id es incorrecto")
        }
    }else{
        return res.send("No se pudo encontrar")
    }
})
module.exports = router;