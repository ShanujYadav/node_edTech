import mongoose, { Schema } from "mongoose"

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sortName: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    logoUrl: { type: String, required: true },
    imgUrl: { type: String, required: true },
    established: { type: String, required: true },
    size: { type: String, required: true },
    rating: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    contactInfo: {
        phone: { type: String, required: true },
        email: { type: String, required: true },
        website: { type: String, required: true },
        description: { type: String, required: true }
    },
    ranking: {
        naacGrade: { type: String, required: true },
        nirfPara: { type: String, required: true },
        nirfRanking: [
            {
                year: { type: String, required: true },
                position: { type: String, required: true }
            }
        ]
    },
    scholarships: [{ type: String,required: true  }],
    courseAndFee: [
        {
            course: { type: String, required: true },
            fee: { type: String, required: true },
            eligibility: { type: String, required: true },
            duration: { type: String, required: true }
        }
    ],
    facultyAndStudent: {
        faculty: {
            chairman: { type: String, required: true },
            director: { type: String, required: true },
            otherStaff: { type: String, required: true }
        },
        students: {
            total: { type: String, required: true },
            underGraduates: { type: String, required: true },
            postGraduates: { type: String, required: true },
            doctoral: { type: String, required: true },
            threeYearPlacement: { type: String, required: true },
            alumni: { type: String, required: true },
            highestPackage: { type: String, required: true }
        }
    },
    alumni: [
        {
            alumniName: { type: String, required: true },
            position: { type: String, required: true }
        }
    ],
    fest: [
        {
            festName: { type: String, required: true },
            description: { type: String, required: true }
        }
    ],
    cutOff: [
        {
            exam: { type: String, required: true },
            cutOffs: [
                {
                    year: { type: String, required: true },
                    marks: { type: String, required: true }
                }
            ]
        }
    ]
},
    { timestamps: true });

export const College = mongoose.model('college', collegeSchema)