Full Stack To Do List web application

 Description of the  project.

 It is a full stack to-do list application built using Typescript, React, Node and mongoDB it allows users to manage tasks efficiently with modern ui and smooth functionality.


---

 Demo Video
Check out the live demo of the project here:  
Watch Video- https://drive.google.com/file/d/1pFGGF_4Ys9YQNPX_1_EKDp-goJTXiYeM/view?usp=sharing
---

 Technologies Used
- Frontend: React, TypeScript, CSS  
- Backend: Node, Express.  
- Database: MongoDB  
- State Management / API Handling--
1 React router for routing, zustand as global stat,
2 React query with zod schemas for api data fetching
3 React hook form for handling forms

---

 Features
- Create, read, update, and delete tasks (CRUD operations)  
- User authentication (sign up / login)  
- Responsive design for mobile and desktop  
- Clean and intuitive UI  
- Real-time task updates using React Query  

---

 🛠 Installation & Setup
Clone the repository
git clone 
cd 

 Backend Setup
cd server
npm install

 Create a .env file in the server folder with these variables:
 PORT=5000
 MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server
npx ts-node src/server.ts

 Frontend Setup
cd client
npm install

Create a .env file in the client folder if needed:
 REACT_APP_API_URL=http://localhost:5000

To start front end
npm run dev

 Open your browser and go to: http://localhost:3000

