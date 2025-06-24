# 🏠 Sanahome – Home Renting Web Application

Sanahome is a full-stack web application that simplifies the process of discovering, listing, and managing rental properties. Designed with both renters and property owners in mind, it offers a seamless, secure, and user-friendly experience.

---

## 🌐 Live Demo

👉 [Visit Sanahome](https://sanahomerental.vercel.app)

---

## 📸 Screenshots

![Homepage Screenshot](/HomeRentalAppFrontend/public/project.gif)

---

## ✨ Features

* 🔍 **Advanced Search & Filters**
  Filter houses by price, area, city, BHK, house type, parking, and furnished status.

* 📸 **Multi-Image Uploads with Cloudinary**
  Property owners can upload multiple photos per listing.

* 🔐 **JWT Authentication**
  Secure login with JWT stored in HTTP-only cookies.

* 🛒 **Cart System**
  Users can save and unsave houses to their personal cart.

* 🔔 **Real-Time Notifications & Updates**
  Using WebSockets to deliver instant updates and owner notifications when actions like bookings occur.

* 🧼 **Clean & Modular Codebase**
  Separated concerns for scalability and maintainability.

* 📱 **Responsive Design**
  Fully mobile-friendly interface for access on any device.

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **React Router DOM**
* **Axios**
* **Tailwind CSS / Custom CSS**

### Backend

* **Spring Boot**
* **JWT Authentication**
* **WebSockets**
* **MongoDB Atlas**
* **Cloudinary SDK**

### Deployment

* **Frontend:** [Vercel](https://vercel.com/)
* **Backend:** [Render](https://render.com/) (Dockerized)

---

## 📆 Project Structure

```
sanahome/
🔹 client/           # React frontend
🔹 server/           # Spring Boot backend
🔹 README.md
```

---

## 📂 Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/sanahome.git
cd sanahome
```

### 1️⃣ Frontend

```bash
cd client
npm install
npm run dev
```

### 2️⃣ Backend

```bash
cd server
./mvnw spring-boot:run
```

> ⚠️ Make sure to configure your MongoDB URI and Cloudinary credentials in `application.properties`.

---

## 🔐 Environment Variables

Create a `.env` file in both `client` and `server` folders:

### Backend `application.properties`

```properties
spring.data.mongodb.uri=your_mongodb_uri
cloudinary.cloud_name=your_cloud_name
cloudinary.api_key=your_api_key
cloudinary.api_secret=your_api_secret
```

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to contribute:

* Fork the repo
* Create your feature branch: `git checkout -b feature/YourFeature`
* Commit your changes
* Push to the branch
* Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💼 Developer

**Santhosh (San)**
🚀 Passionate Full-Stack Developer | 💡 Building tech with purpose
📧 Reach me at: [LinkedIn](https://www.linkedin.com/in/sangaiyasubramanian) • [Email](santhoshlinux7@gmail.com)
