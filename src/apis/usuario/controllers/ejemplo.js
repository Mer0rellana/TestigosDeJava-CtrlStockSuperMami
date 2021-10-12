const Ejemplo = async(req, res) =>{
    try {
        const token = res.locals.payload;
        if(token.role==="Admin") {
            console.log("Tiene permiso");
            //acá desarrollar toda la lógica
        }

        return res.status(200).send({message: "todo ok"});

    } catch {
        return res.status(500).send({message:"Internal Server Error"})
    }
};

module.exports = Ejemplo;