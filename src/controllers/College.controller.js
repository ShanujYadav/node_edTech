import { College } from "../models/College.model.js";
import ApiResponse from "../utils/ApiResponse.js";


const addCollege = async (req, res) => {
    try {
        const { name, sortName, category, type, logoUrl, imgUrl, established, size, rating, city, state, country, contactInfo, ranking, scholarships, courseAndFee, facultyAndStudent, alumni, fest, cutOff } = req.body;

        if ([name, sortName, category, type, logoUrl, imgUrl, established, size, rating, city, state, country].some((field) =>
            field?.trim() === '')
        ) {
            return res.status(400).json(
                new ApiResponse(400, "All field is required !"))
        }

        const exist = await College.findOne({ $or: [{ name }, { sortName }] })
        if (exist) {
            return res.status(409).json(new ApiResponse(409, `College is Already Exist !`));
        }
        if (!contactInfo || !contactInfo.phone || !contactInfo.email || !contactInfo.website || !contactInfo.description) {
            return res.status(400).json(new ApiResponse(400, `All contact information fields are required!`));
        }
        if (!ranking || !ranking.naacGrade || !ranking.nirfPara || !ranking.nirfRanking?.length) {
            return res.status(400).json(new ApiResponse(400, `All ranking fields are required!`));
        }
        if (!scholarships || !scholarships?.length) {
            return res.status(400).json(new ApiResponse(400, `Scholarship are required!`));
        }
        if (!courseAndFee || !courseAndFee.length || courseAndFee.some(course => !course.course?.trim() || !course.fee?.trim() || !course.eligibility?.trim() || !course.duration?.trim())) {
            return res.status(400).json(new ApiResponse(400, `courseAndFee are required and should not have empty or null values!`));
        }

        if (!facultyAndStudent || !facultyAndStudent.faculty || !facultyAndStudent.faculty.chairman || !facultyAndStudent.faculty.director || !facultyAndStudent.faculty.otherStaff
            || !facultyAndStudent.students || !facultyAndStudent.students.total || !facultyAndStudent.students.underGraduates || !facultyAndStudent.students.postGraduates || !facultyAndStudent.students.doctoral || !facultyAndStudent.students.threeYearPlacement || !facultyAndStudent.students.alumni || !facultyAndStudent.students.highestPackage) {
            return res.status(400).json(new ApiResponse(400, `Faculty and student details are required!`));
        }

        if (!alumni || !alumni.length || alumni.some(item => !item.alumniName?.trim() || !item.position?.trim())) {
            return res.status(400).json(new ApiResponse(400, `alumni are required and should not empty`));
        }

        if (!cutOff || !cutOff.length || cutOff.some(item => !item.exam?.trim() || !item.cutOffs?.length || item.cutOffs.some(cutOffItem => !cutOffItem.year?.trim() || !cutOffItem.marks?.trim()))) {
            return res.status(400).json(new ApiResponse(400, `cutOff are required and should not empty `));
        }

        if (!fest || !fest.length || fest.some(item => !item.festName?.trim() || !item.description?.length)) {
            return res.status(400).json(new ApiResponse(400, `fest are required and should not empty`));
        }

        const createdCollege = await College.create(req.body);

        return res.status(201).json(new ApiResponse(201, "College Saved!", createdCollege));
    } catch (error) {
        console.error("Error saving college:", error);
        return res.status(500).json(new ApiResponse(500, "Internal Server Error!"));
    }
};



const collegeList = async (req, res) => {
    try {
        const allCollege = await College.find().select("-contactInfo -ranking -facultyAndStudent -scholarships -courseAndFee -alumni -fest -cutOff -__v -createdAt -updatedAt");
        return res.status(201).json(new ApiResponse(201, "College List !", allCollege));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Internal Server Error!"));
    }
};

const collegeDetails = async (req, res) => {
    const { id } = req.body    
    try {
        if (!id) {
            return res.status(400).json(new ApiResponse(400, "Please Provide College Id !"));
        }
        const collegeDetails = await College.findById(id)

        return res.status(201).json(new ApiResponse(201, "College Deatils !", collegeDetails));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "Internal Server Error!"));
    }
}
export { addCollege, collegeList, collegeDetails }