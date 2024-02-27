export const test = (req,res) => {
    res.send("Hello")
}

export const errorTest = (req,res) => {
    throw new Error("Error test")
}