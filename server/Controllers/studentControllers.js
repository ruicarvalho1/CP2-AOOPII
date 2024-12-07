import Student from '../Models/StudentModel.js';

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Error fetching student data' });
    }
};

export const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Error fetching student' });
    }
};

export const createStudent = async (req, res) => {
    const newStudent = req.body;
    try {
        const student = new Student(newStudent);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Error creating student' });
    }
};

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const updatedStudent = req.body;
    try {
        const student = await Student.findByIdAndUpdate(id, updatedStudent, { new: true });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Error updating student' });
    }
};

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Error deleting student' });
    }
};
