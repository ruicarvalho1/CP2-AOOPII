import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
});


const Student = mongoose.model('Student', studentSchema);

export default Student;
