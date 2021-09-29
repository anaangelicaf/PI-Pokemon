const express = require('express')
const router = express.Router()
const {Type } = require('../db.js')
const { default: axios } = require('axios')


//esto es: /types...

router.use(express.json())

//Ruta para obtener todos los types desde la base de datos, listo!
router.get("/", async (req, res, next) => {
    try{
        const llenado = await Type.count()
        if (llenado === 0) {
            const types = await axios.get(`https://pokeapi.co/api/v2/type`)
            let typesApi = types.data.results
            if (typesApi) {
                typesApi = typesApi.map(t => {
                    return {
                        name: t.name
                    }
                })
            }
            await Type.bulkCreate(typesApi)
            res.send(typesApi.map(p => p.name))
            console.log("Primero instancia, copia en BD")
        } else {
            const typesBD = await Type.findAll()
            let typesBD2 = typesBD.map((e) => {
                return e.name
            })
            res.send(typesBD2)
            console.log("Segunda instancia,no Copia en BD")
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router