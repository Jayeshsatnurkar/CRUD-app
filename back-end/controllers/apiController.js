import { Datamodel } from "../models/dataSchema.js"
import { ObjectId } from 'mongodb'

let GetHome = async (req, res) => {
    try {

        let result = await Datamodel.find()

        res.status(200).json({ messege: "This is home router for api", databaseStatus: "connected !" })
    } catch (err) {
        res.status(500).json({ messege: "some error occured", databaseStatus: "N/A" })
    }
}

let PostAcceptForm = async (req, res) => {

    let data = req.body

    try {
        let checkIfUnique = await Datamodel.findOne({ $or: [{ phone: data.phone }, { email: data.email }] })

        if (checkIfUnique) {
            throw ('Duplicate Entry')
        } else {


            let instanceDataModel = new Datamodel(data)

            await instanceDataModel.save()

            res.status(200).json({ messege: "data has been saved into database !" })
        }
    } catch (err) {
        console.log("unable to save data into database", err)
        res.status(200).json({ messege: err })
    }
}

let FetchData = async (req, res) => {
    // console.log("FetchData is called !")

    try {
        let result = await Datamodel.find({})

        if (result.length == 0) {
            throw ("unable to get data")
        }
        res.status(200).json({ message: "Get the data from database", database: result })
    } catch (err) {
        res.status(200).json({ message: "unable to get data", err })
    }
}

let DeleteData = async (req, res) => {
    let deleteId = req.params.id
    console.log(deleteId);
    try {

        if (!deleteId) {
            throw ("Deleted id is not found !")
        }
        await Datamodel.deleteOne({ _id: new ObjectId(`${deleteId}`) })

        res.status(200).json({ message: "Data is successfully deleted !" })
    } catch (err) {
        res.status(101).json({ message: "unable to delete data!", err })

    }

}

const updateData = async (req, res) => {
    let data = req.body;
    try {
        const dataLength = Object.keys(data).length
        const dataKey = Object.keys(data)
        const dataValue = Object.values(data)

        for (let i = 0; i < dataLength; i++) {
            await Datamodel.updateOne({ _id: data._id }, { $set: { [dataKey[i]]: dataValue[i] } })
        }
        res.status(200).json({ message: 'Data updated successfully !' })
    } catch (err) {
        res.status(200).json({ message: "Unable to update data !" })
    }
}



export { GetHome, PostAcceptForm, FetchData, DeleteData,updateData }