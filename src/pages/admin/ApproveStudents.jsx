import { useEffect, useState } from "react";
import StudentApprovalTable from "../../components/shared/StudentApprovalTable";
import { getPendingStudents, approveStudent } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";

const ApproveStudents = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getPendingStudents();
        setStudents(data);
      } catch {
        console.error("Failed loading students");
      }
    };
    loadStudents();
  }, []);

  const handleApprove = async (id) => {
    await approveStudent(user.uid, id);
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return (
    <StudentApprovalTable students={students} onApprove={handleApprove} />
  );
};

export default ApproveStudents;
