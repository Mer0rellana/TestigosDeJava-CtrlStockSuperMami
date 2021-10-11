const Ejemplo = async(req, res) =>{
    try {
        return res.status(200).send({message: "todo ok"});

    } catch {
        return res.status(500).send({message:"Internal Server Error"})
    }
};

module.exports = Ejemplo;