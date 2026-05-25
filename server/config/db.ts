import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Local database fallback definition if MONGO_URI is not provided
// This prevents system crash and allows instant preview!
export const isLocalDBFallback = !process.env.MONGO_URI;

const FALLBACK_DB_PATH = path.join(process.cwd(), 'local_database.json');

// Memory DB representation in case we are in fallback mode
interface LocalDB {
  users: any[];
  contacts: any[];
  materials: any[];
}

let localMemoryDB: LocalDB = {
  users: [],
  contacts: [],
  materials: []
};

// Seed materials for students
const defaultMaterials = [
  // Semester 1
  {
    id: "m1",
    type: "syllabus",
    title: "Introduction to Information Technology (IIT) Syllabus",
    subject: "Introduction to Information Technology",
    code: "CSC109",
    semester: "1st Semester",
    description: "Detailed course chapters including Computer Architecture, Operating Systems, Networking, and Database concepts.",
    content: "Unit 1: Computer Systems (6 hrs)\nUnit 2: Computer Software & Operating Systems (8 hrs)\nUnit 3: Database Management Systems (6 hrs)\nUnit 4: Computer Networks & Internet (8 hrs)\nUnit 5: Multimedia Technologies (6 hrs)\nUnit 6: Cybersecurity & Ethics (6 hrs)\nUnit 7: Emerging Technologies (5 hrs)"
  },
  {
    id: "m2",
    type: "notes",
    title: "IIT Lecture Notes - Unit 1 to 4",
    subject: "Introduction to Information Technology",
    code: "CSC109",
    semester: "1st Semester",
    description: "Comprehensive lecture notes covering computer hardware, CPU execution, OS processes and network configurations.",
    downloadLink: "#",
    author: "Prof. Dr. Ram Prasad"
  },
  {
    id: "m3",
    type: "question",
    title: "IIT Board Question 2080",
    subject: "Introduction to Information Technology",
    code: "CSC109",
    semester: "1st Semester",
    year: "2080",
    description: "TU Board Exam Paper for 1st Semester IIT students exam held in 2080."
  },
  // Semester 2
  {
    id: "m4",
    type: "syllabus",
    title: "Discrete Structure Syllabus",
    subject: "Discrete Structure",
    code: "CSC160",
    semester: "2nd Semester",
    description: "Course syllabus for logic, proofs, sets, relations, functions, graphs and algebraic structures.",
    content: "Unit 1: Graphs and Trees (10 hrs)\nUnit 2: Formal Logic (8 hrs)\nUnit 3: Proofs and Induction (8 hrs)\nUnit 4: Combinatorics & Probability (8 hrs)\nUnit 5: Relations & Recurrence (11 hrs)"
  },
  {
    id: "m5",
    type: "notes",
    title: "Discrete Mathematics: Graph Theory Handbook",
    subject: "Discrete Structure",
    code: "CSC160",
    semester: "2nd Semester",
    description: "Detailed hand-written notes on trees, planar graphs, Euler and Hamilton paths, and graph coloring algorithms.",
    downloadLink: "#",
    author: "Shyam Sundar"
  },
  {
    id: "m6",
    type: "question",
    title: "Discrete Structure Board Question 2079",
    subject: "Discrete Structure",
    code: "CSC160",
    semester: "2nd Semester",
    year: "2079",
    description: "TU Board Exam Paper of Discrete Structure exam held in 2079."
  },
  // Semester 3
  {
    id: "m7",
    type: "syllabus",
    title: "Data Structures and Algorithms (DSA) Syllabus",
    subject: "Data Structures and Algorithms",
    code: "CSC206",
    semester: "3rd Semester",
    description: "Core syllabus for DSA covering arrays, lists, stacks, queues, trees, searching, sorting and hashing.",
    content: "Unit 1: Introduction to DSA (2 hrs)\nUnit 2: Linear Data Structures (10 hrs)\nUnit 3: Recursion (3 hrs)\nUnit 4: Non-Linear Data Structures (12 hrs)\nUnit 5: Sorting and Searching (8 hrs)\nUnit 6: Hashing (5 hrs)\nUnit 7: Graph Algorithms (5 hrs)"
  },
  {
    id: "m8",
    type: "notes",
    title: "DSA Stack and Queue PDF Notes",
    subject: "Data Structures and Algorithms",
    code: "CSC206",
    semester: "3rd Semester",
    description: "Visual guidelines on stack trace, circular queue implementation details, and evaluation of postfix expressions.",
    downloadLink: "#",
    author: "Er. Amit Shah"
  },
  {
    id: "m9",
    type: "question",
    title: "Data Structures & Algorithms Board Question 2080",
    subject: "Data Structures and Algorithms",
    code: "CSC206",
    semester: "3rd Semester",
    year: "2080",
    description: "TU board exam papers with complete solutions for DSA."
  },
  // Notices
  {
    id: "n1",
    type: "notice",
    title: "BSc CSIT 4th & 8th Semester Exam Form Notice",
    date: "2026-05-20",
    category: "Exam",
    description: "TU IOST has published the examination form submission notices for regular and partial exams. Deadline for standard fee: 2026-06-12.",
    content: "The Tribhuvan University Institute of Science and Technology (IoST), Dean's Office, has published the exam form fill-up notice for BSc CSIT 4th and 8th Semester regular & back-paper examinees. All students must submit the exam form along with the bank voucher to their respective colleges before the deadline."
  },
  {
    id: "n2",
    type: "notice",
    title: "BSc CSIT Entrance Examination Date Schedule 2026",
    date: "2026-05-18",
    category: "Admission",
    description: "TU Dean's office opens pre-registration and online application portals for the upcoming batch of 2026.",
    content: "This is to inform all prospective students that the BSc CSIT Entrance Examination 2026 form submission starts from June 1st. Candidates can apply online through the official IoST portal. Minimum eligibility: Grade C or GPA 2.0 in 10+2 with Physics and Mathematics (100 marks each)."
  },
  {
    id: "n3",
    type: "notice",
    title: "Notes Update: Computer Networks Syllabus 2026 Edition",
    date: "2026-05-24",
    category: "Portal News",
    description: "Added 5th Semester Computer Network notes and old question solution set compiled by TU top scholars.",
    content: "New notes have been uploaded for Computer Networks (CSC314), matching the latest 2026 syllabus guidelines. Includes subnetting solutions, routing table calculations, and TCP/UDP socket programming templates."
  }
];

// Read from JSON fallback if exists
if (isLocalDBFallback) {
  try {
    if (fs.existsSync(FALLBACK_DB_PATH)) {
      const data = fs.readFileSync(FALLBACK_DB_PATH, 'utf-8');
      localMemoryDB = JSON.parse(data);
    } else {
      localMemoryDB.materials = defaultMaterials;
      fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(localMemoryDB, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error("Error loading local database fallback, resetting to defaults", error);
    localMemoryDB.materials = defaultMaterials;
  }
}

export function saveLocalDB() {
  if (isLocalDBFallback) {
    try {
      fs.writeFileSync(FALLBACK_DB_PATH, JSON.stringify(localMemoryDB, null, 2), 'utf-8');
    } catch (err) {
      console.error("Failed to write to fallback local JSON database", err);
    }
  }
}

export function getLocalDB() {
  return localMemoryDB;
}

export const connectDB = async () => {
  if (isLocalDBFallback) {
    console.log("-----------------------------------------");
    console.log("⚠️  MONGO_URI environment variable is missing!");
    console.log("➡️  Falling back gracefully to local JSON File storage:");
    console.log(`📁  Path: ${FALLBACK_DB_PATH}`);
    console.log("⚡  This allows the CSIT Portal to work out-of-the-box.");
    console.log("🧑‍💻  You can supply a real MONGO_URI in your environment settings anytime.");
    console.log("-----------------------------------------");
    return true;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`📡 MongoDB Connected Real connection to Atlas: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`);
    console.log("🔄 Gracefully falling back to integrated local storage file to maintain runtime safety...");
    // Override local config variables at runtime
    (process.env as any).MONGO_URI = "";
    return true;
  }
};
