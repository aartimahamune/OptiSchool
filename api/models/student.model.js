import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    prnNo: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    nationality: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique : true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique : true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    localAddress: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    parentPhoneNo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    prevSchoolName: {
      type: String,
      required: true,
    },
    appliedClass: {
      type: String,
      required: true,
    },
    prevGrade: {
      type: String,
      required: true,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyPhoneNo: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    relationshipWithStudent: {
      type: String,
      required: true,
    },
    aadhaarCard: {
      type: String,
      required: true,
    },
    leavingCertificate: {
      type: String,
      required: true,
    },
    marksheet: {
      type: String,
      required: true,
    },
    photo: {
      type: String, 
      required: true,
    },

  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;  