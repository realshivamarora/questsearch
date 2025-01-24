![image](https://github.com/user-attachments/assets/34b9060a-0933-4cf7-89a5-29b594bb2dc2)
![image](https://github.com/user-attachments/assets/091d5d54-2d9a-41e4-a1c2-eba0091b8e9c)
![image](https://github.com/user-attachments/assets/3e002523-0770-4ec4-a684-93eca515d503)
![image](https://github.com/user-attachments/assets/fba739f2-8052-4450-a85b-f9dd6eaf1086)
Searching Category Wise
![image](https://github.com/user-attachments/assets/f27ae4b8-bf1f-4752-9aae-28f9e2236259)
![image](https://github.com/user-attachments/assets/83c86217-0d1d-42c0-bbb8-110d09627c51)
![image](https://github.com/user-attachments/assets/d9e7d65f-12b8-4746-84f6-c6b98bc2ff78)
![image](https://github.com/user-attachments/assets/7801f6cd-9aa5-490a-9779-221775496dee)

# Question Library Project

A full-stack web application designed and developed to handle a **large question library** with efficient search functionality and unique handling of multiple question types, including **MCQs**, **Anagrams**, and **Read Along**. This project is built with **React** on the frontend, and **Node.js** with **MongoDB Atlas** on the backend.

The project began as an idea to create a scalable and responsive application for managing and interacting with a large question dataset (1 lakh records). The focus was on implementing a **smooth user experience**, **scalable backend**, and **modern UI/UX** principles. Below is a detailed walkthrough of how the project was developed.

---

## **Journey of Development**
1. **Initial Planning and Setup**
   - The project was split into two primary parts: **frontend** and **backend**.
   - MongoDB Atlas was chosen to store a large dataset of questions due to its scalability and ease of integration with Node.js.
   - React was selected for building the frontend, with Bootstrap for responsive design.

2. **Backend Development**
   - MongoDB Atlas was set up, and a dataset containing 1 lakh questions was uploaded.
   - Implemented efficient search queries using **MongoDB Indexes** and caching mechanisms for faster results.
   - The backend APIs were built with **Node.js** and designed to handle various query parameters (like pagination).

3. **Frontend Development**
   - A React application was created, with a focus on responsive and user-friendly design.
   - A **search bar with debouncing** was implemented to reduce unnecessary API calls.
   - Pagination and lazy loading were integrated to ensure smooth handling of large datasets.
   - The UI was built using **Bootstrap** for consistency across different devices and browsers.

4. **Testing and Deployment**
   - Both frontend and backend were tested locally to ensure proper functionality.
   - The application was designed to handle edge cases, like empty searches or large data loads.
   - Final optimizations were made for performance and responsiveness.

---

## **Technologies Used**
### **Frontend**
- React
- Bootstrap
- Axios (for API calls)

### **Backend**
- Node.js
- Express
- MongoDB Atlas

---

## **Key Features**
- **Search Functionality**: With debouncing to reduce unnecessary API calls.
- **Pagination and Lazy Loading**: For efficient navigation and display of results.
- **Three Question Types**:
  1. **MCQs**: Displays questions with options and grading functionality.
  2. **Anagrams**: Drag-and-drop interface for rearranging letters.
  3. **Read Along**: Simple display of a question for reading.
- **Responsive Design**: Ensures usability across devices.

---

## **Folder Structure**
project/ ├── frontend/ │ ├── src/ │ ├── public/ │ ├── package.json │ └── README.md ├── backend/ │ ├── src/ │ ├── package.json │ └── README.md └── README.md (this file)


---

## **Installation and Setup**
### **Prerequisites**
- **Node.js** (v14+)
- **MongoDB Atlas** account
- **npm** or **yarn**

### **Backend Setup**
1. Navigate to the `backend` folder:
   ```bash
   cd backend

2. Install dependencies
`npm install`

3. Create a .env file and add the MongoDB connection string or replace the MongoDB string in server.js file by obtaining your own MongoDB connection string in a format similar to
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/SpeakX?retryWrites=true&w=majority

4. Start the backend server:
node server.js

5. The backend will run on http://localhost:5000.

### **Frontend Setup**
1. Navigate to the `frontend` folder:
   `cd frontend`

2. Install dependencies
   `npm install`

3. Start the developement server:
   `npm start`

Note: Rememeber to replace server to http://localhost:3000 in SearchBar.js component while completing compiling the project, to run the project on localhost on port 3000.
Note: Replace phone number, email and others to yours while implementing in Footer.

4. Access the application at http://localhost:3000.

### **How to Use**
Launch the application in your browser (http://localhost:3000).
Use the search bar to look for specific questions.
Explore the results using the pagination controls.
Interact with the questions:
MCQs: Select answers and view grading.
Anagrams: Rearrange letters using drag-and-drop.
Read Along: View and read the displayed text
Content Only: Only content in the text

Development Insights
Challenges Solved:

Efficiently handling 1 lakh records using MongoDB indexes and optimized queries.
Ensuring a smooth UI with debouncing and lazy loading techniques.
Future Plans:

Implement user authentication for personalized experiences.
Add advanced filters, like question difficulty and categories.
Introduce export-to-PDF functionality for offline use.

Developer
Developed with ❤️ by Shivam Arora. Feel free to reach out for feedback or contributions! 

### **License**

This project is open-source and licensed under the MIT License.


---

This version emphasizes the journey you took to build the project while still maintaining clarity and professionalism. Let me know if you need further edits! 🚀

