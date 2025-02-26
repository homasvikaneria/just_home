// Frontend/vite-project/src/Components/Profile/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = ({ userId }) => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        profileImage: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${userId}`)
            .then((res) => {
                setFormData(res.data);
                setPreviewImage(`http://localhost:5000/uploads/${res.data.profileImagePath}`);
            })
            .catch((err) => console.error("Error fetching user data:", err));
    }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
        setPreviewImage(URL.createObjectURL(file)); // Show image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        for (const key in formData) {
            if (key === "profileImage" && formData[key]) {
                formDataToSend.append("profileImage", formData[key]);
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.put(`http://localhost:5000/users/update/${userId}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Profile update failed:", error);
            alert("Error updating profile");
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Surname:</label>
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Password (Leave blank to keep current password):</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />

                <label>Profile Image:</label>
                <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />

                {previewImage && <img src={previewImage} alt="Profile Preview" width="100" />}

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
