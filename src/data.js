import bcrypt from 'bcrypt'

export const categories = ['Student ID','Laptop','Phone','Tablet','Calculator','Wallet','Keys','Bag','Backpack','Books','Notebook','Headphones','Earbuds','Charger','Power Bank','Watch','Jewelry','Clothing','Shoes','Documents','Glasses','Water Bottle','Umbrella','Other']
export const locations = ['Main Library','Chemistry Laboratory','Engineering Block','Computer Science Department','Student Affairs','Cafeteria','Sports Complex','Hostel A','Hostel B','Hostel C','Main Gate','Auditorium','Lecture Theatre 1','Lecture Theatre 2','ICT Center','Other']
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
