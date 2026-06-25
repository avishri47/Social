import React, { useState, useRef } from "react";
import "./ProfileView.css";
import { useAuth } from "../context/AuthContext";
import profileService from "../services/ProfileService";

const ProfileView = ({ initialData, fields, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData || {});
  const { avatarUrl, setAvatar } = useAuth();
  const fileInputRef = useRef(null);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave?.(formData, formData.id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  const handleAvatarChange = async (e) => {
    console.log("handleAvatarChange fired");

    const file = e.target.files?.[0];
    console.log("selected file:", file);

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      avatarUrl: previewUrl,
    }));

    try {
      console.log("Uploading avatar...");

      const uploadedUrl = await profileService.uploadAvatar(
        formData.id,
        file
      );

      console.log("Upload success:", uploadedUrl);

      const freshUrl = uploadedUrl.includes("?")
        ? `${uploadedUrl}&t=${Date.now()}`
        : `${uploadedUrl}?t=${Date.now()}`;

      setFormData((prev) => ({
        ...prev,
        avatarUrl: freshUrl,
      }));

      setAvatar(freshUrl);
    } catch (error) {
      console.error("Avatar upload failed", error);
    }
  };

  const finalAvatar =
    avatarUrl ||
    formData?.avatarUrl ||
    formData?.profilePicture ||
    formData?.imageUrl ||
    "/default-avatar.png";

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Avatar Section */}
        <div className="profile-avatar-section">
          <label htmlFor="avatar-upload">
            <img
              src={finalAvatar}
              alt="Profile"
              className="profile-avatar clickable-avatar"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
          </label>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
        </div>

        {/* Header */}
        <div className="profile-header">
          <div>
            <h2>Profile Information</h2>
            <p>Manage your personal details</p>
          </div>

          {!isEditing ? (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="action-buttons">
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="profile-grid">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`form-group ${field.fullWidth ? "full-width" : ""}`}
            >
              <label>{field.label}</label>

              {isEditing ? (
                field.type === "textarea" ? (
                  <textarea
                    value={formData?.[field.name] || ""}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    value={formData?.[field.name] || ""}
                    onChange={(e) =>
                      handleChange(field.name, e.target.value)
                    }
                  />
                )
              ) : (
                <div className="field-value">
                  {formData?.[field.name] || "-"}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProfileView;