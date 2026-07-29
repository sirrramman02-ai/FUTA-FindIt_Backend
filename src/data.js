import bcrypt from 'bcrypt'

export const categories = ['Student ID','Laptop','Phone','Tablet','Calculator','Wallet','Keys','Bag','Backpack','Books','Notebook','Headphones','Earbuds','Charger','Power Bank','Watch','Jewelry','Clothing','Shoes','Documents','Glasses','Water Bottle','Umbrella','Other']
// FUTA campus directory. "Other" keeps reports useful for new or very specific landmarks.
export const locations = [
  'FUTA Main Gate','South Gate','North Gate','University Main Entrance','Main Car Park','FUTA Security Post','Campus Security Office','Student Affairs Division','Dean of Students Office','Students Union Building','FUTA SUG Secretariat','FUTA Health Centre','University Medical Centre','Main Library','ICT Centre','Computer Centre','FUTA e-Library','FUTA Radio','Auditorium','Multipurpose Hall','Sports Complex','Football Field','Basketball Court','Tennis Court','Cafeteria','Food Court','Shopping Complex','Campus Market','FUTA Bookshop','Post Office','ATM Point','University Chapel','University Mosque','University Guest House','FUTA Staff School','FUTA Nursery and Primary School',
  'Akindeko Hall','Jibowu Hall','Adeniyi Hall','Abiola Hall','FUTA Female Hostel','Postgraduate Hostel','Student Hostel Area','Hostel A','Hostel B','Hostel C',
  'School of Computing (SOC)','Computer Science Department','Information Systems Department','Cyber Security Department','School of Electrical Systems Engineering (SESE)','School of Infrastructure, Minerals and Manufacturing Engineering (SIMME)','School of Environmental Technology (SET)','School of Physical Sciences (SPS)','School of Life Sciences (SLS)','School of Agriculture and Agricultural Technology (SAAT)','School of Earth and Mineral Sciences (SEMS)','School of Logistics and Innovation Technology (SLIT)','College of Health Sciences (CHS)','School of Postgraduate Studies (SPGS)','School of Management Technology (SMAT)','School of Basic Medical Sciences','School of Engineering and Engineering Technology Library','School of Science Library','School of Agriculture Library','School of Environmental Technology Library','School of Earth and Mineral Sciences Library','School of Management Technology Library','School of Health and Health Technology Library',
  'Chemistry Laboratory','Physics Laboratory','Biology Laboratory','Computer Laboratory','Engineering Laboratory','Research Laboratory','Lecture Theatre 1','Lecture Theatre 2','Lecture Theatre 3','Lecture Theatre 4','1000 Seater Lecture Theatre','FUTA Central Lecture Theatre','Departmental Lecture Rooms','FUTA Teaching and Research Farm','FUTA Botanical Garden','FUTA Dam Area','Works and Services Unit','Physical Planning Unit','Registry Building','Bursary Department','Admissions Office','Examinations and Records','FUTA Entrepreneurship Centre','FUTA Centre for Continuing Education','Open and Distance Learning Centre','Other / precise landmark'
]
export const db = { users: [], reports: [], matches: [], claims: [], messages: [], notifications: [], flags: [], contactRequests: [] }
export const id = () => crypto.randomUUID()
export async function seed() {
  if (db.users.length) return
  const passwordHash = await bcrypt.hash('Password123!', 10)
  const makeUser = (name, email, role = 'student') => ({ id: id(), name, email, passwordHash, studentId: `STU-${Math.floor(Math.random()*90000+10000)}`, department: 'Computer Science', faculty: 'Science', level: '300', role, suspended: false, createdAt: new Date().toISOString() })
  const student = makeUser('Demo Student', 'student@example.com'); const finder = makeUser('Demo Finder', 'finder@example.com'); const admin = makeUser('Campus Admin', 'admin@example.com', 'admin'); db.users.push(student, finder, admin)
  const report = (userId, type, description, category, brand, color, location, keywords, features = []) => ({ id: id(), userId, type, description, category, brand, model: null, color, distinguishingFeatures: features, privateDetails: features.join(', '), keywords, location, dateOccurred: new Date().toISOString(), approximateTime: '', images: [], status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
  db.reports.push(
    report(student.id, 'lost', 'Black HP laptop with a chemistry sticker. I lost it near the chemistry laboratory.', 'Laptop', 'HP', 'Black', 'Chemistry Laboratory', ['black','hp','laptop','chemistry','sticker'], ['Chemistry sticker']),
    report(finder.id, 'found', 'Found a black HP laptop around the chemistry laboratory.', 'Laptop', 'HP', 'Black', 'Chemistry Laboratory', ['black','hp','laptop','chemistry'], []),
    report(student.id, 'lost', 'Blue Casio fx-991EX calculator lost in Engineering Block.', 'Calculator', 'Casio', 'Blue', 'Engineering Block', ['blue','casio','calculator']),
    report(finder.id, 'found', 'Student ID found outside Lecture Theatre 2.', 'Student ID', null, null, 'Lecture Theatre 2', ['student','id']),
    report(finder.id, 'found', 'Black backpack found in Cafeteria.', 'Backpack', null, 'Black', 'Cafeteria', ['black','backpack'])
  )
}
