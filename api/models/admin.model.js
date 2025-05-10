import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminUsername:{
        type: String,
        required: true,
        unique: true
    },
    adminPassword:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;