export const getAllFiles = (req,res) => {
    const user = req.body.user
    res.json(user.files);
}

export const getAllCollections = (req,res) => {
    const user = req.body.user
    res.json(user.collections)
}

export const createCollection = async (req,res) => {
    const{collectionName,user} = req.body
    user.collections.push({
        collectionName:collectionName,
        files:[]
    })
    await user.save()
    res.json("Created successfully")
}

export const addToCollection = async (req,res) => {
    const {collectionName,user,file} = req.body
    console.log(collectionName)
    const collections = user.collections
    collections.forEach(element => {
        if(element.collectionName == collectionName){
            element.files.push(file)
        }
    });
    // user.collections = collections
    console.log(user.collections)
    await user.save();
    res.json("Added Successfully")
}